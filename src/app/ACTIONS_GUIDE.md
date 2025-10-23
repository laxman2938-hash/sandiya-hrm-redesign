# Server Actions Guide

This document describes all available server actions in `actions.ts` using modern Next.js patterns with Zod validation, proper error handling, and ISR (Incremental Static Regeneration) support.

## Overview

The `actions.ts` file contains:
- **1 Public Action**: Contact form submission
- **21 Admin Actions**: CRUD operations for 8 models (GalleryImage, TeamMember, EmploymentCategory, LegalDocument, Achievement, Client, DemandLetter, Testimonial)
- **2 Contact Message Management Actions**: Status updates and deletion

## Architecture

### Modern Techniques Used

1. **Zod Schemas**: Type-safe validation with comprehensive error reporting
2. **Discriminated Unions**: Return types that enforce success/error handling
3. **Helper Functions**: Reusable validation and error handling
4. **Server Actions**: Direct database mutations from the client
5. **ISR with revalidatePath**: Automatic cache invalidation on mutations
6. **Type Safety**: Full TypeScript support with zero `any` types

## Return Type

All admin and management actions return the same standardized response:

```typescript
interface FormState {
  success: boolean;
  message: string;
  data?: unknown;        // Returned record (for create/update)
  errors?: Record<string, string[]>;  // Validation errors
}
```

## Public Actions

### submitContactForm

Submit a contact form message from the website.

**Usage in a form component:**
```typescript
'use client';

import { submitContactForm } from '@/app/actions';
import { useActionState } from 'react';

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, {
    success: false,
    message: '',
  });

  return (
    <form action={formAction}>
      <input name="name" required />
      <input name="email" type="email" required />
      <input name="phone" required />
      <input name="subject" required />
      <textarea name="message" required />
      <button type="submit">Send</button>
      {state.message && <p>{state.message}</p>}
      {state.errors && Object.entries(state.errors).map(([key, msgs]) => (
        <p key={key} className="error">{msgs.join(', ')}</p>
      ))}
    </form>
  );
}
```

## Admin Actions

All admin actions require authentication. Add an auth check like:

```typescript
const session = await getAuth();
if (!session?.user?.isAdmin) {
  return { success: false, message: "Not authorized." };
}
```

### Gallery Images

#### createGalleryImage
Create a new gallery image.

```typescript
formData.set('title', 'Summer Event');
formData.set('image', 'https://example.com/image.jpg');
```

**Fields:**
- `title` (string, required, min 2 chars)
- `image` (string, required, valid URL)

#### updateGalleryImage
Update an existing gallery image.

```typescript
updateGalleryImage(1, prevState, formData);
```

#### deleteGalleryImage
Delete a gallery image by ID.

```typescript
deleteGalleryImage(1);
```

**Revalidates:** `/gallery`

---

### Team Members

#### createTeamMember
Create a new team member.

**Fields:**
- `name` (string, required, min 2 chars)
- `designation` (string, optional)
- `image` (string, required, valid URL)

#### updateTeamMember
Update a team member.

```typescript
updateTeamMember(1, prevState, formData);
```

#### deleteTeamMember
Delete a team member.

```typescript
deleteTeamMember(1);
```

**Revalidates:** `/team`

---

### Employment Categories

#### createEmploymentCategory
Create a new employment category.

**Fields:**
- `title` (string, required, min 2 chars)
- `image` (string, required, valid URL)

#### updateEmploymentCategory
Update an employment category.

```typescript
updateEmploymentCategory(1, prevState, formData);
```

#### deleteEmploymentCategory
Delete an employment category.

```typescript
deleteEmploymentCategory(1);
```

**Revalidates:** `/employment-categories`

---

### Legal Documents

#### createLegalDocument
Create a new legal document.

**Fields:**
- `title` (string, required, min 2 chars)
- `image` (string, required, valid URL)

#### updateLegalDocument
Update a legal document.

```typescript
updateLegalDocument(1, prevState, formData);
```

#### deleteLegalDocument
Delete a legal document.

```typescript
deleteLegalDocument(1);
```

**Revalidates:** `/legal-documents`

---

### Achievements

#### createAchievement
Create a new achievement.

**Fields:**
- `title` (string, required, min 2 chars)
- `image` (string, required, valid URL)

#### updateAchievement
Update an achievement.

```typescript
updateAchievement(1, prevState, formData);
```

#### deleteAchievement
Delete an achievement.

```typescript
deleteAchievement(1);
```

