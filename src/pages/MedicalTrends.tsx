import { useState } from "react";
import { ArrowLeft, TrendingUp, Brain, Stethoscope, BarChart3, FileText, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const MedicalTrends = () => {
  const [activeChart, setActiveChart] = useState("accuracy");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button asChild variant="outline" size="sm">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Medical Research Trends
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore the latest developments in AI vs. medical professionals, comparing accuracy, 
              efficiency, and diagnostic capabilities across various medical fields.
            </p>
          </div>
        </div>

        {/* Interactive Chart Section */}
        <div className="mb-12">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                AI vs Doctor Accuracy Comparison
              </CardTitle>
              <p className="text-gray-600">
                Interactive data visualization showing comparative performance metrics
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Interactive Chart Placeholder
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Please upload your ai_doctor_accuracy_chart.html file content here
                  </p>
                  <Button variant="outline">
                    Upload Chart Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="literature" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="literature" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Literature
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Data Analysis
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Visual Studies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="literature" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Publications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">AI in Diagnostic Radiology: A Meta-Analysis</h4>
                      <p className="text-sm text-gray-600">Nature Medicine, 2024</p>
                      <p className="text-sm mt-1">Comprehensive comparison of AI vs radiologist accuracy in image diagnosis</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold">Machine Learning in Clinical Decision Making</h4>
                      <p className="text-sm text-gray-600">The Lancet, 2024</p>
                      <p className="text-sm mt-1">Analysis of AI-assisted diagnosis vs traditional clinical approaches</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold">Pathology AI: Current State and Future</h4>
                      <p className="text-sm text-gray-600">NEJM, 2024</p>
                      <p className="text-sm mt-1">Evaluation of AI performance in pathological diagnosis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Key Research Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Brain className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Diagnostic Accuracy</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Stethoscope className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Clinical Decision Support</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Outcome Prediction</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
                  <div className="text-sm text-gray-600">AI Diagnostic Accuracy</div>
                  <div className="text-xs text-gray-500 mt-1">in dermatology imaging</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
                  <div className="text-sm text-gray-600">Doctor Accuracy</div>
                  <div className="text-xs text-gray-500 mt-1">in same conditions</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">2.3x</div>
                  <div className="text-sm text-gray-600">Speed Improvement</div>
                  <div className="text-xs text-gray-500 mt-1">AI vs traditional methods</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Comparative Visualizations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Medical imaging comparison charts</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Statistical analysis graphs</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* External Resources */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-12">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Explore More Resources</h2>
            <p className="text-lg mb-6 opacity-90">
              Access comprehensive databases and research platforms for the latest medical AI studies
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild variant="secondary" size="lg">
                <a href="https://pubmed.ncbi.nlm.nih.gov" target="_blank" rel="noopener noreferrer">
                  PubMed Research
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
                <a href="https://www.nature.com/subjects/machine-learning" target="_blank" rel="noopener noreferrer">
                  Nature AI Studies
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
                <a href="https://www.thelancet.com/journals/landig/home" target="_blank" rel="noopener noreferrer">
                  Lancet Digital Health
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MedicalTrends;