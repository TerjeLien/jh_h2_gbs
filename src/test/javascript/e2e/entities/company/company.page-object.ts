import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class CompanyComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-company div table .btn-danger'));
  title = element.all(by.css('jhi-company div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class CompanyUpdatePage {
  pageTitle = element(by.id('jhi-company-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codeInput = element(by.id('field_code'));
  nameInput = element(by.id('field_name'));
  shortNameInput = element(by.id('field_shortName'));
  validFromDateInput = element(by.id('field_validFromDate'));
  validToDateInput = element(by.id('field_validToDate'));
  modDateInput = element(by.id('field_modDate'));
  modUserInput = element(by.id('field_modUser'));
  removerCompanySelect = element(by.id('field_removerCompany'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return await this.codeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setShortNameInput(shortName) {
    await this.shortNameInput.sendKeys(shortName);
  }

  async getShortNameInput() {
    return await this.shortNameInput.getAttribute('value');
  }

  async setValidFromDateInput(validFromDate) {
    await this.validFromDateInput.sendKeys(validFromDate);
  }

  async getValidFromDateInput() {
    return await this.validFromDateInput.getAttribute('value');
  }

  async setValidToDateInput(validToDate) {
    await this.validToDateInput.sendKeys(validToDate);
  }

  async getValidToDateInput() {
    return await this.validToDateInput.getAttribute('value');
  }

  async setModDateInput(modDate) {
    await this.modDateInput.sendKeys(modDate);
  }

  async getModDateInput() {
    return await this.modDateInput.getAttribute('value');
  }

  async setModUserInput(modUser) {
    await this.modUserInput.sendKeys(modUser);
  }

  async getModUserInput() {
    return await this.modUserInput.getAttribute('value');
  }

  async removerCompanySelectLastOption(timeout?: number) {
    await this.removerCompanySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async removerCompanySelectOption(option) {
    await this.removerCompanySelect.sendKeys(option);
  }

  getRemoverCompanySelect(): ElementFinder {
    return this.removerCompanySelect;
  }

  async getRemoverCompanySelectedOption() {
    return await this.removerCompanySelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CompanyDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-company-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-company'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