**Revalidates:** `/achievements`

---

### Clients

#### createClient
Create a new client.

**Fields:**
- `name` (string, required, min 2 chars)
- `logo` (string, required, valid URL)

#### updateClient
Update a client.

```typescript
updateClient(1, prevState, formData);
```

#### deleteClient
Delete a client.

```typescript
deleteClient(1);
```

**Revalidates:** `/clients`

---

### Demand Letters

#### createDemandLetter
Create a new demand letter (job posting).

**Fields:**
- `title` (string, required, min 2 chars)
- `image` (string, required, valid URL)

#### updateDemandLetter
Update a demand letter.

```typescript
updateDemandLetter(1, prevState, formData);
```

#### deleteDemandLetter
Delete a demand letter.

```typescript
deleteDemandLetter(1);
```

**Revalidates:** `/active-demands`

---

### Testimonials

#### createTestimonial
Create a new testimonial.

**Fields:**
- `name` (string, required, min 2 chars)
- `company` (string, optional)
- `quote` (string, required, min 10 chars)

#### updateTestimonial
Update a testimonial.

```typescript
updateTestimonial(1, prevState, formData);
```

#### deleteTestimonial
Delete a testimonial.

```typescript
deleteTestimonial(1);
```

**Revalidates:** `/testimonials`

---

## Contact Message Management

### updateContactMessageStatus

Update the status of a contact message.

```typescript
updateContactMessageStatus(1, 'read');
```

**Parameters:**
- `id` (number, required)
- `status` ('pending' | 'read' | 'replied', required)

**Revalidates:** `/admin/messages`

### deleteContactMessage

Delete a contact message.

```typescript
deleteContactMessage(1);
```

**Revalidates:** `/admin/messages`

---

## Error Handling

All actions include comprehensive error handling. Example error response:

```typescript
{
  success: false,
  message: "Validation failed.",
  errors: {
    "title": ["Title must be at least 2 characters."],
    "image": ["A valid image URL is required."]
  }
}
```

Database errors are logged to the console and return a user-friendly message.

---

## Implementation Example

Here's a complete admin form component:

```typescript
'use client';

import { createGalleryImage } from '@/app/actions';
import { useActionState } from 'react';

export function AddGalleryForm() {
  const [state, formAction, isPending] = useActionState(
    createGalleryImage,
    { success: false, message: '' }
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          required
          placeholder="e.g., Summer Event"
        />
        {state.errors?.title && (
          <span className="text-red-500">{state.errors.title[0]}</span>
        )}
      </div>

      <div>
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          name="image"
          type="url"
          required
          placeholder="https://example.com/image.jpg"
        />
        {state.errors?.image && (
          <span className="text-red-500">{state.errors.image[0]}</span>
        )}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add Image'}
      </button>

      {state.success && (
        <div className="bg-green-100 text-green-800 p-4 rounded">
          {state.message}
        </div>
      )}
      {!state.success && state.message && (
        <div className="bg-red-100 text-red-800 p-4 rounded">
          {state.message}
        </div>
      )}
    </form>
  );
}
```

---

## Security Notes

⚠️ **All admin actions must have authentication added before deployment.**

Add this check to every admin action (it's marked with `TODO`):

```typescript
const session = await getAuth(); // Your auth solution
if (!session?.user?.isAdmin) {
  return { success: false, message: "Not authorized." };
}
```

Recommended auth solutions:
- NextAuth.js
- Clerk
- Auth0
- Supabase Auth

---

## Validation Rules Summary

| Model | Fields | Rules |
|-------|--------|-------|
| GalleryImage | title, image | title (2+), image (URL) |
| TeamMember | name, designation, image | name (2+), designation (optional), image (URL) |
| EmploymentCategory | title, image | title (2+), image (URL) |
| LegalDocument | title, image | title (2+), image (URL) |
| Achievement | title, image | title (2+), image (URL) |
| Client | name, logo | name (2+), logo (URL) |
| DemandLetter | title, image | title (2+), image (URL) |
| Testimonial | name, company, quote | name (2+), company (optional), quote (10+) |
| ContactMessage | name, email, phone, subject, message | name (2+), email, phone (7+), subject (3+), message (10+) |

---

## Next Steps

1. ✅ Add authentication checks to all admin actions
2. ✅ Create admin UI components for each model
3. ✅ Add loading states and optimistic UI updates
4. ✅ Implement error toast notifications
5. ✅ Add file upload instead of URL input (optional)

