import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    description: {
      type: String,
      require: true,
    },

    adress: {
      type: String,
      require: true,
    },

    price: {
      type: Number,
      require: true,
    },

    hotel: {
      type: Boolean,
      require: true,
    },

    restaurant: {
      type: Boolean,
      require: true,
    },

    touristSpot: {
      type: Boolean,
      require: true,
    },

    imageUrls: {
      type: Array,
      require: true,
    },
  },

  {
    timestamps: true,
  }
);

const Listing = mongoose.model("listing", ListingSchema);
export default Listing;
