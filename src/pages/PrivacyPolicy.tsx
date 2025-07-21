
import Navigation from "@/components/Navigation";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
            Privacy Policy
          </h1>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you create an account, use our services, or contact us.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Personal information (name, email address)</li>
                <li>Health-related queries and symptoms</li>
                <li>Usage data and interactions with our AI tools</li>
                <li>Device and browser information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide and improve our AI-powered health services</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Ensure the security and integrity of our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@healthily.ai
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
