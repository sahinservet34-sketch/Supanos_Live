import { type User } from "@shared/schema";

// Simplified auth - no external authentication required
export function useAuth() {
  return {
    user: null as User | null,
    isLoading: false,
    isAuthenticated: false,
  };
}
