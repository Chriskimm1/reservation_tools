import type { GuideCard } from './types'

export const connectingRooms: GuideCard = {
  id: 'connecting-rooms',
  title: 'Connecting Rooms Policy',
  guide: `**Check Availability**

Verify connecting rooms are available for guest's dates

Search for available room types that offer connecting configurations

**New Reservation Screen**

Create first reservation with all standard information:
- Guest profile
- Stay dates
- Rate code
- Room type
- Payment method

**Room Features - First Reservation**

In Room Features field:
- Enter: CN (Connecting Room)

Add comment: "Guest requests connecting rooms"

**Save First Reservation**

Click Save

Note the confirmation number

**Create Second Reservation**

Create second reservation (same or different guest profile):
- Same arrival/departure dates
- Same rate code (if applicable)
- Adjacent/matching room type

**Room Features - Second Reservation**

In Room Features field:
- Enter: CN (Connecting Room)

Add comment: "Connecting to [first confirmation number]"

**Save Second Reservation**

Click Save

Both reservations now flagged as connecting

**Advise Guest - Important**

Inform guest:
- Both reservations have CN feature code
- Housekeeping will be notified
- Connecting doors will be unlocked
- Request is NOT guaranteed until check-in
- Subject to availability at time of arrival`,
  notification: `⚠️ **CONNECTING ROOMS POLICY:**

**Key Requirements:**

**Feature Code:**
- MUST use CN code in Room Features for BOTH reservations
- Both reservations must have identical dates
- Both rooms must be available with connecting door access

**Comments Required:**
- First reservation: "Guest requests connecting rooms"
- Second reservation: "Connecting to [confirmation number]"
- Cross-reference both confirmation numbers in each reservation

**NOT Guaranteed:**
- Connecting rooms are a REQUEST only
- Not guaranteed until actual room assignment at check-in
- Hotel will make every effort but cannot guarantee

**Guest Communication:**

**What to Tell Guests:**
- "We will do our best to accommodate connecting rooms"
- "Request is noted but subject to availability at check-in"
- "Front Desk will confirm connecting room assignment upon arrival"

**DO NOT Say:**
- "Connecting rooms are confirmed" - NEVER guaranteed
- "Guaranteed connecting" - Creates false expectations

**Room Types That Connect:**

**Wynn Tower:**
- Standard Resort Rooms
- Deluxe Resort Rooms
- Panoramic View Rooms

**Encore Tower:**
- Resort King/Queen
- Panoramic View
- Select suite categories

**Tower Suites:**
- Limited connecting availability
- Confirm with Front Desk or Tower Suites team

**Special Situations:**

**Different Room Types:**
- Can request connecting rooms of different categories
- Both must still use CN feature code
- Lower guarantee rate - confirm with Front Desk

**Groups/Conventions:**
- Follow rooming list procedures
- Group blocks may have pre-assigned connecting rooms
- Work with Group Reservations team

**VIP/High Rollers:**
- Route connecting requests to appropriate host
- May require special handling by VIP Services

**Contact for Questions:**

**Front Desk Management:**
- Wynn Front Desk ext. 4100
- Encore Front Desk ext. 5100

**Reservations Supervisors:**
- Available during business hours for complex connecting requests

**CRITICAL REMINDERS:**

**Never Guarantee:**
- Connecting rooms cannot be confirmed until check-in
- Always use language like "request" and "noted"

**Feature Code is Mandatory:**
- Missing CN code = request not properly documented
- Both reservations must have CN code

**Follow Up:**
- If guest calls back, verify both reservations have CN code
- Check comments are properly cross-referenced`,
}
