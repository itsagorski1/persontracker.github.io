const crypto = require("crypto");
const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => crypto.randomUUID()
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    nameLower: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    address: {
      type: String,
      trim: true,
      default: ""
    },
    phone: {
      type: String,
      trim: true,
      default: ""
    },
    gender: {
      type: String,
      trim: true,
      default: ""
    },
    age: {
      type: Number,
      default: null
    },
    lat: {
      type: Number,
      default: null
    },
    lng: {
      type: Number,
      default: null
    },
    updated: {
      type: Date,
      default: Date.now
    },
    married: {
      type: Boolean,
      default: false
    },
    divorced: {
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean,
      default: true
    },
    spouseId: {
      type: String,
      default: null
    },
    yrDivorced: {
      type: String,
      default: null
    },
    history: {
      type: [String],
      default: []
    }
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        ret.yr_divorced = ret.yrDivorced || null;
        delete ret._id;
        delete ret.nameLower;
        return ret;
      }
    }
  }
);

personSchema.pre("validate", function normalizeName(next) {
  if (this.name) {
    this.name = this.name.trim();
    this.nameLower = this.name.toLowerCase();
  }
  next();
});

module.exports = mongoose.model("Person", personSchema);
