/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TransportSystemComponentsPage, TransportSystemDeleteDialog, TransportSystemUpdatePage } from './transport-system.page-object';

const expect = chai.expect;

describe('TransportSystem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let transportSystemUpdatePage: TransportSystemUpdatePage;
  let transportSystemComponentsPage: TransportSystemComponentsPage;
  let transportSystemDeleteDialog: TransportSystemDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TransportSystems', async () => {
    await navBarPage.goToEntity('transport-system');
    transportSystemComponentsPage = new TransportSystemComponentsPage();
    await browser.wait(ec.visibilityOf(transportSystemComponentsPage.title), 5000);
    expect(await transportSystemComponentsPage.getTitle()).to.eq('Transport Systems');
  });

  it('should load create TransportSystem page', async () => {
    await transportSystemComponentsPage.clickOnCreateButton();
    transportSystemUpdatePage = new TransportSystemUpdatePage();
    expect(await transportSystemUpdatePage.getPageTitle()).to.eq('Create or edit a Transport System');
    await transportSystemUpdatePage.cancel();
  });

  it('should create and save TransportSystems', async () => {
    const nbButtonsBeforeCreate = await transportSystemComponentsPage.countDeleteButtons();

    await transportSystemComponentsPage.clickOnCreateButton();
    await promise.all([
      transportSystemUpdatePage.setCodeInput('code'),
      transportSystemUpdatePage.setNameInput('name'),
      transportSystemUpdatePage.setValidToDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      transportSystemUpdatePage.setModDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      transportSystemUpdatePage.setModUserInput('modUser'),
      transportSystemUpdatePage.companySelectLastOption()
    ]);
    expect(await transportSystemUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await transportSystemUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await transportSystemUpdatePage.getValidToDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected validToDate value to be equals to 2000-12-31'
    );
    expect(await transportSystemUpdatePage.getModDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected modDate value to be equals to 2000-12-31'
    );
    expect(await transportSystemUpdatePage.getModUserInput()).to.eq('modUser', 'Expected ModUser value to be equals to modUser');
    await transportSystemUpdatePage.save();
    expect(await transportSystemUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await transportSystemComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last TransportSystem', async () => {
    const nbButtonsBeforeDelete = await transportSystemComponentsPage.countDeleteButtons();
    await transportSystemComponentsPage.clickOnLastDeleteButton();

    transportSystemDeleteDialog = new TransportSystemDeleteDialog();
    expect(await transportSystemDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Transport System?');
    await transportSystemDeleteDialog.clickOnConfirmButton();

    expect(await transportSystemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
