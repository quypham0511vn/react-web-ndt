import { BaseService } from './base-service';
import { API_CONFIG } from './constants';

export class NotificationServices extends BaseService {
    getNotificationCategories = async () =>
        this.api().post(
            API_CONFIG.NOTIFICATION_CATEGORY,
            this.buildFormData({})
        );

    getNotifications = async (lastIndex: number, pageSize: number) =>
        this.api().post(
            API_CONFIG.NOTIFICATION,
            this.buildFormData({
                uriSegment: lastIndex,
                per_page: pageSize
            })
        );


    createFcmToken = async (fcmToken: string) =>
        this.api().post(
            API_CONFIG.CREATE_FCM_TOKEN,
            this.buildFormData({
                device: fcmToken,
                platform: 'web'
            })
        );

    getUnreadNotify = async () =>
        this.api().post(
            API_CONFIG.GET_UNREAD_COUNT_NOTIFICATION,
            this.buildFormData({})
        );

    getNotify = async (limit: number, offset: number, option: number) => this.api().post(API_CONFIG.NOTIFICATION, this.buildFormData({ limit, offset, option }));

    getNotifyUpdateRead = async (noti_id: number) => this.api().post(API_CONFIG.NOTIFY_UPDATE_READ, this.buildFormData({ noti_id }));
}
