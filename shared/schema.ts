import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal, uuid } from "drizzle-orm/pg-core";
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

// Quantum database tables
export const quantumKeys = pgTable("quantum_keys", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  keyId: text("key_id").notNull().unique(),
  entropyLevel: decimal("entropy_level").notNull(), // Quantum entropy measure
  superpositionState: text("superposition_state").notNull(), // Encoded quantum state
  createdAt: timestamp("created_at").defaultNow(),
  lastUsed: timestamp("last_used"),
  isRevoked: boolean("is_revoked").default(false),
});

export const quantumLedger = pgTable("quantum_ledger", {
  id: serial("id").primaryKey(),
  transactionId: text("transaction_id").notNull().unique(),
  keyId: text("key_id").notNull().references(() => quantumKeys.keyId),
  operationType: text("operation_type").notNull(), // encrypt, decrypt, sign, verify
  timestampVector: jsonb("timestamp_vector").notNull(), // Quantum temporal vector
  entanglementHash: text("entanglement_hash").notNull(), // Hash of entangled qubits
  metadata: jsonb("metadata"), // Additional quantum operation metadata
  createdAt: timestamp("created_at").defaultNow(),
});

export const quantumEntanglements = pgTable("quantum_entanglements", {
  id: serial("id").primaryKey(),
  sourceKeyId: text("source_key_id").notNull().references(() => quantumKeys.keyId),
  targetKeyId: text("target_key_id").notNull().references(() => quantumKeys.keyId),
  entanglementType: text("entanglement_type").notNull(), // direct, indirect, temporal
  entanglementStrength: decimal("entanglement_strength").notNull(), // Measure from 0 to 1
  stateVector: jsonb("state_vector").notNull(), // Mathematical representation of entanglement
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at"), // Optional expiration for temporary entanglements
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

// Quantum database insert schemas
export const insertQuantumKeySchema = createInsertSchema(quantumKeys).omit({
  id: true,
  createdAt: true,
  lastUsed: true,
  isRevoked: true,
});

export const insertQuantumLedgerSchema = createInsertSchema(quantumLedger).omit({
  id: true,
  createdAt: true,
});

export const insertQuantumEntanglementSchema = createInsertSchema(quantumEntanglements).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertExploration = z.infer<typeof insertExplorationSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type InsertQuantumKey = z.infer<typeof insertQuantumKeySchema>;
export type InsertQuantumLedger = z.infer<typeof insertQuantumLedgerSchema>;
export type InsertQuantumEntanglement = z.infer<typeof insertQuantumEntanglementSchema>;

export type ExplorationData = typeof explorationData.$inferSelect;
export type User = typeof users.$inferSelect;
export type QuantumKey = typeof quantumKeys.$inferSelect;
export type QuantumLedger = typeof quantumLedger.$inferSelect;
export type QuantumEntanglement = typeof quantumEntanglements.$inferSelect;
