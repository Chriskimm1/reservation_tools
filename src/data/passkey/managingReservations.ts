import type { PassKeyGuide } from './types'

export const managingReservations: PassKeyGuide = {
  id: 'pk-managing-reservations',
  title: 'Managing Existing Reservations',
  guide: `**Finding a Reservation**

Search options available:
- Confirmation Number (most accurate)
- Guest Last Name
- Guest Email Address
- Arrival Date
- Event/Group Code

Enter search criteria and click Search or press Enter.

**Copying a Reservation**

To duplicate an existing reservation:
- Locate the original reservation
- Select Copy or Duplicate option
- Modify guest information as needed
- Update dates if different
- Review and confirm new reservation

Useful for:
- Multiple guests from same company
- Repeat bookings with similar details

**Modifying a Reservation**

Changes you can make:
- Arrival/Departure dates (within block dates)
- Room type (subject to availability)
- Guest contact information
- Special requests
- Payment method

Changes that may require re-authorization:
- Extended stay dates
- Room type upgrade
- Additional occupants

To modify:
- Open the reservation
- Click Edit or Modify
- Make necessary changes
- Review updated pricing
- Save changes
- Send updated confirmation

**Cancelling a Reservation**

Before cancelling:
- Verify correct reservation selected
- Review cancellation policy
- Check for any penalties or fees

Cancellation process:
- Open the reservation
- Click Cancel Reservation
- Select cancellation reason
- Confirm cancellation
- Provide cancellation number to guest
- Send cancellation confirmation email

**Reinstating a Cancelled Reservation**

If within cancellation window:
- Search for cancelled reservation
- Review original details
- Select Reinstate option
- Verify availability
- Re-collect payment if needed
- Confirm reinstatement`,
  notification: `**Important Reminders**

⚠️ **Before Modifying:**
- Check if changes fall within group block parameters
- Verify rate still applies to new dates
- Confirm availability before promising changes

⚠️ **Cancellation Policy:**
- Always quote cancellation policy
- Document reason for cancellation
- Provide cancellation number
- Confirm refund timing if applicable`
}
