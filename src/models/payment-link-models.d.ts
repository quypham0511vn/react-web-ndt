export interface DataSendLinkVimoModel {
    status: number;
    linked_id: string;
    message: string;
}

export interface Id {
    $oid: string;
}

export interface DataBanksModel {
    _id: Id;
    name: string;
    short_name: string;
    bank_code: string;
    bank_id: string;
    atm_supported: number;
    bank_account: number;
    account_type: string;
    status: string;
    icon?: string;
}
