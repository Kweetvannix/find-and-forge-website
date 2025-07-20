import { Link } from "react-router-dom";
import { Search, User, LogIn, LogOut, UserPlus, Newspaper, Brain, Stethoscope, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Search className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SearchApp
            </span>
          </Link>

          <Button asChild variant="outline" className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 hover:from-orange-600 hover:to-red-700">
            <Link to="/ai-news">
              <Newspaper className="mr-2 h-4 w-4" />
              Latest AI News
            </Link>
          </Button>

          <Button asChild variant="outline" className="bg-gradient-to-r from-green-500 to-teal-600 text-white border-0 hover:from-green-600 hover:to-teal-700">
            <Link to="/medical-trends">
              <Brain className="mr-2 h-4 w-4" />
              Medical Research Trends
            </Link>
          </Button>

          <Button asChild variant="outline" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 hover:from-blue-600 hover:to-indigo-700">
            <Link to="/medical-chatbot">
              <Stethoscope className="mr-2 h-4 w-4" />
              Medical Chatbot
            </Link>
          </Button>

          <Button asChild variant="outline" className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 hover:from-purple-600 hover:to-pink-700">
            <Link to="/subscription">
              <CreditCard className="mr-2 h-4 w-4" />
              Subscription
            </Link>
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button asChild>
                <Link to="/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
