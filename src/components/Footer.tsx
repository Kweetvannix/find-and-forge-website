
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Our Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Our Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Safety</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our team</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Advisory board</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Medical team</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Editorial team</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">For Business</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Healthily.ai</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Terms of service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie settings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Using Healthily safely</a></li>
            </ul>
          </div>

          {/* Additional */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Certificates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Editorial policy and principles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Explainability Statement</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm">&copy; 2024 Healthily. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
