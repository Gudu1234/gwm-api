/**
 * Created By Soumya(soumya@smarttersstudio.com) on 31/03/21 at 9:46 PM.
 * @description Generate code (referral code, coupon code)
 */
import { customAlphabet } from 'nanoid';

const generateCode = (serviceName, queryParam, digit, prefix) => async (context) => {
    const { app } = context;
    let code;
    let codeExists = true;

    const service = app.service(serviceName);

    let query = {};

    while (codeExists) {
        let nanoid = customAlphabet('123456789', digit);
        code = nanoid();

        query[`${queryParam}`] = `${prefix}${code}`;

        codeExists = await service
            ._find({
                query,
            })
            .then((res) => !!res.total);
    }

    context.data[`${queryParam}`] = `${prefix}${code}`;

    return context;
};

export default generateCode;
