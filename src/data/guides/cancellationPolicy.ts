import type { GuideCard } from './types'

export const cancellationPolicy: GuideCard = {
  id: 'cancellation-policy',
  title: 'Cancellation Policy',
  guide: `**Before Cancelling**

Prior to cancelling any room reservation, inquire about modifying the room or changing the dates as an alternate option

**Verify Deposit Information**

Confirm all cancellations with deposit:
- Payment method
- Amount prior to refund

**Cancelling with 72/48 Hour Policy**

Reservations are refundable if notice received at least 72/48 hours prior to arrival date

Credit card refunds executed by sales agent

Check deposits, web and GDS reservations refunded by Advance Deposit

**Add Required Comment**

All reservations require a comment:
- Credit card has been verified
- Refund has been applied

**Offer Additional Cancellations**

Ask the caller: "Are there any other reservations that you would like to cancel at this time; example: dinner or show reservations."

Comment the offer and caller's response on reservation before cancelling

**Within Cancellation Policy**

Call In, Web, or GDS canceled within applicable cancel policy prior to arrival date:
- Subject to forfeit one-night deposit per policy
- See Advance Deposit P&P

**Emergency Cancellations Within Policy**

On rare occasions (family emergency or weather-related flight cancellations):
- Sales Agents have empowerment to waive applicable cancellation policy
- MUST note reason for cancellation in comments
- MUST note guest has been given full refund
- Without proper comments, Front Desk will reinstate reservation and re-charge guest

**Verify Reservation Type**

Ensure Call Center is not prohibited from making modifications:
- Check if Wholesale
- Check if Housing Bureau
- Check if Wynn slot app
- Check for other restrictions`,
  notification: `⚠️ **CRITICAL REQUIREMENTS:**

**Deposit Refund Policy:**
- Guest reservation may be cancelled without penalty if cancellation is prior to applicable policy (72/48 hrs, 30 day, etc.)
- Refund depends on timing and reservation type

**Required Comments:**
- ALL cancellations require comment confirming credit card verified and refund applied
- Emergency waivers MUST include reason and confirmation of full refund
- Failure to comment properly causes Front Desk to reinstate and re-charge guest

**Holidays & Special Events:**

**New Year's Reservations:**
- Minimum 3-night stay required
- No arrivals on 12/31 accepted
- 30-day cancellation policy applies
- Confirmation letter sent to all confirmed reservations
- Reservations made within 30 days are non-refundable

**Management Override:**
- Management may revise normal 72/48 hr policy when business demands
- Always check for special event policies

**Emergency Waiver Authorization:**

Sales Agents empowered to waive cancellation policy ONLY for:
- Family emergencies
- Weather-related flight cancellations

**NOT Authorized For:**
- General change of plans
- Found better rate elsewhere
- Personal convenience

**Refund Processing:**

**Credit Card Deposits:**
- Sales Agent processes refund directly

**Check Deposits:**
- Refunded by Advance Deposit department

**Web/GDS Reservations:**
- Refunded by Advance Deposit department

**Within Policy Cancellations:**
- Subject to forfeit one-night deposit
- No refund issued
- See Advance Deposit P&P

**REMEMBER:**

**Always Offer Alternatives:**
- Modify room type
- Change dates
- Different property (Wynn vs Encore)

**Always Offer Additional Cancellations:**
- Dinner reservations
- Show reservations
- Spa appointments
- Other hotel services

**Verify Restrictions:**
- Wholesale reservations - refer back to third party
- Housing Bureau - follow group policies
- Wynn slot app - special handling required
- Casino Marketing - refer to host/marketing

**Documentation is Critical:**
- Proper comments prevent guest inconvenience
- Protect both guest and company
- Ensure accurate accounting`,
  quickCheckmark: `Check cancellation policy
Check if deposit was made/refund if needed
Options-cancel-give reason and verification method
Send cancellation email`,
}

