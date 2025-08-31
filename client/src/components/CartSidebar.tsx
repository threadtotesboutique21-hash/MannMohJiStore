import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Link } from "wouter";

export default function CartSidebar() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeItem, 
    getTotalPrice 
  } = useCart();

  const shippingCost = 300;
  const total = getTotalPrice() + (items.length > 0 ? shippingCost : 0);

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent side="right" className="w-96">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl font-bold">Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto py-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <i className="fas fa-shopping-bag text-4xl text-muted-foreground mb-4"></i>
                <p className="text-muted-foreground">Your cart is empty</p>
                <Link href="/products">
                  <Button className="mt-4" data-testid="button-start-shopping">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex space-x-4 bg-muted rounded-lg p-4" data-testid={`cart-item-${item.id}`}>
                    <img 
                      src={item.image || 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                      data-testid={`img-cart-item-${item.id}`}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground" data-testid={`text-cart-item-name-${item.id}`}>
                        {item.name}
                      </h3>
                      {(item.size || item.color) && (
                        <p className="text-muted-foreground text-sm" data-testid={`text-cart-item-details-${item.id}`}>
                          {item.size && `Size: ${item.size}`}{item.size && item.color && ' | '}{item.color && `Color: ${item.color}`}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-primary" data-testid={`text-cart-item-price-${item.id}`}>
                          PKR {item.price.toLocaleString()}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              updateQuantity(item.id, item.quantity - 1);
                            }}
                            data-testid={`button-decrease-quantity-${item.id}`}
                          >
                            -
                          </Button>
                          <span data-testid={`text-cart-item-quantity-${item.id}`}>{item.quantity}</span>
                          <Button 
                            size="sm"
                            variant="outline"
                            className="w-8 h-8 p-0"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              updateQuantity(item.id, item.quantity + 1);
                            }}
                            data-testid={`button-increase-quantity-${item.id}`}
                          >
                            +
                          </Button>
                          <Button 
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive/80 p-1"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeItem(item.id);
                            }}
                            data-testid={`button-remove-item-${item.id}`}
                          >
                            <i className="fas fa-trash text-sm"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {items.length > 0 && (
            <div className="border-t border-border p-6">
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
                    PKR {shippingCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span data-testid="text-cart-total">PKR {total.toLocaleString()}</span>
                </div>
                <Link href="/checkout">
                  <Button 
                    className="w-full luxury-button text-white py-3 rounded-lg font-semibold"
                    onClick={closeCart}
                    data-testid="button-proceed-checkout"
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
