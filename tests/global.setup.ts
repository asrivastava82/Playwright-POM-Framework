import {test} from '../fixtures/common-fixutes';
import {expect} from '@playwright/test'


test ("Test Setup", async ({page, loginPage, commonUtils, dashboardPage}) => {

const decryptedUserName = commonUtils.decryptData(process.env.USER_NAME!);
const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!);

await loginPage.goto();
await loginPage.login(decryptedUserName,decryptedPassword);
await page.waitForURL(process.env.BASE_URL + '/web/index.php/dashboard/index');
await expect(page.getByRole('heading', {name : 'Dashboard'})).toHaveText('Dashboard');
await page.context().storageState({
    path:'./playwright/.auth/auth.json'});
});