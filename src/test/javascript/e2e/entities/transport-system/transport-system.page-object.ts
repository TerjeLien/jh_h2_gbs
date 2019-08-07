import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class TransportSystemComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-transport-system div table .btn-danger'));
  title = element.all(by.css('jhi-transport-system div h2#page-heading span')).first();

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

export class TransportSystemUpdatePage {
  pageTitle = element(by.id('jhi-transport-system-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codeInput = element(by.id('field_code'));
  nameInput = element(by.id('field_name'));
  validToDateInput = element(by.id('field_validToDate'));
  modDateInput = element(by.id('field_modDate'));
  modUserInput = element(by.id('field_modUser'));
  companySelect = element(by.id('field_company'));

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

  async companySelectLastOption(timeout?: number) {
    await this.companySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async companySelectOption(option) {
    await this.companySelect.sendKeys(option);
  }

  getCompanySelect(): ElementFinder {
    return this.companySelect;
  }

  async getCompanySelectedOption() {
    return await this.companySelect.element(by.css('option:checked')).getText();
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

export class TransportSystemDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-transportSystem-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-transportSystem'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
