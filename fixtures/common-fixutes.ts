import {test as baseTest} from '../fixtures/pom-fixtures';
import CommonUtil from '../utils/common-util';

type CommonFixtureType ={
    commonUtils: CommonUtil
}

export const test = baseTest.extend<CommonFixtureType>({

    commonUtils : async ({}, use) => {
        use(new CommonUtil());

    }
})