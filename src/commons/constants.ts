export const PHONE_PREFIX = '+84';

export const PHONE_REGEX = /^0+[3,5,7,8,9]{1}[0-9]{1}[1-9]{1}[0-9]{6}$/;
export const NUMBER_REGEX = /^[0-9]*$/;
export const EMAIL_REGEX = /^[\w+][\w\.\-]+@[\w\-]+(\.\w{2,10})+$/;
export const PASSWORD_REGEX = /^\w{6,20}$/;

export const SECONDS_IN_DAY = 864e5;
export const DELAY_CLICK = 3e2;
export const MIN_MONEY = 1e5;
export const ZERO = '0';

export const LIMIT_MOBILE_WIDTH = 768;

export enum KeyCode {
    backSpace = 'Backspace'
}

export enum StorageKeys {
    KEY_ACCESS_TOKEN = 'KEY_ACCESS_TOKEN',
    KEY_DEVICE_TOKEN = 'KEY_DEVICE_TOKEN',
    KEY_USER_INFO = 'KEY_USER_INFO',
    KEY_SAVE_PHONE = 'KEY_SAVE_PHONE',
    KEY_SAVE_PWD = 'KEY_SAVE_PWD',
}

export enum GAEvents {
    REGISTRATION = 'registration',
}

export enum Events {
    CHANGE_TAB = 'CHANGE_TAB',
    LOGOUT = 'LOGOUT',
}

export enum ToastTypes {
    ERR = 0, //  red background
    MSG = 1, // dark blue background
    SUCCESS = 2, // green background
}

export enum PopupTypes {
    OTP = 1,
    POST_NEWS = 2,
}

export enum POSITION_TYPE {
    BO = 1, // back office
    OO_M = 2, // out of office with many agents eg: ASM
    OO_O = 3, // out of office with one agent 
}

export enum TAB_INDEX {
    INTRO = 0,
    INVESTMENT = 1,
    MANAGEMENT = 2,
    NEWS = 3,
    PROFILE = 4,
    NOTIFICATION = 5
}

export enum TYPE_TOAST {
    ERROR = 'error',
    SUCCESS = 'success',
    WARNING = 'warning',
    INFO = 'info'
}

//'radio' | 'email' | 'phone' | 'text' | 'number' | 'password' | 'date'| 'tel',
export enum TYPE_INPUT {
    TEXT = 'text',
    RADIO = 'radio',
    EMAIL = 'email',
    PHONE = 'phone',
    NUMBER = 'number',
    PASSWORD = 'password',
    DATE = 'date',
    TEL = 'tel'
}

export enum TYPE_CAPITALIZE {
    NONE = 'none',
    SENTENCES = 'sentences',
    WORDS = 'words',
    CHARACTERS = 'characters',
}

export enum TYPE_FILE {
    IMAGE = 'image',
    VIDEO = 'video',
}

export enum TYPE_STATUS_INVEST {
    PAYED = 'Đã thanh toán',
    PROCESSING = 'Đang xử lý',
    UN_PAYED = 'Chưa đến hạn',
}

export enum TYPE_TRANSFER_AMOUNT {
    NGAN_LUONG = 'nganluong',
    BANK = 'bank',
    VIMO = 'vimo'
}

export enum TYPE_TAB_HISTORY {
    IS_INVESTING = 0,
    EXPIRED = 1,
}

export enum TYPE_SIZE {
    BYTES = 'Bytes',
    KB = 'KB',
    MB = 'MB',
    GB = 'GB',
    TB = 'TB',
    PB = 'PB',
}
export const DescribePhoto = {
    noteKYC: [
        '1. Mặt trước rõ, đủ 4 góc',
        '2. Không chụp giấy tờ tuỳ thân photo, chụp thông qua màn hình thiết bị điện tử.'
    ],
    notePortrait: [
        '1. Chụp cận mặt, rõ, thẳng góc, không bị che, không chụp quá xa.',
        '2. Không chụp chân dung từ ảnh, màn hình thiết bị điện tử.'
    ]
};

export enum COLOR_TRANSACTION {
    RED = 'red',
    YELLOW = 'yellow',
    GREEN = 'green',
}

export enum STATE_VERIFY_ACC {
    VERIFIED = 'Đã xác nhận thông tin',
    WAIT = 'Chờ TienNgay xác nhận thông tin',
    NO_VERIFIED = 'Cần xác thực thông tin CMT/CCCD'
}

export enum STATE_IDENTITY {
    VERIFIED = 0,
    UN_VERIFIED = 1,
    WAIT = 2,
    RE_VERIFIED = 3
}

export enum STATUS_CONTRACT {
    EFFECT = '1',
    EXPIRE = '2'
}

export enum CHANNEL {
    ZALO = '0',
    FACEBOOK = '1',
    TIKTOK = '3',
    WEBSITE = '4',
    FRIEND = '5',
    OTHER = '6'
}

export enum GENDER {
    FEMALE = 'female',
    MALE = 'male'
}

export enum AUTH_STATE {
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    OTP = 'OTP',
    FORGOT_PWD = 'FORGOT_PWD',
}

export enum NOTIFY_STATE {
    READ = 2,
    UN_READ = 1,
}

export enum TABS_PROFILE {
    INFO_IDENTITY = 0,
    INFO_ACCOUNT = 1,
    INFO_PAYMENT = 2,
    INFO_CHANGE_PWD = 3,
    ACCOUNT_LINK = 4,
    COMMISSION = 5,
    POLICY = 6,
    INVITE_FRIEND = 7,
    USER_MANUAL = 8,
    QUESTION_ANSWER = 9
}

export enum TABS_INVEST {
    INVESTMENT = '1',
    INVEST_DETAIL = '2',
    INVEST_PACKAGE_VERIFY = '3',
    TRANSFER_BANK = '4',
}




