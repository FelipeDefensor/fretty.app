<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    "
  >
    <div class="columns is-multiline is-centered" style="max-width: 980px">
      <div class="column">
        <!-- Tuning -->
        <b-field label="Tuning">
          <b-autocomplete
            v-model="usr_tuning"
            :data="tuning_search"
            @select="(option) => (selected = option.name)"
            group-field="instrument"
            group-options="tunings"
            open-on-focus
            clearable
            field="tuning"
            icon="guitar"
            style="min-width: 350px"
            @input="saveSettings"
          >
            <div slot-scope="props" style="display: flex">
              <div style="flex: 1 1 0px">{{ props.option.name }}</div>
              <div style="flex: 1 1 0px">{{ props.option.tuning }}</div>
            </div>
          </b-autocomplete>
        </b-field>
      </div>

      <div class="column">
        <!-- Mode-dependent fields -->

        <div v-if="mode === 'scale'" class="columns" style="max-width: 400px">
          <div class="column is-3">
            <b-field label="Tonic">
              <b-input v-model="scale.tonic" icon="music"></b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Scale">
              <b-autocomplete
                v-model="scale.type"
                :data="set_search"
                open-on-focus
                clearable
                append-to-body
                @select="(option) => (selected = option)"
              ></b-autocomplete>
            </b-field>
          </div>
        </div>

        <div
          v-else-if="mode === 'chord'"
          class="columns"
          style="max-width: 400px"
        >
          <div class="column is-3">
            <b-field label="Root">
              <b-input v-model="chord.root" icon="music"></b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Type">
              <b-autocomplete
                v-model="chord.type"
                :data="set_search"
                open-on-focus
                clearable
                append-to-body
                @select="(option) => (selected = option)"
              ></b-autocomplete>
            </b-field>
          </div>
        </div>

        <b-field v-else-if="mode === 'notes'" label="Notes">
          <b-input
            v-model="inputNotes"
            style="max-width: 400px"
            icon="music"
          ></b-input>
        </b-field>

        <div
          v-else-if="mode === 'pc-set'"
          class="columns has-3-cols is-multiline"
          style="max-width: 400px"
        >
          <div class="column is-two-thirds">
            <b-field label="Set" :label-position="'on-border'">
              <b-input v-model="pcSet"></b-input>
            </b-field>
          </div>
          <div class="column is-one-third">
            <b-field label="Forte nº" :label-position="'on-border'">
              <b-autocomplete
                v-model="forteNumber"
                :data="set_search"
                open-on-focus
                clearable
                append-to-body
                @select="(option) => (selected = option)"
              ></b-autocomplete>
            </b-field>
          </div>
          <div class="column is-4">
            <b-field label="Prime form" :label-position="'on-border'">
              <b-input v-model="primeForm"></b-input>
            </b-field>
          </div>

          <div class="column is-4">
            <b-field label="Normal form" :label-position="'on-border'">
              <b-input v-model="normalForm" readonly></b-input>
            </b-field>
          </div>

          <div class="column is-2">
            <b-field label="T" :label-position="'on-border'">
              <b-input v-model="T"></b-input>
            </b-field>
          </div>

          <div
            class="column is-2 has-text-centered"
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-top: -19px;
              margin-left: -8px;
            "
          >
            <label
              class="checkbox"
              :disabled="!isInvertible"
              :title="
                isInvertible
                  ? ''
                  : 'Set has inversional symmetry, cannot invert.'
              "
            >
              <span class="label is-small">Invert</span>
              <input
                type="checkbox"
                v-model="isInverted"
                :disabled="!isInvertible"
              />
            </label>
          </div>
        </div>
      </div>

      <!-- Settings -->
      <div class="column is-narrow">
        <b-field>
          <template slot="label">
            <span style="color: transparent; user-select: none">More</span>
          </template>

          <b-dropdown append-to-body aria-role="menu" trap-focus>
            <b-button class="button" slot="trigger" icon-left="cog"
              >Settings</b-button
            >

            <b-dropdown-item
              aria-role="menu-item"
              :focusable="false"
              custom
              paddingless
            >
              <form action>
                <div class="modal-card" style="width: 250px">
                  <section class="modal-card-body">
                    <b-field label="Frets">
                      <b-numberinput
                        controls-position="compact"
                        v-model.number="fretAmount"
                        min="1"
                        max="200"
                      ></b-numberinput>
                    </b-field>
                    <b-field label="Notation">
                      <b-field>
                        <b-radio-button v-model="sharps" native-value="sharps">
                          <span>#</span>
                        </b-radio-button>

                        <b-radio-button v-model="sharps" native-value="flats">
                          <span>b</span>
                        </b-radio-button>

                        <b-radio-button v-model="sharps" native-value="pc">
                          <span>0-11</span>
                        </b-radio-button>
                      </b-field>
                    </b-field>
                    <b-field label="Input mode">
                      <b-field>
                        <div class="columns is-gapless">
                          <div class="column">
                            <b-radio-button v-model="mode" native-value="scale">
                              <span>scale</span>
                            </b-radio-button>

                            <b-radio-button v-model="mode" native-value="chord">
                              <span>chord</span>
                            </b-radio-button>
                          </div>
                          <div class="column">
                            <b-radio-button v-model="mode" native-value="notes">
                              <span>notes</span>
                            </b-radio-button>

                            <b-radio-button
                              v-model="mode"
                              native-value="pc-set"
                            >
                              <span>PC set</span>
                            </b-radio-button>
                          </div>
                        </div>
                      </b-field>
                    </b-field>
                    <!-- <b-checkbox>Show piano</b-checkbox>-->
                  </section>
                  <footer class="modal-card-foot">
                    <b-button
                      @click="$emit('remove-fretboard')"
                      icon-left="trash"
                      >remove fretboard</b-button
                    >
                  </footer>
                </div>
              </form>
            </b-dropdown-item>
          </b-dropdown>
        </b-field>
      </div>
    </div>

    <div style="text-align: center; overflow-x: auto">
      <Fretboard
        :tuning="tuning"
        :emphasize="emphasized_notes"
        :notes="notes"
        :sharps="sharps"
        :frets="fretAmount"
      />
    </div>
    <template>
      <div v-if="mode != 'scale'">
        <ChordDiagrams
          :notes="notes"
          :tuning="tuning"
          :fretAmount="fretAmount"
          :onChordBoxHover="onChordboxHover"
          :onChordBoxLeave="onChordboxLeave"
        />
      </div>
    </template>
  </div>
