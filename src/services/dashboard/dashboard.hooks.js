import * as feathersAuthentication from '@feathersjs/authentication';
import GetTimeDifference from './hooks/GetTimeDifference';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },

    after: {
        all: [],
        find: [],
        get: [GetTimeDifference()],
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
