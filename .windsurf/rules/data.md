---
trigger: always_on
---

# Data Access Rules

## Core Requirements

### Data Access Layer ONLY
- **CRITICAL**: All database queries MUST be done via a data access layer in the `/data` directory
- **NEVER** access the database directly from client components, route handlers, or any other location
- Create helper functions in `/data` directory that wrap Drizzle queries
- Export functions from `/data/index.ts` for easy imports

### Server Components ONLY
- **ALL** data reads must be done via server components
- **NEVER** fetch data on the client side or use client-side data fetching libraries

### Server Actions ONLY
- **ALL** data mutations must be done via server actions
- **NEVER** use route handlers for data mutations
- All server actions must have TypeScript types
- **NEVER** use the FormData type - use typed parameters instead
- All arguments passed to server actions must be validated within that server action via Zod

## Security Requirements

### User Data Isolation
- **CRITICAL**: Users can ONLY access their own data and NOBODY else's
- All data access functions must include user ID filtering
- Never query data without proper user authentication and authorization
- Implement row-level security checks in every data access function

### Authentication Context
- Always require user authentication context in data access functions
- Use Clerk for authentication - import from `@clerk/nextjs/server`
- Use `currentUser()` or `auth()` to get authenticated user information

### Validation Requirements
- Use Zod for input validation in all server actions
- Validate all arguments before processing
- Return proper error messages for invalid inputs

## Implementation Examples

### Data Access Layer Example
```typescript
// /data/users.ts
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { currentUser } from '@clerk/nextjs/server'

export async function getUserById(id: string) {
  const user = await currentUser()
  if (!user?.id || user.id !== id) {
    throw new Error('Unauthorized')
  }
  
  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, id)
  })
  
  return dbUser
}
```

### Server Action Example
```typescript
// /app/actions/user-actions.ts
'use server'
import { z } from 'zod'
import { updateUserProfile } from '@/data/users'

const updateProfileSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email()
})

export async function updateProfile(userId: string, data: unknown) {
  const validatedData = updateProfileSchema.parse(data)
  
  const user = await currentUser()
  if (!user?.id || user.id !== userId) {
    throw new Error('Unauthorized')
  }
  
  return await updateUserProfile(userId, validatedData)
}
```

## Directory Structure

```
/data
  ├── index.ts          # Export all data access functions
  ├── users.ts          # User-related data access
  └── ...               # Other data access modules

/app/actions
  ├── user-actions.ts   # User-related server actions
  └── ...               # Other server actions
```

## Rules Summary

### ❌ NEVER DO:
- Access database directly from client components or route handlers
- Use FormData type in server actions
- Skip input validation in server actions
- Return data without proper user authorization
- Create data access functions outside `/data` directory
- Use client-side data fetching for database queries

### ✅ ALWAYS DO:
- Create data access functions in `/data` directory
- Use server components for all data reads
- Use server actions for all data mutations
- Validate all inputs with Zod
- Ensure users can only access their own data
- Use TypeScript types for all server actions
- Implement proper authentication and authorization with Clerk
