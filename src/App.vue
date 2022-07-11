<script setup>
import {ref, onMounted} from 'vue'

// states and variables
const CHERRY = 'C';
const LEMON = 'L';
const ORANGE = 'O';
const WATERMELON = 'W';
const X = 'X';

const ITEMS = [CHERRY, LEMON, ORANGE, WATERMELON]

const SCORES = {
  [CHERRY]: 10,
  [LEMON]: 20,
  [ORANGE]: 30,
  [WATERMELON]: 40,
}

const first = ref('X');
const second = ref('X');
const third = ref('X');

const credit = ref(10);
const userCredit = ref(0);

// lifecycles
onMounted(() => {
})

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
  const newScore = calcScore()
  if (!!newScore) {
    credit.value += newScore
  } else {
    credit.value--;
  }
}
</script>

<template>
  <header>
    <h1>slot machine game</h1>
  </header>

  <main>
    <table>
      <tr>
        <td>{{ first }}</td>
        <td>{{ second }}</td>
        <td>{{ third }}</td>
      </tr>
    </table>
    <button @click="plus10">+10</button>
    <button @click="minus10">-10</button>
    <button @click="win">win</button>
    <br>

    <button @click="roll">roll</button>

    <br>

    <button>cash out</button>

    <h1>game credit: {{ credit }}</h1>
    <h1>user credit: {{ userCredit }}</h1>
  </main>
</template>

<style>
@import './assets/base.css';

table {
  border-spacing: 8px 8px;
}


td {
  border: 1px solid grey;
  font-size: 24px;
  width: 40px;
  text-align: center;
  margin: 8px;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
