export default {
  clone: (value: Object) => {
    return JSON.parse(JSON.stringify(value));
  },
  rangeBetweenDays: (start: any, end: any) => {
    var stringFormat = 'YYYY/MM/DD';
    var today = new Date(start.format(stringFormat));
    var endDate = new Date(end.format(stringFormat));
    var rangeDates = endDate.getTime() - today.getTime();
    return rangeDates / (1000 * 3600 * 24) + 1;
  },
  getQueryStringParams(url: any) {
    let idx = url.indexOf('?');
    if (idx > -1) {
      let query = url.substring(idx + 1);
      return query
        ? (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce((params: any, param: any) => {
            let [key, value] = param.split('=');
            params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
            return params;
          }, {})
        : {};
    } else {
      return {};
    }
  },
};
