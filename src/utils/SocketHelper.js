/**
 * Created by Soumya (soumyaranjansahoo338@gmail.com) on 1/26/2021 at 3:31 PM
 */

export default {
    async publishRideEvent(app, data, context) {
        const { method, path } = context;
        const {
            driver: { _id: driverId },
            passenger: { _id: passengerId },
        } = data;
        let users = [];
        let ride = null;
        users.push(driverId.toString(), passengerId.toString());

        const { publicSharing, feedbackByPassenger, feedbackByDriver } = context.data;

        if (typeof publicSharing === 'undefined' || !feedbackByPassenger || !feedbackByDriver) {
            if (path === 'v1/ride') {
                ride = data._id;
            } else if (path === 'v1/ride-extension') {
                ride = data.ride;
            }

            if (method === 'patch') {
                const carPoolingUsers = await app
                    .service('v1/car-pooling')
                    ._find({
                        query: {
                            ride,
                            status: { $in: [2, 3] },
                        },
                        paginate: false,
                    })
                    .then((res) => res.map((each) => each.user.toString()));

                if (carPoolingUsers.length) {
                    carPoolingUsers.forEach((each) => users.push(each));
                }
            }
            try {
                const channel = app.channel('authenticated').filter((connection) => {
                    const user = connection.me.user;
                    if (context.path === 'v1/ride') {
                        const {
                            data: { couponsForPassenger, couponsForDriver },
                        } = context;
                        if (driverId.toString() === user._id.toString()) data.coupons = couponsForDriver;
                        else if (passengerId.toString() === user._id.toString()) data.coupons = couponsForPassenger;
                    }
                    // console.log(data);
                    return users.includes(user._id.toString()) || user.role === 2 || user.role === 3;
                });
                // console.log(channel);
                return channel;
            } catch (e) {
                return e;
            }
        }
    },

    publishEmergencyEvent(app, data) {
        const {
            createdBy: { _id: userId },
        } = data;
        try {
            const channel = app.channel('authenticated').filter((connection) => {
                const user = connection.me.user;
                return userId.toString() === user._id.toString() || user.role === 2 || user.role === 3;
            });
            // console.log(channel);
            return channel;
        } catch (e) {
            return e;
        }
    },

    publishChatEvent(app, data) {
        const {
            driver: { _id: driverId },
            passenger: { _id: passengerId },
        } = data;
        try {
            const channel = app.channel('authenticated').filter((connection) => {
                const user = connection.me.user;
                return driverId.toString() === user._id.toString() || passengerId.toString() === user._id.toString();
            });
            // console.log(channel);
            return channel;
        } catch (e) {
            return e;
        }
    },

    publishPoolingEvent(app, data) {
        const { driver, user: userId, hostPassenger } = data;

        if (userId) {
            const users = [];
            users.push(driver.toString(), userId.toString(), hostPassenger.toString());
            try {
                const channel = app.channel('authenticated').filter((connection) => {
                    const user = connection.me.user;
                    return users.includes(user._id.toString());
                });
                // console.log(channel);
                return channel;
            } catch (e) {
                return e;
            }
        }
    },
};
