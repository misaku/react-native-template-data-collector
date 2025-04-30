import * as JSON5 from 'json5';

export const formatJson = (data: any) => {
  Object.keys(data).forEach((key) => {
    let dataValue = data[key].trim();
    if (dataValue.toUpperCase() === 'TRUE') {
      dataValue = true;
    } else if (dataValue.toUpperCase() === 'FALSE') {
      dataValue = false;
    } else if (Array.isArray(dataValue)) {
      dataValue = dataValue.map(formatJson);
    }
    // eslint-disable-next-line no-param-reassign
    data[key] = dataValue;
  });
  return data;
};
export const parseJson: (data: string) => any = (data: string) => {
  try {
    return JSON5.parse(data);
  } catch (e) {
    const parsedData = JSON5.parse(
      data.replace(
        /(['"])?(([a-z0-9A-Z_]+\s+[a-z0-9A-Z_]+)|([a-z0-9A-Z_]+))(['"])?/g,
        '"$2"',
      ),
    );
    if (typeof parsedData === 'object') {
      return formatJson(parsedData);
    }
  }
  throw new Error('Invalid parse JSON');
};
