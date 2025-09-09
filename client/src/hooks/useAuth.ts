import { useState, useEffect } from "react";
import { type User } from "@shared/schema";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/user", {
          credentials: "include",
        });
        
        if (!mounted) return;
        
        if (res.status === 401 || !res.ok) {
          setUser(null);
        } else {
          const userData = await res.json();
          setUser(userData);
        }
      } catch (error) {
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchUser();
    
    return () => {
      mounted = false;
    };
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
