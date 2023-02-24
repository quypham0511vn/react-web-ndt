import CalendarLocale from 'rc-picker/es/locale/vi_VN';
import TimePickerLocale from 'antd/es/date-picker/locale/vi_VN';

export const vi_locale = {
    lang: Object.assign({
        placeholder: 'Chọn thời điểm',
        rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc'],
        shortWeekDays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        shortMonths: [
            'Thg 1',
            'Thg 2',
            'Thg 3',
            'Thg 4',
            'Thg 5',
            'Thg 6',
            'Thg 7',
            'Thg 8',
            'Thg 9',
            'Thg 10',
            'Thg 11',
            'Thg 12'
        ]
    }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale)
} as any;
