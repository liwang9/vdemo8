import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { BuildingComponentsPage, BuildingUpdatePage } from './building.page-object';

describe('Building e2e test', () => {
    let navBarPage: NavBarPage;
    let buildingUpdatePage: BuildingUpdatePage;
    let buildingComponentsPage: BuildingComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Buildings', () => {
        navBarPage.goToEntity('building');
        buildingComponentsPage = new BuildingComponentsPage();
        expect(buildingComponentsPage.getTitle()).toMatch(/Buildings/);
    });

    it('should load create Building page', () => {
        buildingComponentsPage.clickOnCreateButton();
        buildingUpdatePage = new BuildingUpdatePage();
        expect(buildingUpdatePage.getPageTitle()).toMatch(/Create or edit a Building/);
        buildingUpdatePage.cancel();
    });

    it('should create and save Buildings', () => {
        buildingComponentsPage.clickOnCreateButton();
        buildingUpdatePage.setNameInput('name');
        expect(buildingUpdatePage.getNameInput()).toMatch('name');
        buildingUpdatePage.save();
        expect(buildingUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
