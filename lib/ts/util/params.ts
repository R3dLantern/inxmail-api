import { formatTimestamp } from "./date-time";

/**
 * embedResponseStatistics => inx:response-statistics
 */
function toInxEmbedded(param: string) {
  if (!param.startsWith('embed')) {
    throw new Error(`${param} is probably not a valid embeddable statement`);
  }
  return 'inx:' + param
    .replace(/embed/g, '')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .substring(1);
}

export function transformParameters(params?: any): URLSearchParams {
  const result = new URLSearchParams();
  Object.keys(params || {}).forEach((key: string) => {
    if (key.startsWith('embed') && params[key]) {
      result.append('embedded', toInxEmbedded(key));
    } else {
      result.append(key, params[key] instanceof Date ? formatTimestamp(params[key]): params[key]);
    }
  });
  return result;
}