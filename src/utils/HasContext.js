/**
 * Created By Soumya (soumyaranjansahoo338@gmail.com) on 8/24/2020 at 4:53 PM
 */

/**
 *
 * @return {function(*): boolean}
 * @constructor
 */
const HasContext = (name, value) => (context) => {
    const { params } = context;

    if (!params) return false;

    const { query } = params;

    if (!query) return false;

    return context[name] === value;
};

export default HasContext;
