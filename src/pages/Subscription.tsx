
import { useState } from "react";
import { Check, Crown, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      icon: <Star className="h-6 w-6" />,
      color: 'from-gray-500 to-gray-600',
      features: [
        'Basic AI models',
        '10 searches per day',
        'Limited medical consultations',
        'Community support',
        'Basic search results'
      ],
      limitations: [
        'Weaker AI models',
        'Search limit restrictions',
        'No priority support'
      ]
    },
    {
      id: 'basic',
      name: 'Basic',
      price: '$20',
      period: 'per month',
      description: 'Great for regular users',
      icon: <Zap className="h-6 w-6" />,
      color: 'from-blue-500 to-blue-600',
      popular: true,
      features: [
        'Premium AI models (Gemma Pro)',
        '100 credits per month',
        'Unlimited medical consultations',
        'Priority support',
        'Advanced search results',
        'Buy additional credits'
      ]
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '$100',
      period: 'per month',
      description: 'Perfect for power users',
      icon: <Crown className="h-6 w-6" />,
      color: 'from-purple-500 to-purple-600',
      features: [
        'Best AI models (Gemma Ultra)',
        '1,000 credits per month',
        'Unlimited everything',
        '24/7 priority support',
        'Advanced analytics',
        'API access',
        'Buy additional credits'
      ]
    },
    {
      id: 'custom',
      name: 'Custom',
      price: 'Contact us',
      period: 'custom pricing',
      description: 'Tailored for your needs',
      icon: <Crown className="h-6 w-6" />,
      color: 'from-gradient-to-r from-orange-500 to-red-600',
      features: [
        'Best AI models available',
        'Unlimited credits',
        'Custom integrations',
        'Dedicated support team',
        'White-label options',
        'Custom API limits',
        'Enterprise SLA'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Unlock the power of AI with our flexible pricing plans. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedPlan === plan.id ? 'ring-4 ring-blue-500' : ''
              } ${plan.popular ? 'bg-gradient-to-br from-blue-50 to-purple-50' : 'bg-white/80 backdrop-blur-sm'}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-2">
                  {plan.price}
                  <span className="text-lg font-normal text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations && (
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Limitations:</p>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="text-xs text-gray-500">
                          • {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button 
                  className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity`}
                  size="lg"
                >
                  {plan.id === 'free' ? 'Current Plan' : plan.id === 'custom' ? 'Contact Sales' : 'Upgrade Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">What are credits?</h4>
                <p className="text-gray-600 text-sm">Credits are used for AI searches, medical consultations, and other AI-powered features. Each search typically costs 1 credit.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Can I buy additional credits?</h4>
                <p className="text-gray-600 text-sm">Yes! Paid plan subscribers can purchase additional credits at any time through their account dashboard.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Subscription;
