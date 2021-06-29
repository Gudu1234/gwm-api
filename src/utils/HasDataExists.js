/**
 *
 * @returns {function(*): boolean}
 * @constructor
 * @param name
 * @param values
 */
const HasDataExists = (name) => (context) => {
    const { data } = context;

    const value = data[name];

    return typeof value !== 'undefined';
};

export default HasDataExists;
