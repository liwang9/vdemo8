import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { RoomComponentsPage, RoomUpdatePage } from './room.page-object';

describe('Room e2e test', () => {
    let navBarPage: NavBarPage;
    let roomUpdatePage: RoomUpdatePage;
    let roomComponentsPage: RoomComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Rooms', () => {
        navBarPage.goToEntity('room');
        roomComponentsPage = new RoomComponentsPage();
        expect(roomComponentsPage.getTitle()).toMatch(/Rooms/);
    });

    it('should load create Room page', () => {
        roomComponentsPage.clickOnCreateButton();
        roomUpdatePage = new RoomUpdatePage();
        expect(roomUpdatePage.getPageTitle()).toMatch(/Create or edit a Room/);
        roomUpdatePage.cancel();
    });

    it('should create and save Rooms', () => {
        roomComponentsPage.clickOnCreateButton();
        roomUpdatePage.setNameInput('name');
        expect(roomUpdatePage.getNameInput()).toMatch('name');
        roomUpdatePage.setOccupancyLimitInput('5');
        expect(roomUpdatePage.getOccupancyLimitInput()).toMatch('5');
        roomUpdatePage
            .getAvailableInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    roomUpdatePage.getAvailableInput().click();
                    expect(roomUpdatePage.getAvailableInput().isSelected()).toBeFalsy();
                } else {
                    roomUpdatePage.getAvailableInput().click();
                    expect(roomUpdatePage.getAvailableInput().isSelected()).toBeTruthy();
                }
            });
        roomUpdatePage.buildingSelectLastOption();
        // roomUpdatePage.equipmentSelectLastOption();
        roomUpdatePage.save();
        expect(roomUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
