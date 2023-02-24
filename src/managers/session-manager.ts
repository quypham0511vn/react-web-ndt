import { StorageKeys } from 'commons/constants';
import { UserInfoModel } from 'models/user-model';

class SessionManager {
    userInfo: UserInfoModel | undefined;

    accessToken: string | null | undefined;
    savePhone: string | null | undefined;
    savePwd: string | null | undefined;
    
    isMobile: boolean | undefined;


    initData() {
        this.accessToken = localStorage.getItem(StorageKeys.KEY_ACCESS_TOKEN);
        const _savePhone = localStorage.getItem(StorageKeys.KEY_SAVE_PHONE);
        this.savePhone = _savePhone && JSON.parse(_savePhone);
        const _savePwd = localStorage.getItem(StorageKeys.KEY_SAVE_PWD);
        this.savePwd = _savePwd && JSON.parse(_savePwd);
        const tmpUserInfo = localStorage.getItem(StorageKeys.KEY_USER_INFO);
        this.userInfo = tmpUserInfo && JSON.parse(tmpUserInfo);
    }

    setUserInfo(userInfo?: UserInfoModel) {
        this.userInfo = userInfo;
        if (userInfo) {
            localStorage.setItem(StorageKeys.KEY_USER_INFO, JSON.stringify(this.userInfo));
        } else {
            localStorage.removeItem(StorageKeys.KEY_USER_INFO);
        }
    }

    setAccessToken(token?: string) {
        this.accessToken = token;
        if (token) {
            localStorage.setItem(StorageKeys.KEY_ACCESS_TOKEN, JSON.stringify(token));
        } else {
            localStorage.removeItem(StorageKeys.KEY_ACCESS_TOKEN);
        }
    }

    setSavePhoneLogin(phone?: string) {
        this.savePhone = phone;
        if (phone) {
            localStorage.setItem(StorageKeys.KEY_SAVE_PHONE, JSON.stringify(this.savePhone));
        } else {
            localStorage.removeItem(StorageKeys.KEY_SAVE_PHONE);
        }
    }

    setSavePassLogin(pass?: string) {
        this.savePwd = pass;
        if (pass) {
            localStorage.setItem(StorageKeys.KEY_SAVE_PWD, JSON.stringify(this.savePwd));
        } else {
            localStorage.removeItem(StorageKeys.KEY_SAVE_PWD);
        }
    }

    getPhoneLogin() {
        return this.savePhone;
    }

    getPwdLogin() {
        return this.savePwd;
    }

    logout() {
        this.setUserInfo();
        this.setAccessToken();
    }
}

export default new SessionManager();
