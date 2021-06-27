/**
 * Created by Soumya (soumya@smarttersstudio.com) on 27/06/21 at 7:12 PM.
 */

const OnRequestCreated = async (result, context) => {
    const { reqId, email, status } = result;

    const { app } = context;

    /**
     * @type {Utils}
     */
    const utils = app.get('utils');

    if (status === 1) {
        await utils.sendMail(
            email,
            'Bin Request',
            `Your have requested for Bin allocation. Your request Id is ${reqId}. Keep it for future reference.`,
        );
    } else if (status === 3) {
        await utils.sendMail(
            email,
            'Bin Allocated',
            `Your bin request referring Id ${reqId} is inspected successfully and also bin is allocated as per your request.`,
        );
    }
};

export default OnRequestCreated;
