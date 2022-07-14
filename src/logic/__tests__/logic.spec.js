import {describe, it, expect} from 'vitest'
import {decideToReRoll} from "../index";

describe('logic', () => {
    it('decideToReRoll credit 30 should return false', () => {
        expect(decideToReRoll(30)).equal(false)
    })
    it('decideToReRoll credit 40 with mock chance', () => {
        expect(decideToReRoll(40, true)).equal(true)
    })
    it('decideToReRoll credit 60 with mock chance', () => {
        expect(decideToReRoll(60, true)).equal(true)
    })
})
