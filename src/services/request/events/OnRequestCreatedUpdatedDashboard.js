/**
 * Created by Soumya (soumya@smarttersstudio.com) on 27/06/21 at 7:12 PM.
 */

const OnRequestCreatedUpdatedDashboard = async (result, context) => {
    // const { status } = result;

    const { app } = context;

    const requests = await app.service('request')._find({
        query: {
            status: 1,
            $select: ['createdAt'],
            $sort: { createdAt: -1 },
            $limit: 1,
        },
    });

    await app.service('dashboard')._patch('60e89c739642f42f0345330b', {
        requests: {
            number: requests.total,
            updatedAt: new Date(),
        },
    });
};

export default OnRequestCreatedUpdatedDashboard;
