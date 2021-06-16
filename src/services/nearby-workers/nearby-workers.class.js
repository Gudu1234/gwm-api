/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';

export const NearbyWorkers = class NearbyWorkers {
    constructor(options, app) {
        this.options = options || {};
        this.app = app;
    }

    async find(params) {
        const { query } = params;

        let { coordinates, binType, parent, radius = 5000, zone } = query;

        const binService = this.app.service('bin');

        const longitude = parseFloat(coordinates[0]);
        const latitude = parseFloat(coordinates[1]);

        const aggregateQuery = [];

        const binQuery = {
            status: { $ne: 0 },
            type: parseInt(binType),
            worker: { $ne: null },
        };

        if (binType === 2) {
            binQuery.parent = Types.ObjectId(parent);
        }

        aggregateQuery.push(
            {
                $geoNear: {
                    near: { type: 'Point', coordinates: [longitude, latitude] },
                    distanceField: 'distance',
                    maxDistance: parseFloat(radius.toString()),
                    key: 'coordinates',
                    spherical: true,
                    query: binQuery,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'worker',
                    foreignField: '_id',
                    as: 'worker',
                },
            },
            {
                $unwind: '$worker',
            },
        );

        let aggregateResult = await binService.Model.aggregate(aggregateQuery);

        // console.log(aggregateResult);

        aggregateResult = aggregateResult.map((each) => {
            return {
                ...each.worker,
                distance: parseInt(each.distance),
                assigned: true,
            };
        });

        const assignedWorkers = aggregateResult.length ? aggregateResult.map((each) => each._id) : [];

        let unassignedWorkers = await this.app.service('user').Model.aggregate([
            {
                $match: {
                    status: 1,
                    _id: {
                        $nin: assignedWorkers,
                    },
                    role: parseInt(binType) === 1 ? 2 : 1,
                    zone: Types.ObjectId(zone),
                },
            },
            {
                $lookup: {
                    from: 'bins',
                    let: { workerId: '_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$worker', '$$workerId'] },
                                status: 1,
                            },
                        },
                    ],
                    as: 'assignedWork',
                },
            },
        ]);

        unassignedWorkers = unassignedWorkers.map((each) => {
            const { assignedWork } = each;
            return {
                ...each,
                assigned: !!assignedWork.length,
            };
        });

        // console.log(unassignedWorkers.length);

        return aggregateResult.concat(unassignedWorkers);
    }
};
