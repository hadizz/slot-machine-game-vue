import {chance, random} from "../utilities";
import {ITEMS, SCORES} from "../constants";

export const decideToReRoll = (credit, mockChance = false) => {
    if (credit < 40) {
        return false
    } else if (credit >= 40 && credit < 60) {
        return mockChance ? true : chance(30);
    } else if (credit >= 60) {
        return mockChance ? true : chance(60);
    }
}

export const calcScore = (credit, mockChance = false) => {
    const getRandomNumber = () => random(0, ITEMS.length - 1)
    const randomItem = () => ITEMS[getRandomNumber()]
    const firstItem = randomItem()
    const secondItem = randomItem()
    const thirdItem = randomItem()
    if (firstItem === secondItem && secondItem === thirdItem) {
        if (decideToReRoll(credit, mockChance)) {
            return calcScore(credit, mockChance);
        } else {
            return {
                firstItem,
                secondItem,
                thirdItem,
                score: SCORES[firstItem]
            };
        }
    }
    return {
        firstItem,
        secondItem,
        thirdItem,
        score: false
    }
}
