import { Moment } from 'moment';
import { IRoom } from 'app/shared/model//room.model';
import { IUser } from 'app/core/user/user.model';

export interface IReservation {
    id?: number;
    title?: string;
    startDateTime?: Moment;
    endDateTime?: Moment;
    room?: IRoom;
    user?: IUser;
}

export class Reservation implements IReservation {
    constructor(
        public id?: number,
        public title?: string,
        public startDateTime?: Moment,
        public endDateTime?: Moment,
        public room?: IRoom,
        public user?: IUser
    ) {}
}
