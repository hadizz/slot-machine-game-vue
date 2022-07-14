<template>
  <component :is="letter"></component>
</template>

<script>
import CherryIcon from './icons/CherryIcon.vue'
import OrangeIcon from './icons/OrangeIcon.vue'
import LemonIcon from './icons/LemonIcon.vue'
import WatermelonIcon from './icons/WatermelonIcon.vue'
import XIcon from './icons/XIcon.vue'
import {CHERRY, LEMON, ORANGE, WATERMELON} from "../constants";

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
    }
  },
  watch: {
    letter: function (newLetter, _oldLetter) {
      switch (newLetter) {
        case CHERRY:
          this.Comp = CherryIcon;
          break;
        case WATERMELON:
          this.Comp = WatermelonIcon;
          break;
        case LEMON:
          this.Comp = LemonIcon;
          break;
        case ORANGE:
          this.Comp = OrangeIcon;
          break;
      }
    }
  },
  setup({letter}) {
    console.log('letter', letter)
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
    }

    return {
      Comp
    }
  }
}
</script>

<style scoped>

</style>