import type { GuideCard } from './types'

export const eciLco: GuideCard = {
  id: 'eci-lco',
  title: 'Early Check-in & Late Check-Out',
  guide: `**Check Item Inventory Screen**

From Reservation, click Item Inventory

Click Item Inv

**Select Item Class**

Select Item Class list of values (LOV)

Select 21 - Housekeeping, click OK

**Select Item Code**

Select appropriate Item Code LOV, place X next to item, click OK

ECI Options:
- ECIWYNN - Early Check In at Wynn ($75)
- ECIWYNN100 - Early Check In at Wynn ($100)
- ECIENCORE - Early Check In at Encore ($75)
- ECIENCORE100 - Early Check In at Encore ($100)

LCO Options:
- LCOWYNN - Late Check Out at Wynn ($100)
- LCOWYNN200 - Late Check Out at Wynn ($200)
- LCOENCORE - Late Check Out at Encore ($100)
- LCOENCORE200 - Late Check Out at Encore ($200)

**Item Inventory Availability Screen**

For ECI:
- Locate reservation arrival date
- Green column = allotted ECIs for that date
- Left column = remaining ECIs for that date
- If no availability at base price ($75), search for $100 option
- Input "1" in right column if guest agrees
- Select OK

For LCO:
- Locate reservation departure date
- Green column = allotted LCOs for that date
- Left column = remaining LCOs for that date
- If no availability at base price ($100), search for $200 option
- Input "1" in right column if guest agrees
- Select OK

**Add Specials / ETA / ETD**

In Specials field box, add ECI or LCO

For ECI:
- In ETA field box, add 11:00 AM if no ETA filled
- Arrival time may not be before 11:00 AM

For LCO:
- In ETD field box, add 4:00 PM
- Departure time may not be after 4:00 PM

**Add Packages**

Click Packages dropdown box, pop-up window appears, click New

Click Package drop-down box, type "cc" in find field, hit Enter

Select appropriate code and click OK

**Add S/C Display**

Click S/C Display open field text box

Manually input notation:
- For ECI: +Early Arrival @ $75 p/s (or $100 p/s)
- For LCO: +Late Departure @ $100 p/s (or $200 p/s)

**Add Fixed Charges**

Click Options, select Fixed Charges

Click New, another window appears

Select Once circle (one-time charge)

Fill required fields:
- Date: For ECI = check-in date, For LCO = one day prior to check-out
- TRN. Code: Correct package (ECI or LCO)
- Amount: 75.00 or 100.00 (or 200.00)
- Quantity: Always 1

Click OK`,
  notification: `⚠️ **IMPORTANT POLICIES:**

**ECI Timing:**
- Early Check-in as early as 11:00 AM on check-in date
- Based on availability upon arrival
- Guests can check in anytime between 11 AM - 1 PM

**LCO Timing:**
- Late Check-Out as late as 4:00 PM on check-out date

**Pricing:**
- ECI: $75 base or $100 increased price (plus tax)
- LCO: $100 base or $200 increased price (plus tax)

**EXCLUSIONS - Not Eligible:**
- Tower Suite Reservations
- Casino Reservations
- Resort Marketing Reservations (except paid/blended rates)
- Select Group/Convention Reservations (Passkey, Rooming List, Housing)
- May not be available Fridays, Saturdays, or Sundays (check Item Inventory)
- ECI not available for PANCD room type
- ECI not available for Same Day reservations

**VERIFY BEFORE OFFERING:**
- Availability updated daily and may change throughout the day
- Always check Item Inventory before communicating to guest

**CRITICAL REMINDERS:**

**ETA/ETD Times:**
- ECI: ETA must be 11:00 AM or later (cannot be before 11:00 AM)
- LCO: ETD must be 4:00 PM (cannot be after 4:00 PM)

**Fixed Charges Date:**
- ECI: Use check-in date
- LCO: Use one day PRIOR to check-out date

**S/C Display Format:**
- Always include pricing in notation
- ECI: +Early Arrival @ $75 p/s or $100 p/s
- LCO: +Late Departure @ $100 p/s or $200 p/s

**Package Code:**
- Search "cc" in Package field to find correct code`,
}
