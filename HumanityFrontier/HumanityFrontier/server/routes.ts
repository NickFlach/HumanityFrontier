import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertExplorationSchema, 
  insertUserSchema, 
  updateUserSchema,
  insertQuantumKeySchema,
  insertQuantumLedgerSchema,
  insertQuantumEntanglementSchema
} from "@shared/schema";
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

  // ================ Quantum Database API Routes ================

  // Quantum Key Management
  app.post("/api/quantum/keys", async (req, res) => {
    try {
      const keyData = insertQuantumKeySchema.parse(req.body);
      const key = await storage.createQuantumKey(keyData);
      res.status(201).json(key);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid quantum key data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating quantum key" });
    }
  });

  app.get("/api/quantum/keys/:keyId", async (req, res) => {
    try {
      const keyId = req.params.keyId;
      const key = await storage.getQuantumKey(keyId);
      
      if (!key) {
        return res.status(404).json({ message: "Quantum key not found" });
      }
      
      res.json(key);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving quantum key" });
    }
  });

  app.get("/api/quantum/keys/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const keys = await storage.getQuantumKeysByUserId(userId);
      res.json(keys);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving quantum keys" });
    }
  });

  app.put("/api/quantum/keys/:keyId/revoke", async (req, res) => {
    try {
      const keyId = req.params.keyId;
      const revokedKey = await storage.revokeQuantumKey(keyId);
      
      if (!revokedKey) {
        return res.status(404).json({ message: "Quantum key not found" });
      }
      
      res.json(revokedKey);
    } catch (error) {
      res.status(500).json({ message: "Error revoking quantum key" });
    }
  });

  // Quantum Ledger Operations
  app.post("/api/quantum/ledger", async (req, res) => {
    try {
      const ledgerData = insertQuantumLedgerSchema.parse(req.body);
      
      // Verify that the key exists and is not revoked
      const key = await storage.getQuantumKey(ledgerData.keyId);
      if (!key) {
        return res.status(404).json({ message: "Quantum key not found" });
      }
      
      if (key.isRevoked) {
        return res.status(403).json({ message: "Quantum key has been revoked" });
      }
      
      const ledgerEntry = await storage.recordQuantumOperation(ledgerData);
      res.status(201).json(ledgerEntry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid quantum ledger data", errors: error.errors });
      }
      res.status(500).json({ message: "Error recording quantum operation" });
    }
  });

  app.get("/api/quantum/ledger/key/:keyId", async (req, res) => {
    try {
      const keyId = req.params.keyId;
      const ledgerEntries = await storage.getQuantumLedgerByKeyId(keyId);
      res.json(ledgerEntries);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving quantum ledger entries" });
    }
  });

  app.get("/api/quantum/ledger/:transactionId", async (req, res) => {
    try {
      const transactionId = req.params.transactionId;
      const ledgerEntry = await storage.getQuantumLedgerEntry(transactionId);
      
      if (!ledgerEntry) {
        return res.status(404).json({ message: "Quantum ledger entry not found" });
      }
      
      res.json(ledgerEntry);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving quantum ledger entry" });
    }
  });

  // Quantum Entanglement Operations
  app.post("/api/quantum/entanglements", async (req, res) => {
    try {
      const entanglementData = insertQuantumEntanglementSchema.parse(req.body);
      
      // Verify that both keys exist and are not revoked
      const sourceKey = await storage.getQuantumKey(entanglementData.sourceKeyId);
      if (!sourceKey) {
        return res.status(404).json({ message: "Source quantum key not found" });
      }
      
      const targetKey = await storage.getQuantumKey(entanglementData.targetKeyId);
      if (!targetKey) {
        return res.status(404).json({ message: "Target quantum key not found" });
      }
      
      if (sourceKey.isRevoked || targetKey.isRevoked) {
        return res.status(403).json({ message: "Cannot entangle revoked quantum keys" });
      }
      
      const entanglement = await storage.createQuantumEntanglement(entanglementData);
      res.status(201).json(entanglement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid quantum entanglement data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating quantum entanglement" });
    }
  });

  app.get("/api/quantum/entanglements/key/:keyId", async (req, res) => {
    try {
      const keyId = req.params.keyId;
      const entanglements = await storage.getQuantumEntanglementsByKeyId(keyId);
      res.json(entanglements);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving quantum entanglements" });
    }
  });

  app.get("/api/quantum/entanglements/key/:keyId/entangled", async (req, res) => {
    try {
      const keyId = req.params.keyId;
      const entangledKeys = await storage.getEntangledKeys(keyId);
      res.json(entangledKeys);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving entangled keys" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
