import type { GuideCard } from './types'

export const reservationTraces: GuideCard = {
  id: 'reservation-traces',
  title: 'Reservation Traces',
  guide: `**Policy**

Traces allow you to attach communications to the guest room reservation. These traces are intended to notify other departments about an action that they must follow up on for the guest.

Traces allow you to specify the responsible department, date, and time when the action must be completed. These departments will run reports based on reservation Traces to ensure tasks are being completed.

**Locate Reservation**

To add a trace you must locate an existing reservation

Click Options then Traces

**Create New Trace**

When creating a new trace you must input the following information:

From Date – Defaults to the arrival date; this can be revised

To Date – Same as from date (defaults to the arrival date); this can be revised

Time – Defaults to the current time of day you are inputting the trace

Department Code – Select from the dropdown

Trace Text – Free form text box that allows you to communicate the necessary trace information

Example: Req same floor as CF#22220000 and CF#22220001

**Save Trace**

Click Save and Close to complete the trace

**Existing Traces**

If the reservation already has a trace:
- You will be able to create a new trace
- You will be able to edit (date, time and department code) with the existing trace

**Trace Indicator**

On the bottom left corner of the reservation, there will be a "red lamplight" that indicates a trace exists on the reservation`,
  notification: `⚠️ **DEPARTMENT CODES:**

**Most Commonly Used:**
- FD – Wynn Resort Front Desk
- EFD – Encore Resort Front Desk
- STS – Wynn Tower Suites
- ETS – Encore Tower Suites

**Other Department Codes:**
- FOCC – Front Office Credit Card Auth
- HK – Housekeeping
- CON – Concierge

**TRACE REQUIREMENTS:**

**Required Fields:**
- From Date
- To Date
- Time
- Department Code
- Trace Text

**Tips:**
- Be specific in trace text
- Include relevant confirmation numbers
- Specify any guest requests clearly
- Use appropriate department code for the task`,
}
