/**
 * Created by Guru <guru@smarttersstudio.com> on 3/09/2020
 * @description Check current user is private or not
 */

import { BadRequest } from '@feathersjs/errors';

/**
 *
 * @returns {function(...[*]=)}
 * @param fieldName
 * @param requestType
 */ const IsPrivate =
    (fieldName, requestType = 'data') =>
    async (context) => {
        if (!fieldName) return false;
        const {
            data,
            app,
            params: { query },
        } = context;

        let userId = '';

        if (requestType === 'data') userId = data[fieldName];
        else userId = query[fieldName];

        if (userId) {
            const user = await app
                .service('v1/user')
                ._get(userId)
                .catch(() => {
                    throw new BadRequest('User Not Found');
                });
            if (!user) return false;

            const { type } = user;

            return type === 2;
        }
    };

export default IsPrivate;
