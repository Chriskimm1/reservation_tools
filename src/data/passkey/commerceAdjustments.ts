import type { PassKeyGuide } from './types'

export const commerceAdjustments: PassKeyGuide = {
  id: 'pk-commerce-adjustments',
  title: 'Commerce Adjustments',
  guide: `**What are Commerce Adjustments?**

Commerce adjustments allow modifications to the financial aspects of a reservation, including rate changes, discounts, and charge corrections.

**Types of Adjustments**

Rate Adjustments:
- Applying promotional rates
- Group rate corrections
- Negotiated rate application

Charge Adjustments:
- Adding fees
- Removing charges
- Applying discounts or credits

**Applying a Rate Adjustment**

Steps to adjust rate:
- Open the reservation
- Navigate to Rate/Commerce section
- Select Adjust Rate
- Enter new rate or select rate code
- Document reason for adjustment
- Save changes

Approval may be required for:
- Rates below contracted minimums
- Significant discounts
- Complimentary upgrades

**Applying Discounts**

Available discount types:
- Percentage discount
- Fixed dollar amount off
- Promotional code application

To apply:
- Access the reservation
- Go to Adjustments or Discounts
- Select discount type
- Enter amount or percentage
- Add authorization code if required
- Save and verify new total

**Refund Processing**

When processing refunds:
- Verify original payment method
- Calculate refund amount
- Process through appropriate channel
- Document refund reason
- Provide refund confirmation

**Adjustment Documentation**

Always document:
- Reason for adjustment
- Authorization (if required)
- Original vs. adjusted amounts
- Date and time of adjustment
- Agent ID or name`,
  notification: `**Authorization Requirements**

⚠️ Some adjustments require supervisor approval:
- Discounts exceeding policy limits
- Rate overrides
- Significant refunds
- Complimentary nights

**Documentation Standards:**
- Include specific reason for adjustment
- Note any authorization codes
- Keep records for audit purposes`
}
