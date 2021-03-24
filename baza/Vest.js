const mongoose = require("mongoose");

const UcesnikSchema = new mongoose.Schema({
  ime: {
    type: String,
    trim: true,
    required: true,
  },
  mail: {
    type: String,
    trim: true,
    required: true,
  }
});

const VestSchema = new mongoose.Schema({
  autor: {
    type: String,
    trim: true,
    required: true,
  },
  mail: {
    type: String,
    trim: true,
    required: true,
  },
  naslov: {
    type: String,
    trim: true,
    required: true,
  },
  tekst: {
    type: String,
    trim: true,
    required: true,
  },
  rok: {
    type: Date,
    required: true,
  },
  ucesnici: [UcesnikSchema],
});

module.exports = mongoose.model("Vest", VestSchema);
