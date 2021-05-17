/**
 * Created By Soumya (soumyaranjansahoo338@gmail.com) on 8/24/2020 at 4:53 PM
 */

/**
 *
 * @return {function(*): boolean}
 * @constructor
 */
const HasAccessToken = () => (context) => {
    const { params } = context;

    const { authentication } = params;

    return authentication !== undefined;
};

export default HasAccessToken;
