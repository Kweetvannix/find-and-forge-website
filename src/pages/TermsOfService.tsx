
import Navigation from "@/components/Navigation";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
            Terms of Service
          </h1>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Healthily.ai services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Permission is granted to temporarily access our AI-powered health tools for personal, non-commercial use only.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>This is the grant of a license, not a transfer of title</li>
                <li>Under this license you may not modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained in our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Medical Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed">
                Our AI tools are for informational purposes only and do not constitute medical advice. Always consult with qualified healthcare professionals for medical decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
