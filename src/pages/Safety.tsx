
import Navigation from "@/components/Navigation";

const Safety = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
            Safety & Security
          </h1>
          
          <div className="space-y-8">
            <section className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                We prioritize the security and privacy of your health information. All data is encrypted in transit and at rest, 
                following industry-standard security protocols and HIPAA compliance guidelines.
              </p>
            </section>

            <section className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">AI Safety Measures</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our AI systems are designed with multiple safety layers:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Continuous monitoring for accuracy and bias</li>
                <li>Regular validation against medical literature</li>
                <li>Human oversight for all critical recommendations</li>
                <li>Clear disclaimers about AI limitations</li>
              </ul>
            </section>

            <section className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Medical Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed">
                Our AI-powered tools are designed to provide information and support, but they are not a substitute for 
                professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers 
                for medical concerns.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Safety;
