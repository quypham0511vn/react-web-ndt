import { action, makeObservable, observable } from 'mobx';

import { UserInfoModel } from 'models/user-model';
import sessionManager from './session-manager';

export class UserManager {
    @observable userInfo?: UserInfoModel = sessionManager.userInfo;

    constructor() {
        makeObservable(this);
    }

    @action updateUserInfo(userInfo: any) {
        this.userInfo = userInfo;
        sessionManager.setUserInfo(userInfo);
    }
}
