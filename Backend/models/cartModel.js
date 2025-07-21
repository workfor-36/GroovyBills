import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  // Reference to the Cashier model
  cashier: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cashier',  // Make sure the model name matches the one you use
    required: true 
  },
  items: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Stock', // or 'Product', depending on your design
        required: true 
      },
      name: { type: String, required: true },
      quantity: { 
        type: Number, 
        required: true, 
        min: 1 
      },
      price: { 
        type: Number, 
        required: true, 
        min: 0 
      },
    }
  ],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Virtual for total calculation (will not conflict anymore)
cartSchema.virtual('total').get(function() {
  return this.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
});

export default mongoose.model('Cart', cartSchema);
