import {test, expect} from '../fixtures/hooks-fixutes';
import loginModuleData from '../data/login-module-data.json';

test.use({storageState:{
    cookies:[],
    origins: []
}})

test('Login test with incorrect password', {
    tag: '@QA',
    annotation: [
        { type: 'description', description: 'This test case is to verify login functionality with incorrect password' }
    ]
}, async ({loginPage, commonUtils, gotoUrl}) => {
const username = commonUtils.decryptData(process.env.USER_NAME!);
await loginPage.login(username, loginModuleData.incorrect_password);
await expect(loginPage.invalidCredentialsMessage).toHaveText(loginModuleData.invalid_credentials_message, {timeout: 10000});
await expect(loginPage.userName).toBeVisible();
});

test('Login test with incorrect username', async ({loginPage, commonUtils, gotoUrl}) => {
const password = commonUtils.decryptData(process.env.PASSWORD!);
await loginPage.login(loginModuleData.incorrect_username, password);
await expect(loginPage.invalidCredentialsMessage).toHaveText(loginModuleData.invalid_credentials_message);
await expect(loginPage.password).toBeVisible();
});