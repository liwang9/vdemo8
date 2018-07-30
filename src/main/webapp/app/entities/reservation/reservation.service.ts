import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReservation } from 'app/shared/model/reservation.model';

type EntityResponseType = HttpResponse<IReservation>;
type EntityArrayResponseType = HttpResponse<IReservation[]>;

@Injectable({ providedIn: 'root' })
export class ReservationService {
    private resourceUrl = SERVER_API_URL + 'api/reservations';

    constructor(private http: HttpClient) {}

    create(reservation: IReservation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(reservation);
        return this.http
            .post<IReservation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(reservation: IReservation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(reservation);
        return this.http
            .put<IReservation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IReservation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IReservation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(reservation: IReservation): IReservation {
        const copy: IReservation = Object.assign({}, reservation, {
            startDateTime:
                reservation.startDateTime != null && reservation.startDateTime.isValid() ? reservation.startDateTime.toJSON() : null,
            endDateTime: reservation.endDateTime != null && reservation.endDateTime.isValid() ? reservation.endDateTime.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.startDateTime = res.body.startDateTime != null ? moment(res.body.startDateTime) : null;
        res.body.endDateTime = res.body.endDateTime != null ? moment(res.body.endDateTime) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((reservation: IReservation) => {
            reservation.startDateTime = reservation.startDateTime != null ? moment(reservation.startDateTime) : null;
            reservation.endDateTime = reservation.endDateTime != null ? moment(reservation.endDateTime) : null;
        });
        return res;
    }
}
