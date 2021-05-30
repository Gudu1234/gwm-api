// request-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'request';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            name: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            reqId: {
                type: String,
                required: true,
            },
            pinCode: {
                type: String,
                required: true,
            },
            zone: {
                type: ObjectId,
                ref: 'zone',
                required: true,
            },
            mc: {
                type: String,
                required: true,
            },
            mapLink: {
                type: String,
                default: null,
            },
            address: {
                type: String,
                required: true,
            },
            street: {
                type: String,
                required: true,
            },
            landmark: {
                type: String,
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            status: {
                type: Number,
                enum: [
                    1, // requested
                    2, // inspected
                    3, // completed
                    0, // removed
                ],
                default: 1,
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
