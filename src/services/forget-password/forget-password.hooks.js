import CheckEmail from './hooks/CheckEmail';
import SendAndStoreOTP from './hooks/SendAndStoreOtp';

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [CheckEmail(), SendAndStoreOTP()],
        update: [],
        patch: [],
        remove: [],
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
};
