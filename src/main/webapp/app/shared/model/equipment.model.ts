import { IRoom } from 'app/shared/model//room.model';

export interface IEquipment {
    id?: number;
    name?: string;
    rooms?: IRoom[];
}

export class Equipment implements IEquipment {
    constructor(public id?: number, public name?: string, public rooms?: IRoom[]) {}
}
