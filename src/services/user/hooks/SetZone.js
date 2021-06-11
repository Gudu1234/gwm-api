/**
 * Created by Soumya (soumya@smarttersstudio.com) on 17/05/21 at 4:41 PM.
 */

const SetZone = () => async (context) => {
    const { params, data, method } = context;

    const {
        user: { zone },
    } = params;

    if (method === 'create') {
        data.zone = zone;
    } else {
        params.query.zone = zone;
    }
};

export default SetZone;
