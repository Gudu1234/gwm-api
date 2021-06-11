import * as feathersAuthentication from '@feathersjs/authentication';
import FRequired from '../../hooks/FRequired';
import GetZoneFromPin from '../contact/hooks/GetZoneFromPin';
import Permit from '../../hooks/Permit';
import { disallow, iff } from 'feathers-hooks-common';
import IsUser from '../../utils/IsUser';
import setZoneQuery from '../../hooks/setZoneQuery';
import setDefaultQuery from '../../hooks/setDefaultQuery';
import HasQuery from '../../utils/HasQuery';
import patchDeleted from '../../hooks/patchDeleted';
import generateCode from '../../utils/generateCode';
import search from 'feathers-mongodb-fuzzy-search';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [],
        find: [
            authenticate('jwt'),
            Permit('admin', 'system-admin'),
            iff(IsUser('admin'), setZoneQuery()),
            setDefaultQuery('status', { $ne: 0 }),
            iff(HasQuery('status', 3), setDefaultQuery('$sort', { updatedAt: -1 })),
            search({
                fields: ['name', 'pinCode', 'phone', 'street', 'reqId'],
            }),
        ],
        get: [],
        create: [
            FRequired(['name', 'phone', 'email', 'pinCode', 'mc', 'address', 'street', 'landmark', 'message']),
            GetZoneFromPin(),
            generateCode('request', 'reqId', 6, 'REQ'),
        ],
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
