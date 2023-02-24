import { Id } from './id';

export interface BaseModel {
    _id?: Id;
    id: number;
    name: string;
    image?: any;
}
