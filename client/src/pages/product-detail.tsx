import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/hooks/useCart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProductWithCategory } from "@shared/schema";

export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery<ProductWithCategory>({
    queryKey: ["/api/products/slug", slug],
    enabled: !!slug,
  });

  const { data: relatedProducts } = useQuery<ProductWithCategory[]>({
    queryKey: ["/api/products", { categoryId: product?.categoryId }],
    enabled: !!product?.categoryId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="h-96 w-full rounded-xl" />
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.images?.[0],
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/">
              <a className="text-muted-foreground hover:text-primary" data-testid="link-breadcrumb-home">Home</a>
            </Link>
            <i className="fas fa-chevron-right text-muted-foreground text-xs"></i>
            <Link href="/products">
              <a className="text-muted-foreground hover:text-primary" data-testid="link-breadcrumb-products">Products</a>
            </Link>
            {product.category && (
              <>
                <i className="fas fa-chevron-right text-muted-foreground text-xs"></i>
                <Link href={`/products/${product.category.slug}`}>
                  <a className="text-muted-foreground hover:text-primary" data-testid="link-breadcrumb-category">
                    {product.category.name}
                  </a>
                </Link>
              </>
            )}
            <i className="fas fa-chevron-right text-muted-foreground text-xs"></i>
            <span className="text-foreground" data-testid="text-breadcrumb-product">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl">
              <img 
                src={product.images?.[selectedImage] || product.images?.[0]} 
                alt={product.name}
                className="w-full h-96 object-cover"
                data-testid="img-product-main"
              />
              {product.isNew && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground" data-testid="badge-new">
                  New
                </Badge>
              )}
              {product.isOnSale && (
                <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground" data-testid="badge-sale">
                  Sale
                </Badge>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-border'
                    }`}
                    data-testid={`button-thumbnail-${index}`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-2" data-testid="text-product-name">
                {product.name}
              </h1>
              {product.category && (
                <p className="text-muted-foreground text-lg" data-testid="text-product-category">
                  {product.category.name}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-primary" data-testid="text-product-price">
                PKR {parseFloat(product.price).toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through" data-testid="text-product-original-price">
                  PKR {parseFloat(product.originalPrice).toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed" data-testid="text-product-description">
              {product.description}
            </p>

            {/* Product Options */}
            <div className="space-y-4">
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="block font-semibold text-foreground mb-2">Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="w-full" data-testid="select-product-size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size: string) => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block font-semibold text-foreground mb-2">Color</label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger className="w-full" data-testid="select-product-color">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.colors.map((color: string) => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block font-semibold text-foreground mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    data-testid="button-decrease-quantity"
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold min-w-[3rem] text-center" data-testid="text-quantity">
                    {quantity}
                  </span>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    data-testid="button-increase-quantity"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={handleAddToCart}
                className="w-full luxury-button text-white py-4 text-lg font-semibold"
                disabled={
                  (product.sizes && product.sizes.length > 0 && !selectedSize) ||
                  (product.colors && product.colors.length > 0 && !selectedColor)
                }
                data-testid="button-add-to-cart"
              >
                Add to Cart - PKR {(parseFloat(product.price) * quantity).toLocaleString()}
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full" data-testid="button-add-to-wishlist">
                  <i className="fas fa-heart mr-2"></i>
                  Add to Wishlist
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    const phoneNumber = '+923001234567';
                    const message = `Hi, I'm interested in ${product.name}. Can you provide more details?`;
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  data-testid="button-whatsapp-inquiry"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Product Details Tabs */}
            <Tabs defaultValue="details" className="mt-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details" data-testid="tab-details">Details</TabsTrigger>
                <TabsTrigger value="care" data-testid="tab-care">Care Instructions</TabsTrigger>
                <TabsTrigger value="shipping" data-testid="tab-shipping">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-6">
                <div className="space-y-4">
                  {product.fabric && (
                    <div>
                      <h4 className="font-semibold text-foreground">Fabric</h4>
                      <p className="text-muted-foreground" data-testid="text-product-fabric">{product.fabric}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-foreground">Stock Status</h4>
                    <p className={`${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`} data-testid="text-stock-status">
                      {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity} available)` : 'Out of Stock'}
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="care" className="mt-6">
                <div className="space-y-3 text-muted-foreground">
                  <p>• Dry clean only</p>
                  <p>• Do not bleach</p>
                  <p>• Iron on low heat</p>
                  <p>• Store in a cool, dry place</p>
                  <p>• Handle with care to maintain fabric quality</p>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="mt-6">
                <div className="space-y-3 text-muted-foreground">
                  <p>• Free shipping on orders above PKR 5,000</p>
                  <p>• Standard delivery: 3-5 business days</p>
                  <p>• Express delivery: 1-2 business days (additional charges apply)</p>
                  <p>• International shipping available</p>
                  <p>• Cash on delivery available for selected areas</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 1 && (
          <section className="py-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts
                .filter((p: any) => p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct: any) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
