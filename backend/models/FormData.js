import mongoose from "mongoose";

const formDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

const FormData = mongoose.model("FormData", formDataSchema);

export default FormData;
