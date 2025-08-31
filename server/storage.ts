import {
  users,
  categories,
  products,
  orders,
  orderItems,
  customizationRequests,
  cartItems,
  type User,
  type UpsertUser,
  type Category,
  type InsertCategory,
  type Product,
  type InsertProduct,
  type ProductWithCategory,
  type Order,
  type InsertOrder,
  type OrderWithItems,
  type InsertOrderItem,
  type CustomizationRequest,
  type InsertCustomizationRequest,
  type CartItem,
  type InsertCartItem,
  type CartItemWithProduct,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, like, or, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: string): Promise<boolean>;

  // Product operations
  getProducts(categoryId?: string, featured?: boolean, search?: string): Promise<ProductWithCategory[]>;
  getProductById(id: string): Promise<ProductWithCategory | undefined>;
  getProductBySlug(slug: string): Promise<ProductWithCategory | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  // Order operations
  getOrders(userId?: string): Promise<OrderWithItems[]>;
  getOrderById(id: string): Promise<OrderWithItems | undefined>;
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;

  // Cart operations
  getCartItems(userId: string): Promise<CartItemWithProduct[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(userId: string): Promise<boolean>;

  // Customization operations
  getCustomizationRequests(userId?: string): Promise<CustomizationRequest[]>;
  createCustomizationRequest(request: InsertCustomizationRequest): Promise<CustomizationRequest>;
  updateCustomizationRequest(id: string, request: Partial<InsertCustomizationRequest>): Promise<CustomizationRequest | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).where(eq(categories.isActive, true)).orderBy(categories.sortOrder);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(and(eq(categories.slug, slug), eq(categories.isActive, true)));
    return category;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined> {
    const [updatedCategory] = await db
      .update(categories)
      .set({ ...category, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .returning();
    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<boolean> {
    const result = await db.update(categories).set({ isActive: false }).where(eq(categories.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Product operations
  async getProducts(categoryId?: string, featured?: boolean, search?: string): Promise<ProductWithCategory[]> {
    let whereConditions = [eq(products.isActive, true)];

    if (categoryId) {
      whereConditions.push(eq(products.categoryId, categoryId));
    }

    if (featured) {
      whereConditions.push(eq(products.isFeatured, true));
    }

    if (search) {
      whereConditions.push(
        or(
          like(products.name, `%${search}%`),
          like(products.description, `%${search}%`)
        )
      );
    }

    const results = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        price: products.price,
        originalPrice: products.originalPrice,
        categoryId: products.categoryId,
        images: products.images,
        sizes: products.sizes,
        colors: products.colors,
        fabric: products.fabric,
        stockQuantity: products.stockQuantity,
        isActive: products.isActive,
        isFeatured: products.isFeatured,
        isNew: products.isNew,
        isOnSale: products.isOnSale,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        category: categories,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(and(...whereConditions))
      .orderBy(desc(products.createdAt));

    return results;
  }

  async getProductById(id: string): Promise<ProductWithCategory | undefined> {
    const [product] = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        price: products.price,
        originalPrice: products.originalPrice,
        categoryId: products.categoryId,
        images: products.images,
        sizes: products.sizes,
        colors: products.colors,
        fabric: products.fabric,
        stockQuantity: products.stockQuantity,
        isActive: products.isActive,
        isFeatured: products.isFeatured,
        isNew: products.isNew,
        isOnSale: products.isOnSale,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        category: categories,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(and(eq(products.id, id), eq(products.isActive, true)));
    return product;
  }

  async getProductBySlug(slug: string): Promise<ProductWithCategory | undefined> {
    const [product] = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        price: products.price,
        originalPrice: products.originalPrice,
        categoryId: products.categoryId,
        images: products.images,
        sizes: products.sizes,
        colors: products.colors,
        fabric: products.fabric,
        stockQuantity: products.stockQuantity,
        isActive: products.isActive,
        isFeatured: products.isFeatured,
        isNew: products.isNew,
        isOnSale: products.isOnSale,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        category: categories,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(and(eq(products.slug, slug), eq(products.isActive, true)));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db
      .update(products)
      .set({ ...product, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.update(products).set({ isActive: false }).where(eq(products.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Order operations
  async getOrders(userId?: string): Promise<OrderWithItems[]> {
    let whereConditions = [];

    if (userId) {
      whereConditions.push(eq(orders.userId, userId));
    }

    const ordersResult = await db
      .select()
      .from(orders)
      .where(whereConditions.length > 0 ? and(...whereConditions) : sql`1=1`)
      .orderBy(desc(orders.createdAt));

    const ordersWithItems = await Promise.all(
      ordersResult.map(async (order) => {
        const items = await db
          .select({
            id: orderItems.id,
            orderId: orderItems.orderId,
            productId: orderItems.productId,
            quantity: orderItems.quantity,
            price: orderItems.price,
            size: orderItems.size,
            color: orderItems.color,
            createdAt: orderItems.createdAt,
            product: products,
          })
          .from(orderItems)
          .leftJoin(products, eq(orderItems.productId, products.id))
          .where(eq(orderItems.orderId, order.id));

        return {
          ...order,
          orderItems: items.filter((item): item is any => item.product !== null),
        };
      })
    );

    return ordersWithItems;
  }

  async getOrderById(id: string): Promise<OrderWithItems | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    
    if (!order) return undefined;

    const items = await db
      .select({
        id: orderItems.id,
        orderId: orderItems.orderId,
        productId: orderItems.productId,
        quantity: orderItems.quantity,
        price: orderItems.price,
        size: orderItems.size,
        color: orderItems.color,
        createdAt: orderItems.createdAt,
        product: products,
      })
      .from(orderItems)
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, id));

    return {
      ...order,
      orderItems: items.filter((item): item is any => item.product !== null),
    };
  }

  async createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    
    // Insert order items
    if (items.length > 0) {
      await db.insert(orderItems).values(
        items.map(item => ({ ...item, orderId: newOrder.id }))
      );
    }
    
    return newOrder;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const [updatedOrder] = await db
      .update(orders)
      .set({ orderStatus: status, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return updatedOrder;
  }

  // Cart operations
  async getCartItems(userId: string): Promise<CartItemWithProduct[]> {
    const results = await db
      .select({
        id: cartItems.id,
        userId: cartItems.userId,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        size: cartItems.size,
        color: cartItems.color,
        createdAt: cartItems.createdAt,
        updatedAt: cartItems.updatedAt,
        product: products,
      })
      .from(cartItems)
      .leftJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, userId))
      .orderBy(desc(cartItems.createdAt));
    
    return results.filter((result): result is CartItemWithProduct => 
      result.product !== null
    );
  }

  async addToCart(cartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItems = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.userId, cartItem.userId!),
          eq(cartItems.productId, cartItem.productId!),
          cartItem.size ? eq(cartItems.size, cartItem.size) : sql`${cartItems.size} IS NULL`,
          cartItem.color ? eq(cartItems.color, cartItem.color) : sql`${cartItems.color} IS NULL`
        )
      );

    const existingItem = existingItems[0];

    if (existingItem) {
      // Update quantity
      const [updatedItem] = await db
        .update(cartItems)
        .set({ 
          quantity: existingItem.quantity + cartItem.quantity,
          updatedAt: new Date()
        })
        .where(eq(cartItems.id, existingItem.id))
        .returning();
      return updatedItem;
    } else {
      // Create new cart item
      const [newItem] = await db.insert(cartItems).values(cartItem).returning();
      return newItem;
    }
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const [updatedItem] = await db
      .update(cartItems)
      .set({ quantity, updatedAt: new Date() })
      .where(eq(cartItems.id, id))
      .returning();
    return updatedItem;
  }

  async removeFromCart(id: string): Promise<boolean> {
    const result = await db.delete(cartItems).where(eq(cartItems.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async clearCart(userId: string): Promise<boolean> {
    const result = await db.delete(cartItems).where(eq(cartItems.userId, userId));
    return (result.rowCount ?? 0) >= 0;
  }

  // Customization operations
  async getCustomizationRequests(userId?: string): Promise<CustomizationRequest[]> {
    const whereConditions = [];
    
    if (userId) {
      whereConditions.push(eq(customizationRequests.userId, userId));
    }
    
    return await db
      .select()
      .from(customizationRequests)
      .where(whereConditions.length > 0 ? and(...whereConditions) : sql`1=1`)
      .orderBy(desc(customizationRequests.createdAt));
  }

  async createCustomizationRequest(request: InsertCustomizationRequest): Promise<CustomizationRequest> {
    const [newRequest] = await db.insert(customizationRequests).values(request).returning();
    return newRequest;
  }

  async updateCustomizationRequest(id: string, request: Partial<InsertCustomizationRequest>): Promise<CustomizationRequest | undefined> {
    const [updatedRequest] = await db
      .update(customizationRequests)
      .set({ ...request, updatedAt: new Date() })
      .where(eq(customizationRequests.id, id))
      .returning();
    return updatedRequest;
  }
}

export const storage = new DatabaseStorage();
