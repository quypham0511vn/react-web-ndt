// README: Should be using react native config

import config from 'config';

export enum LINKS {
    VPS = 'https://openaccount.vps.com.vn/?MKTID=H787',
    FB_FAN_PAGE = 'https://www.facebook.com/DautuTienNgay',
    STORE_ANDROID = 'https://play.google.com/store/apps/details?id=vn.tienngay.investor',
    STORE_IOS = 'https://apps.apple.com/id/app/id1563318851',
    AQ_INVESTOR = 'https://tienngay.vn/template/hoidap',
    POLICY_INVESTOR = 'https://tienngay.vn/template/dieukhoansudung',
    MANUAL_INVESTOR = 'https://tienngay.vn/template/thongtinapp',
    LUCKY_LOTT_ANDROID = 'https://play.google.com/store/apps/details?id=com.luckylott.store',
    LUCKY_LOTT_IOS = 'https://apps.apple.com/vn/app/luckylott/id1518746631',
    ONE_LINK = 'https://tienngay.vn/open-appndt',
    TIEN_NGAY = 'https://tienngay.vn/'
}

export enum CONTACT {
    PHONE = '19006907',
    MESSENGER = 'https://m.me/DautuTienNgay',
    ZING_ALO = 'https://zalo.me/3290766087338460081'
}

export enum API_CONFIG {
    // common
    GET_BANNERS = '/banner/news', // banner app
    GET_BANNERS_HOME = '/banner/home_V2',
    ENCRYPT = '/api/Encrypt',
    CHECK_APP_REVIEW = '/app/review',
    GET_APP_CONFIG = 'app/config',

    // authentication
    LOGIN = 'auth/signin',  // Dang nhap investor
    TOKEN = '/token',
    USER_INFO = 'user/info_investor', // thông tin tài khoản investor
    REGISTER = 'auth/investor_register',
    CHANEL = '/contract/get_utm_source', // list danh sách kênh đăng kí
    UPDATE_USER_INFO = 'user/update_profile_investor', // update user account
    ACTIVE_ACCOUNT = '/auth/active_account',    // kich hoat OTP dang ki
    OTP_RESET_PWD = '/auth/reset_password',
    OTP_RESEND_TOKEN = 'auth/resend_token',
    CHANGE_PWD = '/user/change_password', // thay doi mat khau
    VALIDATE_TOKEN = 'auth/validate_token',
    UPDATE_PWD = 'auth/new_password',
    IDENTITY_VERIFY = 'user/identity_verification', //  xac thuc CCCD/CMT
    LOGIN_THIRD_PARTY = 'auth/link_social',
    UPDATE_PHONE = 'auth/phone_login_social',
    ACTIVE_PHONE = 'auth/active_phone_social',
    LINK_GOOGLE = 'user/link_account_social',
    RATING_APP = 'user/rate_app',
    FEED_BACK = 'user/feedback', // feed back footer
    BLOCK_ACCOUNT = '/user/block_account', // Block account
    CONFIRM_BLOCK_ACCOUNT = '/user/confirm_block_account', // confirm block account
    COMMISSION_INVESTOR = '/user/commission_investor', // hoa hong

    // history
    HISTORY = '/investor/history_transaction_investor',

    // notification
    NOTIFICATION_CATEGORY = '/user/type_notification',
    NOTIFICATION = '/user/get_notification_user_v2',
    CREATE_FCM_TOKEN = 'user/save_device_token_user',
    GET_UNREAD_COUNT_NOTIFICATION = 'user/get_count_notification_user',
    NOTIFY_UPDATE_READ = '/user/update_read_notification',

    // contracts
    CONTRACTS = 'contract/contract_tempo_by_user', // List danh sách hợp đồng
    CONTRACTS_HOT = 'contract/contract_investor_app',
    CONTRACTS_DASH = '/contract/dashboard_investor',
    COLLECT_DEVICE = '/user/collect_device',
    CONTRACT_DETAIL = '/contract/detail_contract_investor', // Chi tiết hợp đồng
    CONTRACT_OTP = '/contract/send_otp_invest',
    CONTRACT_HAVE_INVESTED = '/contract/detail_contract_have_invested',
    CONTRACT_ALL = '/contract/contract_investor_app_all',
    CONTRACT_DETAIL_INVEST_NOW = '/contract/detail_contract_investor',
    GET_INFOR_INVESTOR = 'user/info_investor',
    REQUEST_NGAN_LUONG = 'contract/investment_ngan_luong',
    CONFIRM_INVEST = '/contract/financial_investment_new',
    LIST_CONTRACT_INVESTING = '/contract/contract_investor_disbursement',
    LIST_TIME_INVESTMENT = '/contract/loan_cycle',
    LIST_MONEY_INVESTMENT = '/contract/select_money_investor',
    INVEST_BANK = 'contract/investment_bank_ngan_luong',  // xem thong tin banking
    CHECK_BILL = 'contract/check_bill',  // check_bill
    LIST_TYPE_INTEREST_INVESTMENT = 'contract/type_interest',

    // link account with payment method
    PAYMENT_METHOD = 'app/payment_method',    // danh sách các phương thức
    REQUEST_SEND_VIMO_LINK = 'vimo_link/send_link_vimo',    // gui lien ket vimo
    REQUEST_ACTIVE_VIMO_LINK = 'vimo_link/active_link_vimo',  // active lien ket vimo
    REQUEST_CANCEL_VIMO_LINK = 'vimo_link/unLink_vimo',       // huy lien ket vimo
    REQUEST_INFO_VIMO_LINK = 'vimo_link/info_vimo_investor',  // xem thong tin lien ket vimo
    GET_BANK = 'bankNganLuong/get_all',  // lay danh sach tai khoan ngan hang 
    CHOOSE_METHOD_RECEIVE_INTEREST = 'investor/confirm_account_payment',  // chon tai khoan nhan lai (vimo, bank)

    // report 
    GET_YEARS = 'investor/select_year', // get years for report
    GET_QUARTERS = 'investor/select_quarters_the_year', // get quarters for report
    //REQUEST_FINANCE_REPORT = 'investor/financial_report', -  bao cao tai chinh investor app
    REQUEST_FINANCE_REPORT = 'investor/financial_report_v2', // bao cao tai chinh investor web

    // upload Image
    UPLOAD_MEDIA = 'user/upload', // upload media
    UPLOAD_IMAGE_IDENTIFY = 'user/image_identity_user', // upload anh CMT/CCCD
    UPLOAD_PERSONAL_PHOTO = 'user/update_personal_photo', // upload anh ca nhan 

    // notify
    NOTIF_ERROR = 'bot/send_error',

    //createQRBank
    CREATE_TRANSFER_BANK_QR = 'https://api.vietqr.io/v2/generate',
}
export const PAYMENT_URL = {
    NL_SUCCESSFULLY: `${config.baseURL}contract/success_nl_`,
    NL_FAILED: `${config.baseURL}contract/cancel?bill=`
};
