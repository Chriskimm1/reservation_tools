import type { GuideCard } from './types'

export const courtesyHold: GuideCard = {
  id: 'courtesy-hold',
  title: 'Courtesy Hold Reservations',
  guide: `**New Reservation Screen**

Begin creating a reservation with all required information:
- Stay dates
- Rate code
- Room/suite type
- Guest name
- Origin code
- Room features
- Specialty codes
- Comments

**Payment Screen**

Update Payment Type:
- Select CH code (Courtesy Hold)

**Res. Type Screen**

Update Reservation Type:
- Select DUE code (Deposit Due)

**Save Reservation**

Click Save

Opera will provide a Confirmation Number

**Advise Guest - REFERENCE Number Only**

Tell guest they have a "REFERENCE NUMBER" (NOT confirmation number)

Reservation is NOT confirmed until credit card deposit is provided

**Confirmation Screen**

Close screen WITHOUT sending confirmation letter

Do not send confirmation - guest has not provided deposit

**Add Comments to Reservation**

Enter all required comments:
- Rates quoted
- Policies disclosed
- 24-hour courtesy hold

Reservation is now on courtesy hold`,
  notification: `⚠️ **POLICY RESTRICTIONS:**

**Time Limit:**
- Maximum 24-hour hold from time of inquiry
- Guest must provide CC deposit within 24 hours

**Within 14 Days Arrival:**
- Courtesy Holds within 14 days require MANAGER APPROVAL
- If manager approves: MUST note which manager in comments
- Document manager name in reservation comments

**CANNOT Offer Courtesy Hold For:**

**High-End Suites:**
- FV1 (Fairway Villa 1 Bedroom)
- FV2 (Fairway Villa 2 Bedroom)
- APT 2 (Apartment 2 Bedroom)
- DUP3 (Duplex 3 Bedroom)

**Special Reservations:**
- Resort Marketing Reservations
- Non-refundable Reservations
- Convention Reservations

**CRITICAL REMINDERS:**

**Guest Communication:**
- ALWAYS say "reference number" NOT "confirmation number"
- Explain reservation is not confirmed without deposit
- Guest has 24 hours to provide credit card

**No Confirmation Letter:**
- Do NOT send confirmation email/letter
- Reservation not confirmed until deposit received

**Required Comments:**
- Rates quoted to guest
- All policies disclosed
- "24-hour courtesy hold" notation
- Manager approval (if within 14 days)`,
}
