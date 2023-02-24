import Moment from 'moment';

const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY';
const FULL_DATE_FORMAT_MM_BEFORE = 'MM/DD/YYYY';
const FULL_DATE_FORMAT = 'DD/MM/YYYY HH:mm';

function getQuarter(date = new Date()) {
    return Math.floor(date.getMonth() / 3 + 1);
}

function getYear(date = new Date()) {
    return date.getFullYear();
}
function getCurrentTime(date = new Date()) {
    return date.getTime();
}

function formatDatePicker(date: number) { return Moment(date * 1000).utc(true).format(FULL_DATE_FORMAT); }

function getDateFormat(date: number = 0, format: string = DEFAULT_DATE_FORMAT) {
    return Moment(date * 1000).utc(true).format(format);
}

export default {
    getQuarter,
    getYear,
    getCurrentTime,
    getDateFormat,
    formatDatePicker
};
