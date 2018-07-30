import { IBuilding } from 'app/shared/model//building.model';
import { IEquipment } from 'app/shared/model//equipment.model';

export interface IRoom {
    id?: number;
    name?: string;
    occupancyLimit?: number;
    available?: boolean;
    building?: IBuilding;
    equipment?: IEquipment[];
}

export class Room implements IRoom {
    constructor(
        public id?: number,
        public name?: string,
        public occupancyLimit?: number,
        public available?: boolean,
        public building?: IBuilding,
        public equipment?: IEquipment[]
    ) {
        this.available = false;
    }
}
