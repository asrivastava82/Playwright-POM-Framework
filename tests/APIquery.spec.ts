import { test, expect,request, APIRequestContext } from '@playwright/test';


test('Setting Query Param in API Request', async() => {
      //step 1: Create Context
      const apiContext : APIRequestContext=await request.newContext({
            baseURL: 'https://api.spoonacular.com'
      });
      
      //Step 2 Send Get Request to Fetch Cuisine Details
      const getResponse= await apiContext.get(`/recipes/complexSearch`,{
            params: {
                  'apiKey': '9ab483a23dd94eb7a319aa3a7c1aa435',
                  'cuisine': 'italian'
            }
      
      });
      //Validate status code
      expect(getResponse.status()).toBe(200);

      const cuisinedetails= await getResponse.json();
      console.log("Cuisine Details", cuisinedetails);
//Step 3 : Validate Cuisine Details
      expect(cuisinedetails).toHaveProperty('results');
      expect(cuisinedetails.results.length).toBeGreaterThan(0);
      expect(cuisinedetails.results[0]).toHaveProperty('title');
      expect(cuisinedetails.results[0].title).toContain('Broccolini Quinoa Pilaf');
      //expect(cuisinedetails.results[0].id).toBe('715769');

      
      //Optional: Close the API context if needed
      await apiContext.dispose();
});