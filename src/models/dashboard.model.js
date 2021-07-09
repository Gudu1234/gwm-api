// dashboard-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'dashboard';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            requests: {
                number: {
                    type: Number,
                },
                updatedAt: {
                    type: Date,
                },
            },
            mails: {
                number: {
                    type: Number,
                },
                updatedAt: {
                    type: Date,
                },
            },
        },
        {
            timestamps: true,
        },
    );

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);
}
