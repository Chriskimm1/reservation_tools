import type { GuideCard } from './types'

export const newReservation: GuideCard = {
  id: 'new-reservation',
  title: 'New Reservation',
  guide: `**New Reservation Screen**

Select Reservation Tab on top and click New Reservation or press F7

Fill these fields:
- Arrival Date
- Number of Nights
- Adults, Children
- Default Num Rooms to 1 (Never set this to more than 1)

Select Room Type and Rate Code [Room Type is optional at this point]

Click OK or press ALT + O

**Rate Query Details Screen**

Select Room Type [If you haven't selected room type, this is where you can look at rates for a room by selecting the room type and clicking Rate Info]

Click OK or press ALT + O

**New Reservation Screen**

Attach a Profile to Res by hitting the ellipsis … or press ALT + (.) period

**Profile Search Screen**

Search Guest by Last Name, First Name, select the matching Profile, and click OK (edit any info if needed by clicking Edit before OK). If no Profile match, click New and create an individual profile. You will only ever create individual profiles in Opera.

Collect:
- First Name
- Last Name
- Salutation
- Address
- Phone Number
- Email Address

Click Save or ALT + S and click OK

**New Reservation Screen**

Fill required fields:
- Origin = Phone (always phone)
- ETA = Estimated time if available
- Payment = [CC Type, CC No, Exp Date]
- Res Type = Due
- Room Feat = [Any room request]
- Specials = [Any items, special occasions]
- Comment = [Template provided in Hotel Note Template page on this site]

Collect Deposit: Click Options, click Deposit/CXL

**Deposit Screen**

Deposit amount highlighted in blue (if reservation is revised/upgraded, this amount is not automatically updated)

Selecting payment will take you to deposit screen

**Cashier Login Screen**

Login

Select Yes to the pop-up

Enter payment amount and click OK

Close the Deposit confirmation, click Close`,
  notification: `⚠️ **YOU MUST DISCLOSE:**
- Incidental
- Resort Fee
- Deposit
- Cancellation Policy

**Example Language:**

"I show your reservation is for a Resort Suite King located in the Encore Resort. The arrival date is 02-06-15, Friday, for 3 nights with a departure on 02-09-15 and reserved under the name of Thalia Richardson. Your accommodations are for 1 adult(s) and 0 child(ren).

I appreciate your patience while I complete this transaction. As previously mentioned, a one-night deposit is required today for guarantee. I am charging your card at this time."

**REMEMBER TO:**
- State the Cancellation Policy after the charge
- Offer further assistance to complete their stay

**Property Closing w/Caller's Name:**

"Thank you for choosing Wynn Las Vegas! Your confirmation number for this reservation is 18023256. In the event of a cancellation, you must notify us 48 hrs prior to the arrival date for a full refund.

We appreciate your call today and look forward to your visit."`,
}
