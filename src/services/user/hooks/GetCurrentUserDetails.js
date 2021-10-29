/**
 * Created By Soumya(soumya@smarttersstudio.com) on 29/10/21 at 8:37 PM.
 * @description get current user details.
 */
import { BadRequest } from '@feathersjs/errors';

const GetCurrentUserDetails = () => async (context) => {
    const { data, app, id } = context;

    data.userData = await app
        .service('user')
        ._get(id)
        .catch((res) => {
            throw new BadRequest(res.message);
        });

    return context;
};

export default GetCurrentUserDetails;
