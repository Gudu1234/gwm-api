/**
 * Created by Soumya (soumyaranjansahoo338@gmail.com) on 8/10/2020 at 10:59 PM
 */
import { makeCallingParams } from 'feathers-hooks-common';
import moment from 'moment';

export default {
    /**
     * Check if any user account is present with provided emailId
     * @param email
     * @param app
     * @returns {Promise<T>}
     */
    async checkUserAccount(email, app) {
        return await app
            .service('v1/user')
            ._find({
                query: {
                    email: email,
                },
            })
            .then((res) => (res.total === 1 ? res.data[0] : null));
    },

    async checkUserAccountPhone(phone, app) {
        return await app
            .service('v1/user')
            ._find({
                query: {
                    phone: phone,
                },
            })
            .then((res) => (res.total === 1 ? res.data[0] : null));
    },
    /**
     * Sign up a user
     * @param userObj
     * @param app
     * @returns {Promise<userObj>}
     */
    async createUserAccount(userObj, app) {
        return app.service('v1/user').create(userObj);
    },

    /**
     * Generate AccessToken for the user
     * @param user
     * @param app
     * @returns {Promise<{accessToken: *, user: *}>}
     */
    async generateToken(user, app) {
        const accessToken = await app.service('authentication').createAccessToken({ sub: user._id });

        const userId = user._id;
        const RedisClient = app.get('RedisClient');
        RedisClient.set(`token:${accessToken}`, JSON.stringify({ userId }));

        return { accessToken, user };
    },

    /**
     * Patch coordinates if the user exists
     * @param user
     * @param coordinates
     * @param app
     * @returns {Promise<{accessToken: *, user: *}>}
     */
    async patchUserCoordinates(user, coordinates, app) {
        user = await app.service('v1/user')._patch(
            user._id,
            {
                coordinates: coordinates,
            },
            {
                query: {
                    $populate: ['passengerSettings', 'driverSettings'],
                },
            },
        );
        return await this.generateToken(user, app);
    },

    /**
     * Check if the corresponding user-login exists
     * @param user
     * @param deviceId
     * @param app
     * @returns {Promise<void>}
     */
    async checkUserLogin(user, deviceId, app) {
        const userLogin = await app
            .service('v1/user-login')
            ._find({
                query: {
                    createdBy: user._id,
                    deviceId: deviceId,
                    active: true,
                },
            })
            .then((res) => (res.total === 1 ? res.data[0] : null));

        if (userLogin) {
            return await app.service('v1/user-login').patch(
                userLogin._id,
                {
                    active: false,
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
        } else {
            return null;
        }
    },

    /**
     * Create an entry for corresponding user-login
     * @param result
     * @param data
     * @param app
     * @returns {Promise<void>}
     */
    async createUserLogin(result, data, app) {
        const { user, accessToken } = result;
        const { loginType, fcmId, deviceId, deviceType, deviceName, ip, coordinates, socialLoginId } = data;

        return await app.service('v1/user-login').create(
            {
                type: loginType,
                fcmId,
                deviceId,
                deviceType,
                deviceName,
                ip,
                coordinates,
                socialLoginId: socialLoginId ? socialLoginId : '',
                accessToken,
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
    },

    /**
     *
     * @param dateOfBirth
     * @returns {{verified: boolean}|{verified: boolean, message: string}}
     */

    checkDOB(dateOfBirth) {
        const years = moment().diff(moment(dateOfBirth, 'YYYY-MM-DD'), 'years');

        if (years >= 18) {
            return {
                verified: true,
            };
        } else {
            return {
                verified: false,
                message: 'You are below 18 years.',
            };
        }
    },
};
