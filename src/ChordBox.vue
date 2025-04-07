<template>
  <button
    class="chordbox cell"
    ref="chordbox"
    @mouseover="() => onHover(this.index)"
    @mouseleave="onLeave"
  ></button>
</template>

<script>
import { ChordBox } from "@chordbook/charts";

export default {
  name: "ChordBox",
  props: {
    index: Number,
    frets: Array,
    position: Number,
    barres: Array,
    numStrings: Number,
    onHover: Function,
    onLeave: Function,
  },
  mounted() {
    this.drawChordbox();
  },
  watch: {
    frets() {
      this.drawChordbox();
    },
  },
  methods: {
    drawChordbox() {
      const chordboxHtml = this.$refs.chordbox;
      chordboxHtml.innerHTML = "";
      const chordBox = new ChordBox(chordboxHtml, {
        showTuning: false,
        defaultColor: "black",
        numStrings: this.numStrings,
      });
      chordBox.draw({
        chord: this.frets,
        position: this.position,
        barres: this.barres,
      });
    },
  },
};
</script>

<style>
.chordbox {
  background-color: transparent;
}
.chordbox:hover {
  background-color: rgb(233, 233, 233);
  transition: background-color 0.2s ease-in-out;
}
</style>
