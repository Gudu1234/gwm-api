/* eslint-disable no-unused-vars */
export const ForgetPassword = class ForgetPassword {
    constructor(options) {
        this.options = options || {};
    }

    async create(data, params) {
        const { email, otp } = data;
        return {
            message: 'OTP has been sent to your email.',
        };
    }
};
