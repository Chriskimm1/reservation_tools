import type { GuideCard } from './types'

export const lateArrival: GuideCard = {
  id: 'late-arrival',
  title: 'Late Arrival Policy',
  guide: `**Policy Overview**

In an effort to better accommodate our guests who are arriving after midnight or even the following morning, DWCC agents will complete the following Opera tasks to prevent any guest delays.

**Obtain ETA**

Agent must obtain the guest's ETA

This should be notated on the face of the reservation

**Add Reservation Comment**

Add a Reservation Comment detailing a brief explanation of the late arrival/sleep out request

**Add Reservation Alert**

From reservation, select Options

Select Alerts

Select New

Select Code dropdown

Select LA (Late Arrival - Do not check out!)

Select OK to save

**Add Trace**

From reservation, select Options

Select Traces

Select New

Add a trace for the guest's arrival date

Select Dept Code: Choose appropriate department

Add trace text explaining the late arrival details

Select OK to save

**Add Specials Codes**

From reservation, select Options

Select Specials

Add the following codes as applicable:
- LA - Late Arrival
- KK - Keep Key (if guest is sleeping out)

**Update Source Code**

If the guest is arriving the following day, update the source code to reflect the sleep out scenario`,
  notification: `⚠️ **POLICY REQUIREMENTS:**

**Required Steps:**
- Obtain guest ETA
- Add Reservation Comment
- Add LA Alert
- Add Trace for arrival date
- Add Specials Codes

**Department Codes for Traces:**
- EFD - Executive Front Desk
- FD - Front Desk
- STS - Sphere Technical Support
- ETS - Engineering/Technical Support

**Specials Codes:**
- LA - Late Arrival - Do not check out
- KK - Keep Key (Sleep Out)

**Important Notes:**
- Always confirm the guest's expected arrival time
- For arrivals after midnight, ensure the reservation is not cancelled by the system
- Communicate with Front Desk if arrival is expected after 6:00 AM`
}
