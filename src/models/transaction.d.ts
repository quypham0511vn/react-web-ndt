export interface TransactionModel {
    hinh_thuc: string;
    so_tien: string;
    so_du: number;
    created_at: string;
    color: string;
    ma_hop_dong: string;
}

export interface TransactionTypeModel {
    code: string;
    id: number;
    title: string;
    status: number;
    type: number;
    money: string;
    text_status: string;
    source: string;
    receiving_source: string;
    transfer_source: string;
    color: string;
    created_at: string;
}

export interface DataColumnTransactionType {
    color: string;
    so_tien: string;
    hinh_thuc: string;
    ma_hop_dong: string;
    created_at: string;
}
