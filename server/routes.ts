import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertExplorationSchema, insertUserSchema, updateUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for user management and exploration data
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }

      const user = await storage.createUser(userData);
      // Don't return the password in the response
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating user" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const userData = updateUserSchema.parse(req.body);
      const updatedUser = await storage.updateUser(id, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Don't return the password in the response
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Error updating user" });
    }
  });

  app.post("/api/exploration", async (req, res) => {
    try {
      const explorationData = insertExplorationSchema.parse(req.body);
      const savedData = await storage.saveExplorationData(explorationData);
      res.status(201).json(savedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid exploration data", errors: error.errors });
      }
      res.status(500).json({ message: "Error saving exploration data" });
    }
  });

  app.get("/api/exploration/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const explorationData = await storage.getExplorationDataByUserId(userId);
      res.json(explorationData);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving exploration data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
