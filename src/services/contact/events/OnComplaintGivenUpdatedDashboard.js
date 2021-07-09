/**
 * Created by Soumya (soumya@smarttersstudio.com) on 27/06/21 at 7:12 PM.
 */

const OnComplaintGivenUpdatedDashboard = async (result, context) => {
    const { feedbackType } = result;

    const { app } = context;

    if (feedbackType === 3) {
        const mails = await app.service('contact')._find({
            query: {
                status: 1,
                feedbackType: 3,
                $select: ['createdAt'],
                $sort: { createdAt: -1 },
                $limit: 1,
            },
        });

        await app.service('dashboard')._patch('60e89c739642f42f0345330b', {
            mails: {
                number: mails.total,
                updatedAt: new Date(),
            },
        });
    }
};

export default OnComplaintGivenUpdatedDashboard;
