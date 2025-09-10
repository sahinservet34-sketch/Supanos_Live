var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  auditLogs: () => auditLogs,
  events: () => events,
  insertAuditLogSchema: () => insertAuditLogSchema,
  insertEventSchema: () => insertEventSchema,
  insertMenuCategorySchema: () => insertMenuCategorySchema,
  insertMenuItemSchema: () => insertMenuItemSchema,
  insertReservationSchema: () => insertReservationSchema,
  insertSettingSchema: () => insertSettingSchema,
  insertUploadSchema: () => insertUploadSchema,
  insertUserSchema: () => insertUserSchema,
  menuCategories: () => menuCategories,
  menuCategoriesRelations: () => menuCategoriesRelations,
  menuItems: () => menuItems,
  menuItemsRelations: () => menuItemsRelations,
  reservationStatusEnum: () => reservationStatusEnum,
  reservations: () => reservations,
  sessions: () => sessions,
  settings: () => settings,
  sportTypeEnum: () => sportTypeEnum,
  uploads: () => uploads,
  users: () => users
});
import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  decimal,
  boolean,
  integer,
  pgEnum
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: varchar("username").unique().notNull(),
  email: varchar("email").unique(),
  password: varchar("password").notNull(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").default("user").notNull(),
  // 'admin', 'staff', 'user'
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var menuCategories = pgTable("menu_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").unique().notNull(),
  description: text("description"),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var menuItems = pgTable("menu_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  categoryId: varchar("category_id").references(() => menuCategories.id).notNull(),
  name: varchar("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: varchar("image_url"),
  isAvailable: boolean("is_available").default(true).notNull(),
  tags: text("tags").array(),
  spicyLevel: integer("spicy_level"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var sportTypeEnum = pgEnum("sport_type", ["NFL", "MLB", "Custom"]);
var events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  description: text("description"),
  dateTime: timestamp("date_time").notNull(),
  sportType: sportTypeEnum("sport_type").notNull(),
  imageUrl: varchar("image_url"),
  isFeatured: boolean("is_featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var reservationStatusEnum = pgEnum("reservation_status", ["pending", "confirmed", "cancelled"]);
var reservations = pgTable("reservations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: varchar("full_name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone").notNull(),
  dateTime: timestamp("date_time").notNull(),
  people: integer("people").notNull(),
  notes: text("notes"),
  status: reservationStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var settings = pgTable("settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: varchar("key").unique().notNull(),
  value: jsonb("value").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var uploads = pgTable("uploads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fileName: varchar("file_name").notNull(),
  url: varchar("url").notNull(),
  mime: varchar("mime").notNull(),
  size: integer("size").notNull(),
  width: integer("width"),
  height: integer("height"),
  createdAt: timestamp("created_at").defaultNow()
});
var auditLogs = pgTable("audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  actorUserId: varchar("actor_user_id").references(() => users.id),
  action: varchar("action").notNull(),
  targetType: varchar("target_type").notNull(),
  targetId: varchar("target_id").notNull(),
  meta: jsonb("meta"),
  createdAt: timestamp("created_at").defaultNow()
});
var menuCategoriesRelations = relations(menuCategories, ({ many }) => ({
  items: many(menuItems)
}));
var menuItemsRelations = relations(menuItems, ({ one }) => ({
  category: one(menuCategories, {
    fields: [menuItems.categoryId],
    references: [menuCategories.id]
  })
}));
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertMenuCategorySchema = createInsertSchema(menuCategories).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertMenuItemSchema = createInsertSchema(menuItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertReservationSchema = createInsertSchema(reservations).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertSettingSchema = createInsertSchema(settings).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertUploadSchema = createInsertSchema(uploads).omit({
  id: true,
  createdAt: true
});
var insertAuditLogSchema = createInsertSchema(auditLogs).omit({
  id: true,
  createdAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc, and, like, sql as sql2 } from "drizzle-orm";
var DatabaseStorage = class {
  // User operations (IMPORTANT) these user operations are mandatory for Replit Auth.
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  async getAllUsers() {
    return await db.select().from(users).orderBy(users.createdAt);
  }
  async createUser(userData) {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.id,
      set: {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImageUrl: userData.profileImageUrl,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  async deleteUser(id) {
    await db.delete(users).where(eq(users.id, id));
  }
  // Menu operations
  async getMenuCategories() {
    return await db.select().from(menuCategories).orderBy(menuCategories.order);
  }
  async createMenuCategory(category) {
    const [newCategory] = await db.insert(menuCategories).values(category).returning();
    return newCategory;
  }
  async updateMenuCategory(id, category) {
    const [updated] = await db.update(menuCategories).set({ ...category, updatedAt: /* @__PURE__ */ new Date() }).where(eq(menuCategories.id, id)).returning();
    return updated;
  }
  async deleteMenuCategory(id) {
    await db.delete(menuCategories).where(eq(menuCategories.id, id));
  }
  async getMenuItems(categoryId, search) {
    const conditions = [];
    if (categoryId) {
      conditions.push(eq(menuItems.categoryId, categoryId));
    }
    if (search) {
      conditions.push(like(menuItems.name, `%${search}%`));
    }
    const baseQuery = db.select({
      id: menuItems.id,
      categoryId: menuItems.categoryId,
      name: menuItems.name,
      description: menuItems.description,
      price: menuItems.price,
      imageUrl: menuItems.imageUrl,
      isAvailable: menuItems.isAvailable,
      tags: menuItems.tags,
      spicyLevel: menuItems.spicyLevel,
      createdAt: menuItems.createdAt,
      updatedAt: menuItems.updatedAt,
      category: menuCategories
    }).from(menuItems).innerJoin(menuCategories, eq(menuItems.categoryId, menuCategories.id));
    if (conditions.length > 0) {
      return await baseQuery.where(and(...conditions)).orderBy(menuItems.name);
    }
    return await baseQuery.orderBy(menuItems.name);
  }
  async createMenuItem(item) {
    const [newItem] = await db.insert(menuItems).values(item).returning();
    return newItem;
  }
  async updateMenuItem(id, item) {
    const [updated] = await db.update(menuItems).set({ ...item, updatedAt: /* @__PURE__ */ new Date() }).where(eq(menuItems.id, id)).returning();
    return updated;
  }
  async deleteMenuItem(id) {
    await db.delete(menuItems).where(eq(menuItems.id, id));
  }
  // Event operations
  async getEvents(featured) {
    const baseQuery = db.select().from(events);
    if (featured !== void 0) {
      return await baseQuery.where(eq(events.isFeatured, featured)).orderBy(events.dateTime);
    }
    return await baseQuery.orderBy(events.dateTime);
  }
  async createEvent(event) {
    const [newEvent] = await db.insert(events).values(event).returning();
    return newEvent;
  }
  async updateEvent(id, event) {
    const [updated] = await db.update(events).set({ ...event, updatedAt: /* @__PURE__ */ new Date() }).where(eq(events.id, id)).returning();
    return updated;
  }
  async deleteEvent(id) {
    await db.delete(events).where(eq(events.id, id));
  }
  // Reservation operations
  async getReservations(status, date) {
    const conditions = [];
    if (status) {
      conditions.push(eq(reservations.status, status));
    }
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      conditions.push(
        and(
          sql2`${reservations.dateTime} >= ${startDate}`,
          sql2`${reservations.dateTime} < ${endDate}`
        )
      );
    }
    const baseQuery = db.select().from(reservations);
    if (conditions.length > 0) {
      return await baseQuery.where(and(...conditions)).orderBy(desc(reservations.dateTime));
    }
    return await baseQuery.orderBy(desc(reservations.dateTime));
  }
  async createReservation(reservation) {
    const [newReservation] = await db.insert(reservations).values(reservation).returning();
    return newReservation;
  }
  async updateReservation(id, reservation) {
    const [updated] = await db.update(reservations).set({ ...reservation, updatedAt: /* @__PURE__ */ new Date() }).where(eq(reservations.id, id)).returning();
    return updated;
  }
  // Settings operations
  async getSettings() {
    return await db.select().from(settings).orderBy(settings.key);
  }
  async getSetting(key) {
    const [setting] = await db.select().from(settings).where(eq(settings.key, key));
    return setting;
  }
  async upsertSetting(setting) {
    const [result] = await db.insert(settings).values(setting).onConflictDoUpdate({
      target: settings.key,
      set: {
        value: setting.value,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return result;
  }
  // Upload operations
  async createUpload(upload) {
    const [newUpload] = await db.insert(uploads).values(upload).returning();
    return newUpload;
  }
  // Audit log operations
  async createAuditLog(log2) {
    const [newLog] = await db.insert(auditLogs).values(log2).returning();
    return newLog;
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { z } from "zod";
import bcrypt from "bcrypt";
import session from "express-session";
import multer from "multer";
import path from "path";
import fs from "fs";
async function registerRoutes(app2) {
  const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  const upload = multer({
    storage: storage2,
    limits: { fileSize: 5 * 1024 * 1024 },
    // 5MB limit
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif|webp/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error("Only image files are allowed"));
      }
    }
  });
  app2.use("/uploads", (req, res, next) => {
    const filePath = path.join(process.cwd(), "public", "uploads", req.path);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ message: "File not found" });
    }
  });
  app2.use(session({
    secret: process.env.SESSION_SECRET || "supano-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1e3
      // 24 hours
    }
  }));
  app2.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  app2.post("/api/init-admin", async (req, res) => {
    try {
      const existingAdmin = await storage.getUserByUsername("admin");
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin user already exists" });
      }
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const adminUser = await storage.createUser({
        username: "admin",
        email: "admin@supanos.bar",
        password: hashedPassword,
        firstName: "Admin",
        lastName: "User",
        role: "admin"
      });
      res.json({
        message: "Admin user created successfully",
        username: adminUser.username
      });
    } catch (error) {
      console.error("Error creating admin user:", error);
      res.status(500).json({ message: "Failed to create admin user" });
    }
  });
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = z.object({
        username: z.string().min(1),
        password: z.string().min(1)
      }).parse(req.body);
      const user = await storage.getUserByUsername(username);
      if (!user || !user.isActive) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      req.session.userId = user.id;
      req.session.userRole = user.role;
      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });
  app2.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  });
  app2.get("/api/auth/me", (req, res) => {
    const userId = req.session?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json({
      userId,
      userRole: req.session?.userRole
    });
  });
  app2.post("/api/users", async (req, res) => {
    try {
      const userRole = req.session?.userRole;
      if (userRole !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const userData = insertUserSchema.parse(req.body);
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ message: "Failed to create user" });
    }
  });
  app2.get("/api/users", async (req, res) => {
    try {
      const userRole = req.session?.userRole;
      if (userRole !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const users2 = await storage.getAllUsers();
      const safeUsers = users2.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      }));
      res.json(safeUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  app2.delete("/api/users/:id", async (req, res) => {
    try {
      const userRole = req.session?.userRole;
      if (userRole !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const { id } = req.params;
      const currentUserId = req.session?.userId;
      if (id === currentUserId) {
        return res.status(400).json({ message: "Cannot delete your own account" });
      }
      await storage.deleteUser(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  });
  app2.post("/api/upload", upload.single("image"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const imageUrl = `/uploads/${req.file.filename}`;
      res.json({ imageUrl });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Upload failed" });
    }
  });
  app2.get("/api/menu/categories", async (req, res) => {
    try {
      const categories = await storage.getMenuCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  app2.post("/api/menu/categories", async (req, res) => {
    try {
      const validatedData = insertMenuCategorySchema.parse(req.body);
      const category = await storage.createMenuCategory(validatedData);
      res.json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(400).json({ message: "Failed to create category" });
    }
  });
  app2.get("/api/menu/items", async (req, res) => {
    try {
      const { categoryId, search } = req.query;
      const items = await storage.getMenuItems(
        categoryId,
        search
      );
      res.json(items);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });
  app2.post("/api/menu/items", async (req, res) => {
    try {
      const validatedData = insertMenuItemSchema.parse(req.body);
      const item = await storage.createMenuItem(validatedData);
      res.json(item);
    } catch (error) {
      console.error("Error creating menu item:", error);
      res.status(400).json({ message: "Failed to create menu item" });
    }
  });
  app2.patch("/api/menu/items/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertMenuItemSchema.partial().parse(req.body);
      const item = await storage.updateMenuItem(id, validatedData);
      res.json(item);
    } catch (error) {
      console.error("Error updating menu item:", error);
      res.status(400).json({ message: "Failed to update menu item" });
    }
  });
  app2.delete("/api/menu/items/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteMenuItem(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting menu item:", error);
      res.status(400).json({ message: "Failed to delete menu item" });
    }
  });
  app2.get("/api/events", async (req, res) => {
    try {
      const { featured } = req.query;
      const events2 = await storage.getEvents(
        featured === "1" ? true : void 0
      );
      res.json(events2);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });
  app2.post("/api/events", async (req, res) => {
    try {
      if (req.body.dateTime && typeof req.body.dateTime === "string") {
        req.body.dateTime = new Date(req.body.dateTime);
      }
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(400).json({ message: "Failed to create event" });
    }
  });
  app2.patch("/api/events/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertEventSchema.partial().parse(req.body);
      const event = await storage.updateEvent(id, validatedData);
      res.json(event);
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(400).json({ message: "Failed to update event" });
    }
  });
  app2.delete("/api/events/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteEvent(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(400).json({ message: "Failed to delete event" });
    }
  });
  app2.post("/api/reservations", async (req, res) => {
    try {
      if (req.body.dateTime && typeof req.body.dateTime === "string") {
        req.body.dateTime = new Date(req.body.dateTime);
      }
      const validatedData = insertReservationSchema.parse(req.body);
      const reservation = await storage.createReservation(validatedData);
      res.json(reservation);
    } catch (error) {
      console.error("Error creating reservation:", error);
      res.status(400).json({ message: "Failed to create reservation" });
    }
  });
  app2.get("/api/reservations", async (req, res) => {
    try {
      const { status, date } = req.query;
      const reservations2 = await storage.getReservations(
        status,
        date
      );
      res.json(reservations2);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ message: "Failed to fetch reservations" });
    }
  });
  app2.patch("/api/reservations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertReservationSchema.partial().parse(req.body);
      const reservation = await storage.updateReservation(id, validatedData);
      res.json(reservation);
    } catch (error) {
      console.error("Error updating reservation:", error);
      res.status(400).json({ message: "Failed to update reservation" });
    }
  });
  app2.delete("/api/reservations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteReservation(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting reservation:", error);
      res.status(400).json({ message: "Failed to delete reservation" });
    }
  });
  app2.get("/api/scores", async (req, res) => {
    try {
      const { date } = req.query;
      const scoreDate = date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const mockScores = {
        date: scoreDate,
        leagues: {
          NFL: [
            {
              id: "1",
              startTime: "2025-01-14T20:20:00Z",
              status: "live",
              home: { abbr: "KC", name: "Kansas City Chiefs", score: 21 },
              away: { abbr: "BUF", name: "Buffalo Bills", score: 14 },
              details: { quarter: "Q3", clock: "8:45" }
            },
            {
              id: "2",
              startTime: "2025-01-14T17:00:00Z",
              status: "final",
              home: { abbr: "DAL", name: "Dallas Cowboys", score: 28 },
              away: { abbr: "NYG", name: "New York Giants", score: 21 },
              details: { quarter: "Final", clock: "" }
            }
          ],
          MLB: [
            {
              id: "3",
              startTime: "2025-01-14T19:00:00Z",
              status: "final",
              home: { abbr: "NYY", name: "New York Yankees", score: 7 },
              away: { abbr: "BOS", name: "Boston Red Sox", score: 4 },
              details: { inning: "9", outs: "3" }
            }
          ]
        }
      };
      res.json(mockScores);
    } catch (error) {
      console.error("Error fetching scores:", error);
      res.status(500).json({ message: "Failed to fetch scores" });
    }
  });
  app2.get("/api/settings", async (req, res) => {
    try {
      const settings2 = await storage.getSettings();
      res.json(settings2);
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });
  app2.post("/api/settings", async (req, res) => {
    try {
      const validatedData = insertSettingSchema.parse(req.body);
      const setting = await storage.upsertSetting(validatedData);
      res.json(setting);
    } catch (error) {
      console.error("Error saving setting:", error);
      res.status(400).json({ message: "Failed to save setting" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
