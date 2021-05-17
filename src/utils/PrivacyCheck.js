/**
 * Created By Soumya (soumyaranjansahoo338@gmail.com) on 9/11/2020 at 8:49 PM
 */

export default {
    checkForNotAuthUser(match, aggregateQuery) {
        aggregateQuery.push(
            {
                $match: match,
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'users',
                },
            },
            {
                $lookup: {
                    from: 'audios',
                    localField: 'audio',
                    foreignField: '_id',
                    as: 'audios',
                },
            },
            {
                $set: {
                    user: { $arrayElemAt: ['$users', 0] },
                    audio: { $arrayElemAt: ['$audios', 0] },
                },
            },
            {
                $unset: ['audios', 'users'],
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $match: {
                    'user.type': 1,
                },
            },
        );
        return aggregateQuery;
    },

    async checkForAuthUser(app, user, match, aggregateQuery) {
        let blockedByUsers = await app.service('v1/block')._find({
            query: {
                blockedUser: user._id,
                active: true,
            },
            paginate: false,
        });

        blockedByUsers = blockedByUsers.map((each) => each.user);

        let followingUsers = await app.service('v1/follower')._find({
            query: {
                user: user._id,
                active: true,
                status: 2,
                entityType: 'user',
            },
            paginate: false,
        });

        followingUsers = followingUsers.map((each) => each.entityId);

        let users = await app.service('v1/user')._find({
            query: {
                role: 1,
            },
            paginate: false,
        });

        users = users.map((each) => each._id);

        aggregateQuery.push(
            {
                $match: match,
            },
            {
                $match: {
                    user: {
                        $nin: blockedByUsers,
                    },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'users',
                },
            },
            {
                $lookup: {
                    from: 'audios',
                    localField: 'audio',
                    foreignField: '_id',
                    as: 'audios',
                },
            },
            {
                $set: {
                    user: { $arrayElemAt: ['$users', 0] },
                    audio: { $arrayElemAt: ['$audios', 0] },
                },
            },
            {
                $unset: ['audios', 'users'],
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $match: {
                    $and: [
                        {
                            $expr: {
                                $cond: {
                                    if: { $eq: ['$user.type', 2] },
                                    then: {
                                        $in: ['$user._id', followingUsers],
                                    },
                                    else: {
                                        $in: ['$user._id', users],
                                    },
                                },
                            },
                        },
                        {
                            $expr: {
                                $cond: {
                                    if: { $eq: ['$publicView', false] },
                                    then: {
                                        $in: ['$user._id', followingUsers],
                                    },
                                    else: {
                                        $in: ['$user._id', users],
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        );
        return aggregateQuery;
    },
};
