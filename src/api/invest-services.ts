import { BaseService } from './base-service';
import { API_CONFIG } from './constants';

export class InvestServices extends BaseService {
    getInvestDetail = async (id: number) => this.api().post(API_CONFIG.CONTRACT_DETAIL, this.buildFormData({ id }));

    getInvestHaveContract = async (id: string) => this.api().post(API_CONFIG.CONTRACT_HAVE_INVESTED, this.buildFormData({ id }));

    getAllContractInvest = async (typeInterest: string, timeInvestment: string, moneyInvestment: string, uriSegment: number, per_page: number) => this.api().post(API_CONFIG.CONTRACTS_HOT, this.buildFormData({
        type_interest: typeInterest,
        text: '',
        loan: timeInvestment,
        money: moneyInvestment,
        per_page,
        uriSegment
    }));

    getListContractInvesting = async (typeInterest: string, option: string, textSearch: string, money: string, fdate: string, tdate: string, uriSegment: number, per_page: number) => this.api().post(API_CONFIG.LIST_CONTRACT_INVESTING, this.buildFormData({
        type_interest: typeInterest, 
        option,
        fdate,
        tdate,
        money,
        text: textSearch,
        per_page,
        uriSegment
    }));

    getDetailInvestNow = async (id: string) => this.api().post(API_CONFIG.CONTRACT_DETAIL_INVEST_NOW, this.buildFormData({ id }));

    getNotify = async (limit: number, offset: number, option: number) => this.api().post(API_CONFIG.NOTIFICATION, this.buildFormData({ limit, offset, option }));

    getNotifyUpdateRead = async (noti_id: number) => this.api().post(API_CONFIG.NOTIFY_UPDATE_READ, this.buildFormData({ noti_id }));

    getInfoInvest = async () => this.api(true).post(API_CONFIG.GET_INFOR_INVESTOR, this.buildFormData({
    }));

    getOTP = async (id: string) => this.api().post(API_CONFIG.CONTRACT_OTP, this.buildFormData({ contract_id: id }));

    requestNganLuong = async (id: string, platform: string) => this.api(true).post(API_CONFIG.REQUEST_NGAN_LUONG, this.buildFormData({
        contract_id: id,
        client_code: platform
    }));

    confirmInvest = async (id: string, otp: string) => this.api().post(API_CONFIG.CONFIRM_INVEST, this.buildFormData({
        contract_id: id,
        otp_invest: otp
    }));

    getListTimeInvestment = async () => this.api().post(API_CONFIG.LIST_TIME_INVESTMENT, this.buildFormData({}));

    getListTypeInterest = async () => this.api().post(API_CONFIG.LIST_TYPE_INTEREST_INVESTMENT, this.buildFormData({}));


    getListMoneyInvestment = async () => this.api().post(API_CONFIG.LIST_MONEY_INVESTMENT, this.buildFormData({}));

    getInvestBankInfo = async (id: string, platform: string) => this.api(true).post(API_CONFIG.INVEST_BANK, this.buildFormData({
        contract_id: id,
        client_code: platform
    }));

    checkBill = async (bill_id: string) => this.api().post(API_CONFIG.CHECK_BILL, this.buildFormData({ bill_id }));

    createQRTransferBank = async (
        accountNo: number, //113366668888,
        accountName: string, // "QUY VAC XIN PHONG CHONG COVID" -  tên chủ tài khoản ngân hàng,
        acqId: number, //970415 - mã ngân hàng, 
        amount: number, //79000 - số tiền,
        addInfo: string //Ung Ho Quy Vac Xin - noi dung chuyen khoản,
        // format: string, //  Định dạng mã Qr trả về
        // template: string  //compact2/compact/qr_only/print  - mẫu giao diện ảnh Qr trả về
    ) => this.api(false, '').post(API_CONFIG.CREATE_TRANSFER_BANK_QR, {
        accountNo,
        accountName,
        acqId,
        amount,
        addInfo,
        format: 'text',
        template: 'compact'
    });


}
