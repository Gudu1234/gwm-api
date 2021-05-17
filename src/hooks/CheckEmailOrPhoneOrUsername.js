/**
 * Created by Soumya (soumyaranjansahoo338@gmail.com) on 7/30/2020 at 12:32 AM
 * @description check for unique email address or phone number
 */
import { BadRequest } from '@feathersjs/errors';

const CheckEmailOrPhoneOrUsername = () => async (context) => {
    const { data, app } = context;
    const { email, phone, username } = data;

    if (username) {
        const userData = await app
            .service('user')
            ._find({
                query: {
                    username,
                },
            })
            .then((res) => (res.total === 1 ? res.data[0] : null));

        if (userData) throw new BadRequest('Username Already Exists.');
    }

    if (email) {
        if (email.toString().trim() === '') throw new BadRequest('Invalid Email ID.');

        if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email,
            )
        ) {
            throw new BadRequest('Please provide a valid email!');
        }

        const userData = await app
            .service('user')
            ._find({
                query: {
                    email: email,
                },
            })
            .then((res) => (res.total === 1 ? res.data[0] : null));

        if (userData) throw new BadRequest('Email Value Already Exists.');
    }

    if (phone) {
        if (phone.toString().trim() === '') throw new BadRequest('Invalid Phone Number.');

        if (!/^[0][1-9]\d{9}$|^[1-9]\d{9}$/.test(phone)) {
            throw new BadRequest('Please provide a valid phone number!');
        }

        const userData = await app
            .service('user')
            ._find({
                query: {
                    phone: phone,
                },
            })
            .then((res) => (res.total === 1 ? res.data[0] : null));

        if (userData) throw new BadRequest('Phone Number Already Exists.');
    }

    return context;
};

export default CheckEmailOrPhoneOrUsername;
