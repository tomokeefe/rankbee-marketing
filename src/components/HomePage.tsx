import { BlurText } from "./BlurText";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Target, Users, BarChart3 } from "lucide-react";
import Frame2 from "../imports/Frame2";


interface HomePageProps {
  onPageChange: (page: string) => void;
}

export function HomePage({ onPageChange }: HomePageProps) {
  const benefits = [
    {
      icon: <Target className="w-6 h-6 text-purple-600" />,
      title: "Spot Gaps Early",
      description: "See if AI favors rivals—and why. Like the agency that fixed messaging to snag 30% more mentions."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
      title: "Actionable Tweaks",
      description: "Get plain-English recs, not jargon. Track changes over time with our clean dashboards."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Scale Smart",
      description: "From solo founders to teams, unlimited users mean everyone stays in the loop."
    }
  ];

  const features = [
    {
      title: "Brand Comparisons",
      description: "See how you stack up against competitors in AI responses"
    },
    {
      title: "Prompt Rankings",
      description: "Track your visibility across different AI queries"
    },
    {
      title: "Citation Analysis",
      description: "Understand what sources AI models are using"
    },
    {
      title: "Real-time Alerts",
      description: "Get notified when your brand ranking changes"
    }
  ];

  const testimonials = [
    {
      quote: "RankBee turned our AI blind spot into a spotlight—leads up 25%.",
      author: "Sarah Chen",
      role: "Startup Founder"
    },
    {
      quote: "Finally, a tool that makes AI optimization feel doable, not overwhelming.",
      author: "Marcus Rodriguez",
      role: "Marketing Director"
    },
    {
      quote: "We spotted our competitor advantage in week one. Game changer.",
      author: "Emma Thompson",
      role: "Agency Owner"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full width container for Figma import */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-purple-100 overflow-hidden py-6 lg:py-12">
        <div className="flex items-center justify-center w-full">
          {/* Desktop Version */}
          <div className="hidden lg:block w-full max-w-[1440px] h-[950px] relative">
            <Frame2 />
          </div>
          
          {/* Mobile/Tablet Version */}
          <div className="lg:hidden w-full max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center space-y-5 sm:space-y-6">
              <BlurText
                as="h1"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight text-center justify-center"
                text={"10x Improvement in\nChatGPT Visibility in 14 Days"}
                delay={45}
                highlightWords={["10x", "ChatGPT"]}
              />
              
              {/* Mobile Description */}
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We cut through the noise to show how ChatGPT, Gemini, and more rank you—then give you simple steps to climb higher. No fluff, just results that grow your business.
              </p>
              
              {/* Mobile CTA */}
              <div className="pt-3">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
                >
                  Try it now for free →
                </Button>
              </div>

              <div className="mobile-hero-visual-wrapper pt-4">
                <div className="mobile-hero-visual-frame mx-auto max-w-2xl overflow-hidden rounded-xl shadow-lg">
                  <ImageWithFallback
                    src="https://cdn.builder.io/api/v1/image/assets%2F57f3921c477141799725b87f2761d2c2%2F4d0f357a0fb24e96890af06b31e089e6?format=webp&width=800"
                    alt="Dashboard showing AI-driven brand ranking insights"
                    className="mobile-hero-visual w-full h-auto"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>



      {/* Why RankBee Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <BlurText
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-gray-900 justify-center"
              text="Real Wins, Real Fast"
              delay={35}
              highlightWords={["Wins", "Fast"]}
            />
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              From tracking competitors to spotting citation goldmines, here's how we make AI work for you.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-purple-200">
                <CardHeader>
                  <div className="mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-gray-900">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Features Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <BlurText
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-gray-900 justify-center"
              text="What You'll Get Inside"
              delay={35}
              highlightWords={["Inside"]}
            />
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Monitor visibility, compare brands, export insights—built for marketers who hate busywork.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm sm:text-base text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="bg-cta hover:bg-cta/90 text-cta-foreground px-6 sm:px-8"
            >
              See It Live
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <BlurText
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-gray-900 justify-center"
              text="Brands Like Yours Are Buzzing"
              delay={35}
              highlightWords={["Buzzing"]}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-purple-50 border-purple-200">
                <CardContent className="pt-6">
                  <blockquote className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="text-gray-900 font-medium">{testimonial.author}</div>
                    <div className="text-purple-600 text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6">
            Ready to Hear Your <span className="gradient-highlight">Brand</span> in <span className="gradient-highlight">AI</span>?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Join hundreds of brands already winning in the AI conversation.
          </p>
          <Button
            size="lg"
            className="bg-white text-cta hover:bg-gray-100 px-6 sm:px-8 text-base sm:text-lg"
          >
            Get Started Free
          </Button>
        </div>
      </section>
    </div>
  );
}
