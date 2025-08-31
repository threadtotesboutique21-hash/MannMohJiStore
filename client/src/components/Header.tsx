import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import AuthModal from "./AuthModal";
import CartSidebar from "./CartSidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { getTotalItems, openCart } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        {/* Top Banner */}
        <div className="bg-primary text-primary-foreground text-center py-2 text-sm">
          <div className="container mx-auto px-4">
            <span>Free Shipping on Orders Above PKR 5,000 | Call: +92-300-1234567</span>
          </div>
        </div>
        
        {/* Main Navigation */}
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" data-testid="link-home">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-serif font-bold text-lg">M</span>
                </div>
                <span className="font-serif font-bold text-2xl text-foreground">MannMohji</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/">
                <a className={`transition-colors font-medium ${location === '/' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                  Home
                </a>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-foreground hover:text-primary transition-colors font-medium flex items-center" data-testid="dropdown-collections">
                  Collections <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/products/unstitched" data-testid="link-unstitched">Unstitched</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products/stitched" data-testid="link-stitched">Stitched</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products/bags" data-testid="link-bags">Bags</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products/jackets" data-testid="link-jackets">Jackets</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products/shoes" data-testid="link-shoes">Shoes</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products/slippers" data-testid="link-slippers">Slippers</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/customize">
                <a className={`transition-colors font-medium ${location === '/customize' ? 'text-accent' : 'text-accent hover:text-accent/80'}`}>
                  Customize
                </a>
              </Link>
              <Link href="/about">
                <a className={`transition-colors font-medium ${location === '/about' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                  About
                </a>
              </Link>
              <Link href="/contact">
                <a className={`transition-colors font-medium ${location === '/contact' ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                  Contact
                </a>
              </Link>
            </div>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center bg-muted rounded-lg px-4 py-2 w-80">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-foreground placeholder-muted-foreground focus-visible:ring-0"
                data-testid="input-search"
              />
              <Button type="submit" variant="ghost" size="sm" data-testid="button-search">
                <i className="fas fa-search text-muted-foreground"></i>
              </Button>
            </form>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden md:block" data-testid="button-wishlist">
                <i className="fas fa-heart text-xl"></i>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={openCart}
                data-testid="button-cart"
              >
                <i className="fas fa-shopping-bag text-xl"></i>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center" data-testid="text-cart-count">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
              
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" data-testid="button-user-menu">
                      <i className="fas fa-user text-xl"></i>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {user?.isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" data-testid="link-admin">Admin Panel</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <a href="/api/logout" data-testid="link-logout">Logout</a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  data-testid="button-login"
                >
                  <i className="fas fa-user text-xl"></i>
                </Button>
              )}
              
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden" data-testid="button-mobile-menu">
                    <i className="fas fa-bars text-xl"></i>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="py-6">
                    <div className="space-y-6">
                      <Link href="/">
                        <a className="block text-lg font-medium text-foreground hover:text-primary transition-colors">
                          Home
                        </a>
                      </Link>
                      <div>
                        <h3 className="text-lg font-medium text-foreground mb-3">Collections</h3>
                        <div className="space-y-2 ml-4">
                          <Link href="/products/unstitched">
                            <a className="block text-muted-foreground hover:text-primary transition-colors">Unstitched</a>
                          </Link>
                          <Link href="/products/stitched">
                            <a className="block text-muted-foreground hover:text-primary transition-colors">Stitched</a>
                          </Link>
                          <Link href="/products/bags">
                            <a className="block text-muted-foreground hover:text-primary transition-colors">Bags</a>
                          </Link>
                          <Link href="/products/jackets">
                            <a className="block text-muted-foreground hover:text-primary transition-colors">Jackets</a>
                          </Link>
                          <Link href="/products/shoes">
                            <a className="block text-muted-foreground hover:text-primary transition-colors">Shoes</a>
                          </Link>
                          <Link href="/products/slippers">
                            <a className="block text-muted-foreground hover:text-primary transition-colors">Slippers</a>
                          </Link>
                        </div>
                      </div>
                      <Link href="/customize">
                        <a className="block text-lg font-medium text-accent hover:text-accent/80 transition-colors">
                          Customize
                        </a>
                      </Link>
                      <Link href="/about">
                        <a className="block text-lg font-medium text-foreground hover:text-primary transition-colors">
                          About
                        </a>
                      </Link>
                      <Link href="/contact">
                        <a className="block text-lg font-medium text-foreground hover:text-primary transition-colors">
                          Contact
                        </a>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <CartSidebar />
    </>
  );
}
