import type { GuideCard } from './types'

export const ccAuth: GuideCard = {
  id: 'cc-auth',
  title: 'Credit Card Authorization',
  guide: `**Verify Credit Card Type**

Confirm if the credit card is DOMESTIC (US bank card)

International cards: Must be 7+ days prior to arrival

Same day CC Auth cannot be processed

**Domestic Credit Card - Send Link**

If domestic bank card, place trace and link will be sent to guest

No need to call Head Cashier or FD Assistant Manager

Advise guest to:
- Look for the link email
- Complete it PRIOR to check-in
- Ensure CC address matches exactly
- Maximum 3 submission attempts

**Check for Existing Deposit**

If deposit exists:
- Refund original CC in Opera (Deposit screen)
- Change Payment Type to CH
- Change Res. Type to Due
- Change deposit rule to 2D (48-hr courtesy hold)

If no deposit:
- Set Payment Type to CH
- Set Res. Type to Due
- Change deposit rule to 2D (48-hr courtesy hold)

**Advise Guest**

"An email will be sent to you within the next 24-48 hours. When it arrives, please click on the link provided. You will be directed to a secured site to complete your credit card authorization form. Once you have entered your information, our team will be notified, and we will be able to complete your request."

If link not completed prior to arrival: Guest must present ID and credit card in their name at Front Desk

**Add Comment**

Enter comment on reservation: "CC auth pending"

**Create Trace Screen**

From reservation, select Options, Traces, New

Fill required fields:
- From Date: NEXT day from trace entry (tomorrow's date)
- To Date: NEXT day from trace entry (tomorrow's date)
- Time: 05:00 AM
- Dept Code: FOCC (Front Office Credit Card Auth)
- Trace Text: USE EXACT FORMAT BELOW

Trace Format:
[Opera Conf #] - [Guest Name]
CCH [CC Holder Name]
[Email Address]
[Phone Number]
[Coverage Type]

Coverage Options:
- ROOM/TAX only for 1st night
- ROOM/TAX only for entire stay
- ROOM/TAX/RF for 1st night
- ROOM/TAX/RF for entire stay
- Resort Fee only for 1st night
- Resort Fee only for entire stay

Click OK to save trace`,
  notification: `⚠️ **POLICY REQUIREMENTS:**

**Maximum Rooms:**
- Call Center: Up to 8 rooms maximum
- 9+ rooms: Transfer to Specialty Dept ext. 2223

**Credit Card Restrictions:**
- International CC: 7+ days prior to arrival required
- Domestic CC ONLY for advance bookings
- NO same-day CC authorizations accepted

**Link Submission:**
- Guest has maximum 3 attempts to submit
- All information must match exactly
- CC address must match submission address
- If declined after 3 attempts: Alternate payment required at check-in

**Deposit Handling:**
- If existing deposit: MUST refund first
- Entire CC auth payment processes through portal
- Cannot split between deposit and authorization

**Trace Requirements:**
- Must use tomorrow's date (not arrival date)
- Time must be 05:00 AM
- Use FOCC department code
- Follow exact trace format

**CONTACT INFORMATION:**

**Head Cashiers:**
- Wynn ext. 2163 | ResortHeadCashier@wynnlasvegas.com
- Encore ext. 4019 | EncoreResortHeadCashier@wynnlasvegas.com

**Front Desk Management:**
- Wynn Resort ext. 2192 | ResortFrontDeskManagement@wynnlasvegas.com
- Encore Resort ext. 4007 | EncoreFrontDeskManagement@wynnlasvegas.com
- Wynn Tower Suites ext. 2192 | TowerSuitesManagers@wynnlasvegas.com
- Encore Tower Suites ext. 4060 | EncoreSuitesManagers@wynnlasvegas.com`,
}
