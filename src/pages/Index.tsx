import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, LogIn, UserPlus, Sparkles, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import SearchResults from "@/components/SearchResults";
import ProviderSelector from "@/components/ProviderSelector";
import { useAuth } from "@/contexts/AuthContext";
import { AIProvider } from "@/services/AISearchService";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('openai');
  const { user, isAuthenticated } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Discover & Search
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find exactly what you're looking for with our AI-powered search engine. 
            {isAuthenticated ? ` Welcome back, ${user?.name}!` : " Sign in to save your searches."}
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search for anything..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 text-lg border-0 focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg"
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    AI Search
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">AI Provider:</span>
                    <ProviderSelector 
                      selectedProvider={selectedProvider}
                      onProviderChange={setSelectedProvider}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Powered by advanced AI for intelligent search results
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Search Results */}
        {showResults && (
          <SearchResults 
            query={searchQuery} 
            onClose={() => setShowResults(false)}
            provider={selectedProvider}
          />
        )}

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-gray-600">Advanced algorithms to find exactly what you need</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple AI Providers</h3>
              <p className="text-gray-600">Choose from OpenAI, Anthropic, or Google Gemini for your search</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Account</h3>
              <p className="text-gray-600">Save searches and access personalized results</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        {!isAuthenticated && (
          <div className="text-center mb-16">
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-xl mb-6 opacity-90">Join thousands of users who trust our search platform</p>
                <div className="flex gap-4 justify-center">
                  <Button asChild size="lg" variant="secondary">
                    <Link to="/login">
                      <LogIn className="mr-2 h-5 w-5" />
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                    <Link to="/signup">
                      <UserPlus className="mr-2 h-5 w-5" />
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
