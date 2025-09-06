import {Page, Locator} from '@playwright/test'


export class PimPage{
    readonly page: Page;
    readonly addPimButton: Locator;
    readonly firstNameTextBox: Locator;
    readonly lastNameTextBox: Locator;
    readonly saveButton: Locator;
    readonly newEmployeeNameHeading: Locator;

constructor(page: Page){
    this.page = page;
    this.addPimButton = page.getByRole('button', {name: ' Add'});
    this.firstNameTextBox = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameTextBox = page.getByRole('textbox', { name: 'Last Name' });
    this.saveButton = page.getByRole('button', { name: ' Save' });
    this.newEmployeeNameHeading = page.locator('.orangehrm-edit-employee-name')
}

async addEmployee(firstName: string, lastName: string) {
    await this.addPimButton.click();
    await this.firstNameTextBox.fill(firstName);
    await this.lastNameTextBox.fill(lastName);
    await this.saveButton.click();
}
}