import type { GuideCard } from './types'
import { newReservation } from './newReservation'
import { rateAvailability } from './rateAvailability'
import { roomTypes } from './roomTypes'
import { folioRequests } from './folioRequests'
import { eciLco } from './eciLco'
import { ccAuth } from './ccAuth'
import { courtesyHold } from './courtesyHold'
import { connectingRooms } from './connectingRooms'
import { cancellationPolicy } from './cancellationPolicy'
import { sendingConfirmation } from './sendingConfirmation'
import { backToBack } from './backToBack'

export const GUIDES: GuideCard[] = [
  backToBack,           // Back to Back Reservations
  cancellationPolicy,   // Cancellation Policy
  connectingRooms,      // Connecting Rooms Policy
  courtesyHold,         // Courtesy Hold Reservations
  ccAuth,               // Credit Card Authorization
  eciLco,               // Early Check-in & Late Check-Out
  folioRequests,        // Folio Requests
  newReservation,       // New Reservation
  rateAvailability,     // Rate & Room Availability
  roomTypes,            // Room Types
  sendingConfirmation,  // Sending Confirmation Emails
]

export type { GuideCard }
