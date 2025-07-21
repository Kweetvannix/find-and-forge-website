
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageSquare, TrendingUp, CreditCard } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const faqData: FAQItem[] = [
    // General Site FAQs
    {
      category: 'general',
      question: 'What is Healthily.ai and what services do you provide?',
      answer: 'Healthily.ai is a comprehensive AI-powered health platform that provides medical research trends, AI news updates, symptom analysis through our medical chatbot, and subscription-based premium features. We combine cutting-edge artificial intelligence with medical expertise to make healthcare information more accessible and understandable.'
    },
    {
      category: 'general',
      question: 'Is the information provided on Healthily.ai medically accurate?',
      answer: 'Our content is developed by medical professionals and reviewed by our medical team and advisory board. However, the information provided should not replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.'
    },
    {
      category: 'general',
      question: 'How do you ensure user privacy and data security?',
      answer: 'We implement industry-standard encryption, secure data storage, and strict privacy policies. User data is never shared with third parties without explicit consent. All conversations with our AI systems are encrypted and can be deleted upon request.'
    },
    {
      category: 'general',
      question: 'Can I use Healthily.ai on my mobile device?',
      answer: 'Yes! Our platform is fully responsive and optimized for mobile devices, tablets, and desktop computers. You can access all features through your web browser without needing to download an app.'
    },

    // Medical Research Trends FAQs
    {
      category: 'research',
      question: 'What sources do you use for medical research trends?',
      answer: 'We aggregate data from leading medical journals including PubMed, Nature AI Studies, The Lancet Digital Health, and other peer-reviewed publications. Our AI systems analyze thousands of research papers to identify emerging trends and breakthrough discoveries.'
    },
    {
      category: 'research',
      question: 'How often is the medical research data updated?',
      answer: 'Our research database is updated daily with new publications and studies. Major trends and breakthrough research are highlighted as they emerge, ensuring you have access to the latest medical developments.'
    },
    {
      category: 'research',
      question: 'Can I access full research papers through your platform?',
      answer: 'We provide abstracts and summaries of research papers. For full paper access, we provide direct links to the original sources. Some content may require institutional access or subscription to the publishing journal.'
    },
    {
      category: 'research',
      question: 'How do you determine which research trends to highlight?',
      answer: 'Our AI algorithms analyze citation patterns, research impact, clinical relevance, and emerging patterns across multiple medical fields. We also consider input from our medical advisory board to ensure the most significant developments are featured.'
    },

    // Medical Chatbot FAQs
    {
      category: 'chatbot',
      question: 'How does the AI medical chatbot work?',
      answer: 'Our medical chatbot uses advanced AI reasoning similar to Symptomate, systematically analyzing symptoms through targeted questions. It provides preliminary insights, risk assessments, and recommendations while emphasizing the need for professional medical consultation.'
    },
    {
      category: 'chatbot',
      question: 'Can the chatbot diagnose medical conditions?',
      answer: 'No, our chatbot does not provide medical diagnoses. It offers preliminary symptom analysis and educational information to help you better understand your symptoms and decide when to seek professional medical care.'
    },
    {
      category: 'chatbot',
      question: 'What should I do if the chatbot suggests high-priority symptoms?',
      answer: 'If the chatbot indicates high-priority symptoms or suggests immediate attention, please contact your healthcare provider immediately or seek emergency medical care. Our system is designed to err on the side of caution for your safety.'
    },
    {
      category: 'chatbot',
      question: 'Is my conversation with the chatbot private?',
      answer: 'Yes, all conversations are encrypted and private. You can delete your conversation history at any time. We use conversation data only to improve our AI systems and never share personal health information.'
    },
    {
      category: 'chatbot',
      question: 'Can I use the chatbot for emergency situations?',
      answer: 'No, our chatbot is not designed for emergency situations. For medical emergencies, please call emergency services (911) immediately or go to the nearest emergency room.'
    },

    // Subscription FAQs
    {
      category: 'subscription',
      question: 'What subscription plans do you offer?',
      answer: 'We offer three plans: Basic (free with limited features), Professional ($29/month with advanced AI features and research access), and Enterprise ($99/month with full access, priority support, and team features).'
    },
    {
      category: 'subscription',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover) and process payments securely through industry-standard payment processors.'
    },
    {
      category: 'subscription',
      question: 'Can I cancel my subscription at any time?',
      answer: 'Yes, you can cancel your subscription at any time through your account settings. Your access will continue until the end of your current billing period, and no further charges will be made.'
    },
    {
      category: 'subscription',
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for new subscribers. If you\'re not satisfied within the first 30 days, contact our support team for a full refund.'
    },
    {
      category: 'subscription',
      question: 'What happens to my data if I cancel my subscription?',
      answer: 'Your account data will be retained for 90 days after cancellation, allowing you to reactivate your subscription and retain your history. After 90 days, data will be permanently deleted unless you request earlier deletion.'
    },
    {
      category: 'subscription',
      question: 'Are there any discounts available?',
      answer: 'We offer student discounts, healthcare professional discounts, and annual subscription discounts. Contact our support team with verification of your status to learn about available discounts.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'general', name: 'General', icon: HelpCircle },
    { id: 'research', name: 'Medical Research', icon: TrendingUp },
    { id: 'chatbot', name: 'Medical Chatbot', icon: MessageSquare },
    { id: 'subscription', name: 'Subscriptions', icon: CreditCard }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (index: string) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 text-lg">
              Find answers to common questions about our platform, services, and features
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => {
                const faqId = `${faq.category}-${index}`;
                const isExpanded = expandedItems.includes(faqId);
                
                return (
                  <Card key={faqId} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleExpanded(faqId)}
                        className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-800 pr-4">
                          {faq.question}
                        </h3>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isExpanded && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card className="border border-gray-200">
                <CardContent className="p-8 text-center">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No matching questions found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or browse different categories.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Support */}
          <Card className="mt-12 bg-gradient-to-r from-blue-500 to-green-500 text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-blue-100 mb-6">
                Our support team is here to help you with any questions not covered in our FAQ.
              </p>
              <a
                href="/contact"
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </a>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
