export interface CommissionModel {
    total: Total;
    detail: Detail[];
}

export interface Total {
    total_money: string;
    total_money_number: number;
    commission: number;
    money_commission: string;
    money_commission_number: number;
}

export interface Detail {
    name: string;
    total_money: string;
    total_money_number: string;
    money_commission: string;
    money_commission_number: string;
}

