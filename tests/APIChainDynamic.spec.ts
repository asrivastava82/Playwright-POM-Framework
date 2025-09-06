import { test, expect,request, APIRequestContext } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Create Booking and Validate Visa Get', async() => {
      //step 1: Create Context
      const apiContext : APIRequestContext=await request.newContext({
            baseURL: 'https://restful-booker.herokuapp.com'
      });
    

//step 2: Create Booking
 const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const totalPrice = faker.number.int({ min: 100, max: 500 });
      const depositPaid = faker.datatype.boolean();
      const checkinDate = faker.date.future({ years: 1 });
      const checkoutDate = faker.date.future({ years: 1, refDate: checkinDate });
      const additionalNeeds = faker.lorem.sentence();
      const createBookingResponse = await apiContext.post('/booking', {
            data: {
                  firstname: firstName,
                  lastname: lastName,
                  totalprice: totalPrice,
                  depositpaid: depositPaid,
                  bookingdates: {
                        checkin: checkinDate,
                        checkout: checkoutDate
                  },
                  additionalneeds: additionalNeeds
            }
      });

//Validate status code
      expect(createBookingResponse.status()).toBe(200);
      //Fetch Booking Id From Response
      const createBookingResponseBody = await createBookingResponse.json();
      const bookingId = createBookingResponseBody.bookingid ;
      console.log("Booking ID", bookingId);

      //Step 3 Send Get Request to Fetch Booking Details
      const getResponse= await apiContext.get(`/booking/${bookingId}`);
//Validate status code
      expect(getResponse.status()).toBe(200);

      const bookingDetails= await getResponse.json();
      console.log("Booking Details", bookingDetails);

      //Step 4 : Validate Booking Details
      expect(bookingDetails.firstname).toBe(firstName);
      expect(bookingDetails.lastname).toBe(lastName);
      expect(bookingDetails.totalprice).toBe(totalPrice); 
      //expect(bookingDetails.depositpaid).toBeTruthy();
      //expect(bookingDetails.bookingdates.checkin).toBe("2023-10-01");
      //expect(bookingDetails.bookingdates.checkout).toBe("2023-10-10");
      expect(bookingDetails.additionalneeds).toBe(additionalNeeds);

      //Optional: Close the API context if needed
      await apiContext.dispose();
});