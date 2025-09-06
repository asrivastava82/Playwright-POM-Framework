import { test, expect,request, APIRequestContext } from '@playwright/test';

test('Create Booking and Validate Visa Get', async() => {
      //step 1: Create Context
      const apiContext : APIRequestContext=await request.newContext({
            baseURL: 'https://restful-booker.herokuapp.com'
      });
      //step 2: Create Booking
      const createBookingResponse = await apiContext.post('/booking', {
            data: {
                  firstname: "Neha",
                  lastname: "Doe",
                  totalprice: 150,
                  depositpaid: true,
                  bookingdates: {
                        checkin: "2023-10-01",
                        checkout: "2023-10-10"
                  },
                  additionalneeds: "Breakfast"
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
      expect(bookingDetails.firstname).toBe("Neha");
      expect(bookingDetails.lastname).toBe("Doe");
      expect(bookingDetails.totalprice).toBe(150); 
      expect(bookingDetails.depositpaid).toBeTruthy();
      expect(bookingDetails.bookingdates.checkin).toBe("2023-10-01");
      expect(bookingDetails.bookingdates.checkout).toBe("2023-10-10");
      expect(bookingDetails.additionalneeds).toBe("Breakfast");

      //Optional: Close the API context if needed
      await apiContext.dispose();
});