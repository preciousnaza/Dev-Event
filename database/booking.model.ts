import mongoose, { Schema, Types } from "mongoose";
import { Event } from "./event.model";

export interface BookingData {
  eventId: Types.ObjectId;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const bookingSchema = new Schema<BookingData>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email must be valid"],
    },
  },
  { timestamps: true },
);

bookingSchema.pre("save", async function () {
  // Check existence on each save so bookings cannot reference deleted events.
  const eventExists = await Event.exists({ _id: this.eventId });

  if (!eventExists) {
    throw new Error("Cannot create a booking for an event that does not exist");
  }
});

export const Booking =
  mongoose.models.Booking ?? mongoose.model<BookingData>("Booking", bookingSchema);
