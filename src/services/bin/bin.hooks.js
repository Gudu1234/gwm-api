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
import search from 'feathers-mongodb-fuzzy-search';
import CheckNullQuery from '../../hooks/CheckNullQuery';
import HasDataExists from '../../utils/HasDataExists';
import SetCurrentTime from '../../hooks/SetCurrentTime';
import GetBinAddress from './hooks/GetBinAddress';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [
            setDefaultQuery('status', { $ne: 0 }),
            SetZone(),
            CheckNullQuery(['worker', 'parent']),
            search({
                fields: ['binId', 'address', 'street', 'landmark', 'pinCode'],
            }),
        ],
        get: [],
        create: [
            Permit('admin'),
            SetZone(),
            setCreatedBy(),
            FRequired(['pinCode', 'address', 'street', 'landmark', 'type', 'coordinates']),
            iff(HasData('type', 2), FRequired(['parent'])),
            generateCode('bin', 'binId', 6, 'GBIN'),
            iff(HasDataExists('worker'), SetCurrentTime('workerAssignedOn')),
        ],
        update: [disallow()],
        patch: [
            Permit('admin'),
            SetZone(),
            discard('binId'),
            iff(HasDataExists('worker'), SetCurrentTime('workerAssignedOn')),
        ],
        remove: [Permit('admin'), patchDeleted()],
    },

    after: {
        all: [],
        find: [],
        get: [GetBinAddress()],
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
