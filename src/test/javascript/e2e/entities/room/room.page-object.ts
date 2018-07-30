import { element, by, promise, ElementFinder } from 'protractor';

export class RoomComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-room div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class RoomUpdatePage {
    pageTitle = element(by.id('jhi-room-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    occupancyLimitInput = element(by.id('field_occupancyLimit'));
    availableInput = element(by.id('field_available'));
    buildingSelect = element(by.id('field_building'));
    equipmentSelect = element(by.id('field_equipment'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setOccupancyLimitInput(occupancyLimit): promise.Promise<void> {
        return this.occupancyLimitInput.sendKeys(occupancyLimit);
    }

    getOccupancyLimitInput() {
        return this.occupancyLimitInput.getAttribute('value');
    }

    getAvailableInput() {
        return this.availableInput;
    }
    buildingSelectLastOption(): promise.Promise<void> {
        return this.buildingSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    buildingSelectOption(option): promise.Promise<void> {
        return this.buildingSelect.sendKeys(option);
    }

    getBuildingSelect(): ElementFinder {
        return this.buildingSelect;
    }

    getBuildingSelectedOption() {
        return this.buildingSelect.element(by.css('option:checked')).getText();
    }

    equipmentSelectLastOption(): promise.Promise<void> {
        return this.equipmentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    equipmentSelectOption(option): promise.Promise<void> {
        return this.equipmentSelect.sendKeys(option);
    }

    getEquipmentSelect(): ElementFinder {
        return this.equipmentSelect;
    }

    getEquipmentSelectedOption() {
        return this.equipmentSelect.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
