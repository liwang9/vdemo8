import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBuilding } from 'app/shared/model/building.model';
import { BuildingService } from './building.service';

@Component({
    selector: 'jhi-building-update',
    templateUrl: './building-update.component.html'
})
export class BuildingUpdateComponent implements OnInit {
    private _building: IBuilding;
    isSaving: boolean;

    constructor(private buildingService: BuildingService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ building }) => {
            this.building = building;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.building.id !== undefined) {
            this.subscribeToSaveResponse(this.buildingService.update(this.building));
        } else {
            this.subscribeToSaveResponse(this.buildingService.create(this.building));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBuilding>>) {
        result.subscribe((res: HttpResponse<IBuilding>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get building() {
        return this._building;
    }

    set building(building: IBuilding) {
        this._building = building;
    }
}
