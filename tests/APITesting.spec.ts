import {test,expect} from '@playwright/test';
test('Get Booking IDs', async({request}) => {
      //send get Request
      const response =await request.get('https://restful-booker.herokuapp.com/booking');
      //Assert response status
      expect(response.status()).toBe(200);
      //get Response jSON
      const responsebody= await response.json();
      console.log("Booking IDs", responsebody);
      //Assertions
      expect(Array.isArray(responsebody)).toBeTruthy();
      expect(responsebody.length).toBeGreaterThan(0);
      
});