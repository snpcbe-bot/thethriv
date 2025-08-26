# Phase 1: Core Functionality Architecture

## Overview
This document outlines the complete architecture for Phase 1 implementation of Thriv platform, focusing on messaging system, database integration, and user authentication flow.

## System Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Supabase      │    │   Database      │
│   (React)       │◄──►│   (Backend)     │◄──►│  (PostgreSQL)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
    ┌────▼────┐             ┌────▼────┐             ┌────▼────┐
    │ Auth    │             │ Auth    │             │ Users   │
    │ Context │             │ Service │             │ Tables  │
    └─────────┘             └─────────┘             └─────────┘
         │                       │                       │
    ┌────▼────┐             ┌────▼────┐             ┌────▼────┐
    │Messaging│             │Real-time│             │Messages │
    │ System  │             │WebSocket│             │ Tables  │
    └─────────┘             └─────────┘             └─────────┘
```

## 1. Authentication System Architecture

### Authentication Flow
```
User Registration → Profile Creation → Role Assignment → Dashboard Access
       │                  │               │              │
   AuthModal         User Profile    Business/Expert   Protected
   Component         Creation        Profile Setup      Routes
```

### Components Structure
```
src/contexts/
├── AuthContext.tsx          # Global auth state management
src/components/auth/
├── AuthModal.tsx            # Registration/login interface
├── SignUpForm.tsx           # User registration form
├── SignInForm.tsx           # User login form
├── ProfileSetup.tsx         # Initial profile setup
└── ProtectedRoute.tsx       # Route protection wrapper
src/hooks/
├── useAuth.ts               # Authentication hook
└── useUserProfile.ts        # User profile management
```

### Database Schema - Authentication
```sql
-- Core user tables
users (Supabase managed)     # Authentication data
user_profiles                # Extended user information
business_profiles_new        # Business-specific data
expert_profiles             # Expert-specific data
user_subscriptions          # Subscription management
```

## 2. Messaging System Architecture

### Real-time Messaging Flow
```
User A → Message Input → Database Insert → WebSocket Event → User B UI Update
   │           │              │               │                    │
Message     Optimistic      Real-time      Live Update        Message Display
Compose      Update        Subscription    Notification         & Status
```

### Components Structure
```
src/components/messaging/
├── MessageCenter.tsx        # Main messaging interface
├── ConversationList.tsx     # Sidebar with conversations
├── MessageList.tsx          # Message display area
├── MessageInput.tsx         # Message composition
├── ConversationHeader.tsx   # Chat header with user info
├── MessageBubble.tsx        # Individual message component
├── OnlineIndicator.tsx      # User online status
└── TypingIndicator.tsx      # Typing status display
src/hooks/
├── useMessaging.ts          # Messaging logic hook
├── useConversations.ts      # Conversation management
└── useRealtime.ts           # WebSocket subscriptions
```

### Database Schema - Messaging
```sql
conversations               # Chat conversations between users
messages                   # Individual messages
message_status            # Read/delivery receipts
connections              # Business-expert connections
```

### Message Status Tracking
- **Sent**: Message stored in database
- **Delivered**: Recipient's client received message
- **Read**: Recipient viewed message
- **Real-time updates**: Via WebSocket subscriptions

## 3. Database Integration Architecture

### Service Layer Pattern
```
Components → Custom Hooks → Database Services → Supabase Client → PostgreSQL
     │            │              │                   │              │
   UI Logic   Business Logic   Data Access      API Layer      Data Storage
```

### Database Services Structure
```
src/lib/
├── supabase.ts              # Supabase client configuration
├── database.ts              # Database service layer
├── auth.ts                  # Authentication service
└── messaging.ts             # Messaging service
src/services/
├── userService.ts           # User profile operations
├── businessService.ts       # Business profile operations
├── expertService.ts         # Expert profile operations
├── conversationService.ts   # Conversation management
├── messageService.ts        # Message operations
└── connectionService.ts     # Connection management
```

### Row Level Security (RLS)
- All tables have RLS enabled
- JWT-based authentication
- Role-based access control (business/expert/admin)
- Real-time subscriptions respect RLS policies

## 4. Real-time Features Implementation

### WebSocket Subscriptions
```javascript
// Message delivery notifications
supabase.channel('messages').on('postgres_changes', ...)

