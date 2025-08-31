import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 luxury-gradient text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl lg:text-7xl font-bold mb-6">
              About MannMohji
            </h1>
            <p className="text-xl lg:text-2xl opacity-90">
              Crafting timeless elegance with modern sophistication since 2020
            </p>
          </div>
        </div>
        <div className="absolute top-10 right-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 border border-white/10 rounded-full"></div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  MannMohji was born from a passion for creating exceptional fashion experiences. 
                  Founded in 2020, we set out to bridge the gap between traditional craftsmanship 
                  and contemporary design.
                </p>
                <p>
                  Our journey began with a simple belief: every individual deserves to wear 
                  clothing that not only looks beautiful but also tells their unique story. 
                  Today, we're proud to be a leading name in luxury fashion.
                </p>
                <p>
                  From premium unstitched fabrics to ready-to-wear collections, from elegant 
                  accessories to custom designs, we curate every piece with meticulous attention 
                  to detail and quality.
                </p>
              </div>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="MannMohji design process"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="font-serif text-4xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-gem text-white text-2xl"></i>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">Quality Excellence</h3>
                <p className="text-muted-foreground">
                  We source only the finest materials and work with skilled artisans to ensure every piece meets our high standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-heart text-white text-2xl"></i>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">Customer First</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. We provide personalized service and support throughout your fashion journey.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-leaf text-white text-2xl"></i>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to sustainable practices and ethical sourcing in all aspects of our business.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-16">
          <h2 className="font-serif text-4xl font-bold text-foreground text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Ahmed",
                role: "Creative Director",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
              },
              {
                name: "Hassan Ali",
                role: "Head Designer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
              },
              {
                name: "Fatima Khan",
                role: "Quality Manager",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
              }
            ].map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-8">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg text-foreground mb-1">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <section className="text-center bg-muted rounded-xl p-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            "To empower individuals through fashion by creating beautiful, high-quality clothing 
            that celebrates personal style and cultural heritage. We believe that fashion should 
            be an expression of who you are, not just what you wear."
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}
