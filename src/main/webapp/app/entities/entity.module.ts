import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Vdemo8RoomModule } from './room/room.module';
import { Vdemo8EquipmentModule } from './equipment/equipment.module';
import { Vdemo8ReservationModule } from './reservation/reservation.module';
import { Vdemo8BuildingModule } from './building/building.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        Vdemo8RoomModule,
        Vdemo8EquipmentModule,
        Vdemo8ReservationModule,
        Vdemo8BuildingModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Vdemo8EntityModule {}
