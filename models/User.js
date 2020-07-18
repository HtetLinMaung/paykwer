const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    phone_no: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    fullname: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    orders: [
      {
        orderId: Schema.Types.ObjectId,
        ref: "orders"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model("users", userSchema);
