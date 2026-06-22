import type { GuideCard } from './types'

export const folioRequests: GuideCard = {
  id: 'folio-requests',
  title: 'Folio Requests',
  guide: `**Verify Primary Guest**

Confirm caller is the primary guest on the Opera reservation

Follow Confidentiality Policy procedures to verify identity

If all information matches, proceed to create trace

**Advise Guest**

"An email with your final folio attached will be sent to you within the next 24 hours."

**Create Trace Screen**

From reservation face, select Options, Traces, New

Fill required fields:
- From Date/To Date: Leave as today's date
- Time: Leave as current time
- Dept Code: FDC (Front Desk Call Center)
- Trace Text: Email Folio

Click OK to save trace`,
  notification: `⚠️ **POLICY REMINDERS:**

**Verification Required:**
- Must confirm caller is PRIMARY guest on reservation
- Follow all Confidentiality Policy procedures
- Do NOT process if caller is not primary guest

**Email Restrictions:**
- Folio sent to email address on profile ONLY
- Cannot add new email addresses to profile
- Do not create trace if not primary guest

**Guest Communication:**
- Always inform guest of 24-hour timeframe
- Folio will be emailed automatically by Front Desk Cashiers`,
}
