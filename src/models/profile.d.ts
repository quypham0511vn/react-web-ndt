export interface ItemScreenModel {
    id: number;
    title: string;
    icon?: string;
    is_login?: boolean
}

export interface ItemDocument {
    id: string;
    content: string;
    label?: string;
    style: number;
}
