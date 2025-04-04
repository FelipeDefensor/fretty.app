// src/components/ChordDiagrams.vue
<template>
  <div
    class="columns is-multiline is-centered"
    style="
      max-width: 960px;
      max-height: 305px;
      overflow-y: scroll;
      scrollbar-color: black white;
      padding-right: 15px;
    "
  >
    <ChordBox
      class="column is-narrow"
      v-for="(shape, index) in shapes"
      v-bind:key="index"
      :index="index"
      :frets="shape.frets"
      :position="shape.position"
      :onHover="handleChordBoxHover"
      :onLeave="onChordBoxLeave"
    />
  </div>
</template>

<script>
import { getShapes } from "chord-shapes";
import ChordBox from "./ChordBox.vue";

export default {
  name: "ChordDiagrams",
  props: {
    notes: Array,
    tuning: Array,
    fretAmount: Number,
    onChordBoxHover: Function,
    onChordBoxLeave: Function,
    chordShapesOptions: Object,
  },
  computed: {
    shapes() {
      const numStrings = this.tuning.length;
      const strings = [...this.tuning];
      strings.reverse();
      for (let i = 1; i < numStrings; i++) {
        while (strings[i] < strings[i - 1]) {
          strings[i] += 12;
        }
      }
      const shapes = getShapes(
        this.notes,
        strings,
        this.fretAmount,
        4,
        12,
        4,
        this.chordShapesOptions.showDoublings,
        !this.chordShapesOptions.showInversions ? [this.notes[0]] : null
      );
      for (let shape of shapes) {
        shape["original"] = shape.frets;
        if (!shape.frets.every((x) => x == "x" || x <= 5)) {
          const position = Math.min(
            ...shape.frets.filter((x) => x != "x" && x != 0)
          );
          shape.frets = shape.frets.map((x) =>
            x == "x" || x == 0 ? x : x - position + 1
          );
          shape["position"] = position;
        } else {
          shape["position"] = 0;
        }

        // @chordbook/charts requires the fret order to be inverted
        const frets = [];
        for (let i = 0; i < numStrings; i++) {
          frets.push([i + 1, shape.frets[shape.frets.length - 1 - i]]);
        }
        shape["frets"] = frets;
      }
      return shapes;
    },
  },
  methods: {
    handleChordBoxHover: function (index) {
      this.onChordBoxHover(this.shapes[index].original);
    },
  },
  components: { ChordBox },
};
</script>
