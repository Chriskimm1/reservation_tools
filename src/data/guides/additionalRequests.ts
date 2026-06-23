import type { GuideCard } from './types'

export const additionalRequests: GuideCard = {
  id: 'additional-requests',
  title: 'Additional Requests',
  guide: `**Extra Persons**

1. Advise guest of $50 per night fee per additional person over double occupancy
2. Advise maximum 4 people per room (more than 4 requires management approval)
3. Note in Comments Field: "Guest informed of $50/night extra person charge"

**Roll-Away Bed**

1. Advise guest of $50 per night fee
2. Select "RB" in Specials Field
3. Note in Comments Field: "Guest informed of $50/night charge, availability only, not guaranteed"

If fee waived:
- Note Manager name who approved waiver in Comments Field

**Crib**

1. Advise guest no charge
2. Advise based on availability, not guaranteed
3. Select "CR" in Specials Field
4. Note in Comments Field: "Crib request, availability only, not guaranteed"

**Refrigerator**

1. Advise guest of $25 per stay fee
2. Select "FR" in Specials Field
3. Note in Comments Field: "Guest informed of $25/stay charge, availability only, not guaranteed"

If fee waived:
- Note Manager name who approved waiver in Comments Field

**Medical Cooler**

1. Advise guest no charge for medical cooler
2. Select "FR" in Specials Field
3. Note in Comments Field: "Medical cooler, availability only, not guaranteed"

**Bottle Warmer**

1. Advise guest no charge for bottle warmer
2. Select "FR" in Specials Field
3. Note in Comments Field: "Bottle warmer for baby formula, availability only, not guaranteed"
4. Front Desk will notify PBX to deliver at check-in

**Hot Water Delivery**

Resort Guest:
- Advise $9 plus tax delivery charge

Tower Suite Guest:
- Advise no charge for delivery

Note in Comments Field: Request details and guest informed of applicable charges

**Ice Delivery**

Resort Guest:
- Advise $9 plus tax delivery charge

Tower Suite Guest:
- Advise no charge for delivery

Note in Comments Field: Request details and guest informed of applicable charges`,
  
  notification: `⚠️ **ALWAYS COMMUNICATE FEES**

Inform guests of ALL additional charges BEFORE processing request. Guest must acknowledge and agree to charges.

⚠️ **REQUIRED NOTATION**

Comments Field must include:
- Guest was informed of charge (if applicable)
- Based on availability only
- Not guaranteed
- Manager name if fee was waived

⚠️ **EXTRA PERSON FEES**

$50 per night per person over double occupancy. Children are NOT excluded - charged as adults. Maximum 4 people per room. More than 4 requires management approval.

⚠️ **ROLL-AWAY BED WAIVERS**

Fee WAIVED if guest already paying for 3rd or 4th person charge. NO CHARGE for EXEC, PARL, SALN, APT2, FV1, FV2, DUP3 (up to 2 complimentary, availability based). NO CHARGE if queen beds reserved but unavailable at arrival.

⚠️ **ROLL-AWAY RESTRICTIONS**

Roll-away beds NOT PERMITTED in queen bed rooms due to fire safety regulations at Wynn.

⚠️ **REFRIGERATOR EXCEPTIONS**

Tower Suites (PARL, SALN, HES): Fridge already in room. EXEC: Fridge can be brought in at no charge.

⚠️ **DELIVERY CHARGES**

Hot water and ice: $9 + tax for Resort guests. Tower Suite guests: No charge. Excessive ordering (even for no-charge guests) may result in additional charges.

⚠️ **SPECIALS FIELD CODES**

RB = Roll-away Bed
CR = Crib
FR = Refrigerator/Fridge (also used for medical cooler and bottle warmer)`
}
