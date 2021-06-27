// contact-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'contact';
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
            pinCode: {
                type: String,
                required: true,
            },
            zone: {
                type: ObjectId,
                ref: 'zone',
                required: true,
            },
            ratings: {
                type: Number,
                default: null,
            },
            attachments: {
                type: [String],
                default: null,
            },
            mapLink: {
                type: String,
                default: null,
            },
            binCode: {
                type: String,
                default: null,
            },
            feedbackType: {
                type: Number,
                enum: [
                    1, // feedback
                    2, // suggestion
                    3, // complaint
                ],
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            status: {
                type: Number,
                enum: [
                    1, // active
                    2, // resolved
                    3, // inspected
                    0, // removed
                ],
                default: 1,
            },
        },
        {
            timestamps: true,
        },
    );

    schema.index({
        coordinates: '2dsphere',
    });

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);
}
