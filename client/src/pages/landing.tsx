import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import type { Category, ProductWithCategory } from "@shared/schema";

export default function Landing() {
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: trendingProducts, isLoading: productsLoading } = useQuery<ProductWithCategory[]>({
    queryKey: ["/api/products/trending"],
  });

  const categoryData = [
    {
      id: "unstitched",
      name: "Unstitched",
      description: "Premium fabrics & designs",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      slug: "unstitched"
    },
    {
      id: "stitched", 
      name: "Stitched",
      description: "Ready-to-wear elegance",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      slug: "stitched"
    },
    {
      id: "bags",
      name: "Bags", 
      description: "Luxury handbags",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      slug: "bags"
    },
    {
      id: "jackets",
      name: "Jackets",
      description: "Premium outerwear", 
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      slug: "jackets"
    },
    {
      id: "shoes",
      name: "Shoes",
      description: "Elegant footwear",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400", 
      slug: "shoes"
    },
    {
      id: "slippers",
      name: "Slippers",
      description: "Comfort & style",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      slug: "slippers"
    }
  ];

  const defaultProducts = [
    {
      id: "1",
      name: "Silk Embroidered Dress",
      description: "Premium silk with intricate embroidery",
      price: "8500",
      originalPrice: "12000",
      images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"],
      isNew: true,
      isOnSale: false,
      slug: "silk-embroidered-dress"
    },
    {
      id: "2", 
      name: "Leather Tote Bag",
      description: "Genuine leather with gold hardware",
      price: "15500",
      originalPrice: null,
      images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"],
      isNew: false,
      isOnSale: false,
      slug: "leather-tote-bag"
    },
    {
      id: "3",
      name: "Premium Winter Jacket", 
      description: "Wool blend with satin lining",
      price: "18000",
      originalPrice: "25000",
      images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"],
      isNew: false,
      isOnSale: true,
      slug: "premium-winter-jacket"
    },
    {
      id: "4",
      name: "Designer Heels",
      description: "Italian leather with gold accents", 
      price: "12500",
      originalPrice: null,
      images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"],
      isNew: false,
      isOnSale: false,
      slug: "designer-heels"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <HeroBanner />

      {/* Featured Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our carefully curated collections designed for the modern, sophisticated individual
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-64 w-full rounded-xl" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              ))
            ) : (
              categoryData.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Customization Highlight */}
      <section className="py-20 luxury-gradient text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-4xl lg:text-6xl font-bold mb-6">
                Design Your <br />Perfect Outfit
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Work with our expert designers to create a unique piece that reflects your personal style. From concept to creation, we bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/customize">
                  <Button 
                    className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent hover:text-accent-foreground transition-all"
                    data-testid="button-start-designing"
                  >
                    Start Designing
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-all"
                  onClick={() => {
                    const phoneNumber = '+923001234567';
                    const message = 'Hi, I would like to inquire about custom designs at MannMohji.';
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  data-testid="button-chat-designer"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  Chat with Designer
                </Button>
              </div>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600" 
                alt="Fashion design consultation process" 
                className="rounded-xl shadow-2xl mx-auto"
              />
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 border border-white/10 rounded-full"></div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Trending Now
              </h2>
              <p className="text-muted-foreground text-lg">
                Discover what's popular this season
              </p>
            </div>
            <Link href="/products">
              <Button 
                variant="link" 
                className="hidden md:flex text-primary hover:text-primary/80 font-semibold items-center"
                data-testid="link-view-all-products"
              >
                View All <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-64 w-full rounded-xl" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-8 w-24" />
                </div>
              ))
            ) : (
              (trendingProducts || defaultProducts).map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Stay in Style
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Subscribe to our newsletter for exclusive offers, style tips, and early access to new collections
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button 
                className="luxury-button px-8 py-3 rounded-lg text-white font-semibold whitespace-nowrap"
                data-testid="button-subscribe-newsletter"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="bg-green-500 text-white w-14 h-14 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center"
          onClick={() => {
            const phoneNumber = '+923001234567';
            const message = 'Hi, I would like to inquire about MannMohji products.';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
          }}
          data-testid="button-whatsapp-float"
        >
          <i className="fab fa-whatsapp text-2xl"></i>
        </Button>
      </div>
    </div>
  );
}
