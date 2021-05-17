/**
 * Created by Soumya (soumya@smarttersstudio.com) on 17/05/21 at 4:41 PM.
 */

const SetZone = () => async (context) => {
    const { params, data } = context;

    const {
        user: { zone },
    } = params;

    data.zone = zone;
};

export default SetZone;
