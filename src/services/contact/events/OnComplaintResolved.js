/**
 * Created by Soumya (soumya@smarttersstudio.com) on 28/06/21 at 1:24 PM.
 */
import moment from 'moment';

const OnComplaintResolved = async (result, context) => {
    const { app } = context;

    const { status, feedbackType, email, createdAt } = result;

    if (feedbackType === 3 && status === 2) {
        /**
         * @type {Utils}
         */
        const utils = app.get('utils');

        const date = moment(createdAt).format('dddd, MMMM Do YYYY, [at] h:mm a');

        await utils.sendMail(
            email,
            'Complaint Resolved',
            `Your complaint given on ${date} is resolved. Kindly verify if any further issue arises don't hesitate to reach us.`,
        );
    }
};

export default OnComplaintResolved;