</template>

<script>
import Fretboard from "./Fretboard.vue";
import { Note, Scale, Midi, ScaleType, Chord, ChordType } from "@tonaljs/tonal";
import { Tunings } from "../tunings.js";
import FORTE_NUMBERS from "../forte_numbers.js";
import * as music21j from "music21j";
import ChordDiagrams from "../ChordDiagrams.vue";

var ALL_SCALES = [];
for (var scale of ScaleType.all()) {
  ALL_SCALES.push(scale.name);
  ALL_SCALES.push(...scale.aliases);
}

export default {
  name: "Editor",

  components: {
    Fretboard,
    ChordDiagrams,
  },

  data: function () {
    return {
      usr_tuning: localStorage.getItem("tuning") || "E A D G B E",
      sharps: "sharps",
      fretAmount: 18,
      scale: { tonic: "A", type: "minor pentatonic" },
      chord: { root: "A", type: "minor" },
      inputNotes: "A C E",
      pcSet: "",
      primeForm: "",
      normalForm: "",
      T: "0",
      isInverted: true,
      isInvertible: true,
      forteNumber: "",
      updatePostTonalData: true,
      mode: "scale",
      hoveredShape: null,
    };
  },
  computed: {
    tuning: function () {
      if (!this.usr_tuning) return [];
      return this.usr_tuning.trim().split(" ").map(Note.chroma).reverse();
    },
    root: function () {
      switch (this.mode) {
        case "scale":
          return Note.chroma(this.scale.tonic);
        case "chord":
          return Note.chroma(this.chord.root);
        case "notes":
          return null;
        case "pc-set":
          return null;
        default:
          console.error("unknown mode: " + this.mode);
          return null;
      }
    },
    emphasized_notes: function () {
      if (this.mode == "scale") {
        return {
          type: "pitch-class",
          data: this.root,
        };
      } else {
        if (!this.hoveredShape) return null;
        return {
          type: "frets",
          data: this.hoveredShape
            .slice()
            .reverse()
            .map((x) => [x]),
        };
      }
    },
    music21Chord: function () {
      if (this.mode != "pc-set") return null;

      let pitchClasses = this.pcSet.trim().split(" ").map(Number);

      try {
        return this.getMusic21Chord(pitchClasses);
      } catch (e) {
        console.error("Could not create chord", e);
        return null;
      }
    },
    notes: function () {
      let notes = [];
      switch (this.mode) {
        case "scale":
          notes = this.set_info.notes;
          break;
        case "chord": {
          notes = Chord.getChord(this.chord.type, this.chord.root).notes;
          break;
        }
        case "notes":
          notes = this.inputNotes.split(" ");
          break;
        case "pc-set":
          if (this.music21Chord) {
            return this.music21Chord.notes.map((x) => x.pitch.pitchClass);
          } else {
            return [];
          }
        default:
          console.error("unknown mode: " + this.mode);
          notes = [];
      }
      return notes.map(Note.chroma);
    },
    set_info: function () {
      let name = this.scale.tonic + " " + this.scale.type;
      return Scale.get(name);
    },
    set_search: function () {
      let set;
      let searchTerm;
      switch (this.mode) {
        case "scale":
          set = ALL_SCALES;
          searchTerm = this.scale.type.toLowerCase();
          break;
        case "chord":
          set = ChordType.names().concat(ChordType.symbols());
          searchTerm = this.chord.type.toLowerCase();
          break;
        case "pc-set":
          set = FORTE_NUMBERS;
          searchTerm = this.forteNumber.toUpperCase();
          break;
        default:
          console.error("unknown mode: " + this.mode);
          set = [];
      }
      return set.filter((option) => {
        return (
          option.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
        );
      });
    },
    tuning_search() {
      const newData = [];
      Tunings.forEach((element) => {
        const items = element.tunings.filter(
          (item) =>
            item.tuning.toLowerCase().indexOf(this.usr_tuning.toLowerCase()) >=
            0
        );
        if (items.length) {
          newData.push({ instrument: element.instrument, tunings: items });
        }
      });
      return newData;
    },
    inversionInteger: function () {
      switch ((this.isInvertible, this.isInverted)) {
        case (true, true):
          return -1;
        case (true, false):
          return 1;
        case (false, false):
          return 0;
        default:
          console.error(
            "Invlid isInvertible/isInverted values:",
            this.isInvertible,
            this.isInverted
          );
          return 0;
      }
    },
  },

  watch: {
    mode: function () {
      if (this.mode === "pc-set") {
        if (this.pcSet !== null && this.pcSet !== undefined) {
          this.pcSet = "9 0 4";
        }
      }
    },
    pcSet: {
      handler: function () {
        if (this.mode !== "pc-set") return;
        if (!this.updatePostTonalData) return;
        this.updatePostTonalData = false;
        const address = Object.values(this.music21Chord.chordTablesAddress);
        this.T = address[3];
        this.primeForm = this.getPrimeForm(address);
        this.normalForm = this.getNormalForm(address);
        this.forteNumber = this.music21Chord.forteClass;
        const [isInvertible, isInverted] = this.getInvCheckboxState(address[2]);
        this.isInvertible = isInvertible;
        this.isInverted = isInverted;

        this.$nextTick(() => {
          this.updatePostTonalData = true;
        });
      },
      immediate: true,
    },
    T: function () {
      if (!this.updatePostTonalData) return;
      this.updatePostTonalData = false;
      const address = this.getChordAddress(this.music21Chord);
      address[2] = this.inversionInteger;
      address[3] = this.T;
      const normalForm = this.getNormalForm(address);
      this.normalForm = normalForm;
      this.pcSet = this.getPcSet(normalForm);

      this.$nextTick(() => {
        this.updatePostTonalData = true;
      });
    },
    forteNumber: function () {
      if (!this.updatePostTonalData) return;
      this.updatePostTonalData = false;
      let forteNumber = this.forteNumber.toUpperCase();
      try {
        let inv;
        if (this.forteNumber.includes("A")) {
          inv = 1;
          forteNumber = forteNumber.replace("A", "");
        } else if (this.forteNumber.includes("B")) {
          inv = -1;
          forteNumber = forteNumber.replace("B", "");
        } else {
          inv = 0;
        }
        const [card, forteClass] = forteNumber.split("-");
        const address = [card, forteClass, inv, this.T];
        this.primeForm = this.getPrimeForm(address);
        this.normalForm = this.getNormalForm(address);
        this.pcSet = this.getPcSet(this.normalForm);
        const [isInvertible, isInverted] = this.getInvCheckboxState(inv);
        this.isInvertible = isInvertible;
        this.isInverted = isInverted;
      } catch (e) {
        console.error("Invalid forte number:" + this.forteNumber);
        console.error(e);
        return;
      } finally {
        this.$nextTick(() => {
          this.updatePostTonalData = true;
        });
      }
    },
    primeForm: function () {
      if (!this.updatePostTonalData) return;
      this.updatePostTonalData = false;
      let primeForm = this.primeForm
        .slice(1, -1)
        .split("")
        .map((x) => (x == "A" ? 10 : x))
        .map((x) => (x == "B" ? 11 : x))
        .map(Number);
      const chord = this.getMusic21Chord(primeForm);
      const address = this.getChordAddress(chord);
      address[3] = this.T;
      if (address[2] != false) address[2] = this.inversionInteger;
      this.normalForm = this.getNormalForm(address);
      this.primeForm = this.getPrimeForm(address);
      this.pcSet = this.getPcSet(this.normalForm);

      this.$nextTick(() => {
        this.updatePostTonalData = true;
      });
    },
    isInverted: function () {
      if (!this.updatePostTonalData) return;
      this.updatePostTonalData = false;
      const address = this.getChordAddress(this.music21Chord);
      address[2] = this.inversionInteger;
      const normalForm = this.getNormalForm(address);
      this.normalForm = normalForm;
      this.pcSet = this.getPcSet(normalForm);
      if (this.isInverted) {
        this.forteNumber = this.forteNumber.replace("A", "B");
      } else {
        this.forteNumber = this.forteNumber.replace("B", "A");
      }
      this.$nextTick(() => {
        this.updatePostTonalData = true;
      });
    },
  },

  methods: {
    onChordboxHover(shape) {
      this.hoveredShape = shape;
    },

    onChordboxLeave() {
      this.hoveredShape = null;
    },
    getInvCheckboxState(inv) {
      /**
       * Returns a pair [enabled, checked] representing the state of the
       * inversion checkbox given the inversion (inv) of the chord.
       * @param {number} inv the inversion of the chord
       * @returns {Array<boolean, boolean>} a pair [enabled, checked]
       */

      if (inv == -1) {
        return [true, true];
      } else if (inv == 1) {
        return [true, false];
      } else {
        return [false, false];
      }
    },
    getPcSet(normalForm) {
      return normalForm.slice(1, -1).replaceAll(",", " ");
    },
    getChordAddress(chord) {
      return Object.values(chord.chordTablesAddress);
    },
    getMusic21Chord(notes) {
      return new music21j.chord.Chord(
        notes.map((x) => new music21j.note.Note(x))
      );
    },
    getNormalForm(address) {
      return (
        "[" +
        music21j.chordTables
          .addressToTransposedNormalForm(address)
          .map((x) => (x + Number(this.T)) % 12)
          .toString() +
        "]"
      );
    },
    getPrimeForm(address) {
      return (
        "(" +
        music21j.chordTables
          .addressToPrimeForm(address)
          .map((x) => (x == 10 ? "A" : x))
          .map((x) => (x == 11 ? "B" : x))
          .toString()
          .replaceAll(",", "") +
        ")"
      );
    },
    saveSettings() {
      localStorage.setItem("tuning", this.usr_tuning);
    },
    normalize(notes) {
      return notes.map((x) => x % 12);
    },
    toname(x) {
      return Midi.midiToNoteName(x, {
        sharps: this.sharps == "sharps",
        pitchClass: true,
      });
    },

    // eslint-disable-next-line
    scale_input(x, y) {
      if (x == "") {
        return;
      }
    },
  },
};
</script>
