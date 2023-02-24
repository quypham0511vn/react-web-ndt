import { action, makeObservable, observable } from 'mobx';
import { AppConfigModel } from 'models/app-config';

export class CommonManager {
    @observable appConfig: AppConfigModel | undefined ;

    constructor() {
        makeObservable(this);
    }

    @action setAppConfig(appConfig: any) {
        this.appConfig = appConfig;
    }
}
