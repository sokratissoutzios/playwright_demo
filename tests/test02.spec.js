// @ts-check
const { test, expect } = require('@playwright/test');

// Generate a random email address
function getRandomEmail() {
    return `user${Date.now()}@gmail.com`; 
}

test('Lunch application', async ({ page }) => {
    // Test Data (could be moved to an external file or fixture)
    const userData = {
        firstName: 'Norris',
        lastName: 'Lando',
        email: getRandomEmail(),
        password: 'secretkey123'
    };

    const contactData = {
        firstName: 'Fernando',
        lastName: 'Alonso',
        dateOfBirth: '1986-05-04', // Use the correct date format
        email: 'testser@gmail.com',
        phone: '6856453256',
        address1: 'address1',
        address2: 'address2',
        city: 'Ioannina',
        state: 'Epirus',
        postalCode: '45500',
        country: 'Greece' 
    };

    // Navigate to the application
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

    // Sign Up
    await page.click('button:has-text("Sign Up")'); 
    await page.getByPlaceholder('First Name').fill(userData.firstName);
    await page.getByPlaceholder('Last Name').fill(userData.lastName);
    await page.getByPlaceholder('email').fill(userData.email);
    await page.getByPlaceholder('Password').fill(userData.password);
    await page.click('button:has-text("Submit")');

    // Add a New Contact
    await page.click('button:has-text("Add a New Contact")');
    await page.getByLabel('First Name').fill(contactData.firstName);
    await page.getByLabel('Last Name').fill(contactData.lastName);
    await page.getByLabel('Date of Birth').fill(contactData.dateOfBirth);
    await page.getByLabel('Email').fill(contactData.email);
    //... fill in the rest of the contact details

    // Submit and check for validation error (if any)
    await page.click('button:has-text("Submit")');
    //... (add assertion for validation error if expected) 

    // Submit with correct data
   // await page.getByLabel('Date of Birth').fill(contactData.dateOfBirth); 
    //await page.click('button:has-text("Submit")');
    //await expect(page.locator(`text=${contactData.firstName} ${contactData.lastName}`)).toBeVisible();

    // View and Delete Contact
    await page.locator(`text=${contactData.firstName} ${contactData.lastName}`).click();
    page.on('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept();
    });
    await page.locator('text=Delete Contact').click({ force: true }); 
    await expect(page.locator(`text=${contactData.firstName} ${contactData.lastName}`)).not.toBeVisible();

    // TODO: Clean up - Delete the user account 
});