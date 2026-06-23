import type { GuideCard } from './types'

export const chargingCreditCards: GuideCard = {
  id: 'charging-credit-cards',
  title: 'Charging Credit Cards',
  guide: `**Charging a Deposit - New Reservation**

Deposit will auto-request based on reservation type

If not automatic:
1. Select Options
2. Select Deposit/CXL
3. Select Payment

Verify credit card on file appears

Amount due auto-fills as positive amount (example: $685.84)

Click OK to charge

Res Type updates to DEP after completion

**ALWAYS verify charge was approved before confirming reservation**

**If Card Declines**

Inform caller: "The charge was not approved"

Request another form of payment

Never say "declined" - always use "not approved"

**Refunding a Deposit - Cancelled Reservation**

1. Select Options
2. Select Deposit/CXL
3. Select Payment
4. Enter NEGATIVE amount (example: -$191.61)
5. Verify CC number matches deposit screen
6. Click OK to process credit
7. Verify final balance shows $0.00

**Adjusting Deposit - Revised Reservation**

When arrival date or room type changes:

Check if new rate requires deposit adjustment

If increasing deposit:
1. Go to Deposit screen
2. Charge additional amount needed

If decreasing deposit:
1. Go to Deposit screen
2. Credit difference as negative amount

**Multiple Room Reservations**

Deposit screen shows total for ALL rooms

BEFORE charging deposit:
1. Select Options
2. Select Party
3. Split reservations

After splitting:
Go to each reservation individually and charge appropriate deposit amount

**Over Charged Deposit - Error Recovery**

If you mis-type amount or decimal point:

1. IMMEDIATELY notify supervisor
2. DO NOT reverse charge yourself
3. Supervisor contacts accounting to void transaction
4. This prevents incorrect charge from reaching bank

**Verify Before Processing**

Face of Reservation:
- CC on face matches deposit screen
- Credit displays showing deposit amount paid

Deposit Screen:
- CC number matches actual deposit screen
- DO NOT assume face CC is same as deposit screen`,
  
  notification: `⚠️ **DECLINED CARDS SHOWING "DUE AMOUNT"**

Some reservations show "Due Amount" in deposit screen but were NEVER actually charged due to decline. DO NOT credit these reservations. Always verify actual charge occurred before processing refund.

⚠️ **CANCELLATION PENALTY MESSAGE**

Automatic message appears for all reservations requiring advance deposit. This does NOT mean deposit was charged. ALWAYS verify in deposit screen if actual charge occurred before processing refund.

⚠️ **FINAL BALANCE CHECK**

After processing credit, reservation MUST show $0.00 guest balance. Report any discrepancies to management immediately.

⚠️ **NON-CANCELLABLE RESERVATIONS**

NON-Cancellable rate codes = NON-Refundable deposits. Check rate code before agreeing to cancel or refund.

⚠️ **MULTIPLE ROOMS**

NEVER set Default Num Rooms to more than 1. Always use Party feature to split reservations BEFORE charging deposits.

⚠️ **TOKENIZATION**

See separate Tokenization policy for credit card input details.`
}
