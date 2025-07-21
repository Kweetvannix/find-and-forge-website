
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";

const EditorialTeam = () => {
  const editorialTeam = [
    {
      name: "Dr. Jennifer Park",
      role: "Chief Medical Editor",
      description: "Ensures all medical content meets the highest standards of accuracy and clarity.",
    },
    {
      name: "Mark Williams",
      role: "Health Content Director",
      description: "Oversees the creation and review of all health-related educational materials.",
    },
    {
      name: "Dr. Rachel Adams",
      role: "Clinical Content Reviewer",
      description: "Reviews and validates all AI-generated medical content for clinical accuracy.",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">
            Editorial Team
          </h1>
          
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Our editorial team maintains the highest standards of medical accuracy and content quality.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {editorialTeam.map((member, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
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

export default EditorialTeam;
