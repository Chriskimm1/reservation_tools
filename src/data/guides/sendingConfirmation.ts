import type { GuideCard } from './types'

export const sendingConfirmation: GuideCard = {
  id: 'sending-confirmation',
  title: 'Sending Confirmation Emails',
  guide: `**Verify Reservation Details**

Make sure the deposit is charged and the rates are correct

**Set Email Confirmation to Yes**

Click the arrow next to "Email Conf." and select "y"

Click OK

**Save Reservation**

Once "Email Conf." has been set to yes, save the reservation

**Advise Guest on Timeline**

Every guest should be advised that it will take 5 minutes to receive their confirmation email from the time the booking is completed

**Before Adding Share With**

Update the email confirmation to a "NO" prior to adding a share with

Failure to do so will result in email confirmation being sent for share with instead of primary

**Resort Marketing Reservations**

Any Resort Marketing reservations containing complimentary as well as paid nights:
- Advise guest of 24-48 hour window before receiving confirmation email
- Change Source Code to RELOC`,
  notification: `⚠️ **CRITICAL REQUIREMENTS:**

**When to Send Confirmations:**

Send confirmation emails for:
- Rack rates
- Wynn Insider rates
- Promotions
- Fully complimentary stays

**NEVER Send Confirmation If:**
- No deposit on file
- Reservation on courtesy hold (CH)
- Reservation status is CH/DUE
- DO NOT SEND without deposit

**Market Code Warnings:**

**DO NOT Manually Change Market Codes:**
- Market codes automatically populate based on associated rate code
- Manual changes can cause serious revenue issues

**NEVER Use These Market Codes for Rack/Promotions/Wynn Insider:**
- CB
- CL
- CD
- CF
- CH
- CN
- SE
- TF
- LD

**Using wrong market codes will:**
- Send confirmation letter with comp rates incorrectly
- Result in loss of revenue
- Cause accounting issues

**Share With Procedure:**

**MUST Update Email Confirmation to "NO" Before Adding Share With:**
- If you don't, confirmation goes to share with instead of primary guest
- This is a critical step - don't skip it

**Timeline Expectations:**

**Standard Reservations:**
- 5 minutes from booking completion

**Resort Marketing (Comp + Paid Nights):**
- 24-48 hour window
- Must change Source Code to RELOC

**REMEMBER:**

**Before Sending:**
1. Verify deposit is charged
2. Verify rates are correct
3. Check reservation type (not CH/DUE)
4. Confirm guest has email on profile

**Market Code Safety:**
- Let system auto-populate market codes
- Don't override without manager approval
- Wrong codes = wrong pricing on confirmation`,
  quickCheckmark: `EMAIL CONFIRMATION LETTERS
Options
Confirmation
Checkbox in email collum on left side
Select dropdown of email type
Select email, customize only on wynn digital
Push send`,
}
