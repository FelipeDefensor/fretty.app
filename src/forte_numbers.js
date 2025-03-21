const FORTE_NUMBERS = [
  "0-1",
  "1-1",
  "2-1",
  "2-2",
  "2-3",
  "2-4",
  "2-5",
  "2-6",
  "3-1",
  "3-2A",
  "3-2B",
  "3-3A",
  "3-3B",
  "3-4A",
  "3-4B",
  "3-5A",
  "3-5B",
  "3-6",
  "3-7A",
  "3-7B",
  "3-8A",
  "3-8B",
  "3-9",
  "3-10",
  "3-11A",
  "3-11B",
  "3-12",
  "4-1",
  "4-2A",
  "4-2B",
  "4-3",
  "4-4A",
  "4-4B",
  "4-5A",
  "4-5B",
  "4-6",
  "4-7",
  "4-8",
  "4-9",
  "4-10",
  "4-11A",
  "4-11B",
  "4-12A",
  "4-12B",
  "4-13A",
  "4-13B",
  "4-14A",
  "4-14B",
  "4-Z15A",
  "4-Z15B",
  "4-16A",
  "4-16B",
  "4-17",
  "4-18A",
  "4-18B",
  "4-19A",
  "4-19B",
  "4-20",
  "4-21",
  "4-22A",
  "4-22B",
  "4-23",
  "4-24",
  "4-25",
  "4-26",
  "4-27A",
  "4-27B",
  "4-28",
  "4-Z29A",
  "4-Z29B",
  "5-1",
  "5-2A",
  "5-2B",
  "5-3A",
  "5-3B",
  "5-4A",
  "5-4B",
  "5-5A",
  "5-5B",
  "5-6A",
  "5-6B",
  "5-7A",
  "5-7B",
  "5-8",
  "5-9A",
  "5-9B",
  "5-10A",
  "5-10B",
  "5-11A",
  "5-11B",
  "5-Z12",
  "5-13A",
  "5-13B",
  "5-14A",
  "5-14B",
  "5-15",
  "5-16A",
  "5-16B",
  "5-Z17",
  "5-Z18A",
  "5-Z18B",
  "5-19A",
  "5-19B",
  "5-20A",
  "5-20B",
  "5-21A",
  "5-21B",
  "5-22",
  "5-23A",
  "5-23B",
  "5-24A",
  "5-24B",
  "5-25A",
  "5-25B",
  "5-26A",
  "5-26B",
  "5-27A",
  "5-27B",
  "5-28A",
  "5-28B",
  "5-29A",
  "5-29B",
  "5-30A",
  "5-30B",
  "5-31A",
  "5-31B",
  "5-32A",
  "5-32B",
  "5-33",
  "5-34",
  "5-35",
  "5-Z36A",
  "5-Z36B",
  "5-Z37",
  "5-Z38A",
  "5-Z38B",
  "6-1",
  "6-2A",
  "6-2B",
  "6-Z3A",
  "6-Z3B",
  "6-Z4",
  "6-5A",
  "6-5B",
  "6-Z6",
  "6-7",
  "6-8",
  "6-9A",
  "6-9B",
  "6-Z10A",
  "6-Z10B",
  "6-Z11A",
  "6-Z11B",
  "6-Z12A",
  "6-Z12B",
  "6-Z13",
  "6-14A",
  "6-14B",
  "6-15A",
  "6-15B",
  "6-16A",
  "6-16B",
  "6-Z17A",
  "6-Z17B",
  "6-18A",
  "6-18B",
  "6-Z19A",
  "6-Z19B",
  "6-20",
  "6-21A",
  "6-21B",
  "6-22A",
  "6-22B",
  "6-Z23",
  "6-Z24A",
  "6-Z24B",
  "6-Z25A",
  "6-Z25B",
  "6-Z26",
  "6-27A",
  "6-27B",
  "6-Z28",
  "6-Z29",
  "6-30A",
  "6-30B",
  "6-31A",
  "6-31B",
  "6-32",
  "6-33A",
  "6-33B",
  "6-34A",
  "6-34B",
  "6-35",
  "6-Z36A",
  "6-Z36B",
  "6-Z37",
  "6-Z38",
  "6-Z39A",
  "6-Z39B",
  "6-Z40A",
  "6-Z40B",
  "6-Z41A",
  "6-Z41B",
  "6-Z42",
  "6-Z43A",
  "6-Z43B",
  "6-Z44A",
  "6-Z44B",
  "6-Z45",
  "6-Z46A",
  "6-Z46B",
  "6-Z47A",
  "6-Z47B",
  "6-Z48",
  "6-Z49",
  "6-Z50",
  "7-1",
  "7-2A",
  "7-2B",
  "7-3A",
  "7-3B",
  "7-4A",
  "7-4B",
  "7-5A",
  "7-5B",
  "7-6A",
  "7-6B",
  "7-7A",
  "7-7B",
  "7-8",
  "7-9A",
  "7-9B",
  "7-10A",
  "7-10B",
  "7-11A",
  "7-11B",
  "7-Z12",
  "7-13A",
  "7-13B",
  "7-14A",
  "7-14B",
  "7-15",
  "7-16A",
  "7-16B",
  "7-Z17",
  "7-Z18A",
  "7-Z18B",
  "7-19A",
  "7-19B",
  "7-20A",
  "7-20B",
  "7-21A",
  "7-21B",
  "7-22",
  "7-23A",
  "7-23B",
  "7-24A",
  "7-24B",
  "7-25A",
  "7-25B",
  "7-26A",
  "7-26B",
  "7-27A",
  "7-27B",
  "7-28A",
  "7-28B",
  "7-29A",
  "7-29B",
  "7-30A",
  "7-30B",
  "7-31A",
  "7-31B",
  "7-32A",
  "7-32B",
  "7-33",
  "7-34",
  "7-35",
  "7-Z36A",
  "7-Z36B",
  "7-Z37",
  "7-Z38A",
  "7-Z38B",
  "8-1",
  "8-2A",
  "8-2B",
  "8-3",
  "8-4A",
  "8-4B",
  "8-5A",
  "8-5B",
  "8-6",
  "8-7",
  "8-8",
  "8-9",
  "8-10",
  "8-11A",
  "8-11B",
  "8-12A",
  "8-12B",
  "8-13A",
  "8-13B",
  "8-14A",
  "8-14B",
  "8-Z15A",
  "8-Z15B",
  "8-16A",
  "8-16B",
  "8-17",
  "8-18A",
  "8-18B",
  "8-19A",
  "8-19B",
  "8-20",
  "8-21",
  "8-22A",
  "8-22B",
  "8-23",
  "8-24",
  "8-25",
  "8-26",
  "8-27A",
  "8-27B",
  "8-28",
  "8-Z29A",
  "8-Z29B",
  "9-1",
  "9-2A",
  "9-2B",
  "9-3A",
  "9-3B",
  "9-4A",
  "9-4B",
  "9-5A",
  "9-5B",
  "9-6",
  "9-7A",
  "9-7B",
  "9-8A",
  "9-8B",
  "9-9",
  "9-10",
  "9-11A",
  "9-11B",
  "9-12",
  "10-1",
  "10-2",
  "10-3",
  "10-4",
  "10-5",
  "10-6",
  "11-1",
  "12-1"
]

export default FORTE_NUMBERS