import type { PassKeyGuide } from './types'
import { overview } from './overview'
import { newReservation } from './newReservation'
import { managingReservations } from './managingReservations'
import { commerceAdjustments } from './commerceAdjustments'
import { reservationMessages } from './reservationMessages'

export const PASSKEY_GUIDES: PassKeyGuide[] = [
  overview,               // PassKey Overview
  newReservation,         // Creating a New Reservation
  managingReservations,   // Managing Existing Reservations
  commerceAdjustments,    // Commerce Adjustments
  reservationMessages,    // Reservation Messages
]

export type { PassKeyGuide }
