import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-hero-pattern p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-primary-foreground font-bold text-3xl">404</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/dashboard">
            <Button variant="hero" className="gap-2">
              <Home className="w-4 h-4" />
              Go to Dashboard
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
