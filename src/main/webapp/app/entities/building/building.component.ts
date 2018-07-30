import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBuilding } from 'app/shared/model/building.model';
import { Principal } from 'app/core';
import { BuildingService } from './building.service';

@Component({
    selector: 'jhi-building',
    templateUrl: './building.component.html'
})
export class BuildingComponent implements OnInit, OnDestroy {
    buildings: IBuilding[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private buildingService: BuildingService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.buildingService.query().subscribe(
            (res: HttpResponse<IBuilding[]>) => {
                this.buildings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBuildings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBuilding) {
        return item.id;
    }

    registerChangeInBuildings() {
        this.eventSubscriber = this.eventManager.subscribe('buildingListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
