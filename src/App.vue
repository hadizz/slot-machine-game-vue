<script setup>
import {ref} from 'vue'
import {ITEMS, SCORES} from "./constants";
import Cell from './components/Cell.vue'

// states and variables
const first = ref('X');
const second = ref('X');
const third = ref('X');

const credit = ref(10);
const userCredit = ref(0);

const spinning_first = ref(false);
const spinning_second = ref(false);
const spinning_third = ref(false);

// methods
const chance = (value) => {
  return Math.random() * 100 < value;
}

const random = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
}

const decideToReRoll = () => {
  if (credit.value < 40) {
    return false
  } else if (credit.value >= 40 && credit.value < 60) {
    return chance(30);

  } else if (credit.value >= 60) {
    return chance(60);
  }
}

const calcScore = () => {
  const getRandomNumber = () => random(0, ITEMS.length - 1)
  const randomItem = () => ITEMS[getRandomNumber()]
  first.value = randomItem()
  second.value = randomItem()
  third.value = randomItem()
  if (first.value === second.value && second.value === third.value) {
    if (decideToReRoll()) {
      return calcScore();
    } else {
      return SCORES[first.value];
    }
  }
  return false
}

const roll = () => {
  spinning_first.value = true;
  spinning_second.value = true;
  spinning_third.value = true;
  const newScore = calcScore()

  // fake waiting
  setTimeout(() => {

    setTimeout(() => spinning_first.value = false, 1000)
    setTimeout(() => spinning_second.value = false, 2000)
    setTimeout(() => {
      spinning_third.value = false;
      if (!!newScore) {
        credit.value += newScore
      } else {
        credit.value--;
      }
    }, 3000)

  }, 1000)
}
</script>

<template>
  <main>
    <div class="d-flex flex-over-center">
      <table>
        <tr>
          <td>
            <Cell :letter="first" :spinning="spinning_first"/>
          </td>
          <td>
            <Cell :letter="second" :spinning="spinning_second"/>
          </td>
          <td>
            <Cell :letter="third" :spinning="spinning_third"/>
          </td>
        </tr>
      </table>
      <img
          class="cursor-pointer"
          @click="roll"
          src="./assets/joystick.png"
          alt="joystick"
          aria-label="joystick button"
          width="48" height="48"
      />
    </div>

    <div class="d-flex flex-column flex-over-center mt-8">

      <h1>game credit: {{ credit }}</h1>
      <h1>user credit: {{ userCredit }}</h1>
      <br>
      <button>cash out</button>
    </div>
  </main>
</template>

<style>
@import './assets/base.css';

main {
  margin: 2rem auto;
}

table {
  border-spacing: 8px 8px;
}

td {
  border: 1px solid grey;
  font-size: 24px;
  width: 40px;
  margin: 8px;
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
}
</style>
