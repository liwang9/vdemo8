import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Vdemo8SharedModule } from 'app/shared';
import {
    BuildingComponent,
    BuildingDetailComponent,
    BuildingUpdateComponent,
    BuildingDeletePopupComponent,
    BuildingDeleteDialogComponent,
    buildingRoute,
    buildingPopupRoute
} from './';

const ENTITY_STATES = [...buildingRoute, ...buildingPopupRoute];

@NgModule({
    imports: [Vdemo8SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BuildingComponent,
        BuildingDetailComponent,
        BuildingUpdateComponent,
        BuildingDeleteDialogComponent,
        BuildingDeletePopupComponent
    ],
    entryComponents: [BuildingComponent, BuildingUpdateComponent, BuildingDeleteDialogComponent, BuildingDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Vdemo8BuildingModule {}
