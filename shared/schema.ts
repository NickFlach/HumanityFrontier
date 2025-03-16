import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const explorationData = pgTable("exploration_data", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  cipherInput: text("cipher_input").notNull(),
  sectionExplored: text("section_explored").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  cipherName: text("cipher_name"),
  resonanceCode: text("resonance_code"),
});

export const insertExplorationSchema = createInsertSchema(explorationData).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const updateUserSchema = createInsertSchema(users).pick({
  cipherName: true,
  resonanceCode: true,
});

export type InsertExploration = z.infer<typeof insertExplorationSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type ExplorationData = typeof explorationData.$inferSelect;
export type User = typeof users.$inferSelect;
