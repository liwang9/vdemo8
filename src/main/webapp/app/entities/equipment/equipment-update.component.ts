import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEquipment } from 'app/shared/model/equipment.model';
import { EquipmentService } from './equipment.service';
import { IRoom } from 'app/shared/model/room.model';
import { RoomService } from 'app/entities/room';

@Component({
    selector: 'jhi-equipment-update',
    templateUrl: './equipment-update.component.html'
})
export class EquipmentUpdateComponent implements OnInit {
    private _equipment: IEquipment;
    isSaving: boolean;

    rooms: IRoom[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private equipmentService: EquipmentService,
        private roomService: RoomService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ equipment }) => {
            this.equipment = equipment;
        });
        this.roomService.query().subscribe(
            (res: HttpResponse<IRoom[]>) => {
                this.rooms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.equipment.id !== undefined) {
            this.subscribeToSaveResponse(this.equipmentService.update(this.equipment));
        } else {
            this.subscribeToSaveResponse(this.equipmentService.create(this.equipment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEquipment>>) {
        result.subscribe((res: HttpResponse<IEquipment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackRoomById(index: number, item: IRoom) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get equipment() {
        return this._equipment;
    }

    set equipment(equipment: IEquipment) {
        this._equipment = equipment;
    }
}
