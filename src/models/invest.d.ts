export interface PackageInvest {
    id: number;
    ma_hop_dong: string;
    so_tien_dau_tu: string;
    lai_hang_thang: string;
    ngay_dau_tu: string;
    ki_han_dau_tu: string;
    tong_lai_du_kien: string;
    tong_lai_da_nhan: string;
    tong_lai_da_tra: string;
    tong_lai_con_lai: string;
    ngay_dao_han: string;
    hinh_thuc_tra_lai: string;
    ti_le_lai_suat_hang_thang: string;
    ti_le_lai_suat_hang_nam: string;
    trang_thai_hop_dong: string;
    ngay_dao_han_du_kien: string;
    tong_lai_nhan_duoc: string;
    thoi_gian_dau_tu: string;
    tong_goc_con_lai: string;
    tong_goc_da_tra: string;
}

export interface Notify {
    id: number;
    action: string;
    action_id: string;
    status: number;
    code_contract?: any;
    link?: any;
    image?: string;
    message: string;
    note: string;
    title: string;
    created_by: string;
    user_id: number;
    created_at: number;
    updated_at: number;

}
export interface InvestorInfoModel {
    avatar: string;
    avatar_user: string
    card_back: string
    email: string
    front_facing_card: string
    full_name: string
    identity: string
    phone_number: string
    tinh_trang: StatusInvestModel
    tra_lai: InterestPaymentModel
}

export interface StatusInvestModel {
    status: string
    color: string
    auth: boolean
}
export interface InterestPaymentModel {
    type_interest_receiving_account: string
    interest_receiving_account: string
    bank_name: string
    name_bank_account: string
    type_card: string
}
export interface CheckVimoWalletModel {
    data: any
    message: string
    status: number

}
export interface PagingConditionTypes {
    offset: number
    isLoading: boolean,
    canLoadMore: boolean,
    timeInvestment: string,
    moneyInvest: string,
    textSearch: string,
    fromDate: string,
    toDate: string,
    moneyInvested: string,
    option: string
}
export interface HistoryModel {
    color: string,
    ngay_tra_lai: string,
    so_tien: string,
    trang_thai: string
}

export interface BankInformationModel {
    key: number,
    url: string,
    bin: string;
    account: string;
    bank_code: string;
    description: string;
    money: string;
    name_account: string;
    name_bank: string;
    id: string;
}

export interface InvestFilter {
    dateInvest?: string;
    amountInvest?: string;
    typeInterest?: string;
}

export interface DataColumnCommissionType {
    id: string;
    phoneNumber: string;
    totalInvest: string;
    commissionAmount: string;
}

export interface DataTotalColumnCommissionType {
    totalInvest: string;
    totalCommission: string;
}

export interface DataColumnPaymentType {
    stt: number;
    ky_tra: string;
    tien_goc_tra: string;
    tien_lai_tra: string;
    tong_goc_lai: string;
    ngay_nhan: string;
}

export interface DataColumnHistoryType {
    id: string;
    stt: number;
    ky_tra: string;
    tien_goc_tra: string;
    tien_lai_tra: string;
    tong_goc_lai: string;
    status: string;
    ngay_nhan: string;
}
