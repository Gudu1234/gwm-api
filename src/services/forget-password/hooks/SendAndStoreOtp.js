/**
 * CreatedBy Soumya (soumyaranjansahoo338@gmail.com) at 06-07-2020 10:15
 */

const SendAndStoreOTP = () => async (context) => {
    const { data, app } = context;

    const { email, user } = data;

    const RedisClient = app.get('RedisClient');

    /**
     * @type {Utils}
     */
    const utils = app.get('utils');

    const token = await app.service('authentication').createAccessToken({
        sub: user._id,
    });

    await app.service('user')._patch(user._id, {
        passwordResetToken: token,
        passwordResetTokenExpiry: utils.newOTPExpireOn,
    });

    const storedData = await RedisClient.getAsync(`otp:${email}`);

    const { otp, expireOn } = storedData ? JSON.parse(storedData) : {};

    if (otp && expireOn && utils.isOTPExpired(expireOn)) {
        await utils.sendMail(
            email,
            'Change Password',
            `Your otp is ${otp}. It is valid for ${utils.config.otp.expireOn} minutes.`,
        );

        data.otp = otp;
    } else {
        const otp = utils.newOtp;

        utils.setNewOTPtoRedis(email, otp);

        await utils.sendMail(
            email,
            'Change Password',
            `Your otp is ${otp}. It is valid for ${utils.config.otp.expireOn} minutes.`,
        );

        data.otp = otp;
    }

    return context;
};

export default SendAndStoreOTP;
