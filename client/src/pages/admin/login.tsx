import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminLogin() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md card-shadow">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground uppercase mb-2">Supano's</h1>
            <h2 className="text-xl font-semibold text-muted-foreground">Admin Access</h2>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={handleLogin}
              className="w-full bg-accent text-accent-foreground hover:bg-gold-600 py-3"
              data-testid="button-admin-login"
            >
              Sign In with Replit
            </Button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Only authorized staff can access the admin panel
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
