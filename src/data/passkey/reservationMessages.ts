import type { PassKeyGuide } from './types'

export const reservationMessages: PassKeyGuide = {
  id: 'pk-reservation-messages',
  title: 'Reservation Messages',
  guide: `**Understanding System Messages**

PassKey displays three types of messages:
- Errors (Red) - Must be resolved to proceed
- Warnings (Yellow) - Important but can continue
- Messages (Blue/Info) - Informational alerts

**Error Messages**

Errors prevent completion of the action. Common errors:
- "Required field missing" - Complete all required fields
- "Invalid date range" - Dates outside block window
- "Room not available" - Select different room type or dates
- "Payment declined" - Verify payment information
- "Guest already exists" - Duplicate profile found

Resolution steps:
- Read error message carefully
- Identify the problematic field
- Correct the information
- Attempt action again

**Warning Messages**

Warnings alert you to potential issues:
- "Rate differs from group rate" - Verify rate is correct
- "Stay extends beyond block" - Dates partially outside block
- "Guest has existing reservation" - Possible duplicate
- "Credit card expiring soon" - Card expires during stay

You can proceed with warnings, but:
- Acknowledge the warning
- Verify information is intentional
- Document any exceptions

**Informational Messages**

System notifications include:
- "Confirmation email sent"
- "Reservation saved successfully"
- "Block inventory updated"

**Hotel Shutoff Message**

When you see "Hotel Shutoff":
- The hotel has reached capacity for those dates
- Group block may be sold out
- Check alternative dates
- Contact group coordinator for options

Response to guest:
- Apologize for unavailability
- Offer alternative dates if available
- Suggest waitlist options
- Provide contact for group coordinator

**Inventory Alerts**

Low inventory messages:
- "Limited availability" - Few rooms remain
- "Last room available" - Only one room left
- "Sold out" - No rooms available

High demand notifications:
- Peak dates identified
- Minimum stay requirements
- Rate restrictions`,
  notification: `**Message Priority**

🔴 **Errors** - MUST be resolved before proceeding
🟡 **Warnings** - Review carefully, proceed with caution
🔵 **Messages** - Informational, acknowledge and continue

**Common Error Resolutions:**

- Invalid dates → Check group block dates
- Payment declined → Verify card details, try alternate payment
- Room unavailable → Check different room types or dates
- Missing fields → Review required fields highlighted in red

**Hotel Shutoff Procedure:**
1. Apologize for the inconvenience
2. Verify no inventory truly available
3. Offer alternatives (different dates, room types)
4. Escalate to supervisor if needed
5. Document interaction`
}
