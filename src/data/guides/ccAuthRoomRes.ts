import type { GuideCard } from './types'

export const ccAuthRoomRes: GuideCard = {
  id: 'cc-auth-room-res',
  title: 'Credit Card Authorization - Room Reservations',
  guide: `💡 [Click here to open CC Auth Trace generator →](#templates:ccauth)

**Overview**
To expedite the reservation experience and ensure accuracy with third-party billing requests for room/tax/resort fee charges, the following procedures will be performed by the call center agent.

**Important Policy Notes**
- Agent will follow all normal procedures in booking the guest room reservation
- International credit cards cannot be accepted less than 7 days prior to arrival
- Credit Card Authorizations will not be accepted on reservations booked on the day of arrival
- Any reservation that is confirmed in advance (prior to the day of arrival) to add a Credit Card Authorization can only be processed if it is a domestic credit card
- Agents can process cc authorization for new and existing reservations for up to eight (8) rooms maximum only
- For any request for nine (9) rooms or more, you must transfer all requests to Specialty Department at extension 2223
- Specialty Department will process cc authorization for new and existing reservations for nine (9) rooms or more

**Procedure**

Call Center Agents will handle pre-arrival third-party billing requests in the following manner:

**a) Verify Domestic Credit Card**

Agent will verify if the credit card is a domestic bank credit card (No exceptions for international credit cards)

i. If it is a domestic bank card:
- Place the trace on the reservation and a link will be sent out to the guest
- There is no need to call Head Cashier or FD Assistant Manager (even for same day CC Authorizations)

ii. Agent must advise guest to:
- Look out for the link and we must receive it back prior to guest check in
- The address to the credit card must match what address they use to complete the link (all information must match entirely)
- If the credit card declines, guest can only click and submit the link a total max times of (3) three
- Otherwise the guest must be prepared for an alternate form of payment upon check in with the front desk

**b) All Other Third-Party Billing Requests**

For requests 48+ hours prior to arrival and 7 days prior to arrival for international CC's, the agent will complete the following process:

**i) Verify Existing Deposit**

Agent will verify if a deposit has already been charged on the reservation

(1) If there is a deposit:
- Agent must advise the guest that the initial deposit will be refunded
- The entire credit card authorization payment must be processed through the portal
- Refund the original credit card in Opera from the deposit screen
- Change the Payment Type to CH and the Res. Type to Due
- Change the deposit rule to 2D (48-hr. courtesy hold)

(2) If there is no deposit on the reservation:
- Hold the reservation under a 48-hr. courtesy hold
- Set the Payment Type to CH and the Res. Type to Due
- Change the deposit rule to 2D (48-hr. courtesy hold)

**ii) Advise Guest**

Agent will advise the guest of the following:

"An email will be sent to you within the next 24 - 48 hours. When it arrives, please click on the link provided. You will be directed to a secured site to complete your credit card authorization form. Once you have entered your information, our team will be notified, and we will be able to complete your request."

**iii) Additional Guest Advisory**

Agent must advise guest that if the link is not completed prior to arrival, the guest will have to present an ID and credit card in their name to pay for all night's room/tax/resort fee charges at the Front Desk.

**iv) Add Comment**

Enter a comment on the reservation: "CC auth pending"

**v) Create Trace**

Create a trace to Front Office Credit Card Authorizations

(1) From the face of the reservation:
- Select Options
- Select Traces
- Select New

(2) Agent must input the following information:

From Date:
- Defaults to the arrival date
- This MUST be revised to the next day from trace entry date (i.e., tomorrow's date)

To Date:
- Defaults to the arrival date
- This MUST be revised to the next day from trace entry date (i.e., tomorrow's date)

Time:
- Defaults to the current time of day you are inputting the trace
- This MUST be revised to 05:00 AM

Dept Code:
- FOCC - Front Office Credit Card Auth

Trace Text: (USE THIS EXACT FORMAT)
- Opera Confirmation # & Guest Name
- CC Holder Name, Email Address & Phone Number
- CC Auth to cover which applicable transactions:
  1. ROOM/TAX only for 1st night or entire stay
  2. ROOM/TAX/RF for 1st night or entire stay
  3. Resort Fee only for 1st night or entire stay

(3) Click OK to complete the trace

💡 [Click here to open CC Auth Trace generator →](#templates:ccauth)

**For Any Additional Questions:**

Head Cashiers:
- Wynn ext. 2163 | ResortHeadCashier@wynnlasvegas.com
- Encore ext. 4019 | EncoreResortHeadCashier@wynnlasvegas.com

Front Desk Management:
- Wynn Resort ext. 2192 | ResortFrontDeskManagement@wynnlasvegas.com
- Encore Resort ext. 4007 | EncoreFrontDeskManagement@wynnlasvegas.com
- Wynn Tower Suites ext. 2192 | TowerSuitesManagers@wynnlasvegas.com
- Encore Tower Suites ext. 4060 | EncoreSuitesManagers@wynnlasvegas.com`,
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
