import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    originalPrice?: string | null;
    images: string[];
    isNew?: boolean;
    isOnSale?: boolean;
    slug: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
      image: product.images[0],
    });
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="product-card bg-card rounded-xl shadow-lg overflow-hidden cursor-pointer" data-testid={`card-product-${product.id}`}>
        <div className="relative">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-64 object-cover"
            data-testid={`img-product-${product.id}`}
          />
          <div className="absolute top-4 right-4 space-y-2">
            <Button 
              size="sm"
              variant="secondary"
              className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:text-primary transition-colors p-0"
              data-testid={`button-wishlist-${product.id}`}
            >
              <i className="fas fa-heart text-sm"></i>
            </Button>
            <Button 
              size="sm"
              variant="secondary"
              className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:text-primary transition-colors p-0"
              data-testid={`button-quick-view-${product.id}`}
            >
              <i className="fas fa-eye text-sm"></i>
            </Button>
          </div>
          {(product.isNew || product.isOnSale) && (
            <div className="absolute top-4 left-4">
              <span 
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  product.isNew 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}
                data-testid={`badge-${product.isNew ? 'new' : 'sale'}-${product.id}`}
              >
                {product.isNew ? 'New' : 'Sale'}
              </span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg text-card-foreground mb-2" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-3" data-testid={`text-product-description-${product.id}`}>
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary" data-testid={`text-product-price-${product.id}`}>
                PKR {parseFloat(product.price).toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through" data-testid={`text-product-original-price-${product.id}`}>
                  PKR {parseFloat(product.originalPrice).toLocaleString()}
                </span>
              )}
            </div>
            <Button 
              onClick={handleAddToCart}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
              data-testid={`button-add-to-cart-${product.id}`}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
