import { BaseService } from './base-service';
import { API_CONFIG } from './constants';

export class HistoryServices extends BaseService {

    getTransactionList = async (fdate?: string, tdate?: string, option?: string,per_page?: number, uriSegment?: number) =>
        this.api().post(API_CONFIG.HISTORY, this.buildFormData({        // type user
            fdate,          // ngay tim kiem
            tdate,          // ngay ket thuc
            option,
            per_page ,     // all:tat ca, investor: tien ra, pay: tien vao
            uriSegment
        }));
}
