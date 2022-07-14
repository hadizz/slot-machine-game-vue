<template>
  <component :is="letter" :class="spinning ? 'spinning' : ''"></component>
</template>

<script>
import CherryIcon from './icons/CherryIcon.vue'
import OrangeIcon from './icons/OrangeIcon.vue'
import LemonIcon from './icons/LemonIcon.vue'
import WatermelonIcon from './icons/WatermelonIcon.vue'
import XIcon from './icons/XIcon.vue'
import {CHERRY, LEMON, ORANGE, WATERMELON, X} from "../constants";

export default {
  components: {
    C: CherryIcon,
    O: OrangeIcon,
    L: LemonIcon,
    W: WatermelonIcon,
    X: XIcon
  },
  data() {
    Comp: ''
  },
  props: {
    letter: {
      type: String,
      required: true,
    },
    spinning: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    getCompByLetter: (l) => {
      switch (l) {
        case CHERRY:
          return CherryIcon;
        case WATERMELON:
          return WatermelonIcon;
        case LEMON:
          return LemonIcon;
        case ORANGE:
          return OrangeIcon;
        case X:
          return XIcon;
      }
    }
  },
  watch: {
    letter: function (newLetter, _oldLetter) {
      if (!this.spinning) {
        this.Comp = this.getCompByLetter(newLetter);
      }
    },
    spinning: function (newSpinning, oldSpinning) {
      if (newSpinning) {
        this.Comp = this.getCompByLetter(X);
      } else {
        this.Comp = this.getCompByLetter(this.letter)
      }
    }
  },
  setup({letter}) {
    let Comp = '';
    switch (letter) {
      case CHERRY:
        Comp = CherryIcon;
        break;
      case WATERMELON:
        Comp = WatermelonIcon;
        break;
      case LEMON:
        Comp = LemonIcon;
        break;
      case ORANGE:
        Comp = OrangeIcon;
        break;
      case X:
        Comp = XIcon;
        break;
    }

    return {
      Comp
    }
  }
}
</script>

<style scoped>
.spinning {
  animation-name: slideUpOut;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-delay: -2s;
  animation-timing-function: ease-in-out;
  filter: blur(8px);
  -webkit-filter: blur(8px);
}

@keyframes slideUpOut {
  0% {
    top: 38px;
    opacity: 1;
  }
  25% {
    top: -38px;
    opacity: 1;
  }
  75% {
    top: -58px;
    opacity: 0;
  }
  100% {
    top: 38px;
    opacity: 0;
  }
}
</style>