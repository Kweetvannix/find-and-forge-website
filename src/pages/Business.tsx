
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Business = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">
            Healthily.ai for Business
          </h1>
          
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Transform your healthcare organization with AI-powered solutions designed for enterprise needs.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">Enterprise API</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Integrate our AI diagnostic tools directly into your existing healthcare systems.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">Custom Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Tailored AI solutions designed specifically for your organization's unique needs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Comprehensive analytics and insights to improve patient outcomes and operational efficiency.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Request Enterprise Demo
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Business;
