import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
    title: "Elegant Fashion",
    subtitle: "Discover our exclusive collection of premium clothing and accessories",
    primaryAction: "Shop Collection",
    secondaryAction: "Customize Design"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
    title: "Custom Designs",
    subtitle: "Create your perfect outfit with our expert designers",
    primaryAction: "Start Designing",
    secondaryAction: "View Gallery"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
    title: "New Arrivals",
    subtitle: "Explore the latest trends in luxury fashion",
    primaryAction: "Shop New",
    secondaryAction: "Learn More"
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[600px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`banner-slide absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={banner.image} 
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="font-serif text-5xl lg:text-7xl font-bold mb-6 animate-fade-in">
                {banner.title}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                {banner.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button 
                    className="luxury-button px-8 py-4 rounded-lg text-white font-semibold text-lg"
                    data-testid="button-shop-collection"
                  >
                    {banner.primaryAction}
                  </Button>
                </Link>
                <Link href="/customize">
                  <Button 
                    variant="outline"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-all"
                    data-testid="button-customize-design"
                  >
                    {banner.secondaryAction}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slider Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-opacity ${
              index === currentSlide ? 'bg-white opacity-100' : 'bg-white opacity-50 hover:opacity-100'
            }`}
            data-testid={`button-slide-${index}`}
          />
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-accent transition-colors"
        data-testid="button-prev-slide"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-accent transition-colors"
        data-testid="button-next-slide"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </section>
  );
}
