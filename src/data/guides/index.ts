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
import { chargingCreditCards } from './chargingCreditCards'
import { additionalRequests } from './additionalRequests'
import { uptower } from './uptower'
import { sphereView } from './sphereView'
import { superAccessible } from './superAccessible'
import { specialsRoomFeatures } from './specialsRoomFeatures'
import { lateArrival } from './lateArrival'
import { reservationTraces } from './reservationTraces'
import { reservationAlerts } from './reservationAlerts'

export const GUIDES: GuideCard[] = [
  additionalRequests,   // Additional Requests
  backToBack,           // Back to Back Reservations
  cancellationPolicy,   // Cancellation Policy
  chargingCreditCards,  // Charging Credit Cards
  connectingRooms,      // Connecting Rooms Policy
  courtesyHold,         // Courtesy Hold Reservations
  ccAuth,               // Credit Card Authorization
  eciLco,               // Early Check-in & Late Check-Out
  folioRequests,        // Folio Requests
  lateArrival,          // Late Arrival Policy
  newReservation,       // New Reservation
  rateAvailability,     // Rate & Room Availability
  reservationAlerts,    // Reservation Alerts
  reservationTraces,    // Reservation Traces
  roomTypes,            // Room Types
  sendingConfirmation,  // Sending Confirmation Emails
  specialsRoomFeatures, // Specials and Room Features
  sphereView,           // Sphere View Upgrade Options
  superAccessible,      // Super Accessible Room Reservations
  uptower,              // Uptower Rate Code
]

export type { GuideCard }
