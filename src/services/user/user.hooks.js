import * as feathersAuth from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import FRequired from '../../hooks/FRequired';
import {disallow, discard, iff, isProvider} from 'feathers-hooks-common';
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

const { authenticate } = feathersAuth.hooks;
const { hashPassword, protect } = local.hooks;

export default {
    before: {
        all: [],
        find: [authenticate('jwt'), setDefaultQuery('status', 1), iff(isProvider('external'), SetZone())],
        get: [authenticate('jwt'), setDefaultQuery('status', 1)],
        create: [
            hashPassword('password'),
            FRequired(['name', 'email', 'phone', 'username', 'password', 'role', 'avatar', 'address']),
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
        ],
        update: [disallow()],
        patch: [
            hashPassword('password'),
            authenticate('jwt'),
            discard('role'),
            iff(IsUser('cleaner', 'driver'), setId(), discard('zone', 'status', 'userStatus', 'userWorkType')),
            iff(IsUser('admin'), CheckForUser()),
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
