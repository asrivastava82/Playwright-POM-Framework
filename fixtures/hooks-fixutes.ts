import {test as baseTest} from './common-fixutes';


type HookFixtures = {
  gotoUrl: any;
  logOut: any;
};

export const test = baseTest.extend <HookFixtures>({
  gotoUrl: async ({loginPage}, use) => {
   await loginPage.goto();
   await use();
    
  },

  logOut: async ({userPage}, use) => {
    await use();
    await userPage.logout();
  
  }
});

export {expect} from '@playwright/test';