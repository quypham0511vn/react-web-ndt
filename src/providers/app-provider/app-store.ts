import { ApiServices } from 'api';
import { CommonManager } from 'managers/common-manager';
import { UserManager } from 'managers/user-manager';
import { makeObservable, observable } from 'mobx';

class AppStore {

    @observable userManager = new UserManager();

    apiServices = new ApiServices();

    @observable common = new CommonManager();

    constructor() {

        makeObservable(this);
    }

}

export type AppStoreType = AppStore;
export default AppStore;
