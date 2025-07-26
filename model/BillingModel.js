const mongoose = require("mongoose");  
const billingSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients",
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles",
    required: true
  },
  services: [
    {
      serviceName: { type: String, required: true }, 
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending"
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Card", "Online", "Insurance"],
    required: true
  },
  transactionId: {
    type: String, 
    default: null
  },
  insuranceDetails: {
    insuranceProvider: { type: String, default: null },
    policyNumber: { type: String, default: null },
    claimStatus: { type: String, enum: ["Processing", "Approved", "Rejected"], default: null }
  },
  paymentDate: {
    type: Date,
    default: Date.now
  }
});

const Billing = mongoose.model("Billing", billingSchema);
module.exports = Billing;
