const { test, expect } = require ('@playwright/test')

// create a function to generate a random email for running the test multiple times
function getRandomEmail() {
    return `user${Date.now()}@gmail.com`; }
test('Lunch application', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
  await page.click('button:has-text("Sign Up")');
  const randomEmail = getRandomEmail();
  await page.waitForSelector('#loading-spinner', { state: 'hidden' });

  // sign up with a new user
  await page.getByPlaceholder('First Name').fill('Lando');
  await page.getByPlaceholder('Last Name').fill('Norris');
  await page.getByPlaceholder('email').fill(randomEmail);
  await page.getByPlaceholder('Password').fill('secretkey123');
  await page.waitForTimeout(1000);
  await page.click('button:has-text("Submit")');
  await page.waitForSelector('#loading-spinner', { state: 'hidden' });

  // add a new contact
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

  //enter invalid date of birth
  await page.getByLabel('Date of Birth').fill('04/05/1986');
  await page.click('button:has-text("Submit")');
  // validate the error
  await expect(page.locator('text=Contact validation failed: birthdate: Birthdate is invalid')).toBeVisible();
  // enter correct date of birth
  await page.getByLabel('Date of Birth').fill('1986-09-04');
  await page.click('button:has-text("Submit")');
  //check is there is a contact with the name I inserted above
  await expect(page.locator('text=Fernando Alonso')).toBeVisible();
  await page.locator('text=Fernando Alonso').click();
  await page.waitForTimeout(200);
  page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept();
  });
  
  await page.locator('text=Delete Contact').click({ force: true });
  //Check if the contact has been deleted
  await expect(page.locator('text=Fernando Alonso')).not.toBeVisible();
  // Log out
  await page.click('button:has-text("Logout")');


})
