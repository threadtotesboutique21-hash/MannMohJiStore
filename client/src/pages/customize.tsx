import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Customize() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    description: "",
    budget: "",
    timeline: "",
  });

  const createCustomizationMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/customizations", data);
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted!",
        description: "We'll contact you within 24 hours to discuss your custom design.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        description: "",
        budget: "",
        timeline: "",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit customization request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCustomizationMutation.mutate(formData);
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = '+923001234567';
    const message = 'Hi, I would like to discuss a custom design with your team.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 luxury-gradient text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl lg:text-7xl font-bold mb-6">
              Custom Design Studio
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">
              Transform your vision into reality with our expert designers. Create unique, personalized fashion pieces that reflect your individual style.
            </p>
          </div>
        </div>
        <div className="absolute top-10 right-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 border border-white/10 rounded-full"></div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Customization Process */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">How It Works</h2>
            
            <div className="space-y-8">
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">Share Your Vision</h3>
                  <p className="text-muted-foreground">
                    Tell us about your dream outfit, share inspiration images, and describe your style preferences.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">Design Consultation</h3>
                  <p className="text-muted-foreground">
                    Our expert designers will create initial sketches and discuss fabric options with you.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">Perfect Fitting</h3>
                  <p className="text-muted-foreground">
                    Schedule fittings to ensure your custom piece fits perfectly and meets your expectations.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">Final Creation</h3>
                  <p className="text-muted-foreground">
                    Receive your custom-made outfit, crafted with premium materials and attention to detail.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fab fa-whatsapp text-green-500 mr-2"></i>
                  Quick Consultation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Want to discuss your ideas immediately? Chat with our designers on WhatsApp.
                </p>
                <Button 
                  onClick={handleWhatsAppContact}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  data-testid="button-whatsapp-quick-contact"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  Start WhatsApp Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Customization Request Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Submit Design Request</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                        data-testid="input-first-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                        data-testid="input-last-name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      data-testid="input-email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+92-300-1234567"
                      required
                      data-testid="input-phone"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Design Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your ideal outfit, including style, colors, occasions, and any specific requirements..."
                      rows={5}
                      required
                      data-testid="textarea-description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                        <SelectTrigger data-testid="select-budget">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5000-10000">PKR 5,000 - 10,000</SelectItem>
                          <SelectItem value="10000-20000">PKR 10,000 - 20,000</SelectItem>
                          <SelectItem value="20000-50000">PKR 20,000 - 50,000</SelectItem>
                          <SelectItem value="50000+">PKR 50,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="timeline">Timeline</Label>
                      <Select value={formData.timeline} onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
                        <SelectTrigger data-testid="select-timeline">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                          <SelectItem value="2-4 weeks">2-4 weeks</SelectItem>
                          <SelectItem value="1-2 months">1-2 months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full luxury-button text-white py-4 text-lg font-semibold"
                    disabled={createCustomizationMutation.isPending}
                    data-testid="button-submit-request"
                  >
                    {createCustomizationMutation.isPending ? "Submitting..." : "Submit Design Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Portfolio Section */}
        <section className="py-16">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
            Our Custom Creations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
              "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
              "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
              "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"
            ].map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-xl group cursor-pointer">
                <img 
                  src={image} 
                  alt={`Custom design ${index + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
