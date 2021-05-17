/**
 * Created by Soumya (soumya@smarttersstudio.com) on 17/05/21 at 4:47 PM.
 */
import { BadRequest, Forbidden } from '@feathersjs/errors';

const CheckForUser = () => async (context) => {
    const { app, id, params } = context;

    const {
        user: { role },
    } = params;

    const { role: userRole, _id: userId } = await app
        .service('user')
        ._get(id, {
            query: {
                status: { $ne: 0 },
            },
        })
        .catch(() => {
            throw new BadRequest('Invalid user given.');
        });

    if (context.method === 'patch') {
        if (role === userRole) {
            if (userId.toString() !== params.user._id.toString()) {
                throw new Forbidden('You can not perform this action.');
            }
        } else if (role < userRole) {
            throw new Forbidden('You can not perform this action.');
        }
    } else {
        if (role <= userRole) throw new Forbidden('You can not perform this action.');
    }

    return context;
};

export default CheckForUser;
