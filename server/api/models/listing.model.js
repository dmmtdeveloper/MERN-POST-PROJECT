import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    hotel: {
      type: Boolean,
      required: true,
    },

    restaurant: {
      type: Boolean,
      required: true,
    },

    touristSpot: {
      type: Boolean,
      required: true,
    },

    imageUrls: {
      type: Array,
      required: true,
    },

    /*Para saber que usuario creo este listing*/
    userRef: {
      type: String,
      required: true,
    },
  },

  /*save the time creation and update */
  { timestamps: true }
);

const Listing = mongoose.model("Listing", ListingSchema);
export default Listing;
