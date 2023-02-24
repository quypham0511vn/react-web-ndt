
import { BaseService } from './base-service';
import { API_CONFIG } from './constants';

export class PaymentMethodServices extends BaseService {

    requestSendLinkVimo = async ( mobile: string) => this.api().post(API_CONFIG.REQUEST_SEND_VIMO_LINK, this.buildFormData({
        mobile
    }));

    requestActiveLinkVimo = async ( mobile: string, linked_id: string, otp: string) => this.api().post(API_CONFIG.REQUEST_ACTIVE_VIMO_LINK, this.buildFormData({
        mobile,
        linked_id,
        otp
    }));

    requestCancelLinkVimo = async () => this.api().post(API_CONFIG.REQUEST_CANCEL_VIMO_LINK, this.buildFormData({
    }));

    requestInfoLinkVimo = async () => this.api().post(API_CONFIG.REQUEST_INFO_VIMO_LINK, this.buildFormData({
    }));

    getBank = async () => this.api().post(API_CONFIG.GET_BANK, this.buildFormData({}));

    getPaymentMethod = async () => this.api().get(API_CONFIG.PAYMENT_METHOD);

    requestChoosePaymentReceiveInterest = async (
        type_payment: string,
        bank_name?: string,
        bank_account?: string,
        name_account?: string,
        type_card?: number
    ) => this.api().post(API_CONFIG.CHOOSE_METHOD_RECEIVE_INTEREST, this.buildFormData({
        type_payment,  // vimo or bank
        bank_name,
        bank_account,
        name_account,
        type_card
    }));

}

