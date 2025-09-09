import { ReactNode } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user } = useAuth();

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-primary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/admin/dashboard">
                <h1 className="text-2xl font-display font-bold text-accent tracking-tight cursor-pointer" data-testid="link-admin-home">
                  SUPANO'S ADMIN
                </h1>
              </Link>
              
              <nav className="hidden md:flex space-x-6">
                <Link href="/admin/dashboard">
                  <a className="text-foreground hover:text-accent transition-colors text-sm" data-testid="link-dashboard">
                    Dashboard
                  </a>
                </Link>
                <Link href="/admin/menu">
                  <a className="text-foreground hover:text-accent transition-colors text-sm" data-testid="link-menu-admin">
                    Menu
                  </a>
                </Link>
                <Link href="/admin/events">
                  <a className="text-foreground hover:text-accent transition-colors text-sm" data-testid="link-events-admin">
                    Events
                  </a>
                </Link>
                <Link href="/admin/reservations">
                  <a className="text-foreground hover:text-accent transition-colors text-sm" data-testid="link-reservations-admin">
                    Reservations
                  </a>
                </Link>
                <Link href="/admin/settings">
                  <a className="text-foreground hover:text-accent transition-colors text-sm" data-testid="link-settings-admin">
                    Settings
                  </a>
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-view-site">
                  View Site
                </Button>
              </Link>
              
              <div className="flex items-center space-x-3">
                {user?.profileImageUrl && (
                  <img 
                    src={user.profileImageUrl} 
                    alt={user.firstName || "Admin"} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <div className="hidden sm:block text-sm">
                  <p className="text-foreground font-medium">{user?.firstName} {user?.lastName}</p>
                  <p className="text-muted-foreground text-xs">{user?.role}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} data-testid="button-logout-admin">
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 py-3 overflow-x-auto scrollbar-hide">
            <Link href="/admin/dashboard">
              <a className="text-foreground hover:text-accent transition-colors text-sm whitespace-nowrap" data-testid="link-dashboard-mobile">
                Dashboard
              </a>
            </Link>
            <Link href="/admin/menu">
              <a className="text-foreground hover:text-accent transition-colors text-sm whitespace-nowrap" data-testid="link-menu-mobile">
                Menu
              </a>
            </Link>
            <Link href="/admin/events">
              <a className="text-foreground hover:text-accent transition-colors text-sm whitespace-nowrap" data-testid="link-events-mobile">
                Events
              </a>
            </Link>
            <Link href="/admin/reservations">
              <a className="text-foreground hover:text-accent transition-colors text-sm whitespace-nowrap" data-testid="link-reservations-mobile">
                Reservations
              </a>
            </Link>
            <Link href="/admin/settings">
              <a className="text-foreground hover:text-accent transition-colors text-sm whitespace-nowrap" data-testid="link-settings-mobile">
                Settings
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
