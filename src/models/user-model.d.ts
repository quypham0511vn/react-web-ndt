import { Id } from './id';

export interface UserInfoModel {
    avatar_user?: string;
    identity?: string;
    type?: string;
    tinh_trang?: StateUserInfo;
    tra_lai?: RePay;
    phone_number?: string;
    password?: boolean;
    full_name?: string;
    email?: string;
    loan_purpose?: string;
    channels?: string;
    created_at?: number;
    status?: string;
    status_login?: boolean;
    token_active?: number;
    timeExpried_active?: number;
    created_by?: string;
    token_app?: string;
    token?: string;
    id?: string;
    checksum?: string;
    _id?: Id;
    role_user?: string;
    updated_at?: string;
    updated_by?: string;
    username?: string;
    birth_date?: string;
    avatar?: string,
    id_fblogin?: string;
    id_google?: string;
    user_apple?: string;
    gender?: string;
    front_facing_card?: string,
    card_back?: string,
    accuracy?: number;   /// 0: da xac thuc/// 1: chua xac thuc//// 2: cho xac thuc
    address?: string;
    job?: string;
    infoLinkVimo?: InfoLinkVimoModal;
    rate?:number;
    avatarFile?:any;
    link_refferral?:string;
}
interface OtpModal {
    otp1: any;
    otp2: any;
    otp3: any;
    otp4: any;
    otp5: any;
    otp6: any;
}

export interface StateUserInfo {
    auth?: number; // 0: da xac thuc // 1: isn't xac thuc // 2: wait xac thuc
    status?: string;
    color?: string;
}

export interface RePay {
    bank_name?: string;
    interest_receiving_account?: string;
    name_bank_account?: string;
    type_card?: number;
    type_interest_receiving_account?: string;
}


export interface InfoLinkVimoModal {
    phone?: string;
    trang_thai?: string;
}

export interface UpdateInfoModal {
    status?: number;
    message?: string;
    url_avatar?: string;
}

export interface BankModel {
    account_name?: string;
    account_number?: string;
    name_bank?: string;
}
