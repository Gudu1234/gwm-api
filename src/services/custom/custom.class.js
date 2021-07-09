/* eslint-disable no-unused-vars */
export const Custom = class Custom {
    constructor(options, app) {
        this.options = options || {};
        this.app = app;
    }

    async create(data, params) {
        await this.app.service('dashboard')._create();

        return {
            message: 'success',
        };
    }
};
