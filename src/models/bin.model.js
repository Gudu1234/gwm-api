// bin-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'bin';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            createdBy: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
            binId: {
                type: String,
                required: true,
            },
            zone: {
                type: ObjectId,
                ref: 'zone',
                required: true,
            },
            pinCode: {
                type: String,
                required: true,
            },
            mapLink: {
                type: String,
                // required: true,
            },
            address: {
                type: String,
            },
            street: {
                type: String,
                required: true,
            },
            landmark: {
                type: String,
                required: true,
            },
            type: {
                type: Number,
                enum: [
                    1, // parent
                    2, // child
                ],
                required: true,
            },
            parent: {
                type: ObjectId,
                ref: 'bin',
            },
            coordinates: {
                type: [Number],
                required: true,
            },
            worker: {
                type: ObjectId,
                ref: 'user',
                default: null,
            },
            status: {
                type: Number,
                enum: [
                    1, // active
                    2, // under-maintenance
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
