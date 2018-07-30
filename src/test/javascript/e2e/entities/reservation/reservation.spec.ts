import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ReservationComponentsPage, ReservationUpdatePage } from './reservation.page-object';

describe('Reservation e2e test', () => {
    let navBarPage: NavBarPage;
    let reservationUpdatePage: ReservationUpdatePage;
    let reservationComponentsPage: ReservationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Reservations', () => {
        navBarPage.goToEntity('reservation');
        reservationComponentsPage = new ReservationComponentsPage();
        expect(reservationComponentsPage.getTitle()).toMatch(/Reservations/);
    });

    it('should load create Reservation page', () => {
        reservationComponentsPage.clickOnCreateButton();
        reservationUpdatePage = new ReservationUpdatePage();
        expect(reservationUpdatePage.getPageTitle()).toMatch(/Create or edit a Reservation/);
        reservationUpdatePage.cancel();
    });

    it('should create and save Reservations', () => {
        reservationComponentsPage.clickOnCreateButton();
        reservationUpdatePage.setTitleInput('title');
        expect(reservationUpdatePage.getTitleInput()).toMatch('title');
        reservationUpdatePage.setStartDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(reservationUpdatePage.getStartDateTimeInput()).toContain('2001-01-01T02:30');
        reservationUpdatePage.setEndDateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(reservationUpdatePage.getEndDateTimeInput()).toContain('2001-01-01T02:30');
        reservationUpdatePage.roomSelectLastOption();
        reservationUpdatePage.userSelectLastOption();
        reservationUpdatePage.save();
        expect(reservationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
