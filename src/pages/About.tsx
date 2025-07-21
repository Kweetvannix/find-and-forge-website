
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, Heart, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
              About Us
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're dedicated to making healthcare information accessible and understandable for everyone.
            </p>
          </div>

          {/* Who We Are Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                Who We Are
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="h-6 w-6 text-red-500" />
                    <h3 className="text-xl font-semibold">Our Mission</h3>
                  </div>
                  <p className="text-gray-600">
                    We believe everyone deserves access to reliable, understandable health information. 
                    Our AI-powered platform helps bridge the gap between complex medical knowledge and 
                    everyday health decisions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-6 w-6 text-green-500" />
                    <h3 className="text-xl font-semibold">Our Values</h3>
                  </div>
                  <p className="text-gray-600">
                    Safety, accuracy, and accessibility are at the core of everything we do. 
                    We're committed to providing medically accurate information while emphasizing 
                    the importance of professional healthcare consultation.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h3>
                <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  Founded by a team of healthcare professionals, technologists, and researchers, 
                  we recognized the need for a more intuitive way to access medical information. 
                  Our platform combines cutting-edge AI technology with evidence-based medical knowledge 
                  to create tools that empower users to make informed health decisions while always 
                  encouraging professional medical consultation for serious concerns.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Careers Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                <Briefcase className="h-8 w-8 text-green-600" />
                Careers
              </h2>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Team</h3>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    We're always looking for passionate individuals who share our mission 
                    of making healthcare more accessible and understandable.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Medical Professionals</h4>
                    <p className="text-gray-600 text-sm">
                      Help us ensure our AI provides accurate, safe medical information
                    </p>
                  </div>
                  
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">AI Engineers</h4>
                    <p className="text-gray-600 text-sm">
                      Build the next generation of healthcare AI technology
                    </p>
                  </div>
                  
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">UX Designers</h4>
                    <p className="text-gray-600 text-sm">
                      Create intuitive experiences for complex medical information
                    </p>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <p className="text-gray-600 mb-4">
                    Interested in joining our mission? We'd love to hear from you.
                  </p>
                  <a 
                    href="mailto:careers@healthily.com" 
                    className="inline-block bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-colors"
                  >
                    Send Us Your Resume
                  </a>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