// Online status updates
supabase.channel('presence').on('presence', ...)

// Conversation updates
supabase.channel('conversations').on('postgres_changes', ...)
```

### Event Handling Flow
```
Database Change → Supabase Realtime → WebSocket Event → React State Update → UI Refresh
```

## 5. State Management Architecture

### Context Providers
```
App
├── AuthProvider           # Authentication state
├── MessagingProvider      # Messaging state
└── NotificationProvider   # Notification state
```

### Custom Hooks Pattern
```javascript
// Authentication
const { user, signIn, signOut, loading } = useAuth()

// User Profile
const { profile, updateProfile, loading } = useUserProfile()

// Messaging
const { conversations, sendMessage, activeConversation } = useMessaging()
```

## 6. Security Implementation

### Data Protection
- Row Level Security (RLS) on all tables
- JWT token validation
- Input sanitization and validation
- CORS configuration
- Rate limiting on API calls

### Privacy & Compliance
- GDPR compliance ready
- Data encryption at rest and in transit
- Audit logging for data access
- User consent management

## 7. Error Handling & Resilience

### Frontend Error Handling
- Error boundaries for component crashes
- Try-catch blocks for async operations
- User-friendly error messages
- Retry mechanisms for failed requests
- Optimistic updates with rollback

### Backend Error Handling
- Database constraint validation
- RLS policy enforcement
- Connection retry logic
- Graceful degradation

## 8. Performance Optimizations

### Frontend Optimizations
- Lazy loading for route components
- Optimistic updates for better UX
- Pagination for large data sets
- Efficient real-time subscriptions
- Component memoization

### Caching Strategy
- React Query for server state
- Local storage for user preferences
- Session storage for temporary data
- Browser caching for static assets

## 9. Testing Strategy

### Testing Pyramid
```
E2E Tests (Cypress)
    │
Integration Tests (React Testing Library)
    │
Unit Tests (Jest/Vitest)
    │
Component Tests (Storybook)
```

## 10. Deployment Architecture

### Production Stack
- Frontend: Vercel/Netlify (Static hosting)
- Backend: Supabase (Managed PostgreSQL + Auth + Real-time)
- CDN: Global content delivery
- Monitoring: Error tracking and analytics

## Implementation Checklist

### Authentication System ✅
- [x] AuthProvider context implementation
- [x] AuthModal with role selection
- [x] User registration with profile creation
- [x] Protected routes implementation
- [x] Session management
- [x] Password reset functionality

### Database Integration ✅
- [x] Supabase client configuration
- [x] Database service layer
- [x] RLS policies implementation
- [x] Type definitions
- [x] Error handling

### Messaging System ✅
- [x] Real-time messaging infrastructure
- [x] Conversation management
- [x] Message status tracking
- [x] Online presence indicators
- [x] Message history pagination

## API Documentation

### Authentication Endpoints
```typescript
POST /auth/signup    # User registration
POST /auth/signin    # User login
POST /auth/signout   # User logout
GET /auth/user       # Get current user
```

### Messaging Endpoints
```typescript
GET /conversations           # Get user conversations
POST /conversations         # Create conversation
GET /messages/:id           # Get conversation messages
POST /messages              # Send message
PUT /messages/:id/read      # Mark as read
```

### Profile Endpoints
```typescript
GET /profiles/:id           # Get user profile
PUT /profiles/:id           # Update profile
GET /experts/search         # Search experts
POST /connections           # Create connection
```

This architecture provides a solid foundation for the Thriv platform with comprehensive messaging, authentication, and database integration.