import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductManager from "./ProductManager";
import OrderManager from "./OrderManager";
import { useQuery } from "@tanstack/react-query";
import type { OrderWithItems, ProductWithCategory, CustomizationRequest } from "@shared/schema";

export default function AdminDashboard() {
  const { data: orders } = useQuery<OrderWithItems[]>({
    queryKey: ["/api/orders"],
  });

  const { data: products } = useQuery<ProductWithCategory[]>({
    queryKey: ["/api/products"],
  });

  const { data: customizations } = useQuery<CustomizationRequest[]>({
    queryKey: ["/api/customizations"],
  });

  const stats = {
    totalOrders: orders?.length || 0,
    pendingOrders: orders?.filter((order) => order.orderStatus === 'pending').length || 0,
    totalProducts: products?.length || 0,
    customizationRequests: customizations?.length || 0,
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Admin Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Manage your MannMohji store
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <i className="fas fa-shopping-cart text-white"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-foreground" data-testid="stat-total-orders">
                  {stats.totalOrders}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <i className="fas fa-clock text-accent-foreground"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold text-foreground" data-testid="stat-pending-orders">
                  {stats.pendingOrders}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <i className="fas fa-box text-white"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold text-foreground" data-testid="stat-total-products">
                  {stats.totalProducts}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <i className="fas fa-paint-brush text-white"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Custom Requests</p>
                <p className="text-2xl font-bold text-foreground" data-testid="stat-custom-requests">
                  {stats.customizationRequests}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Tabs */}
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products" data-testid="tab-products">Products</TabsTrigger>
          <TabsTrigger value="orders" data-testid="tab-orders">Orders</TabsTrigger>
          <TabsTrigger value="customizations" data-testid="tab-customizations">Customizations</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-8">
          <ProductManager />
        </TabsContent>

        <TabsContent value="orders" className="mt-8">
          <OrderManager />
        </TabsContent>

        <TabsContent value="customizations" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Customization Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {customizations && customizations.length > 0 ? (
                <div className="space-y-4">
                  {customizations.map((request) => (
                    <Card key={request.id} className="border-l-4 border-l-accent">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-foreground" data-testid={`text-custom-request-name-${request.id}`}>
                              {request.firstName} {request.lastName}
                            </h3>
                            <p className="text-muted-foreground text-sm" data-testid={`text-custom-request-email-${request.id}`}>
                              {request.email} | {request.phone}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            request.status === 'pending' ? 'bg-accent text-accent-foreground' :
                            request.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`} data-testid={`badge-custom-status-${request.id}`}>
                            {request.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-4" data-testid={`text-custom-request-description-${request.id}`}>
                          {request.description}
                        </p>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Budget: {request.budget || 'Not specified'}</span>
                          <span>Timeline: {request.timeline || 'Flexible'}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="fas fa-paint-brush text-4xl text-muted-foreground mb-4"></i>
                  <p className="text-muted-foreground">No customization requests yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
