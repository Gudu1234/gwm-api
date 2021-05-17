/**
 * Created By Soumya (soumyaranjansahoo338@gmail.com) on 9/13/2020 at 8:57 PM
 */
export default {
    async sendRideNotification(app, result, params) {
        let text = '';
        let action = '';
        let notifiedUser;
        const { status, passenger, driver, code } = result;

        if (status === 1) {
            text = `${passenger.displayName} has requested you for a ride.`;
            action = 'rideCreated';
            notifiedUser = driver._id;
        } else if (status === 2) {
            text = `${passenger.displayName} has cancelled the request for the ride ${code}.`;
            action = 'rideCancelled';
            notifiedUser = driver._id;
        } else if (status === 3) {
            text = `${driver.displayName} has cancelled your request for the ride ${code}.`;
            action = 'rideCancelled';
            notifiedUser = passenger._id;
        } else if (status === 4) {
            text = `${driver.displayName} has accepted your request for the ride ${code}.`;
            notifiedUser = passenger._id;
            action = 'rideAccepted';
        } else if (status === 5) {
            text = `${driver.displayName} has rejected your request for the ride ${code}.`;
            notifiedUser = passenger._id;
            action = 'rideRejected';
        } else if (status === 7) {
            if (params.user._id.toString() === passenger._id.toString()) {
                notifiedUser = driver._id;
            } else {
                notifiedUser = passenger._id;
            }
            text = `Your ride ${code} has been started.`;
            action = 'rideStarted';
        } else if (status === 8) {
            if (params.user._id.toString() === passenger._id.toString()) {
                notifiedUser = driver._id;
            } else {
                notifiedUser = passenger._id;
            }
            text = `Your ride ${code} has been ended.`;
            action = 'rideEnded';
        }

        const notificationData = {
            text,
            action,
            notifiedUser,
            entityType: 'ride',
            entityId: result._id,
        };

        await app.service('v1/notification').create(notificationData, {
            user: params.user,
        });
    },

    async sendRedeemNotification(app, result, params) {
        const { createdBy: notifiedUser, status, amount, wallet } = result;
        const { user } = params;

        let text = '';
        let action = '';

        switch (status) {
            case 2:
                text = `Your redeem request for $ ${amount} has been approved.`;
                action = 'redeemRequestApprove';
                break;
            case 3:
                text = `Your redeem request for $ ${amount} has been rejected.`;
                action = 'redeemRequestReject';
                break;
            case 4:
                text = `$ ${amount} has been credited to your account as per your redeem request.`;
                action = 'redeemRequestCredit';
                break;
        }

        const notificationData = {
            notifiedUser,
            entityType: 'wallet',
            entityId: wallet,
            text,
            action,
        };

        await app.service('v1/notification').create(notificationData, {
            user,
        });
    },

    async sendPollingNotification(app, result, data, params) {
        const { status } = data;
        const { user: notifiedUser, ride } = result;
        let text = '';
        let action = '';

        const { code, passenger } = await app.service('v1/ride')._get(ride, {
            query: {
                $populate: 'passenger',
            },
        });

        if (status === 2) {
            action = 'carPoolingConnected';
            text = `You have connected with the ride ${code} by ${passenger.displayName}`;
        } else if (status === 1) {
            action = 'carPoolingInvited';
            text = `You have invited to the ride ${code} by ${passenger.displayName}`;
        }

        const notificationData = {
            notifiedUser,
            entityType: 'ride',
            entityId: ride,
            text,
            action,
        };

        await app.service('v1/notification').create(notificationData, {
            user: params.user,
        });
    },
};
