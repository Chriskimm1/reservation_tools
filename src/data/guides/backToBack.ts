import type { GuideCard } from './types'

export const backToBack: GuideCard = {
  id: 'back-to-back',
  title: 'Back to Back Reservations',
  guide: `**Add Alert - Step 1**

Click on Options and select Alerts

**Add Alert - Step 2**

Click the drop-down box next to Code

Hit letter 'B' on keyboard to narrow search

Select proper alert code:
- BACK1: Guest staying in same room
- BACK2: Guest changing room types

Click OK

**Add Alert - Step 3**

Click drop-down box next to Area

Select Reservation

**Add Alert - Step 4**

Description box will autofill with template

Add both confirmation numbers in appropriate fields

BACK1 Example:
- *** Back to Back Reservation ***
- Please keep in same room / Do not unblock
- Res #1: 27658283
- Res #2: 27658284

BACK2 Example:
- *** Back to Back Reservation ***
- Changing room types, please contact guest
- Res #1: 27658283
- Res #2: 27658284

**Repeat on Second Reservation**

Add Alert on second reservation using same process

**Add Trace - Step 1**

Click on Options and select Traces

**Add Trace - Step 2**

Place trace on arrival date of each reservation

Set time to 05:00 AM

Select Dept Code based on room type:
- FD: Wynn Resort Front Desk
- EFD: Encore Resort Front Desk
- STS: Wynn Tower Suites
- ETS: Encore Tower Suites

**Add Trace - Step 3**

In Trace Text box, notate:
- Back to Back Reservation
- Include both confirmation numbers

Click OK

**Repeat Trace on Second Reservation**

Add trace on second reservation using same process

**Verify Completion**

Check for note lamp at bottom of reservation

Confirms Alert and Trace are applied`,
  notification: `⚠️ **POLICY REQUIREMENTS:**

**Definition:**
Two or more separate reservations for same guest with check out and check in during same stay dates

**Guest Must Be Advised:**
- At time of booking confirmation
- Guest required to come to Front Desk on arrival morning of second reservation
- Must sign new registration card
- Must collect new room keys

**Alert Requirements:**
- Add alerts to BOTH reservations
- BACK1: Guest staying in same room (do not unblock)
- BACK2: Guest changing room types (contact guest)
- Include both confirmation numbers in description

**Trace Requirements:**
- Add traces to BOTH reservations
- Place on arrival date of each reservation
- Time must be 05:00 AM
- Use correct Dept Code based on room type
- Include both confirmation numbers in trace text

**Department Codes:**
- FD: Wynn Resort Front Desk
- EFD: Encore Resort Front Desk
- STS: Wynn Tower Suites
- ETS: Encore Tower Suites

**Verification:**
- Note lamp must appear at bottom of both reservations
- Confirms alerts and traces are properly applied`,
}
