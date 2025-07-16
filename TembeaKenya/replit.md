# Tembea Kenya - Kenya Tourism Mobile App

## Overview

Tembea Kenya is a mobile-first React application designed to help tourists explore Kenya's culture, places, and events through personalized recommendations, chatbot guidance, and content sharing. The app features a comprehensive tourism platform with places discovery, event listings, an AI-powered chatbot assistant, community features, and separate dashboards for different user types (travelers, hosts, and administrators).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom Kenyan-themed colors (red, green, orange)
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: React Context API for authentication, local state for component data
- **Data Fetching**: TanStack React Query for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: PostgreSQL sessions with connect-pg-simple
- **API Design**: RESTful API structure (routes not yet implemented)

## Key Components

### Authentication System
- Multi-role authentication supporting travelers, hosts, and administrators
- Context-based authentication state management
- localStorage persistence for user sessions
- Protected routes with role-based access control

### Data Layer
- Drizzle ORM with PostgreSQL for type-safe database operations
- Shared schema definitions between client and server
- Support for users, places, events, and community posts
- In-memory storage implementation for development/testing

### UI Framework
- Mobile-first responsive design
- Component-based architecture with reusable UI primitives
- Consistent theming with CSS custom properties
- Accessibility-first approach using Radix UI

### Content Management
- Static JSON data for places and events (development phase)
- Image hosting via Unsplash for demonstration
- Community post system with user-generated content
- Collections/favorites functionality with localStorage

## Data Flow

1. **User Authentication**: Login → Context update → Route protection → Dashboard redirect
2. **Content Discovery**: JSON data → Component rendering → User interaction → Modal/detail views
3. **Community Features**: User posts → Local state → UI updates (no backend persistence yet)
4. **Chatbot Interaction**: User input → Pattern matching → Recommendation generation → Response display
5. **Admin/Host Workflows**: Role-based UI → CRUD operations → Status management

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **drizzle-orm**: Type-safe SQL ORM
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **@radix-ui/react-***: Headless UI primitives

### Development Tools
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **tailwindcss**: Utility-first CSS framework
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development

### Authentication & Sessions
- **connect-pg-simple**: PostgreSQL session store
- Local storage for client-side persistence

## Deployment Strategy

### Development Environment
- Vite dev server for frontend hot reloading
- tsx for backend TypeScript execution
- Integrated development setup with middleware

### Production Build
- Frontend: Vite build output to `dist/public`
- Backend: esbuild bundle to `dist/index.js`
- Static file serving from Express server
- Environment-based configuration

### Database Management
- Drizzle Kit for schema migrations
- Environment variable configuration for database URL
- Push-based schema deployment (`db:push` command)

### Key Architectural Decisions

1. **Mobile-First Design**: Chosen to prioritize the primary use case of tourists using mobile devices while exploring Kenya. Alternative desktop-first approach was rejected due to target audience behavior.

2. **JSON-Based Content**: Initial implementation uses static JSON files for rapid prototyping and development. This will be replaced with database-driven content management as the backend API is developed.

3. **Role-Based Architecture**: Three distinct user types (traveler, host, admin) with separate dashboards and permissions. This allows for content creation, moderation, and different user experiences.

4. **Serverless Database**: Neon Database chosen for PostgreSQL compatibility with serverless hosting benefits. Alternative local PostgreSQL setup was considered but rejected for deployment simplicity.

5. **Component Library Approach**: shadcn/ui with Radix primitives provides accessibility and consistency while allowing customization. Alternative approaches like Material-UI were considered but rejected for bundle size and customization flexibility.

## Recent Updates (July 16, 2025)

### Account Creation System
- **Multi-role Signup Flow**: Implemented comprehensive account creation with different workflows for travelers vs hosts
- **Traveler Registration**: Collects basic details, travel preferences, interests, budget range, and accessibility needs
- **Host Registration**: Includes venue details, type, location, description, pricing, and photo upload simulation
- **Role-based Onboarding**: Different form steps and validation based on user type selection

### Sample Content Addition
- **New Places**: Added Maasai Cultural Village and Karen Blixen Coffee Farm & Museum to places data
- **New Events**: Added Lake Nakuru Wildlife Photography Workshop and Traditional Dhow Sailing Experience
- **Enhanced Data**: All new content includes authentic Kenyan locations, pricing, and cultural relevance

### Traveler Chat Integration
- **Place/Time Selector**: Added quick trip planner component at top of chatbot for travelers only
- **Smart Recommendations**: Chatbot now provides personalized suggestions based on selected destination and timeframe
- **Contextual Responses**: Bot responses adapt based on place selection (safari, cultural, coastal experiences)
- **Seamless Integration**: Selection automatically creates chat message and triggers intelligent recommendations

### User Experience Improvements
- **Signup/Login Flow**: Added signup link to login page with proper routing
- **Role-based UI**: Place/time selector only appears for traveler accounts
- **Enhanced Navigation**: Smooth transitions between account creation steps with validation

### Database Integration
- **PostgreSQL Database**: Successfully integrated Neon Database with complete schema migration
- **Database Storage**: Replaced in-memory storage with persistent PostgreSQL database storage
- **Schema Implementation**: All tables (users, places, events, community_posts, collections, feedback) now persist in database
- **Production Ready**: Application now uses persistent data storage suitable for production deployment

The application now provides a complete user onboarding experience with intelligent travel planning capabilities and full database persistence. All user data, content, and interactions are now stored permanently in the PostgreSQL database.