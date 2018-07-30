export interface IBuilding {
    id?: number;
    name?: string;
}

export class Building implements IBuilding {
    constructor(public id?: number, public name?: string) {}
}
