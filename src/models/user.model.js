// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'user';
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
            username: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
            avatar: {
                type: String,
                required: true,
            },
            address: {
                type: {
                    addressLine: {
                        type: String,
                        required: true,
                    },
                    street: {
                        type: String,
                        required: true,
                    },
                    landmark: {
                        type: String,
                    },
                    pinCode: {
                        type: String,
                        required: true,
                    },
                },
                default: null,
            },
            zone: {
                type: ObjectId,
                ref: 'zone',
                default: null,
            },
            role: {
                type: Number,
                enum: [
                    1, // cleaner
                    2, // driver
                    3, // admin
                    4, // system-admin
                ],
                required: true,
            },
            status: {
                type: Number,
                enum: [
                    1, // active
                    2, // blocked
                    0, // deleted
                ],
                default: 1,
            },
            userStatus: {
                type: Number,
                enum: [
                    1, // present
                    2, // absent
                ],
                default: 1,
            },
            userWorkType: {
                type: Number,
                enum: [
                    1, // cleaning task
                    2, // disposal task
                    3, // helping task
                ],
            },
            gender: {
                type: Number,
                enum: [
                    1, // male
                    2, // female
                    3, // others
                ],
            },
            fcmId: {
                type: String,
                default: '',
            },
            passwordResetToken: {
                type: String,
            },
            passwordResetTokenExpiry: {
                type: Date,
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
