import mongoose, { Schema } from "mongoose";

export interface EventData {
  title: string;
  slug?: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

function createSlug(title: string): string {
  return title
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

// Date-only values are interpreted in UTC; parseable date-times are stored as ISO strings.
function normalizeDate(value: string): string {
  const dateValue = value.trim();
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateValue);
  const parsedDate = new Date(dateOnly ? `${dateValue}T00:00:00.000Z` : dateValue);

  if (
    Number.isNaN(parsedDate.getTime()) ||
    (dateOnly && parsedDate.toISOString().slice(0, 10) !== dateValue)
  ) {
    throw new Error("Event date must be a valid date");
  }

  return parsedDate.toISOString();
}

// Store both 12-hour and 24-hour inputs in 24-hour HH:mm format.
function normalizeTime(value: string): string {
  const match = /^(\d{1,2}):([0-5]\d)\s*(AM|PM)?$/i.exec(value.trim());

  if (!match) {
    throw new Error("Event time must use HH:mm or h:mm AM/PM format");
  }

  let hours = Number(match[1]);
  const minutes = match[2];
  const meridiem = match[3]?.toUpperCase();

  if (meridiem) {
    if (hours < 1 || hours > 12) {
      throw new Error("Event time has an invalid hour");
    }

    hours = (hours % 12) + (meridiem === "PM" ? 12 : 0);
  } else if (hours > 23) {
    throw new Error("Event time has an invalid hour");
  }

  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

const eventSchema = new Schema<EventData>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    mode: { type: String, required: true, trim: true },
    audience: { type: String, required: true, trim: true },
    agenda: {
      type: [String],
      required: true,
      validate: {
        validator: (items: string[]) =>
          items.length > 0 && items.every((item) => item.trim().length > 0),
        message: "Agenda must contain at least one non-empty item",
      },
    },
    organizer: { type: String, required: true, trim: true },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: (items: string[]) =>
          items.length > 0 && items.every((item) => item.trim().length > 0),
        message: "Tags must contain at least one non-empty item",
      },
    },
  },
  { timestamps: true },
);

eventSchema.index({ slug: 1 }, { unique: true });

eventSchema.pre("save", function () {
  if (this.isModified("title")) {
    this.slug = createSlug(this.title);

    if (!this.slug) {
      throw new Error("Event title must contain characters for a slug");
    }
  }

  this.date = normalizeDate(this.date);
  this.time = normalizeTime(this.time);
});

export const Event =
  mongoose.models.Event ?? mongoose.model<EventData>("Event", eventSchema);
