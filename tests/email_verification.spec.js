import { expect, test } from "@playwright/test";
import MailosaurClient from "mailosaur";
const mailosaur = new MailosaurClient('oouqrctfoE8ynxuFz5vuORUloJs5it6M');


test("password reset", async ({ page }) => {
  const serverId = "nnrjqv9j";
  const testEmailAddress = `some-test-run123@${serverId}.mailosaur.net`;

  // Navigate to a password reset page, and submit the form to trigger an email
  await page.goto("https://example.mailosaur.com/password-reset");
  await page.fill("#email", testEmailAddress);
  await page.click('button[type="submit"]');

  // Connect to Mailosaur, and wait for that email to arrive
  const email = await mailosaur.messages.get(serverId, {
    sentTo: testEmailAddress,
  });

  expect(email.from[0].email).toBe("noreply@example.mailosaur.net");  // check the sender email address
  expect(email.to[0].email).toBe(testEmailAddress);
  // Check that the email contains some text
expect(email.text.body).toBeTruthy("abcd");
});