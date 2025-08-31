# Overview

MannMohji is a luxury fashion e-commerce platform built with React and Express.js. The application offers premium clothing, accessories, and custom design services. It features a comprehensive product catalog with categories like unstitched fabrics, stitched clothing, bags, and jackets, along with shopping cart functionality, order management, and an admin panel for content management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with public and authenticated routes
- **State Management**: TanStack Query for server state management and local state hooks for cart functionality
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation schemas

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints organized by resource (categories, products, orders, customizations)
- **Database ORM**: Drizzle ORM for type-safe database interactions
- **File Structure**: Monorepo structure with shared schema definitions between client and server

## Authentication & Authorization
- **Authentication Provider**: Replit Auth with OpenID Connect (OIDC)
- **Session Management**: Express sessions with PostgreSQL session store
- **Authorization**: Role-based access control with admin-specific routes and middleware
- **Security**: Session-based authentication with secure HTTP-only cookies

## Data Storage
- **Primary Database**: PostgreSQL with Neon Database as the serverless provider
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Data Models**: Comprehensive schema including users, categories, products, orders, cart items, and customization requests
- **Local Storage**: Client-side cart persistence using localStorage

## External Dependencies
- **Database Provider**: Neon Database (PostgreSQL-compatible serverless database)
- **Authentication**: Replit Auth service for user authentication
- **UI Framework**: Radix UI primitives for accessible component foundation
- **Form Validation**: Zod for runtime type validation and schema generation
- **Image Handling**: External image URLs (Unsplash for demo content)
- **Email Service**: Placeholder implementation for contact forms and notifications
- **Payment Processing**: Placeholder implementation for checkout functionality

The application follows a full-stack TypeScript architecture with strong type safety across the entire codebase, shared schemas between frontend and backend, and a component-driven UI design system.