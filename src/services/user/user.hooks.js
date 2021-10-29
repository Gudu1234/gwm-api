import * as feathersAuth from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import FRequired from '../../hooks/FRequired';
import { disallow, discard, iff, isProvider } from 'feathers-hooks-common';
import CheckEmailOrPhoneOrUsername from '../../hooks/CheckEmailOrPhoneOrUsername';
import HasData from '../../utils/HasData';
import Permit from '../../hooks/Permit';
import SetZone from './hooks/SetZone';
import ModuleValidateData from '../../hooks/ModuleValidateData';
import setDefaultQuery from '../../hooks/setDefaultQuery';
import CheckForUser from './hooks/CheckForUser';
import patchDeleted from '../../hooks/patchDeleted';
import IsUser from '../../utils/IsUser';
import setId from '../../hooks/setId';
import search from 'feathers-mongodb-fuzzy-search';
import generateCode from '../../utils/generateCode';
import HasDataExists from '../../utils/HasDataExists';
import SetCurrentTime from '../../hooks/SetCurrentTime';
import CheckNullQuery from '../../hooks/CheckNullQuery';
import GetCurrentUserDetails from './hooks/GetCurrentUserDetails';

const { authenticate } = feathersAuth.hooks;
const { hashPassword, protect } = local.hooks;

export default {
    before: {
        all: [],
        find: [
            authenticate('jwt'),
            setDefaultQuery('status', 1),
            iff(isProvider('external'), SetZone()),
            CheckNullQuery('coordinatesUpdatedAt'),
            search({
                fields: ['name', 'username', 'phone', 'address.street'],
            }),
        ],
        get: [authenticate('jwt'), setDefaultQuery('status', 1)],
        create: [
            hashPassword('password'),
            FRequired(['name', 'email', 'phone', 'password', 'role', 'avatar', 'address']),
            iff(HasData('role', 1, 2), authenticate('jwt'), Permit('admin'), SetZone()),
            iff(
                HasData('role', 3),
                authenticate('jwt'),
                Permit('system-admin'),
                FRequired('zone'),
                ModuleValidateData('zone', 'zone'),
            ),
            iff(HasData('role', 4), disallow()),
            CheckEmailOrPhoneOrUsername(),
            discard('status'),
            iff(HasData('role', 1), generateCode('user', 'username', 4, 'GWMC')),
            iff(HasData('role', 2), generateCode('user', 'username', 4, 'GWMD')),
            iff(HasData('role', 3), generateCode('user', 'username', 4, 'GWMA')),
        ],
        update: [disallow()],
        patch: [
            hashPassword('password'),
            authenticate('jwt'),
            GetCurrentUserDetails(),
            discard('role'),
            iff(IsUser('cleaner', 'driver'), setId(), discard('zone', 'status', 'userStatus', 'userWorkType')),
            iff(IsUser('admin'), CheckForUser()),
            iff(HasDataExists('coordinates'), SetCurrentTime('coordinatesUpdatedAt')),
        ],
        remove: [authenticate('jwt'), Permit('admin', 'system-admin'), CheckForUser(), patchDeleted()],
    },

    after: {
        all: [protect('password')],
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
