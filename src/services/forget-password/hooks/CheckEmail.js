/**
 *   CreatedBy Soumya (soumyaranjansahoo338@gmail.com) at 06-07-2020 10:07
 */
import { NotFound, BadRequest } from '@feathersjs/errors';

const CheckEmail = () => async (context) => {
    const { app, data } = context;

    const { email } = data;

    // if (phone) {
    //     if (!/^[0][1-9]\d{9}$|^[1-9]\d{9}$/.test(phone)) {
    //         throw new BadRequest('Please provide a valid phone number!');
    //     }
    // }

    if (email) {
        /* eslint-disable no-useless-escape */
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email,
            )
        ) {
            throw new BadRequest('Please provide a valid email!');
        }
    }

    if (email) {
        const query = { $limit: 1 };

        if (email) query.email = email;

        const userService = app.service('user');

        const user = await userService
            ._find({
                query,
                paginate: false,
            })
            .then((response) => (response && response[0] ? response[0] : null));

        if (!user) throw new NotFound('Please provide a valid email!');

        data.user = user;

        return context;
    } else {
        throw new BadRequest('Invalid Parameters');
    }
};

export default CheckEmail;
