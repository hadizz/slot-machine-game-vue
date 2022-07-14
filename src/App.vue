<script setup>
import {ref} from 'vue'
import Cell from './components/Cell.vue'
import {chance, random} from "./utilities";
import {calcScore} from "./logic";
import {X} from "./constants";

// states and variables
const first = ref('X');
const second = ref('X');
const third = ref('X');

const credit = ref(10);
const userCredit = ref(0);

const spinning_first = ref(false);
const spinning_second = ref(false);
const spinning_third = ref(false);

const canCashOut = ref(true);
const cashOutRef = ref(null);

// methods

const roll = () => {
  if (credit.value === 0) return;
  spinning_first.value = true;
  first.value = X;
  spinning_second.value = true;
  second.value = X;
  spinning_third.value = true;
  third.value = X;

  const {firstItem, secondItem, thirdItem, score} = calcScore(credit.value)
  console.log({firstItem, secondItem, thirdItem, score})

  // fake waiting
  setTimeout(() => {

    setTimeout(() => {
      spinning_first.value = false;
      first.value = firstItem;
    }, 1000)
    setTimeout(() => {
      spinning_second.value = false;
      second.value = secondItem;
    }, 2000)
    setTimeout(() => {
      spinning_third.value = false;
      third.value = thirdItem;
      if (!!score) {
        credit.value += score
      } else {
        credit.value--;
      }
    }, 3000)

  }, 1000)
}

const cashOut = () => {
  if (canCashOut.value) {
    userCredit.value += credit.value;
    credit.value = 0;
  }
}

const hoverOnCashOut = () => {
  if (chance(50)) {
    const directions = ['top', 'down', 'left', 'right'];
    const randomDirection = directions[random(0, directions.length - 1)]
    const oldValue = +cashOutRef.value.style[randomDirection]?.replace('px', '')
    cashOutRef.value.style[randomDirection] = `${oldValue + 300}px`;
  }
  canCashOut.value = chance(40)
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

      <button ref="cashOutRef" class="cash-out" @click="cashOut" @mouseover="hoverOnCashOut">CASH OUT</button>
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

.cash-out {
  all: unset;
  font-size: 16px;
  color: white;
  border: 1px solid white;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  position: relative;
}
</style>
