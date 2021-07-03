/**
 * Created by Soumya (soumya@smarttersstudio.com) on 17/05/21 at 4:41 PM.
 */
import { BadRequest } from '@feathersjs/errors';

const SetZone = () => async (context) => {
    const { params, data, method } = context;

    const {
        user: { zone },
    } = params;

    if (method === 'create') {
        if (zone) {
            data.zone = zone;
        }
        // if (!data.zone) throw new BadRequest('Select your zone.');
    } else {
        if (zone) {
            params.query.zone = zone;
        }
    }
};

export default SetZone;
