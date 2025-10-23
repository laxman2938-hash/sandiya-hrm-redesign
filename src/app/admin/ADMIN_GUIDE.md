# Admin Panel Documentation

A complete admin dashboard for managing all website content including gallery images, team members, employment categories, legal documents, achievements, clients, demand letters, and testimonials.

## Features

✅ **Dashboard Overview** - Quick stats and navigation  
✅ **Gallery Management** - Add, view, and delete gallery images  
✅ **Team Management** - Manage team members with photos  
✅ **Employment Categories** - Create job categories  
✅ **Legal Documents** - Upload and manage legal documents  
✅ **Achievements** - Add company achievements  
✅ **Clients** - Manage client logos and information  
✅ **Demand Letters** - Post active job demands  
✅ **Testimonials** - Manage customer testimonials  
✅ **Contact Messages** - View and manage form submissions  

## Access

All admin pages are located under `/admin`:

```
http://localhost:3000/admin
```

## Pages

### Dashboard
**Route:** `/admin`

Overview with quick stats and getting started guide.

### Gallery
**Route:** `/admin/gallery`

- Add new gallery images with title and URL
- View all images in grid format
- Delete images
- Real-time preview

### Team
**Route:** `/admin/team`

- Add team members with name, designation, and photo
- Display team members with designation
- Delete team members

### Employment Categories
**Route:** `/admin/employment-categories`

- Create job categories
- Add category images
- View and manage all categories
- Delete categories

### Legal Documents
**Route:** `/admin/legal-documents`

- Upload legal documents (as image/PDF preview)
- Organize documents
- Easy access and deletion

### Achievements
**Route:** `/admin/achievements`

- Add company achievements
- Include achievement images/certificates
- View achievement timeline
- Delete achievements

### Clients
**Route:** `/admin/clients`

- Add client names and logos
- Display client logos in grid
- Manage client list
- Delete clients

### Demand Letters
**Route:** `/admin/demand-letters`

- Post active job demands
- Include job title and demand letter image
- View all active demands
- Update or remove demands

### Testimonials
**Route:** `/admin/testimonials`

- Add customer testimonials
- Include client name, company, and quote
- Display testimonials with formatting
- Delete testimonials

### Contact Messages
**Route:** `/admin/messages`

- View all contact form submissions
- Update message status (Pending → Read → Replied)
- View detailed message information
- Delete messages
- Quick view of latest message

## Form Components

### AdminForm
Located in `src/components/admin/AdminForm.tsx`

Reusable form component for creating/updating records.

**Props:**
```typescript
interface AdminFormProps {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  title: string;
  fields: Array<{
    name: string;
    label: string;
    type: "text" | "email" | "url" | "textarea" | "number";
    placeholder?: string;
    required?: boolean;
    rows?: number;
  }>;
  submitButtonText?: string;
  onSuccess?: () => void;
}
```

**Example:**
```typescript
<AdminForm
  action={createGalleryImage}
  title="Add Gallery Image"
  fields={[
    {
      name: "title",
      label: "Image Title",
      type: "text",
      placeholder: "Enter title",
      required: true,
    },
    {
      name: "image",
      label: "Image URL",
      type: "url",
      placeholder: "https://example.com/image.jpg",
      required: true,
    },
  ]}
  submitButtonText="Add Image"
/>
```

## Data Display

### Grid Layout
Gallery, Team, Categories, Achievements use grid layout for visual display with image previews.

### Table Layout
Contact Messages use table layout for better organization of structured data.

### List Layout
Demand Letters and Clients use list layout for easy scanning.

## Form Validation

All forms include:
- ✅ Client-side HTML validation
- ✅ Server-side Zod validation
- ✅ Field-level error messages
- ✅ Required field indicators

**Error Example:**
```
{
  "success": false,
  "message": "Validation failed.",
  "errors": {
    "title": ["Title must be at least 2 characters."],
    "image": ["A valid image URL is required."]
  }
}
```

## Database Integration

All pages are server components that:
1. Fetch data from Prisma
2. Display current records
3. Accept form submissions via server actions
4. Automatically revalidate cache after mutations

**Example:**
```typescript
const galleryImages = await prisma.galleryImage.findMany({
  orderBy: { createdAt: "desc" },
});
```

## Security Notes

⚠️ **Important:** Before deploying to production, add authentication checks to:
1. All admin pages
2. All server actions

**Add this to admin layout:**
```typescript
// Check if user is authenticated and is admin
const session = await getServerSession(authOptions);
if (!session?.user?.isAdmin) {
  redirect("/login");
}
```

## Styling

- **Framework:** Tailwind CSS
- **Colors:** Blue primary, Red for delete actions
- **Responsive:** Mobile-first, works on all devices
- **Accessibility:** Semantic HTML, proper form labels

## Navigation

Sidebar includes links to all admin pages:
- 📊 Dashboard
- 🖼️ Gallery
- 👥 Team
- 💼 Employment Categories
- 📄 Legal Documents
- 🏆 Achievements
- 🤝 Clients
- 📋 Demand Letters
- ⭐ Testimonials
- 💬 Contact Messages

Back link to main website at bottom.

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout with sidebar
│   │   ├── page.tsx            # Dashboard
│   │   ├── gallery/
│   │   │   └── page.tsx
│   │   ├── team/
│   │   │   └── page.tsx
│   │   ├── employment-categories/
│   │   │   └── page.tsx
│   │   ├── legal-documents/
│   │   │   └── page.tsx
│   │   ├── achievements/
│   │   │   └── page.tsx
│   │   ├── clients/
│   │   │   └── page.tsx
│   │   ├── demand-letters/
│   │   │   └── page.tsx
│   │   ├── testimonials/
│   │   │   └── page.tsx
│   │   └── messages/
│   │       └── page.tsx
│   ├── actions.ts              # All server actions
│   └── ACTIONS_GUIDE.md
├── components/
│   └── admin/
│       ├── AdminForm.tsx       # Reusable form component
│       └── DataTable.tsx       # Reusable table component
└── lib/
    └── prisma.ts              # Prisma client
```

## Deployment Checklist

- [ ] Add authentication to all admin pages
- [ ] Add authentication checks to all server actions
- [ ] Test all CRUD operations
- [ ] Set up database backups
- [ ] Configure environment variables
- [ ] Add rate limiting to prevent abuse
- [ ] Enable HTTPS
- [ ] Set up monitoring/logging
- [ ] Create admin user account

## Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
DIRECT_URL="postgresql://user:password@localhost:5432/dbname"
```

## Support

For issues or questions, refer to:
- `ACTIONS_GUIDE.md` - Server actions documentation
- Prisma documentation: https://www.prisma.io/docs/
- Next.js documentation: https://nextjs.org/docs

