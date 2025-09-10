import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Menu from "@/pages/menu";
import Events from "@/pages/events";
import Reservations from "@/pages/reservations";
import Scores from "@/pages/scores";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminMenu from "@/pages/admin/menu";
import AdminEvents from "@/pages/admin/events-admin";
import AdminReservations from "@/pages/admin/reservations-admin";
import AdminUsers from "@/pages/admin/users";
import AdminSettings from "@/pages/admin/settings";

function Router() {
  return (
    <Switch>
      {/* Public routes - always accessible */}
      <Route path="/" component={Landing} />
      <Route path="/menu" component={Menu} />
      <Route path="/events" component={Events} />
      <Route path="/reservations" component={Reservations} />
      <Route path="/scores" component={Scores} />
      
      {/* Admin routes - accessible without authentication */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/menu" component={AdminMenu} />
      <Route path="/admin/events" component={AdminEvents} />
      <Route path="/admin/reservations" component={AdminReservations} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/settings" component={AdminSettings} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
