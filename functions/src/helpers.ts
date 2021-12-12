import axios, { AxiosResponseTransformer } from "axios";

const ISO_8601 =
    /^(?:[1-9]\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29)T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,9})?(?:Z|[+-][01]\d:[0-5]\d)$/;

function parseDate(item: any) {
    // Parse all date strings to Date objects.
    Object.keys(item).forEach((k) => {
        if (ISO_8601.test(item[k])) {
            item[k] = new Date(Date.parse(item[k]));
        }
    });
}

const transformResponse = (axios.defaults.transformResponse as AxiosResponseTransformer[]).concat((data) => {
    parseDate(data);
    // Array.isArray(data) ? data.forEach(parseDate) : parseDate(data);
    if (Array.isArray(data)) {
        data.forEach(parseDate);
    } else {
        parseDate(data);
    }

    return data;
});

export { transformResponse };
