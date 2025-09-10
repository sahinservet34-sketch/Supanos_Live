import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertMenuCategorySchema,
  insertMenuItemSchema,
  insertEventSchema,
  insertReservationSchema,
  insertSettingSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple health check route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Menu Categories
  app.get("/api/menu/categories", async (req, res) => {
    try {
      const categories = await storage.getMenuCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.post("/api/menu/categories", async (req, res) => {
    try {
      const validatedData = insertMenuCategorySchema.parse(req.body);
      const category = await storage.createMenuCategory(validatedData);
      res.json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(400).json({ message: "Failed to create category" });
    }
  });

  // Menu Items
  app.get("/api/menu/items", async (req, res) => {
    try {
      const { categoryId, search } = req.query;
      const items = await storage.getMenuItems(
        categoryId as string,
        search as string
      );
      res.json(items);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });

  app.post("/api/menu/items", async (req, res) => {
    try {
      const validatedData = insertMenuItemSchema.parse(req.body);
      const item = await storage.createMenuItem(validatedData);
      res.json(item);
    } catch (error) {
      console.error("Error creating menu item:", error);
      res.status(400).json({ message: "Failed to create menu item" });
    }
  });

  app.patch("/api/menu/items/:id", async (req, res) => {
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

  app.delete("/api/menu/items/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteMenuItem(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting menu item:", error);
      res.status(400).json({ message: "Failed to delete menu item" });
    }
  });

  // Events
  app.get("/api/events", async (req, res) => {
    try {
      const { featured } = req.query;
      const events = await storage.getEvents(
        featured === "1" ? true : undefined
      );
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(400).json({ message: "Failed to create event" });
    }
  });

  app.patch("/api/events/:id", async (req, res) => {
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

  app.delete("/api/events/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteEvent(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(400).json({ message: "Failed to delete event" });
    }
  });

  // Reservations
  app.post("/api/reservations", async (req, res) => {
    try {
      const validatedData = insertReservationSchema.parse(req.body);
      const reservation = await storage.createReservation(validatedData);
      // TODO: Send confirmation email
      res.json(reservation);
    } catch (error) {
      console.error("Error creating reservation:", error);
      res.status(400).json({ message: "Failed to create reservation" });
    }
  });

  app.get("/api/reservations", async (req, res) => {
    try {
      const { status, date } = req.query;
      const reservations = await storage.getReservations(
        status as string,
        date as string
      );
      res.json(reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ message: "Failed to fetch reservations" });
    }
  });

  app.patch("/api/reservations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertReservationSchema.partial().parse(req.body);
      const reservation = await storage.updateReservation(id, validatedData);
      // TODO: Send status update email
      res.json(reservation);
    } catch (error) {
      console.error("Error updating reservation:", error);
      res.status(400).json({ message: "Failed to update reservation" });
    }
  });

  // Sports Scores
  app.get("/api/scores", async (req, res) => {
    try {
      const { date } = req.query;
      const scoreDate = date as string || new Date().toISOString().split('T')[0];
      
      // Mock data for now - in production this would call ESPN API or SportsData API
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

  // Settings
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  app.post("/api/settings", async (req, res) => {
    try {
      const validatedData = insertSettingSchema.parse(req.body);
      const setting = await storage.upsertSetting(validatedData);
      res.json(setting);
    } catch (error) {
      console.error("Error saving setting:", error);
      res.status(400).json({ message: "Failed to save setting" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
