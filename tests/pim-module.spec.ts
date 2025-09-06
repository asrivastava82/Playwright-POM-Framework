import {test, expect} from '../fixtures/hooks-fixutes';
import pimData from '../data/pim-module-data.json'

test('Add a new Employee', {tag: '@QA'}, async({pimPage,gotoUrl, leftNavigationPage} ) => {
    await leftNavigationPage.openPimModule();
    await pimPage.addEmployee(pimData.first_name, pimData.last_name);
    await expect(pimPage.newEmployeeNameHeading).toHaveText(`${pimData.first_name} ${pimData.last_name}`);
});

