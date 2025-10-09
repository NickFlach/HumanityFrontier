// Quest and Achievement System Schema
import { pgTable, text, integer, boolean, timestamp, jsonb, serial } from "drizzle-orm/pg-core";

/**
 * QUANTUM QUEST SYSTEM
 * "The cipher reveals itself only to those who seek with purpose"
 */

// Player progression and achievements
export const playerProfiles = pgTable("player_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  adventurerName: text("adventurer_name"),
  currentLevel: integer("current_level").default(1),
  experiencePoints: integer("experience_points").default(0),
  quantumWisdom: integer("quantum_wisdom").default(0), // Earned through discoveries
  artifacts: jsonb("artifacts").default([]), // Collected quantum artifacts
  unlockedSections: jsonb("unlocked_sections").default(["section_1"]), // Progressive revelation
  lastActive: timestamp("last_active").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Quantum Quests - Adventures through cryptographic challenges
export const quantumQuests = pgTable("quantum_quests", {
  id: serial("id").primaryKey(),
  questId: text("quest_id").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(), // "novice", "adept", "master", "transcendent"
  questType: text("quest_type").notNull(), // "cipher", "entanglement", "temporal", "discovery"
  requirements: jsonb("requirements").default({}), // Prerequisites to unlock
  rewards: jsonb("rewards").notNull(), // XP, artifacts, unlocks
  secretCode: text("secret_code"), // Hidden codes to discover
  narrative: text("narrative").notNull(), // Story element
  hint: text("hint"),
  solution: text("solution"), // For validation
  isHidden: boolean("is_hidden").default(false), // Easter egg quests
  createdAt: timestamp("created_at").defaultNow(),
});

// Player Quest Progress
export const questProgress = pgTable("quest_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  questId: text("quest_id").notNull(),
  status: text("status").notNull(), // "locked", "available", "in_progress", "completed"
  attempts: integer("attempts").default(0),
  hintsUsed: integer("hints_used").default(0),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  progressData: jsonb("progress_data").default({}), // Quest-specific progress
});

// Achievements - Hidden discoveries and milestones
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  achievementId: text("achievement_id").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // "explorer", "cryptographer", "philosopher", "master"
  icon: text("icon").notNull(),
  rarity: text("rarity").notNull(), // "common", "rare", "legendary", "mythic"
  secretCondition: text("secret_condition"), // Hidden unlock condition
  reward: jsonb("reward").notNull(),
  isSecret: boolean("is_secret").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Player Achievements
export const playerAchievements = pgTable("player_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  achievementId: text("achievement_id").notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
  discoveryMethod: text("discovery_method"), // How they found it
});

// Quantum Artifacts - Collectible mystical items
export const quantumArtifacts = pgTable("quantum_artifacts", {
  id: serial("id").primaryKey(),
  artifactId: text("artifact_id").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  lore: text("lore").notNull(), // Deep backstory
  rarity: text("rarity").notNull(),
  discoveryLocation: text("discovery_location"), // Where/how to find
  power: jsonb("power").notNull(), // Special abilities/bonuses
  visualEffect: text("visual_effect"), // How it appears in UI
  isHidden: boolean("is_hidden").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Hidden Passages - Secret areas to discover
export const hiddenPassages = pgTable("hidden_passages", {
  id: serial("id").primaryKey(),
  passageId: text("passage_id").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  triggerCondition: text("trigger_condition").notNull(), // How to unlock
  secretCode: text("secret_code"), // Code to access
  location: text("location").notNull(), // Where it appears
  content: jsonb("content").notNull(), // What's inside
  isDiscovered: boolean("is_discovered").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Cipher Challenges - Interactive puzzles
export const cipherChallenges = pgTable("cipher_challenges", {
  id: serial("id").primaryKey(),
  challengeId: text("challenge_id").notNull().unique(),
  title: text("title").notNull(),
  challenge: text("challenge").notNull(), // The encrypted message/puzzle
  cipherType: text("cipher_type").notNull(), // "caesar", "vigenere", "quantum", "temporal"
  difficulty: integer("difficulty").notNull(), // 1-10
  hint1: text("hint1"),
  hint2: text("hint2"),
  hint3: text("hint3"),
  solution: text("solution").notNull(),
  reward: jsonb("reward").notNull(),
  narrative: text("narrative").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Discovery Log - Track player discoveries
export const discoveryLog = pgTable("discovery_log", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  discoveryType: text("discovery_type").notNull(), // "quest", "artifact", "passage", "achievement"
  discoveryId: text("discovery_id").notNull(),
  discoveryMethod: text("discovery_method"),
  timestamp: timestamp("timestamp").defaultNow(),
  reaction: text("reaction"), // Player's recorded reaction/note
});

export type PlayerProfile = typeof playerProfiles.$inferSelect;
export type QuantumQuest = typeof quantumQuests.$inferSelect;
export type QuestProgress = typeof questProgress.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
export type PlayerAchievement = typeof playerAchievements.$inferSelect;
export type QuantumArtifact = typeof quantumArtifacts.$inferSelect;
export type HiddenPassage = typeof hiddenPassages.$inferSelect;
export type CipherChallenge = typeof cipherChallenges.$inferSelect;
export type DiscoveryLog = typeof discoveryLog.$inferSelect;
