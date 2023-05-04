const { mongoose, Schema, model } = require("mongoose");

const expensesModel = new Schema(
  {
    expense: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: false,
      default: 1,
    },
    isInventary: {
      type: Boolean, 
      required: false, 
    }, 
    images: {
      type: Object, 
      required: false, 
    },
    receipt: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Expenses", expensesModel);
