const mongoose = require('mongoose');

// Define payment record schema
const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['success', 'pending', 'failed'],
    required: true
  },
  // Add other payment record attributes as needed
}, { timestamps: true });

// Define model
module.exports = mongoose.model('Transaction', transactionSchema);


