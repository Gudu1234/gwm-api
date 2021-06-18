/* eslint-disable no-unused-vars */
export const VerifyPasswordOtp = class VerifyPasswordOtp {
    constructor(options, app) {
        this.options = options || {};
        this.app = app;
    }

    async create(data) {
        try {
            const { otp, email } = data;

            if (!otp)
                return {
                    result: false,
                    code: 400,
                    message: 'OTP is required.',
                };

            let query = {};
            let target;

            if (email) {
                if (
                    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                        email,
                    )
                ) {
                    return {
                        result: false,
                        code: 400,
                        message: 'Invalid Email Id.',
                    };
                }
                query = { email };
                target = email;
            } else {
                return {
                    result: false,
                    code: 400,
                    message: 'Email is required.',
                };
            }

            /**
             * @type {Utils}
             */

            const utils = this.app.get('utils');

            const isOtpVerified = await utils.verifyOtp(target, otp);

            if (isOtpVerified.status) {
                const user = await this.app
                    .service('user')
                    ._find({
                        query,
                        paginate: false,
                    })
                    .then((response) => (response && response[0] ? response[0] : null));

                utils.removeOTPFromRedis(target);

                if (user) {
                    await this.app.service('user')._patch(user._id, {
                        passwordResetTokenExpiry: utils.newOTPExpireOn,
                    });

                    return { accessToken: user.passwordResetToken };
                } else {
                    return {
                        result: false,
                        code: 400,
                        message: 'User is not found.',
                    };
                }
            } else {
                return {
                    result: false,
                    code: 400,
                    message: isOtpVerified.message,
                };
            }
        } catch (e) {
            return {
                result: false,
                code: 400,
                message: e.message,
            };
        }
    }
};
