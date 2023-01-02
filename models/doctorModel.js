const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  feePerConsultation: {
    type: Number,
    required: true,
  },
  timings: {
    type: Array,
    required: true,
  },
  status:"pending"
},{
    timestamps : true
});

module.exports = mongoose.model("doctors", doctorSchema);