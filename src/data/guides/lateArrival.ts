import type { GuideCard } from './types'

export const lateArrival: GuideCard = {
  id: 'late-arrival',
  title: 'Late Arrival Policy',
  guide: `**POLICY**
In an effort to better accommodate our guests who are arriving **after midnight** or even the following morning, DWCC agents will complete the following Opera tasks to prevent any guest delays.

**PROCEDURE**

**1. Obtain Guest ETA**
- Agent must obtain the guest's **ETA** (estimated time of arrival)
- This should be noted on the **face of the reservation**

**2. Add Reservation Comment**
- Add a **Reservation Comment** detailing a brief explanation of the late arrival/sleep out request

**3. Add Reservation Alert**
- Select **Options**
- Select **Alerts**
- Select **New**
- Select the **Code** dropdown
- Select **LA** (Late Arrival - Do not check out!)
- Select the **Area** drop-down box
- Select **Reservation**
- Select **OK**
- Select **Close** to exit the Alert popup window

**4. Add Trace**
- Select **Traces**
- Select **New**
- Enter **From Date & To Date** (day guest is arriving)
- Enter **Time** as **5:00am**
- Select the appropriate **Dept Code** in the dropdown. Place an **X** next to the item and select **OK**:
  - **EFD** - Encore Resort
  - **FD** - Wynn Resort
  - **STS** - Wynn Tower Suites
  - **ETS** - Encore Tower Suites
- Enter "**Late arrival/sleep out**" in the **Trace Text** box
- Select **OK**

**5. Add Specials Codes**
- On the face of the reservation, select the **Specials Code** dropdown
- Select **LA** (Late Arrival) & **KK** (Kiosk Key)
- Select **OK**

**6. Update Source Code to SLEEPOUT**
- Select the dropdown next to **Source**
- Select **SLEEPOUT**
- **If the Source dropdown is grayed out:**
  - Go to **Daily Details**
  - Select **Edit**
  - Select the dropdown next to **Source**
  - Select **SLEEPOUT**`
}
