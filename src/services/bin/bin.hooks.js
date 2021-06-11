import * as feathersAuthentication from '@feathersjs/authentication';
import Permit from '../../hooks/Permit';
import SetZone from '../user/hooks/SetZone';
import setCreatedBy from '../../hooks/setCreatedBy';
import FRequired from '../../hooks/FRequired';
import HasData from '../../utils/HasData';
import { disallow, discard, iff } from 'feathers-hooks-common';
import generateCode from '../../utils/generateCode';
import patchDeleted from '../../hooks/patchDeleted';
import setDefaultQuery from '../../hooks/setDefaultQuery';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [setDefaultQuery('status', { $ne: 0 }), SetZone()],
        get: [],
        create: [
            Permit('admin'),
            SetZone(),
            setCreatedBy(),
            FRequired(['pinCode', 'mapLink', 'address', 'street', 'landmark', 'type', 'coordinates']),
            iff(HasData('type', 2), FRequired(['parent'])),
            generateCode('bin', 'binId', 6, 'GBIN'),
        ],
        update: [disallow()],
        patch: [Permit('admin'), SetZone(), discard('binId')],
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
