/* eslint-disable no-unused-vars */
import { BadRequest } from '@feathersjs/errors';
import { makeCallingParams } from 'feathers-hooks-common';

export const ResetPassword = class ResetPassword {
    constructor(options, app) {
        this.options = options || {};
        this.app = app;
    }

    async create(data) {
        const { token, newPassword, confirmPassword } = data;

        if (newPassword !== confirmPassword) throw new BadRequest('Passwords must match.');

        const user = await this.app
            .service('user')
            ._find({
                query: {
                    passwordResetToken: token,
                },
                paginate: false,
            })
            .then((response) => (response && response[0] ? response[0] : null));

        if (user) {
            const utils = this.app.get('utils');

            if (!utils.isOTPExpired(user.passwordResetTokenExpiry))
                throw new BadRequest('Password Reset token is expired.');

            await this.app.service('user').patch(
                user._id,
                {
                    password: newPassword,
                    passwordResetToken: null,
                    passwordResetTokenExpiry: null,
                },
                makeCallingParams(
                    {},
                    {},
                    {},
                    {
                        provider: undefined,
                        user: user,
                    },
                ),
            );

            return { message: 'Password Reset Successfully.' };
        } else {
            throw new BadRequest('Password Reset token is expired.');
        }
    }
};
