import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function OrderManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["/api/orders"],
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      await apiRequest(`/api/orders/${orderId}`, {
        method: "PATCH",
        body: JSON.stringify({ orderStatus: status }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({
        title: "Order Updated",
        description: "Order status has been updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
      </CardHeader>
      <CardContent>
        {orders && Array.isArray(orders) && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <Card key={order.id} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground" data-testid={`text-order-id-${order.id}`}>
                        Order #{order.id.slice(0, 8)}
                      </h3>
                      <p className="text-muted-foreground text-sm" data-testid={`text-order-customer-${order.id}`}>
                        Customer: {order.firstName} {order.lastName}
                      </p>
                      <p className="text-muted-foreground text-sm" data-testid={`text-order-email-${order.id}`}>
                        {order.email} | {order.phone}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={
                          order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.orderStatus === 'processing' ? 'bg-blue-100 text-blue-800' :
                          order.orderStatus === 'shipped' ? 'bg-purple-100 text-purple-800' :
                          order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }
                        data-testid={`badge-order-status-${order.id}`}
                      >
                        {order.orderStatus}
                      </Badge>
                      <p className="text-lg font-bold mt-2" data-testid={`text-order-total-${order.id}`}>
                        Rs. {order.totalAmount}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Order Items:</h4>
                    {order.orderItems && Array.isArray(order.orderItems) && order.orderItems.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center mb-2 p-2 bg-muted rounded">
                        <div>
                          <span className="font-medium" data-testid={`text-item-name-${order.id}-${index}`}>
                            {item.product?.name || 'Product'}
                          </span>
                          {item.size && <span className="text-sm text-muted-foreground ml-2">Size: {item.size}</span>}
                          {item.color && <span className="text-sm text-muted-foreground ml-2">Color: {item.color}</span>}
                        </div>
                        <div className="text-right">
                          <span className="font-medium" data-testid={`text-item-quantity-${order.id}-${index}`}>
                            Qty: {item.quantity}
                          </span>
                          <br />
                          <span className="text-sm text-muted-foreground" data-testid={`text-item-price-${order.id}-${index}`}>
                            Rs. {item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Payment Method:</p>
                        <p className="font-medium" data-testid={`text-payment-method-${order.id}`}>
                          {order.paymentMethod}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Order Date:</p>
                        <p className="font-medium" data-testid={`text-order-date-${order.id}`}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-muted-foreground text-sm mb-2">Shipping Address:</p>
                      <p className="text-sm" data-testid={`text-shipping-address-${order.id}`}>
                        {order.shippingAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    {order.orderStatus === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderMutation.mutate({ orderId: order.id, status: 'processing' })}
                        disabled={updateOrderMutation.isPending}
                        data-testid={`button-process-order-${order.id}`}
                      >
                        Mark as Processing
                      </Button>
                    )}
                    {order.orderStatus === 'processing' && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderMutation.mutate({ orderId: order.id, status: 'shipped' })}
                        disabled={updateOrderMutation.isPending}
                        data-testid={`button-ship-order-${order.id}`}
                      >
                        Mark as Shipped
                      </Button>
                    )}
                    {order.orderStatus === 'shipped' && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderMutation.mutate({ orderId: order.id, status: 'delivered' })}
                        disabled={updateOrderMutation.isPending}
                        data-testid={`button-deliver-order-${order.id}`}
                      >
                        Mark as Delivered
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="fas fa-shopping-bag text-4xl text-muted-foreground mb-4"></i>
            <p className="text-muted-foreground">No orders yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}