import { getItems, replaceItems } from 'feathers-hooks-common';

const setData = (fieldName, defaultValue) => (context) => {
    const items = getItems(context);

    if (Array.isArray(items)) {
        items.forEach((item) => {
            item[fieldName] = defaultValue;
        });
    } else {
        items[fieldName] = defaultValue;
    }

    replaceItems(context, items);

    return context;
};

export default setData;
