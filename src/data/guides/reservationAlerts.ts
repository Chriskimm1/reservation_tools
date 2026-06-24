import type { GuideCard } from './types'

export const reservationAlerts: GuideCard = {
  id: 'reservation-alerts',
  title: 'Reservation Alerts',
  guide: `**Policy**

Alerts are pop up messages created to notify other departments of concerns related to a guest.

The functionality of an Alert is a call to action and can be used for many different reasons such as a medical requirement, a special occasion or request, an accounting function (i.e. collect voucher or to personalize a guest visit such as a Birthday or Anniversary).

**Locate Reservation**

Search for the reservation in the Reservations Search screen (Update Resv.) and open the reservation

**Access Alerts**

Select Options

Select Alerts

**Add New Alert**

Select New to add an alert message

Click the Code drop down arrow (or Press F9) to select the category type

Select the appropriate alert based on the scenario

**Select Alert Area**

Click on the Area drop down arrow (or F9) to determine where to alert:
- Check-in
- Check-out
- Reservations
- Cashier

**Add Description**

In the description box, a free form text message can be added

**Save Alert**

Save by selecting OK

Close the alert

**Manage Existing Alerts**

Use the New, Edit and Delete buttons to:
- Attach a new alert to the reservation
- Edit an existing alert
- Delete an alert that no longer applies to the reservation

**Alert Indicator**

The lamp at the bottom of the reservation indicates an alert is active on the reservation`,
  notification: `⚠️ **COMMON ALERT CODES:**

**Guest Requests:**
- LA - Late Arrival - Do not check out
- KK - Keep Key (Sleep Out)
- VIP - VIP Guest

**Special Occasions:**
- BDAY - Birthday
- ANNIV - Anniversary
- HONEYMOON - Honeymoon

**Medical/Accessibility:**
- MED - Medical requirement
- ADA - Accessibility needs

**Accounting:**
- VOUCHER - Collect voucher at check-in
- PREPAID - Prepaid reservation

**ALERT AREAS:**

- Check-in: Alert displays during check-in process
- Check-out: Alert displays during check-out process
- Reservations: Alert displays when reservation is accessed
- Cashier: Alert displays during cashier transactions

**TIPS:**
- Be specific in description text
- Select appropriate area for the alert
- Delete alerts that no longer apply
- Check for existing alerts before adding new ones`,
}
