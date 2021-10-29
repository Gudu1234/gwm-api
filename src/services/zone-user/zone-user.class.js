/* eslint-disable no-unused-vars */
export const ZoneUser = class ZoneUser {
    constructor(options, app) {
        this.options = options || {};
        this.app = app;
    }

    async find(params) {
        const { query } = params;

        const { zoneId } = query;

        // Get all users from the zone and send it in response
        return await this.app.service('user')._find({
            query: {
                zone: zoneId,
            },
            paginate: false,
        });
    }
};
