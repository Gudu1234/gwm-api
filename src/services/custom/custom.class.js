/* eslint-disable no-unused-vars */
export const Custom = class Custom {
    constructor(options, app) {
        this.options = options || {};
        this.app = app;
    }

    async create(data, params) {
        const binService = this.app.service('bin');
        const bins = await binService._find({
            query: {
                worker: { $ne: null },
            },
            paginate: false,
        });
        for (const bin of bins) {
            await binService._patch(bin._id, {
                workerAssignedOn: bin.createdAt,
            });
        }

        return {
            message: 'success',
        };
    }
};
