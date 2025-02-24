//test score: Alternative way to write the test. Sign up with a new user. 
//Try to add a contact with invalid date of birth and validate the error message.
//Add a new contact and validate it on contact details page.
//Finally delete the contact
const { test, expect } = require('@playwright/test');

// Function to generate a random email
function getRandomEmail() {
    return `user${Date.now()}@gmail.com`;
}

// Function to sign up a new user
async function signUp(page, email) {
    await page.click('button:has-text("Sign Up")');
    await page.waitForSelector('#loading-spinner', { state: 'hidden' });
    
    await page.getByPlaceholder('First Name').fill('Lando');
    await page.getByPlaceholder('Last Name').fill('Norris');
    await page.getByPlaceholder('email').fill(email);
    await page.getByPlaceholder('Password').fill('secretkey123');
    await page.waitForTimeout(500);
    await page.click('button:has-text("Submit")');
   // await page.waitForSelector('#loading-spinner', { state: 'hidden' });
}

// Function to add a contact
async function addContact(page) {
    await page.click('button:has-text("Add a New Contact")');
    await page.getByLabel('First Name').fill('Fernando');
    await page.getByLabel('Last Name').fill('Alonso');
    await page.getByLabel('Email').fill('testser@gmail.com');
    await page.getByLabel('Phone').fill('6856453256');
    await page.getByLabel('Street Address 1').fill('address1');
    await page.getByLabel('Street Address 2').fill('address2');
    await page.getByLabel('City').fill('Ioannina');
    await page.getByLabel('State or Province').fill('Epirus');
    await page.getByLabel('Postal Code').fill('45500');
    await page.getByLabel('Country').fill('Greece');
}

// Function to validate incorrect and correct birthdate
async function validateBirthdate(page) {
    await page.getByLabel('Date of Birth').fill('04/05/1986');
    await page.waitForTimeout(500);
    await page.click('button:has-text("Submit")');
    await expect(page.locator('text=Contact validation failed: birthdate: Birthdate is invalid')).toBeVisible();
    
    await page.getByLabel('Date of Birth').fill('1986-09-04');
    await page.waitForTimeout(400);
    await page.click('button:has-text("Submit")');
    await expect(page.locator('text=Fernando Alonso')).toBeVisible();
}

// Function to delete a contact
async function deleteContact(page) {
    await page.locator('text=Fernando Alonso').click();
    await page.waitForTimeout(200);
    
    page.on('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept();
    });
    
    await page.locator('text=Delete Contact').click({ force: true });
    await expect(page.locator('text=Fernando Alonso')).not.toBeVisible();
}

// Function to log out
async function logout(page) {
    await page.click('button:has-text("Logout")');
}

test('Launch application and perform user actions', async ({ page }) => {
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    const randomEmail = getRandomEmail();
    await signUp(page, randomEmail);
    await addContact(page);
    await validateBirthdate(page);
    await deleteContact(page);
    await logout(page);
});
