
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";

const AdvisoryBoard = () => {
  const advisors = [
    {
      name: "Dr. Emily Watson",
      role: "Former Chief of Digital Health, Mayo Clinic",
      description: "Leading expert in healthcare technology and digital transformation.",
    },
    {
      name: "Prof. James Liu",
      role: "AI Research Director, Stanford Medicine",
      description: "Pioneer in artificial intelligence applications in healthcare.",
    },
    {
      name: "Dr. Maria Gonzalez",
      role: "Healthcare Policy Expert",
      description: "Former advisor to WHO on digital health initiatives.",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">
            Advisory Board
          </h1>
          
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Our advisory board consists of world-renowned experts in medicine, technology, and healthcare policy.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisors.map((advisor, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{advisor.name}</h3>
                  <p className="text-purple-600 font-medium mb-3">{advisor.role}</p>
                  <p className="text-gray-700 text-sm">{advisor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdvisoryBoard;
