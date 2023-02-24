import { BaseService } from './base-service';
import { API_CONFIG } from './constants';

export class AuthServices extends BaseService {

    loginPhone = async (phone_number: string, password: string) =>
        this.api().post(
            API_CONFIG.LOGIN,
            this.buildFormData({
                phone_number,
                password
            })
        );

    loginWithThirdParty = async (type_social: string, provider_id: string, email: string, name: string) =>
        this.api().post(
            API_CONFIG.LOGIN_THIRD_PARTY,
            this.buildFormData({
                type_social,
                provider_id,
                email,
                name
            })
        );

    linkGoogle = async (type_social: string, provider_id: string) =>
        this.api().post(
            API_CONFIG.LINK_GOOGLE,
            this.buildFormData({
                provider_id,
                type_social
            })
        );

    updatePhone = async (id: string, phone_number: string, checksum: string, channels: string | number, referral_code: string, is_nexttech: number) =>
        this.api(true).post(
            API_CONFIG.UPDATE_PHONE,
            this.buildFormData({
                id,
                phone_number,
                checksum,
                channels,
                referral_code,
                is_nexttech
            })
        );

    activePhone = async (id: string, otp: string, checksum: string) =>
        this.api(true).post(
            API_CONFIG.ACTIVE_PHONE,
            this.buildFormData({
                id,
                otp,
                checksum
            })
        );

    updateUserInf = async (
        avatar?: string,  // anh gui len  khi ko camera hoac thu vien
        full_name?: string,
        gender?: string,
        address?: string
    ) =>
        this.api().post(
            API_CONFIG.UPDATE_USER_INFO,
            this.buildFormData({
                avatar,
                full_name,
                gender,
                address
            })
        );

    registerAuth = async (
        phone_number: string,
        full_name: string,
        password: string,
        re_password: string,
        email: string,
        channels: string | number,
        referral_code: string,
        is_nexttech: number
    ) =>
        this.api().post(
            API_CONFIG.REGISTER,
            this.buildFormData({
                phone_number,
                full_name,
                password,
                re_password,
                email,
                channels,
                referral_code,
                is_nexttech
            })
        );

    getChanelSource = async (type: number) =>
        this.api().post(API_CONFIG.CHANEL, this.buildFormData({ type }));

    otpResetPwd = async (phone_number: string) =>
        this.api().post(
            API_CONFIG.OTP_RESET_PWD,
            this.buildFormData({
                phone_number
            })
        );

    otpResendToken = async (phone_number: string) =>
        this.api().post(
            API_CONFIG.OTP_RESEND_TOKEN,
            this.buildFormData({
                phone_number
            })
        );

    updateNewPwd = async (
        phone_number: string,
        token_reset_password: string,
        password: string,
        re_password: string
    ) =>
        this.api().post(
            API_CONFIG.UPDATE_PWD,
            this.buildFormData({
                phone_number,
                token_reset_password,
                password,
                re_password
            })
        );

    activeAccount = async (token: any, phone_number: string) =>
        this.api().post(
            API_CONFIG.ACTIVE_ACCOUNT,
            this.buildFormData({
                token,
                phone_number
            })
        );

    validateToken = async (token: any, phone_number: string) =>
        this.api().post(
            API_CONFIG.VALIDATE_TOKEN,
            this.buildFormData({
                token_reset_password: token,
                phone_number
            })
        );

    getUserInfo = async () =>
        this.api().post(API_CONFIG.USER_INFO, this.buildFormData({}));

    identityVerify = async (
        identity: string,
        front_facing_card: any | string,
        card_back: any | string,
        avatar: any | string
    ) =>
        this.api().post(
            API_CONFIG.IDENTITY_VERIFY,
            this.buildFormData({
                identity,
                front_facing_card,
                card_back,
                avatar
            })
        );

    changePwd = async (
        password_old?: string,
        password_new?: string) =>
        this.api().post(
            API_CONFIG.CHANGE_PWD,
            this.buildFormData({
                password_old,
                password_new
            })
        );

    deleteAccount = async () => this.api().post(API_CONFIG.BLOCK_ACCOUNT, this.buildFormData({}));

    confirmDeleteAccount = async (otp: string, checksum?: string) => this.api().post(API_CONFIG.CONFIRM_BLOCK_ACCOUNT, this.buildFormData({ otp, checksum }));

    getCommissionInfo = async (month: string, year: string) => this.api().post(API_CONFIG.COMMISSION_INVESTOR, 
        this.buildFormData({ month, year }));
}
