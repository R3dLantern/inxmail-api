import moment from 'moment';

const FORMAT_DATETIME = 'YYYY-MM-DD[T]hh:mm:ss[Z]';
const FORMAT_DATE = 'YYYY-MM-DD';
const FORMAT_TIME = 'hh:mm:ss';

function _format(date: Date | moment.Moment, fmt: string): string {
  return (date instanceof Date ? moment(date) : date).format(fmt);
}

function parseTimestamp(stamp: string): Date {
  return moment(stamp, FORMAT_DATETIME).toDate();
}

function formatTimestamp(date: Date | moment.Moment): string {
  return _format(date, FORMAT_DATETIME);
}

function formatDate(date: Date | moment.Moment): string {
  return _format(date, FORMAT_DATE);
}

function formatTime(date: Date | moment.Moment): string {
  return _format(date, FORMAT_TIME);
}

export {
  FORMAT_DATETIME,
  FORMAT_DATE,
  FORMAT_TIME,
  parseTimestamp,
  formatTimestamp,
  formatDate,
  formatTime,
}
