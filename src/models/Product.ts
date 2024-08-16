import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 200,
  },
  logo: {
    type: String,
    required: true,
  },
  date_release: {
    type: Date,
    required: true,
  },
  date_revision: {
    type: Date,
    required: true,
    validate: {
      validator: function (v: Date) {
        return v >= new Date(this.date_release).setFullYear(
          new Date(this.date_release).getFullYear() + 1
        );
      },
      message: 'La fecha de revisión debe ser un año después de la fecha de liberación',
    },
  },
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;
