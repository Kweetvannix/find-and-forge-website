
import { useState, useEffect } from "react";
import { ArrowLeft, Clock, ExternalLink, TrendingUp, Zap, Brain, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  timestamp: string;
  category: string;
  trending: boolean;
}

const AINewsFeed = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading latest AI news
    const fetchNews = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockNews: NewsItem[] = [
        {
          id: "1",
          title: "OpenAI Releases GPT-5: Revolutionary Breakthrough in AI Reasoning",
          summary: "The latest model shows unprecedented capabilities in complex reasoning tasks, with 40% improvement over GPT-4 in mathematical and logical problem solving.",
          url: "https://openai.com/gpt-5",
          source: "OpenAI Blog",
          timestamp: "2 hours ago",
          category: "Major Release",
          trending: true
        },
        {
          id: "2", 
          title: "Google's Gemini Ultra Beats Human Doctors in Medical Diagnosis",
          summary: "New study shows Gemini Ultra achieving 94% accuracy in complex diagnostic scenarios, outperforming human specialists by 12%.",
          url: "https://deepmind.com/gemini-medical",
          source: "Nature Medicine",
          timestamp: "4 hours ago",
          category: "Healthcare AI",
          trending: true
        },
        {
          id: "3",
          title: "Microsoft Copilot Integration Reaches 1 Billion Users Worldwide",
          summary: "Enterprise adoption soars as productivity gains reach 35% across Fortune 500 companies using AI-powered workflows.",
          url: "https://microsoft.com/copilot-milestone",
          source: "Microsoft News",
          timestamp: "6 hours ago",
          category: "Enterprise",
          trending: false
        },
        {
          id: "4",
          title: "AI Chip Wars: NVIDIA's New H200 GPU Breaks Performance Records",
          summary: "Latest benchmarks show 70% improvement in AI training speeds, potentially accelerating breakthrough discoveries.",
          url: "https://nvidia.com/h200-announcement",
          source: "TechCrunch",
          timestamp: "8 hours ago",
          category: "Hardware",
          trending: false
        },
        {
          id: "5",
          title: "Anthropic's Claude 3.5 Achieves Human-Level Performance in Coding",
          summary: "Software engineering benchmarks show Claude matching senior developer capabilities in complex programming tasks.",
          url: "https://anthropic.com/claude-3-5-coding",
          source: "Anthropic Research",
          timestamp: "12 hours ago",
          category: "Development",
          trending: false
        },
        {
          id: "6",
          title: "AI Regulation Update: EU AI Act Implementation Guidelines Released",
          summary: "Comprehensive framework for responsible AI deployment across European markets, affecting global tech companies.",
          url: "https://ec.europa.eu/ai-act-guidelines",
          source: "European Commission",
          timestamp: "1 day ago",
          category: "Policy",
          trending: false
        }
      ];
      
      setNews(mockNews);
      setLoading(false);
    };

    fetchNews();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Major Release": return Sparkles;
      case "Healthcare AI": return Brain;
      case "Enterprise": return TrendingUp;
      case "Hardware": return Zap;
      default: return Brain;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Major Release": return "bg-purple-100 text-purple-700 border-purple-200";
      case "Healthcare AI": return "bg-green-100 text-green-700 border-green-200";
      case "Enterprise": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Hardware": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI News Feed
            </h1>
            <p className="text-gray-600 mt-2">Latest developments in artificial intelligence</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-md bg-white/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {news.filter(item => item.trending).length}
              </div>
              <div className="text-sm text-gray-600">Trending Stories</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-white/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">24h</div>
              <div className="text-sm text-gray-600">Live Updates</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-white/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{news.length}</div>
              <div className="text-sm text-gray-600">Stories Today</div>
            </CardContent>
          </Card>
        </div>

        {/* News Feed */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="animate-pulse border-0 shadow-md bg-white/60">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {news.map((item) => {
              const CategoryIcon = getCategoryIcon(item.category);
              return (
                <Card 
                  key={item.id} 
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm group"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`${getCategoryColor(item.category)} flex items-center gap-1`}
                        >
                          <CategoryIcon className="h-3 w-3" />
                          {item.category}
                        </Badge>
                        {item.trending && (
                          <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-200">
                            🔥 Trending
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.timestamp}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {item.summary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        📰 {item.source}
                      </span>
                      <Button variant="outline" size="sm" asChild>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          Read Full Story
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-12 mb-8">
          <Button size="lg" variant="outline" className="bg-white/60 backdrop-blur-sm">
            Load More Stories
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AINewsFeed;
