/**
 * Created by Soumya (soumya@smarttersstudio.com) on 17/05/21 at 8:41 PM.
 */
import { BadRequest } from '@feathersjs/errors';

const GetZoneFromPin = () => async (context) => {
    const { data, app } = context;

    const { pinCode } = data;

    const zone = await app
        .service('zone')
        ._find({
            query: {
                pinCodes: { $in: [pinCode] },
            },
        })
        .then((res) => (res.total ? res.data[0] : null));

    if (!zone) throw new BadRequest('Invalid Pin.');

    data.zone = zone._id;
};

export default GetZoneFromPin;
