import { element, by, promise, ElementFinder } from 'protractor';

export class ReservationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-reservation div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class ReservationUpdatePage {
    pageTitle = element(by.id('jhi-reservation-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    startDateTimeInput = element(by.id('field_startDateTime'));
    endDateTimeInput = element(by.id('field_endDateTime'));
    roomSelect = element(by.id('field_room'));
    userSelect = element(by.id('field_user'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setTitleInput(title): promise.Promise<void> {
        return this.titleInput.sendKeys(title);
    }

    getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    setStartDateTimeInput(startDateTime): promise.Promise<void> {
        return this.startDateTimeInput.sendKeys(startDateTime);
    }

    getStartDateTimeInput() {
        return this.startDateTimeInput.getAttribute('value');
    }

    setEndDateTimeInput(endDateTime): promise.Promise<void> {
        return this.endDateTimeInput.sendKeys(endDateTime);
    }

    getEndDateTimeInput() {
        return this.endDateTimeInput.getAttribute('value');
    }

    roomSelectLastOption(): promise.Promise<void> {
        return this.roomSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    roomSelectOption(option): promise.Promise<void> {
        return this.roomSelect.sendKeys(option);
    }

    getRoomSelect(): ElementFinder {
        return this.roomSelect;
    }

    getRoomSelectedOption() {
        return this.roomSelect.element(by.css('option:checked')).getText();
    }

    userSelectLastOption(): promise.Promise<void> {
        return this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    userSelectOption(option): promise.Promise<void> {
        return this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
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
