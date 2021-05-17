import * as feathersAuthentication from '@feathersjs/authentication';
import { disallow, iff } from 'feathers-hooks-common';
import FRequired from '../../hooks/FRequired';
import Permit from '../../hooks/Permit';
import IsUser from '../../utils/IsUser';
import setZoneQuery from '../../hooks/setZoneQuery';
import patchDeleted from '../../hooks/patchDeleted';
import setDefaultQuery from '../../hooks/setDefaultQuery';
import HasQuery from '../../utils/HasQuery';
import GetZoneFromPin from './hooks/GetZoneFromPin';
import FRequiredQuery from '../../hooks/FRequiredQuery';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [],
        find: [
            authenticate('jwt'),
            Permit('admin', 'system-admin'),
            FRequiredQuery(['feedbackType']),
            iff(IsUser('admin'), setZoneQuery()),
            setDefaultQuery('status', { $ne: 0 }),
            iff(HasQuery('status', 2), setDefaultQuery('$sort', { updatedAt: -1 })),
        ],
        get: [],
        create: [FRequired(['name', 'phone', 'pinCode', 'feedbackType', 'message']), GetZoneFromPin()],
        update: [disallow()],
        patch: [authenticate('jwt'), Permit('admin', 'system-admin'), iff(IsUser('admin'), setZoneQuery())],
        remove: [
            authenticate('jwt'),
            Permit('admin', 'system-admin'),
            iff(IsUser('admin'), setZoneQuery()),
            patchDeleted(),
        ],
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
