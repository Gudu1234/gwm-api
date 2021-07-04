import * as feathersAuthentication from '@feathersjs/authentication';
import { disallow, iff } from 'feathers-hooks-common';
import IsUser from '../../utils/IsUser';
import setCreatedByQuery from '../../hooks/setCreatedByQuery';
import Permit from '../../hooks/Permit';
import patchDeleted from '../../hooks/patchDeleted';
import setDefaultQuery from '../../hooks/setDefaultQuery';
import CheckRequestAlreadyExist from './hooks/CheckRequestAlreadyExist';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [setDefaultQuery('status', { $ne: 0 }), iff(IsUser('cleaner', 'driver'), setCreatedByQuery('worker'))],
        get: [disallow()],
        create: [Permit('cleaner', 'admin'), CheckRequestAlreadyExist()],
        update: [disallow()],
        patch: [iff(IsUser('cleaner', 'driver'), setCreatedByQuery('worker'))],
        remove: [Permit('admin'), patchDeleted()],
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
