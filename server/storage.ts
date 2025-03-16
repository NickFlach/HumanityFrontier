import { 
  users, 
  explorationData, 
  quantumKeys,
  quantumLedger,
  quantumEntanglements,
  type User, 
  type ExplorationData, 
  type InsertUser,
  type InsertExploration,
  type UpdateUser,
  type QuantumKey,
  type QuantumLedger,
  type QuantumEntanglement,
  type InsertQuantumKey,
  type InsertQuantumLedger,
  type InsertQuantumEntanglement
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: UpdateUser): Promise<User | undefined>;

  saveExplorationData(data: InsertExploration): Promise<ExplorationData>;
  getExplorationDataByUserId(userId: string): Promise<ExplorationData[]>;
  
  // Quantum Key management
  createQuantumKey(data: InsertQuantumKey): Promise<QuantumKey>;
  getQuantumKey(keyId: string): Promise<QuantumKey | undefined>;
  getQuantumKeysByUserId(userId: number): Promise<QuantumKey[]>;
  revokeQuantumKey(keyId: string): Promise<QuantumKey | undefined>;
  
  // Quantum Ledger operations
  recordQuantumOperation(data: InsertQuantumLedger): Promise<QuantumLedger>;
  getQuantumLedgerByKeyId(keyId: string): Promise<QuantumLedger[]>;
  getQuantumLedgerEntry(transactionId: string): Promise<QuantumLedger | undefined>;
  
  // Quantum Entanglement operations
  createQuantumEntanglement(data: InsertQuantumEntanglement): Promise<QuantumEntanglement>;
  getQuantumEntanglementsByKeyId(keyId: string): Promise<QuantumEntanglement[]>;
  getEntangledKeys(keyId: string): Promise<string[]>; // Returns array of entangled key IDs
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private explorationData: Map<number, ExplorationData>;
  private quantumKeys: Map<string, QuantumKey>;
  private quantumLedger: Map<string, QuantumLedger>;
  private quantumEntanglements: Map<number, QuantumEntanglement>;
  
  private userIdCounter: number;
  private explorationIdCounter: number;
  private quantumEntanglementIdCounter: number;

  constructor() {
    this.users = new Map();
    this.explorationData = new Map();
    this.quantumKeys = new Map();
    this.quantumLedger = new Map();
    this.quantumEntanglements = new Map();
    
    this.userIdCounter = 1;
    this.explorationIdCounter = 1;
    this.quantumEntanglementIdCounter = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id, cipherName: null, resonanceCode: null };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, data: UpdateUser): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...data };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async saveExplorationData(data: InsertExploration): Promise<ExplorationData> {
    const id = this.explorationIdCounter++;
    const now = new Date();
    const explorationEntry: ExplorationData = { 
      ...data, 
      id,
      createdAt: now
    };
    this.explorationData.set(id, explorationEntry);
    return explorationEntry;
  }

  async getExplorationDataByUserId(userId: string): Promise<ExplorationData[]> {
    return Array.from(this.explorationData.values()).filter(
      (data) => data.userId === userId
    );
  }

  // Quantum Key management
  async createQuantumKey(data: InsertQuantumKey): Promise<QuantumKey> {
    const id = data.keyId ? data.keyId : `qk-${Math.random().toString(36).substring(2, 15)}`;
    const now = new Date();
    const quantumKey: QuantumKey = {
      ...data,
      id: this.quantumKeys.size + 1,
      keyId: id,
      createdAt: now,
      lastUsed: null,
      isRevoked: false
    };
    
    this.quantumKeys.set(id, quantumKey);
    return quantumKey;
  }

  async getQuantumKey(keyId: string): Promise<QuantumKey | undefined> {
    return this.quantumKeys.get(keyId);
  }

  async getQuantumKeysByUserId(userId: number): Promise<QuantumKey[]> {
    return Array.from(this.quantumKeys.values()).filter(
      (key) => key.userId === userId && !key.isRevoked
    );
  }

  async revokeQuantumKey(keyId: string): Promise<QuantumKey | undefined> {
    const key = this.quantumKeys.get(keyId);
    if (!key) return undefined;
    
    const revokedKey = { ...key, isRevoked: true };
    this.quantumKeys.set(keyId, revokedKey);
    return revokedKey;
  }

  // Quantum Ledger operations
  async recordQuantumOperation(data: InsertQuantumLedger): Promise<QuantumLedger> {
    const transactionId = data.transactionId || `ql-${Math.random().toString(36).substring(2, 15)}`;
    const now = new Date();
    const ledgerEntry: QuantumLedger = {
      ...data,
      id: this.quantumLedger.size + 1,
      transactionId,
      createdAt: now,
      metadata: data.metadata || null
    };
    
    this.quantumLedger.set(transactionId, ledgerEntry);
    
    // Update the lastUsed timestamp for the corresponding key
    const key = this.quantumKeys.get(data.keyId);
    if (key) {
      const updatedKey = { ...key, lastUsed: now };
      this.quantumKeys.set(data.keyId, updatedKey);
    }
    
    return ledgerEntry;
  }

  async getQuantumLedgerByKeyId(keyId: string): Promise<QuantumLedger[]> {
    return Array.from(this.quantumLedger.values()).filter(
      (entry) => entry.keyId === keyId
    );
  }

  async getQuantumLedgerEntry(transactionId: string): Promise<QuantumLedger | undefined> {
    return this.quantumLedger.get(transactionId);
  }

  // Quantum Entanglement operations
  async createQuantumEntanglement(data: InsertQuantumEntanglement): Promise<QuantumEntanglement> {
    const id = this.quantumEntanglementIdCounter++;
    const now = new Date();
    const entanglement: QuantumEntanglement = {
      ...data,
      id,
      createdAt: now,
      expiresAt: data.expiresAt || null
    };
    
    this.quantumEntanglements.set(id, entanglement);
    return entanglement;
  }

  async getQuantumEntanglementsByKeyId(keyId: string): Promise<QuantumEntanglement[]> {
    return Array.from(this.quantumEntanglements.values()).filter(
      (entanglement) => 
        (entanglement.sourceKeyId === keyId || entanglement.targetKeyId === keyId) &&
        (!entanglement.expiresAt || entanglement.expiresAt > new Date())
    );
  }

  async getEntangledKeys(keyId: string): Promise<string[]> {
    const entanglements = await this.getQuantumEntanglementsByKeyId(keyId);
    const entangledKeys = new Set<string>();
    
    for (const entanglement of entanglements) {
      if (entanglement.sourceKeyId === keyId) {
        entangledKeys.add(entanglement.targetKeyId);
      } else {
        entangledKeys.add(entanglement.sourceKeyId);
      }
    }
    
    return Array.from(entangledKeys);
  }
}

export const storage = new MemStorage();
