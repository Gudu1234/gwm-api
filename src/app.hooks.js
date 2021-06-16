// Application hooks that run for every service

import { iff, isProvider } from 'feathers-hooks-common';

export default {
    before: {
        all: [],
        find: [
            iff(isProvider('external'), (ctx) => {
                const { params } = ctx;
                let {
                    query: { $limit },
                } = params;
                if (typeof $limit === 'string') $limit = parseInt($limit);
                if ($limit === -1) {
                    delete ctx.params.query.$limit;
                    ctx.params.paginate = false;
                }
            }),
        ],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
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
