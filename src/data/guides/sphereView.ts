import type { GuideCard } from './types'

export const sphereView: GuideCard = {
  id: 'sphere-view',
  title: 'Sphere View Upgrade Options',
  guide: `**Policy & Eligibility**

Discover Wynn Call Center agents can offer Sphere View Upgrade Options at both Wynn and Encore Resort based upon availability.

Exclusions:
- Sphere View Add-on availability is updated daily and may change throughout the day
- Same day reservations are NOT eligible for Sphere View Upgrade
- Guest must check with Front Desk at time of check-in for same day

**Item Inventory Screen**

On the face of the reservation, click on the Item Inventory/Amenities drop-down box.

If guest is already booked into a Panoramic room:
- Contact Manager on Duty at x2259 to discuss availability
- Upgrade rates will remain the same

Click Item Inv, then click the Item Code drop-down box.

Under 'Item Code' type "Sphere" and click Search.

Click on the box next to the room upgrade you want (this puts an X in the field) and hit OK.

**View Inventory Availability**

Click Search to view inventory availability:
- Green column = Total allotted upgrades for that date
- Left column = Remaining upgrades available for that date
- Negative number or 0 in red = No available room upgrade

Input "1" in the right column if Sphere View upgrade is available for each night of guest's stay.

Click OK when done.

Next pop-up shows attached upgrade for each day selected. If correct, click OK.

Trace window will pop up - Click No.

'Reservation Deposit Payments' screen will pop up - Continue to charge applicable deposit for rate code.

**Fixed Charges Screen**

'Reservation Options' screen will automatically open. Click Fixed Charges.

Pop-up warning about deposit rules will appear - Click OK.

Make sure 'Daily' option is marked and 'Begin' and 'End' dates reflect check-in and check-out dates.

Enter the following:
- Trn. Code: 10250100 – Room Upgrade Sphere View

Upgrade Fee Amounts (manually input):
- RKD to PANVD: $130 per night
- RKD to PANDD: $130 per night
- RDD to PANDD: $120 per night
- EK to EPK: $130 per night
- EK to EPQ: $130 per night
- EQ to EPQ: $120 per night

Click OK and verify amount was entered correctly. Click Close.

**Add S/C Display**

On face of reservation, add S/C Display.

Calculate total: Nightly rate × Number of nights

Example: 2nt RKD to PANVD upsell = $130 × 2 = $260

S/C Display formats:
- +addtl $Total upgrade from EK to EPK SV
- +addtl $Total upgrade from EK to EPQ SV
- +addtl $Total upgrade from EQ to EPQ SV
- +addtl $Total upgrade from EQ to EPK SV
- +addtl $Total upgrade from RKD to PANVD SV
- +addtl $Total upgrade from RKD to PANDD SV
- +addtl $Total upgrade from RDD to PANDD SV
- +addtl $Total upgrade from RDD to PANVD SV

**Daily Details Screen**

Click on the ellipsis next to 'Rate'

Click on Daily Details, then click Edit

Change Update Through date to last night of stay

Change Room Type to upgraded room:
- PANVD
- PANDD
- EPK
- EPQ

Pop-up asks to change RTC - Click No

Click OK

If everything looks correct, click OK

**Add Comments**

Add these comments to reservation:
- "Guarantee Sphere View Upgrade quoted at $XXX.XX per night."
- "Guest is aware of the upgrade fee."

**Email Confirmation**

Do NOT send email confirmations via Digital Alchemy.

Add information to spreadsheet:
- Share Drive > CC Portal > Sphere View Add Ons folder

Inform guest email confirmation will be sent within 24 hours.

**Rate Query Screen**

To check availability BEFORE booking:

From 'Rate Query' screen, click Item Inventory.

Click drop-down box next to 'Item Code'.

Type "Sphere" and click Search.

Select the room upgrade and hit OK.

Click Search to view availability.

Note: This only shows availability - upgrade cannot be added until reservation is being booked.

**Cancellation Procedures**

For Web Booking (SC Package) - Delete:
- Packages (SC Sphere View Add on)
- S/C Display and change room type back to original
- Fixed charge
- Add comments

For Call Center Bookings - Delete:
- Inventory
- Fixed charge
- S/C Display and change room type back to original
- Add comments

After completing deletion, contact MOD at extension 2259 for verification.`,
  notification: `⚠️ **IMPORTANT REMINDERS:**

**Eligibility:**
- Same day reservations are NOT eligible
- Availability changes throughout the day
- Panoramic room guests: Contact MOD x2259 first

**Pricing - Per Night:**
- RKD → PANVD: $130
- RKD → PANDD: $130
- RDD → PANDD: $120
- EK → EPK: $130
- EK → EPQ: $130
- EQ → EPQ: $120

**Transaction Code:**
- 10250100 – Room Upgrade Sphere View

**S/C Display:**
- Calculate total: Nightly rate × Number of nights
- Guest sees this amount on registration card at Front Desk
- Double-check calculations!

**Email Confirmations:**
- Do NOT use Digital Alchemy
- Add to spreadsheet: Share Drive > CC Portal > Sphere View Add Ons
- Confirmation sent within 24 hours

**Packages Field:**
- Should be empty for Call Center bookings
- Only used when guest opts in online

**Cancellations:**
- Must contact MOD at x2259 for verification after deletion

**Contact:**
- Manager on Duty: x2259`
}
