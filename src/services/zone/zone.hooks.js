import setDefaultQuery from '../../hooks/setDefaultQuery';
import { disallow } from 'feathers-hooks-common';
import Permit from '../../hooks/Permit';
import patchDeleted from '../../hooks/patchDeleted';
import * as feathersAuth from '@feathersjs/authentication';

const { authenticate } = feathersAuth.hooks;

export default {
    before: {
        all: [],
        find: [setDefaultQuery('status', 1)],
        get: [],
        create: [authenticate('jwt'), Permit('system-admin')],
        update: [disallow()],
        patch: [authenticate('jwt'), Permit('system-admin')],
        remove: [authenticate('jwt'), Permit('system-admin'), patchDeleted()],
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
