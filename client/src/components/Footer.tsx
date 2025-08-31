import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/">
              <div className="flex items-center space-x-2 mb-6 cursor-pointer">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-serif font-bold text-lg">M</span>
                </div>
                <span className="font-serif font-bold text-2xl text-foreground">MannMohji</span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6">
              Crafting elegant fashion with timeless sophistication. Your style, our passion.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                data-testid="link-facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                data-testid="link-instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const phoneNumber = '+923001234567';
                  const message = 'Hi, I would like to connect with MannMohji.';
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                data-testid="link-whatsapp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                data-testid="link-twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-card-foreground text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-about">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/customize">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-custom-design">
                    Custom Design
                  </a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-size-guide">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-fabric-care">
                  Fabric Care
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-track-order">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-faq">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-card-foreground text-lg mb-6">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products/unstitched">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-unstitched">
                    Unstitched Collection
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products/stitched">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-stitched">
                    Stitched Wear
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products/bags">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-bags">
                    Luxury Bags
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products/jackets">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-jackets">
                    Premium Jackets
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products/shoes">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-shoes">
                    Designer Shoes
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products/slippers">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-slippers">
                    Comfort Slippers
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-card-foreground text-lg mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt text-primary mt-1"></i>
                <div>
                  <p className="text-muted-foreground text-sm">123 Fashion Street, Gulberg III</p>
                  <p className="text-muted-foreground text-sm">Lahore, Pakistan</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-phone text-primary"></i>
                <p className="text-muted-foreground text-sm">+92-300-1234567</p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-primary"></i>
                <p className="text-muted-foreground text-sm">info@mannmohji.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-clock text-primary"></i>
                <div>
                  <p className="text-muted-foreground text-sm">Mon - Sat: 10:00 AM - 8:00 PM</p>
                  <p className="text-muted-foreground text-sm">Sunday: 12:00 PM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © 2024 MannMohji. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors" data-testid="link-privacy">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors" data-testid="link-terms">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors" data-testid="link-returns">
                Returns & Exchanges
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
