import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("traveler"), // traveler, host, admin
  name: text("name"),
  email: text("email"),
  travelStyle: text("travel_style"),
  interests: json("interests").$type<string[]>(),
  budgetRange: text("budget_range"),
  accessibilityPreferences: json("accessibility_preferences").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const places = pgTable("places", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  location: text("location").notNull(),
  price: text("price").notNull(),
  imageUrl: text("image_url").notNull(),
  vibes: json("vibes").$type<string[]>().notNull(),
  category: text("category").notNull(),
  approved: boolean("approved").default(false),
  hostId: integer("host_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  date: text("date").notNull(),
  price: text("price").notNull(),
  imageUrl: text("image_url").notNull(),
  vibes: json("vibes").$type<string[]>().notNull(),
  category: text("category").notNull(), // recreational, functional
  location: text("location").notNull(),
  approved: boolean("approved").default(false),
  hostId: integer("host_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const communityPosts = pgTable("community_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  caption: text("caption").notNull(),
  imageUrl: text("image_url").notNull(),
  tags: json("tags").$type<string[]>().notNull(),
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  views: integer("views").default(0),
  credits: integer("credits").default(0),
  approved: boolean("approved").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  itemId: integer("item_id").notNull(),
  itemType: text("item_type").notNull(), // place, event
  createdAt: timestamp("created_at").defaultNow(),
});

export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  itemId: integer("item_id").notNull(),
  itemType: text("item_type").notNull(), // place, event
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  approved: boolean("approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertPlaceSchema = createInsertSchema(places).omit({
  id: true,
  createdAt: true,
  approved: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
  approved: true,
});

export const insertCommunityPostSchema = createInsertSchema(communityPosts).omit({
  id: true,
  createdAt: true,
  likes: true,
  comments: true,
  views: true,
  credits: true,
  approved: true,
});

export const insertCollectionSchema = createInsertSchema(collections).omit({
  id: true,
  createdAt: true,
});

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  createdAt: true,
  approved: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Place = typeof places.$inferSelect;
export type InsertPlace = z.infer<typeof insertPlaceSchema>;
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertCommunityPost = z.infer<typeof insertCommunityPostSchema>;
export type Collection = typeof collections.$inferSelect;
export type InsertCollection = z.infer<typeof insertCollectionSchema>;
export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
