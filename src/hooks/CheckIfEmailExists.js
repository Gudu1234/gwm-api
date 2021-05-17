/**
 * Created By Soumya (soumyaranjansahoo338@gmail.com) on 12/3/2020 at 12:35 AM
 */
import { FeathersError } from '@feathersjs/errors';

const CheckIfEmailExists = () => async (context) => {
    const { data, app } = context;

    const { email } = data;

    const userData = await app
        .service('v1/user')
        ._find({
            query: {
                email,
                active: true,
            },
            paginate: false,
        })
        .then((res) => (res.length ? res[0] : null));

    if (!userData) {
        throw new FeathersError('First Create an Account.', 'TooEarly', 425, '', undefined);
    }
};

export default CheckIfEmailExists;
