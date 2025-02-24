//test score: Add a contact with invalid date of birth and validate the error message.

const { test, expect } = require ('@playwright/test')

test('Lunch application', async ({ page }) => {
  await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

  // sign up with an old user
  await page.getByPlaceholder('email').fill('test_user@vimachem.com');
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
  // enter invalid date of birth
  await page.getByLabel('Date of Birth').fill('04/05/1986');
  await page.click('button:has-text("Submit")');
  // validate the error
  await expect(page.locator('text=Contact validation failed: birthdate: Birthdate is invalid')).toBeVisible();
  // log out
  await page.click('button:has-text("Logout")');


})
