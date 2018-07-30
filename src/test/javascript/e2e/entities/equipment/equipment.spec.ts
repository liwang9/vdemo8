import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { EquipmentComponentsPage, EquipmentUpdatePage } from './equipment.page-object';

describe('Equipment e2e test', () => {
    let navBarPage: NavBarPage;
    let equipmentUpdatePage: EquipmentUpdatePage;
    let equipmentComponentsPage: EquipmentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Equipment', () => {
        navBarPage.goToEntity('equipment');
        equipmentComponentsPage = new EquipmentComponentsPage();
        expect(equipmentComponentsPage.getTitle()).toMatch(/Equipment/);
    });

    it('should load create Equipment page', () => {
        equipmentComponentsPage.clickOnCreateButton();
        equipmentUpdatePage = new EquipmentUpdatePage();
        expect(equipmentUpdatePage.getPageTitle()).toMatch(/Create or edit a Equipment/);
        equipmentUpdatePage.cancel();
    });

    it('should create and save Equipment', () => {
        equipmentComponentsPage.clickOnCreateButton();
        equipmentUpdatePage.setNameInput('name');
        expect(equipmentUpdatePage.getNameInput()).toMatch('name');
        equipmentUpdatePage.save();
        expect(equipmentUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
