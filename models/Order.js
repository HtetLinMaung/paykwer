const { Schema, model } = require("mongoose");

const orderSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1
    },
    amount: {
      type: Number,
      required: true,


    }
  },
  {
    timestamps: true
  }
);

module.exports = model("orders", orderSchema);
