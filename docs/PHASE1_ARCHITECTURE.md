# Phase 1: Core Functionality Architecture

## Overview
This document outlines the architecture for Phase 1 implementation of Thriv platform, focusing on core functionality: messaging system, database integration, and user authentication.

## System Architecture

### 1. Authentication Flow
```
User Registration/Login → Supabase Auth → Profile Creation → Role Assignment → Dashboard Access
```

#### Components:
- `AuthProvider` - Context for authentication state
- `AuthModal` - Registration/login interface
- `ProtectedRoute` - Route protection wrapper
- `useAuth` - Authentication hook

#### Database Tables:
- `users` - Supabase auth users (managed by Supabase)
- `user_profiles` - Extended user information
- `business_profiles_new` - Business-specific data
- `expert_profiles` - Expert-specific data
- `user_subscriptions` - Subscription management

### 2. Messaging System Architecture
```
User A → Conversation Creation → Real-time Messages → User B
    ↓                ↓                    ↓           ↓
Database Updates → WebSocket Events → UI Updates → Notifications
```

#### Components:
- `MessageCenter` - Main messaging interface
- `ConversationList` - Sidebar with conversations
- `MessageList` - Message display area
- `MessageInput` - Message composition
- `useMessaging` - Messaging logic hook

#### Database Tables:
- `conversations` - Chat conversations between users
- `messages` - Individual messages
- `message_status` - Read/delivery receipts
- `connections` - Business-expert connections

### 3. Database Integration
```
Frontend Components → Custom Hooks → Database Services → Supabase Client → PostgreSQL
```

#### Services:
- `userProfileService` - User profile operations
- `businessProfileService` - Business profile operations
- `expertProfileService` - Expert profile operations
- `conversationService` - Conversation management
- `messageService` - Message operations
- `connectionService` - Connection management

## Security Model

### Row Level Security (RLS)
- All tables have RLS enabled
- Policies restrict data access based on user roles
- Real-time subscriptions respect RLS policies

### Authentication
- JWT tokens for API authentication
- Session management via Supabase Auth
- Role-based access control (business/expert/admin)

## Real-time Features

### WebSocket Subscriptions
- Message delivery notifications
- Online status updates
- Conversation updates
- Connection status changes

### Event Handling
```
Database Change → Supabase Realtime → WebSocket Event → React State Update → UI Refresh
```

## Data Flow

### User Registration
1. User fills registration form
2. Supabase Auth creates user account
3. User profile created in `user_profiles`
4. Role-specific profile created
5. Subscription record created
6. User redirected to dashboard

### Messaging Flow
1. User initiates conversation
2. Conversation record created
3. Real-time subscription established
4. Messages sent/received via WebSocket
5. Read receipts tracked
6. UI updates in real-time

### Expert Discovery
1. User searches for experts
2. Database query with filters
3. Results displayed with profiles
4. Connection requests sent
5. Conversations initiated

## Performance Considerations

### Optimization Strategies
- Lazy loading for route components
- Optimistic updates for better UX
- Pagination for large data sets
- Connection pooling via Supabase
- Efficient real-time subscriptions

### Caching
- React Query for server state (future)
- Local storage for user preferences
- Session storage for temporary data

## Error Handling

### Frontend
- Error boundaries for component crashes
- Try-catch blocks for async operations
- User-friendly error messages
- Retry mechanisms for failed requests

### Backend
- Database constraint validation
- RLS policy enforcement
- Rate limiting protection
- Audit logging for sensitive operations

## Monitoring & Analytics

### Metrics to Track
- User registration/login rates
- Message delivery success rates
- Connection success rates
- Database query performance
- Real-time subscription health

### Logging
- Authentication events
- Message delivery events
- Error occurrences
- Performance metrics

## Future Scalability

### Horizontal Scaling
- Supabase handles database scaling
- CDN for static assets
- Load balancing for high traffic

### Feature Extensions
- Video calling integration
- File sharing capabilities
- Advanced search algorithms
- AI-powered matching

## Development Guidelines

### Code Organization
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI elements
│   ├── messaging/      # Messaging components
│   └── auth/           # Authentication components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and services
├── types/              # TypeScript definitions
├── contexts/           # React contexts
└── pages/              # Route components
```

### Best Practices
- Single Responsibility Principle
- Proper error handling
- Type safety with TypeScript
- Consistent naming conventions
- Comprehensive testing (future)

## Deployment Architecture

### Production Stack
- Frontend: Vercel/Netlify (static hosting)
- Backend: Supabase (managed PostgreSQL + Auth)
- CDN: Global content delivery
- Monitoring: Error tracking and analytics

### Environment Management
- Development: Local Supabase instance
- Staging: Supabase staging project
- Production: Supabase production project

## Security Checklist

- [x] Row Level Security enabled
- [x] JWT token validation
- [x] Input sanitization
- [x] CORS configuration
- [x] Rate limiting
- [x] Audit logging
- [x] GDPR compliance ready
- [x] Data encryption at rest/transit

## API Documentation

### Authentication Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/signout` - User logout
- `GET /auth/user` - Get current user

### Messaging Endpoints
- `GET /conversations` - List user conversations
- `POST /conversations` - Create new conversation
- `GET /messages/:conversationId` - Get conversation messages
- `POST /messages` - Send new message

### Profile Endpoints
- `GET /profiles/:userId` - Get user profile
- `PUT /profiles/:userId` - Update user profile
- `GET /experts/search` - Search expert profiles

This architecture provides a solid foundation for the Thriv platform with room for future enhancements and scalability.