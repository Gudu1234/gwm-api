import { NotAuthenticated } from '@feathersjs/errors';

const setZoneQuery =
    (key = 'zone') =>
    (context) => {
        const { user } = context.params;

        if (!user) throw new NotAuthenticated();

        if (typeof context.params.provider === 'undefined') return context;

        if (user.zone) context.params.query[key] = user.zone;

        return context;
    };

export default setZoneQuery;
