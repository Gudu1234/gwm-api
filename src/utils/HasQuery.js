/**
 *
 * @returns {function(*): boolean}
 * @constructor
 * @param name
 * @param value
 */
const HasQuery = (name, value) => (context) => {
    const { params } = context;

    if (!params) return false;

    const { query } = params;

    if (!query) return false;

    return query[name] === value;
};

export default HasQuery;
