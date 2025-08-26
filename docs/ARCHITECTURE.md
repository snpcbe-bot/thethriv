# Thriv Platform Architecture Documentation

## Overview
Thriv is a curated expert platform built with React, TypeScript, and Supabase, serving small businesses and experts worldwide.

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Lucide React** for icons

### Backend & Database
- **Supabase** (PostgreSQL with real-time subscriptions)
- **Row Level Security (RLS)** for data protection
- **Real-time subscriptions** for messaging
- **Authentication** with email/password

### State Management
- **React Context** for authentication
- **Custom hooks** for data fetching
- **Real-time subscriptions** for live updates

## Architecture Patterns

### 1. Component Architecture
```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── sections/        # Page sections
│   ├── auth/           # Authentication components
│   ├── messaging/      # Messaging components
│   └── dashboard/      # Dashboard components
├── pages/              # Route components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── lib/                # Utilities and services
├── types/              # TypeScript definitions
└── data/               # Static data
```

### 2. Data Flow Architecture
```
User Action → Component → Custom Hook → Supabase Service → Database
                ↓
Real-time Updates ← Supabase Subscription ← Database Changes
```

### 3. Authentication Flow
```
1. User Registration/Login → Supabase Auth
2. Profile Creation → user_profiles table
3. Role Assignment → business/expert profiles
4. Session Management → AuthContext
```

### 4. Messaging Architecture
```
Conversation Creation → Real-time Messaging → Message Status Tracking
        ↓                      ↓                      ↓
   conversations table    messages table    message_status table
```

## Database Schema

### Core Tables
- `users` - Supabase auth users
- `user_profiles` - Extended user information
- `business_profiles_new` - Business user details
- `expert_profiles` - Expert user details
- `conversations` - Message conversations
- `messages` - Individual messages
- `message_status` - Message read/delivery status
- `connections` - Business-expert connections
- `projects` - Business projects
- `user_subscriptions` - Subscription management

### Security Model
- **Row Level Security (RLS)** enabled on all tables
- **Policies** restrict data access based on user roles
- **Real-time subscriptions** respect RLS policies
- **JWT tokens** for authentication

## Key Features Implementation

### 1. Real-time Messaging
- WebSocket connections via Supabase
- Message delivery and read receipts
- Online status tracking
- File sharing capabilities

### 2. User Management
- Role-based access (business/expert)
- Profile verification system
- Subscription management
- Activity tracking

### 3. Expert Discovery
- Advanced search and filtering
- AI-powered matching (future)
- Rating and review system
- Geographic filtering

## Performance Considerations
- **Lazy loading** for route components
- **Optimistic updates** for better UX
- **Pagination** for large data sets
- **Caching** with React Query (future)

## Security Measures
- **GDPR compliance** (Germany-based)
- **Data encryption** at rest and in transit
- **Input validation** and sanitization
- **Rate limiting** on API calls
- **Audit logging** for sensitive operations

## Deployment Architecture
- **Frontend**: Static hosting (Vercel/Netlify)
- **Backend**: Supabase cloud
- **CDN**: Global content delivery
- **Monitoring**: Error tracking and analytics

## Future Enhancements
- AI-powered expert matching
- Video calling integration
- Advanced analytics dashboard
- Multi-language support
- Mobile applications