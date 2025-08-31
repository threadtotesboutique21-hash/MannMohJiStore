import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { ProductWithCategory, Category } from "@shared/schema";

export default function ProductManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const { data: products, isLoading } = useQuery<ProductWithCategory[]>({
    queryKey: ["/api/products"],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    categoryId: "",
    images: "",
    sizes: "",
    colors: "",
    fabric: "",
    stockQuantity: "",
    isFeatured: false,
    isNew: false,
    isOnSale: false,
  });

  const createProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      return await apiRequest("POST", "/api/products", productData);
    },
    onSuccess: () => {
      toast({
        title: "Product Created",
        description: "Product has been successfully added to the catalog.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setIsCreateModalOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await apiRequest("PUT", `/api/products/${id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Product Updated",
        description: "Product has been successfully updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setEditingProduct(null);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      categoryId: "",
      images: "",
      sizes: "",
      colors: "",
      fabric: "",
      stockQuantity: "",
      isFeatured: false,
      isNew: false,
      isOnSale: false,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      price: formData.price,
      originalPrice: formData.originalPrice || null,
      stockQuantity: parseInt(formData.stockQuantity) || 0,
      images: formData.images.split('\n').filter(img => img.trim()),
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(s => s),
      colors: formData.colors.split(',').map(c => c.trim()).filter(c => c),
      slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };

    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, data: productData });
    } else {
      createProductMutation.mutate(productData);
    }
  };

  const startEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price,
      originalPrice: product.originalPrice || "",
      categoryId: product.categoryId || "",
      images: product.images?.join('\n') || "",
      sizes: product.sizes?.join(', ') || "",
      colors: product.colors?.join(', ') || "",
      fabric: product.fabric || "",
      stockQuantity: product.stockQuantity?.toString() || "",
      isFeatured: product.isFeatured || false,
      isNew: product.isNew || false,
      isOnSale: product.isOnSale || false,
    });
    setIsCreateModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Product Management</h2>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button 
              className="luxury-button text-white"
              onClick={() => {
                setEditingProduct(null);
                resetForm();
              }}
              data-testid="button-add-product"
            >
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  data-testid="input-product-name"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  data-testid="textarea-product-description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (PKR) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    required
                    data-testid="input-product-price"
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Original Price (PKR)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                    data-testid="input-product-original-price"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="categoryId">Category</Label>
                <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
                  <SelectTrigger data-testid="select-product-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category: any) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="images">Images (one URL per line)</Label>
                <Textarea
                  id="images"
                  value={formData.images}
                  onChange={(e) => setFormData(prev => ({ ...prev, images: e.target.value }))}
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  data-testid="textarea-product-images"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sizes">Sizes (comma separated)</Label>
                  <Input
                    id="sizes"
                    value={formData.sizes}
                    onChange={(e) => setFormData(prev => ({ ...prev, sizes: e.target.value }))}
                    placeholder="XS, S, M, L, XL"
                    data-testid="input-product-sizes"
                  />
                </div>
                <div>
                  <Label htmlFor="colors">Colors (comma separated)</Label>
                  <Input
                    id="colors"
                    value={formData.colors}
                    onChange={(e) => setFormData(prev => ({ ...prev, colors: e.target.value }))}
                    placeholder="Black, White, Navy"
                    data-testid="input-product-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fabric">Fabric</Label>
                  <Input
                    id="fabric"
                    value={formData.fabric}
                    onChange={(e) => setFormData(prev => ({ ...prev, fabric: e.target.value }))}
                    placeholder="Cotton, Silk, etc."
                    data-testid="input-product-fabric"
                  />
                </div>
                <div>
                  <Label htmlFor="stockQuantity">Stock Quantity</Label>
                  <Input
                    id="stockQuantity"
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, stockQuantity: e.target.value }))}
                    data-testid="input-product-stock"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: !!checked }))}
                    data-testid="checkbox-product-featured"
                  />
                  <Label htmlFor="isFeatured">Featured Product</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isNew"
                    checked={formData.isNew}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isNew: !!checked }))}
                    data-testid="checkbox-product-new"
                  />
                  <Label htmlFor="isNew">New Product</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isOnSale"
                    checked={formData.isOnSale}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isOnSale: !!checked }))}
                    data-testid="checkbox-product-sale"
                  />
                  <Label htmlFor="isOnSale">On Sale</Label>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  type="submit"
                  className="luxury-button text-white"
                  disabled={createProductMutation.isPending || updateProductMutation.isPending}
                  data-testid="button-save-product"
                >
                  {createProductMutation.isPending || updateProductMutation.isPending 
                    ? "Saving..." 
                    : editingProduct ? "Update Product" : "Create Product"
                  }
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingProduct(null);
                    resetForm();
                  }}
                  data-testid="button-cancel-product"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-40 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-3 bg-muted rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : products?.length > 0 ? (
          products.map((product: any) => (
            <Card key={product.id} data-testid={`card-admin-product-${product.id}`}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {product.images?.[0] && (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-40 object-cover rounded"
                    />
                  )}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground" data-testid={`text-admin-product-name-${product.id}`}>
                        {product.name}
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => startEdit(product)}
                        data-testid={`button-edit-product-${product.id}`}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">
                      {product.description}
                    </p>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="font-bold text-primary" data-testid={`text-admin-product-price-${product.id}`}>
                        PKR {parseFloat(product.price).toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          PKR {parseFloat(product.originalPrice).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.isFeatured && <Badge variant="default">Featured</Badge>}
                      {product.isNew && <Badge className="bg-accent text-accent-foreground">New</Badge>}
                      {product.isOnSale && <Badge className="bg-secondary text-secondary-foreground">Sale</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2" data-testid={`text-admin-product-stock-${product.id}`}>
                      Stock: {product.stockQuantity} | Category: {product.category?.name || 'None'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <i className="fas fa-box text-4xl text-muted-foreground mb-4"></i>
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
