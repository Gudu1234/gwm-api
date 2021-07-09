/**
 * Created By Soumya(soumya@smarttersstudio.com) on 10/07/21 at 1:28 AM.
 */
import moment from 'moment';

const GetTimeDifference = () => async (context) => {
    const { result } = context;

    const {
        mails: { updatedAt: mailUpdatedAt },
        requests: { updatedAt: requestUpdatedAt },
    } = result;

    const getTimeDiff = (duration) => {
        let days = Math.floor(duration.asDays());
        let hours = Math.floor(duration.asHours());
        let minutes = Math.floor(duration.asMinutes());
        let seconds = Math.floor(duration.asSeconds());

        if (days >= 1) {
            return `Last updated ${days} day(s) ago`;
        } else if (hours >= 1) {
            return `Last updated ${hours} hour(s) ago`;
        } else if (minutes >= 1) {
            return `Last updated ${minutes} minute(s) ago`;
        } else if (seconds >= 1) {
            return `Last updated ${seconds} second(s) ago`;
        }
    };

    const mailUpdatedDuration = moment.duration(moment().diff(moment(mailUpdatedAt)));
    const requestUpdatedDuration = moment.duration(moment().diff(moment(requestUpdatedAt)));

    result.mails.updateAtString = getTimeDiff(mailUpdatedDuration);
    result.requests.updateAtString = getTimeDiff(requestUpdatedDuration);
};

export default GetTimeDifference;
