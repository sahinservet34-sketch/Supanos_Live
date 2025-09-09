import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold text-accent mb-4 tracking-tight">SUPANO'S</h3>
            <p className="text-muted-foreground mb-4">
              Your ultimate sports bar destination for great food, drinks, and game day action.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold text-primary-foreground mb-4">Hours</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>Mon-Thu: 11AM - 12AM</p>
              <p>Fri-Sat: 11AM - 2AM</p>
              <p>Sunday: 10AM - 12AM</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-primary-foreground mb-4">Contact</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
                123 Sports Ave, Game City
              </p>
              <p>
                <i className="fas fa-phone mr-2 text-accent"></i>
                (555) 123-GAME
              </p>
              <p>
                <i className="fas fa-envelope mr-2 text-accent"></i>
                info@supanos.bar
              </p>
            </div>
          </div>

          {/* Social & Navigation */}
          <div>
            <h4 className="text-lg font-semibold text-primary-foreground mb-4">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors" data-testid="link-facebook">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors" data-testid="link-instagram">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors" data-testid="link-twitter">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors" data-testid="link-youtube">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
            <div className="space-y-2 text-sm">
              <Link href="/menu" className="text-muted-foreground hover:text-accent transition-colors block" data-testid="link-menu-footer">
                Menu
              </Link>
              <Link href="/events" className="text-muted-foreground hover:text-accent transition-colors block" data-testid="link-events-footer">
                Events
              </Link>
              <Link href="/reservations" className="text-muted-foreground hover:text-accent transition-colors block" data-testid="link-reservations-footer">
                Reservations
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Supano's Sports Bar & Grill. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
