
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-medical/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-medical">404</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">页面未找到</h1>
        <p className="text-muted-foreground mb-6">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <Button asChild className="bg-medical hover:bg-medical-dark">
          <Link to="/dashboard" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            返回首页
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
