import {test as base} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { UserPage } from '../pages/UserPage';
import { LeftNavigationPage } from '../pages/LeftNavigationPage';
import { PimPage } from '../pages/PimPage';



type PomFixturesType = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    userPage: UserPage;
    leftNavigationPage: LeftNavigationPage;
    pimPage: PimPage;
}

export const test = base.extend<PomFixturesType>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    dashboardPage: async({page}, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },

    userPage: async({page}, use) => {
        const userPage = new UserPage(page);
        await use(userPage);
    },

    leftNavigationPage: async({page}, use) => {
        const leftNavigationPage = new LeftNavigationPage(page);
        await use(leftNavigationPage);
    },

    pimPage: async({page}, use) => {
        const pimPage = new PimPage(page);
        await use(pimPage);
    }
});


