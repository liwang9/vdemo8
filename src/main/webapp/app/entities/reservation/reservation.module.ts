import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Vdemo8SharedModule } from 'app/shared';
import { Vdemo8AdminModule } from 'app/admin/admin.module';
import {
    ReservationComponent,
    ReservationDetailComponent,
    ReservationUpdateComponent,
    ReservationDeletePopupComponent,
    ReservationDeleteDialogComponent,
    reservationRoute,
    reservationPopupRoute
} from './';

const ENTITY_STATES = [...reservationRoute, ...reservationPopupRoute];

@NgModule({
    imports: [Vdemo8SharedModule, Vdemo8AdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReservationComponent,
        ReservationDetailComponent,
        ReservationUpdateComponent,
        ReservationDeleteDialogComponent,
        ReservationDeletePopupComponent
    ],
    entryComponents: [ReservationComponent, ReservationUpdateComponent, ReservationDeleteDialogComponent, ReservationDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Vdemo8ReservationModule {}
