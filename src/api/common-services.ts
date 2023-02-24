
import { BaseService } from './base-service';
import { API_CONFIG } from './constants';

export class CommonServices extends BaseService {
    getListInvest = async (pageSize: number, lastIndex: number, timeInvestment: string, moneyInvestment: string) =>
        this.api().post(
            API_CONFIG.CONTRACTS_HOT,
            this.buildFormData({
                loan: timeInvestment,
                money: moneyInvestment,
                per_page: pageSize,
                uriSegment: lastIndex
            })
        );

    getContractsDash = async () => this.api().post(API_CONFIG.CONTRACTS_DASH, {});

    collectDevice = async (device: string, type) => this.api().post(API_CONFIG.COLLECT_DEVICE, this.buildFormData({ device, type }));

    getNews = async () => this.api().post(API_CONFIG.GET_BANNERS, {});

    getBannerHome = async () => this.api().post(API_CONFIG.GET_BANNERS_HOME, {});

    getAppInReview = async () => this.api().post(API_CONFIG.CHECK_APP_REVIEW);

    getAppConfig = async () => this.api().get(API_CONFIG.GET_APP_CONFIG);

    ratingApp = async (point: number, note: string) =>
        this.api().post(
            API_CONFIG.RATING_APP,
            this.buildFormData({
                point,
                note
            })
        );

    postFeedBack = async (name: string, phone?: string, email?: string, description?: string) =>
        this.api().post(
            API_CONFIG.FEED_BACK,
            this.buildFormData({
                name,
                phone,
                email,
                description
            })
        );

    uploadImage = async (file: any) => {
        const form = new FormData();
        form.append('file', file);

        const resUpload: any = await this.api().post(API_CONFIG.UPLOAD_MEDIA, form);
        if (resUpload?.success) {
            const dataUpload = resUpload?.data;
            if (dataUpload) {
                return { success: true, data: dataUpload };
            }
            return { success: false, data: null };
        }

        return { success: false, data: null };

    };
}

