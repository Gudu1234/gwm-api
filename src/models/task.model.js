// task-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'task';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            worker: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
            bin: {
                type: ObjectId,
                ref: 'bin',
            },
            date: {
                type: Date,
                required: true,
            },
            status: {
                type: Number,
                enum: [
                    1, // active
                    2, // completed
                    0, // removed
                ],
                default: 1,
            },
            type: {
                type: Number,
                enum: [
                    1, // collection request
                    2, // disposal request
                ],
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
