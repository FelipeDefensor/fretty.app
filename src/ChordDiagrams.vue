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
      :barres="shape.barres"
      :numStrings="tuning.length"
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
      let shapes = getShapes(
        this.notes,
        strings,
        this.fretAmount,
        4,
        12,
        4,
        this.chordShapesOptions.showDoublings,
        !this.chordShapesOptions.showInversions ? [this.notes[0]] : null
      );
      for (let j = 0; j < shapes.length; j++) {
        const shape = shapes[j];
        shape["original"] = shape.frets;
        if (!shape.frets.every((x) => x == "x" || x <= 5)) {
          // first fret to be displayed
          const position = Math.min(
            ...shape.frets.filter((x) => x != "x" && x != 0)
          );
          shape.frets = shape.frets.map((x) =>
            x == "x" || x == 0 ? x : x - position + 1
          );
          shape.barres = shape.barres.map((x) => ({
            ...x,
            fret: x.fret - position + 1,
          }));
          shape["position"] = position;
        } else {
          shape["position"] = 0;
        }

        const frets = [];
        for (let i = 0; i < numStrings; i++) {
          let remove = false;
          // do not display circles if
          // fret is part of barre
          for (let barre of shape.barres) {
            remove |=
              barre.fret == shape.frets[i] &&
              i + 1 >= barre.fromString &&
              i + 1 <= barre.toString;
          }
          if (!remove) {
            const fret = shape.frets[i];
            // frets must 1-indexed and pushed in reverse order
            // due to how @chordbook/charts works
            frets.push([shape.frets.length - i, fret]);
          }
        }

        // barres must be reflected due to how @chordbook/charts works
        const barres = shape.barres.map((x) => ({
          fret: x.fret,
          fromString: numStrings - x.fromString + 1,
          toString: numStrings - x.toString + 1,
        }));
        shapes[j] = { ...shapes[j], frets, barres };
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
