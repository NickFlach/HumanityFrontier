import { 
  users, 
  explorationData, 
  type User, 
  type ExplorationData, 
  type InsertUser,
  type InsertExploration,
  type UpdateUser
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private explorationData: Map<number, ExplorationData>;
  private userIdCounter: number;
  private explorationIdCounter: number;

  constructor() {
    this.users = new Map();
    this.explorationData = new Map();
    this.userIdCounter = 1;
    this.explorationIdCounter = 1;
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
}

export const storage = new MemStorage();
