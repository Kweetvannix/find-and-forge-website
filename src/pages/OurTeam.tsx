
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";

const OurTeam = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      description: "Board-certified physician with 15 years of experience in digital health.",
      image: "/placeholder.svg"
    },
    {
      name: "Alex Chen",
      role: "Chief Technology Officer",
      description: "AI researcher with expertise in medical machine learning applications.",
      image: "/placeholder.svg"
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Head of Research",
      description: "Medical researcher specializing in AI-assisted diagnosis and treatment.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">
            Our Team
          </h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-700 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OurTeam;
