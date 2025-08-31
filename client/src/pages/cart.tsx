import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { Link } from "wouter";

export default function Cart() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    getTotalPrice,
    clearCart 
  } = useCart();

  const shippingCost = items.length > 0 ? (getTotalPrice() >= 5000 ? 0 : 300) : 0;
  const total = getTotalPrice() + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <i className="fas fa-shopping-bag text-6xl text-muted-foreground mb-6"></i>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/products">
              <Button className="luxury-button text-white px-8 py-3" data-testid="button-start-shopping">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground text-lg">
              Review your items before checkout
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Cart Items ({items.length})
              </h2>
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="text-destructive hover:text-destructive/80"
                data-testid="button-clear-cart"
              >
                Clear Cart
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} data-testid={`cart-item-${item.id}`}>
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <img 
                        src={item.image || 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                        data-testid={`img-cart-item-${item.id}`}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground mb-1" data-testid={`text-cart-item-name-${item.id}`}>
                          {item.name}
                        </h3>
                        {(item.size || item.color) && (
                          <p className="text-muted-foreground text-sm mb-2" data-testid={`text-cart-item-details-${item.id}`}>
                            {item.size && `Size: ${item.size}`}{item.size && item.color && ' | '}{item.color && `Color: ${item.color}`}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              data-testid={`button-decrease-quantity-${item.id}`}
                            >
                              -
                            </Button>
                            <span className="font-semibold min-w-[2rem] text-center" data-testid={`text-quantity-${item.id}`}>
                              {item.quantity}
                            </span>
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              data-testid={`button-increase-quantity-${item.id}`}
                            >
                              +
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary" data-testid={`text-item-total-${item.id}`}>
                              PKR {(item.price * item.quantity).toLocaleString()}
                            </p>
                            <Button 
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive/80 mt-1"
                              data-testid={`button-remove-item-${item.id}`}
                            >
                              <i className="fas fa-trash mr-1"></i>
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-semibold" data-testid="text-cart-subtotal">
                      PKR {getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span className="font-semibold" data-testid="text-cart-shipping">
                      {shippingCost === 0 ? 'Free' : `PKR ${shippingCost.toLocaleString()}`}
                    </span>
                  </div>
                  
                  {getTotalPrice() < 5000 && shippingCost > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Add PKR {(5000 - getTotalPrice()).toLocaleString()} more for free shipping
                    </p>
                  )}
                  
                  <hr className="border-border" />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary" data-testid="text-cart-total">
                      PKR {total.toLocaleString()}
                    </span>
                  </div>
                  
                  <Link href="/checkout">
                    <Button 
                      className="w-full luxury-button text-white py-4 text-lg font-semibold mt-6"
                      data-testid="button-proceed-checkout"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <Link href="/products">
                    <Button 
                      variant="outline" 
                      className="w-full mt-3"
                      data-testid="button-continue-shopping"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
