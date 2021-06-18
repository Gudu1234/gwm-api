/**
 * CreatedBy Soumya (soumyaranjansahoo338@gmail.com) at 06-07-2020 10:15
 */

const SendAndStoreOTP = () => async (context) => {
    const { data, app } = context;

    const { email, user } = data;

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

    const storedData = await app
        .service('otp-send')
        ._find({
            query: {
                email,
                $sort: {
                    createdAt: -1,
                },
            },
        })
        .then((res) => (res.total ? res.data[0] : null));

    const { otp, expireOn } = storedData ? storedData : {};

    if (otp && expireOn && utils.isOTPExpired(expireOn)) {
        await utils.sendMail(
            email,
            'Change Password',
            `Your otp is ${otp}. It is valid for ${utils.config.otp.expireOn} minutes.`,
        );

        data.otp = otp;
    } else {
        const otp = utils.newOtp;

        await app.service('otp-send')._create({
            email,
            otp,
            expireOn: utils.newOTPExpireOn,
        });

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
