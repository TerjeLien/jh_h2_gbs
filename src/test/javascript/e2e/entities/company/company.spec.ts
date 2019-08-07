/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CompanyComponentsPage, CompanyDeleteDialog, CompanyUpdatePage } from './company.page-object';

const expect = chai.expect;

describe('Company e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let companyUpdatePage: CompanyUpdatePage;
  let companyComponentsPage: CompanyComponentsPage;
  let companyDeleteDialog: CompanyDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Companies', async () => {
    await navBarPage.goToEntity('company');
    companyComponentsPage = new CompanyComponentsPage();
    await browser.wait(ec.visibilityOf(companyComponentsPage.title), 5000);
    expect(await companyComponentsPage.getTitle()).to.eq('Companies');
  });

  it('should load create Company page', async () => {
    await companyComponentsPage.clickOnCreateButton();
    companyUpdatePage = new CompanyUpdatePage();
    expect(await companyUpdatePage.getPageTitle()).to.eq('Create or edit a Company');
    await companyUpdatePage.cancel();
  });

  it('should create and save Companies', async () => {
    const nbButtonsBeforeCreate = await companyComponentsPage.countDeleteButtons();

    await companyComponentsPage.clickOnCreateButton();
    await promise.all([
      companyUpdatePage.setCodeInput('code'),
      companyUpdatePage.setNameInput('name'),
      companyUpdatePage.setShortNameInput('shortName'),
      companyUpdatePage.setValidFromDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      companyUpdatePage.setValidToDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      companyUpdatePage.setModDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      companyUpdatePage.setModUserInput('modUser'),
      companyUpdatePage.removerCompanySelectLastOption()
    ]);
    expect(await companyUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await companyUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await companyUpdatePage.getShortNameInput()).to.eq('shortName', 'Expected ShortName value to be equals to shortName');
    expect(await companyUpdatePage.getValidFromDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected validFromDate value to be equals to 2000-12-31'
    );
    expect(await companyUpdatePage.getValidToDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected validToDate value to be equals to 2000-12-31'
    );
    expect(await companyUpdatePage.getModDateInput()).to.contain('2001-01-01T02:30', 'Expected modDate value to be equals to 2000-12-31');
    expect(await companyUpdatePage.getModUserInput()).to.eq('modUser', 'Expected ModUser value to be equals to modUser');
    await companyUpdatePage.save();
    expect(await companyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await companyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Company', async () => {
    const nbButtonsBeforeDelete = await companyComponentsPage.countDeleteButtons();
    await companyComponentsPage.clickOnLastDeleteButton();

    companyDeleteDialog = new CompanyDeleteDialog();
    expect(await companyDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Company?');
    await companyDeleteDialog.clickOnConfirmButton();

    expect(await companyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
