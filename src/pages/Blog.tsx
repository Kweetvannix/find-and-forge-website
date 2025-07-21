
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Blog = () => {
  const blogPosts = [
    {
      title: "The Future of AI in Healthcare",
      excerpt: "Exploring how artificial intelligence is revolutionizing medical diagnosis and treatment.",
      date: "December 15, 2024",
      category: "AI & Healthcare"
    },
    {
      title: "Understanding Medical AI Ethics",
      excerpt: "A deep dive into the ethical considerations of AI-powered medical tools.",
      date: "December 10, 2024",
      category: "Ethics"
    },
    {
      title: "AI-Assisted Diagnosis: Current State and Future",
      excerpt: "Analyzing the current capabilities and future potential of AI diagnostic tools.",
      date: "December 5, 2024",
      category: "Technology"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">
            Health AI Blog
          </h1>
          
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Stay updated with the latest insights on AI in healthcare, medical research, and digital health innovation.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="text-sm text-blue-600 font-medium mb-2">{post.category}</div>
                  <CardTitle className="text-xl text-gray-900">{post.title}</CardTitle>
                  <div className="text-sm text-gray-500">{post.date}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{post.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
