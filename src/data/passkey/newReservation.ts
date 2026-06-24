import type { PassKeyGuide } from './types'

export const newReservation: PassKeyGuide = {
  id: 'pk-new-reservation',
  title: 'Creating a New Reservation',
  guide: `**Step 1: Access the Reservation System**

Navigate to PassKey and select the appropriate event or group block.

Enter the event code or search for the group name.

**Step 2: Guest Information**

Enter guest details:
- First Name (Required)
- Last Name (Required)
- Email Address (Required for confirmation)
- Phone Number
- Company/Organization (if applicable)

**Step 3: Stay Details**

Select arrival and departure dates:
- Dates must fall within the group block window
- Verify room availability for selected dates

Choose room type:
- Review available room types
- Confirm rate matches contracted group rate
- Note any room-specific amenities

**Step 4: Payment Information**

Collect payment details:
- Credit Card Type
- Card Number
- Expiration Date
- CVV (if required)
- Billing Address

**Step 5: Special Requests**

Document any special needs:
- Accessibility requirements
- Room preferences (high floor, quiet room, etc.)
- Adjoining/connecting room requests
- Early check-in or late check-out needs

**Step 6: Review and Confirm**

Before finalizing:
- Verify all guest information is correct
- Confirm dates and room type
- Review total charges including taxes and fees
- Read back confirmation details to guest

**Step 7: Send Confirmation**

Complete the reservation:
- Provide confirmation number to guest
- Send email confirmation
- Document any verbal confirmations`,
  notification: `**Booking Reminders**

⚠️ Always verify the following before completing:
- Event/group code is correct
- Dates fall within group block
- Rate matches contracted rate
- Payment authorization is successful

**Required Disclosures:**
- Deposit requirements
- Cancellation policy
- Resort fees (if applicable)
- Incidental hold amount`
}
