import type { GuideCard } from './types'
import { newReservation } from './newReservation'
import { rateAvailability } from './rateAvailability'
import { roomTypes } from './roomTypes'
import { folioRequests } from './folioRequests'
import { eciLco } from './eciLco'
import { ccAuth } from './ccAuth'
import { courtesyHold } from './courtesyHold'
import { connectingRooms } from './connectingRooms'

export const GUIDES: GuideCard[] = [
  newReservation,
  rateAvailability,
  roomTypes,
  folioRequests,
  eciLco,
  ccAuth,
  courtesyHold,
  connectingRooms,
]

export type { GuideCard }
