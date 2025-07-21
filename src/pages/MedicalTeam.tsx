
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";

const MedicalTeam = () => {
  const medicalTeam = [
    {
      name: "Dr. Robert Kim",
      role: "Head of Clinical Affairs",
      specialty: "Internal Medicine & Digital Health",
      description: "20+ years experience in clinical practice and healthcare innovation.",
    },
    {
      name: "Dr. Lisa Thompson",
      role: "Chief Medical Reviewer",
      specialty: "Emergency Medicine",
      description: "Expert in acute care and AI-assisted triage systems.",
    },
    {
      name: "Dr. Ahmed Hassan",
      role: "Senior Medical Advisor",
      specialty: "Cardiology & AI Ethics",
      description: "Specialist in cardiovascular medicine and ethical AI implementation.",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">
            Medical Team
          </h1>
          
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Our medical team ensures clinical accuracy and safety across all our AI-powered health solutions.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {medicalTeam.map((member, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-1">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-3">{member.specialty}</p>
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

export default MedicalTeam;
