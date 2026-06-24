import type { PassKeyGuide } from './types'

export const overview: PassKeyGuide = {
  id: 'overview',
  title: 'PassKey Overview',
  guide: `**What is PassKey?**

PassKey is a reservation management system used for group and event bookings. It allows guests to make, modify, and cancel reservations within contracted room blocks.

**Field Types**

There are three types of fields you'll encounter:
- Option List fields (dropdown selections)
- Required fields (must be completed)
- Optional fields (can be left blank)

**Option List Fields**

Select a value from pre-defined dropdown options. Common option lists include:
- Room Types
- Rate Codes
- Payment Methods
- Country/State selections

**Required Fields**

These fields must be completed to proceed:
- Guest Name (First & Last)
- Arrival Date
- Departure Date
- Room Type
- Contact Information (Email or Phone)
- Payment Information

**Optional Fields**

Additional fields that enhance the reservation:
- Special Requests
- Accessibility Needs
- Loyalty Program Number
- Additional Guest Names
- Comments/Notes`,
  notification: `**Important Notes**

- Always verify event/group codes before processing
- Confirm all required fields are completed
- Double-check dates align with group block dates
- Verify rate falls within contracted rates`
}
