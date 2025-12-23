Overview

 Transform the hardcoded newsletter system into a dynamic database-driven       
 system where admins can upload, edit, and delete newsletters through an admin  
 panel. Newsletter PDFs will be stored in Cloudinary (consistent with existing  
 media storage), and metadata will be stored in PostgreSQL.

 User Requirements

 - ✅ Store newsletter PDFs in Cloudinary
 - ✅ Full CRUD capabilities (Create, Edit, Delete)
 - ✅ Migrate existing 14 newsletters to database
 - ✅ No approval workflow (immediate publish)

 Current State

 - Newsletter Data: Hardcoded in /lib/newsletters-data.ts (14 newsletters,      
 2024-2025)
 - PDF Files: Stored in /public/newsletter/ directory
 - Frontend: /app/newsletter/client.tsx with search, filtering, PDF viewer      
 modal
 - Backend: Email subscriptions work via /api/subscribe/route.ts with
 Subscriber model

 Implementation Plan

 Phase 1: Database & Backend

 1.1 Add Newsletter Model to Prisma Schema

 File: prisma/schema.prisma

 Add this model following existing patterns (cuid, timestamps, indexes):        

 model Newsletter {
   id          String   @id @default(cuid())
   title       String
   description String   @db.Text
   date        String   // "August 2025" format
   issue       Int      @unique

   // Cloudinary URLs
   coverImage  String
   pdfUrl      String

   topics      String[]
   featured    Boolean  @default(false)
   published   Boolean  @default(true)
   publishedAt DateTime @default(now())

   // Audit trail
   createdById String?
   createdBy   User?    @relation(fields: [createdById], references: [id],      
 onDelete: SetNull)

   createdAt   DateTime @default(now())
   updatedAt   DateTime @updatedAt

   @@index([issue])
   @@index([featured])
   @@index([published])
   @@index([createdById])
 }

 Also add relation to User model:
 model User {
   // ... existing fields
   newsletters Newsletter[]  // Add this line
 }

 Run migration:
 npx prisma migrate dev --name add_newsletter_model
 npx prisma generate

 1.2 Create Server Actions

 File: app/actions/newsletters.ts (new file)

 Create following existing pattern from app/actions/projects.ts:
 - getAllNewsletters() - Admin view (all newsletters)
 - getPublishedNewsletters() - Public view (published only)
 - getNewsletterById(id) - Single newsletter
 - createNewsletter(data) - Create with validation
 - updateNewsletter(id, data) - Update with validation
 - deleteNewsletter(id) - Delete + cleanup Cloudinary

 Key patterns to follow:
 - Use requireAdmin() for write operations
 - Return { success, message, newsletterId? } objects
 - Use revalidatePath() for cache invalidation
 - Validate unique issue numbers
 - Extract and delete Cloudinary public_id on deletion

 1.3 Update Cloudinary Config

 File: lib/cloudinary.ts

 Add newsletter-specific configuration (PDF uploads already work via
 /app/api/upload/route.ts):
 export const CLOUDINARY_FOLDERS = {
   // ... existing
   NEWSLETTERS: "airc-portal/newsletters/pdfs",
 }

 export const FILE_CONFIG = {
   // ... existing
   newsletters: {
     maxSize: 30 * 1024 * 1024, // 30MB
     accept: "application/pdf",
     formats: ["pdf"],
   },
 }

 Phase 2: Admin UI

 2.1 Admin List Page

 File: app/(dashboard)/admin/newsletters/page.tsx (new file)

 Pattern from app/(dashboard)/admin/projects/page.tsx:
 - Use requireAdmin() at top
 - Call getAllNewsletters() server action
 - Filter into tabs: All, Published, Featured, Drafts
 - Pass data to <NewslettersTable> component
 - Add "Create Newsletter" button linking to /admin/newsletters/new

 2.2 Create Newsletter Page

 File: app/(dashboard)/admin/newsletters/new/page.tsx (new file)

 - Use requireAdmin()
 - Render <NewsletterForm /> component
 - Back button to list page

 2.3 Edit Newsletter Page

 File: app/(dashboard)/admin/newsletters/[id]/edit/page.tsx (new file)

 - Use requireAdmin()
 - Fetch newsletter with getNewsletterById(id)
 - Render <NewsletterForm newsletter={newsletter} />
 - Handle 404 with notFound()

 2.4 View Newsletter Page (Optional)

 File: app/(dashboard)/admin/newsletters/[id]/page.tsx (new file)

 - Display newsletter details in card layout
 - Show metadata, topics, status badges
 - Edit and Delete buttons

 Phase 3: Admin Components

 3.1 NewslettersTable Component

 File: components/admin/newsletters-table.tsx (new file)

 Table with columns:
 - Issue number (Badge)
 - Title
 - Date
 - Topics (badges, show first 2 + count)
 - Status (Published/Draft, Featured badges)
 - Created date
 - Actions (View, PDF link, Edit buttons)

 Empty state for no newsletters.

 3.2 NewsletterForm Component

 File: components/admin/newsletter-form.tsx (new file)

 Sections:
 1. PDF Upload:
   - File input for PDF (max 30MB)
   - Upload to /api/upload with folder airc-portal/newsletters/pdfs
   - Show upload progress with streaming
   - Display uploaded PDF with preview link
   - Remove button to clear upload
 2. Newsletter Details:
   - Issue Number (number input, required, unique)
   - Date (text input, e.g., "August 2025")
   - Title (text input)
   - Description (textarea)
   - Topics (input + Add button, display as removable badges)
   - Featured toggle (Switch)
   - Published toggle (Switch)
 3. Actions:
   - Cancel button
   - Save button (disabled if no PDF uploaded)
   - Show loading state while saving

 Logic:
 - In edit mode, pre-fill all fields
 - Call createNewsletter() or updateNewsletter() server actions
 - Show toast notifications
 - Redirect to list page on success

 3.3 DeleteNewsletterButton Component

 File: components/admin/delete-newsletter-button.tsx (new file)

 - AlertDialog for confirmation
 - Call deleteNewsletter(id) server action
 - Show loading state
 - Redirect to list page after deletion
 - Toast notification

 Phase 4: Frontend Integration

 4.1 Update Newsletter Client Component

 File: app/newsletter/client.tsx

 Changes:
 1. Remove hardcoded data import: import { newslettersData } from
 "@/lib/newsletters-data"
 2. Add Prisma type: import { Newsletter } from "@prisma/client"
 3. Change component signature: export function NewsletterClient({ newsletters  
 }: { newsletters: Newsletter[] })
 4. Replace all newslettersData references with newsletters prop

 No other changes needed - search, filtering, PDF viewer all work as-is.        

 4.2 Update Newsletter Page

 File: app/newsletter/page.tsx

 import { NewsletterClient } from "./client"
 import { getPublishedNewsletters } from "@/app/actions/newsletters"

 export default async function NewsletterPage() {
   const newsletters = await getPublishedNewsletters()
   return <NewsletterClient newsletters={newsletters} />
 }

 4.3 Deprecate Static Data File

 File: lib/newsletters-data.ts

 Add deprecation comment at top (keep file for migration reference):
 /**
  * DEPRECATED: Newsletter data is now in database.
  * See /app/actions/newsletters.ts and Prisma Newsletter model.
  * Kept for migration reference only.
  */

 Phase 5: Migration

 5.1 Create Migration Script

 File: scripts/migrate-newsletters.ts (new file)

 Script to:
 1. Read all newsletters from newslettersData array
 2. For each newsletter:
   - Check if issue already exists in DB (skip if exists)
   - Find PDF file in /public/newsletter/
   - Upload PDF to Cloudinary with cloudinary.uploader.upload_large()
   - Create database record with prisma.newsletter.create()
   - Log progress and errors
 3. Print summary (successful, skipped, errors)

 Install tsx: npm install -D tsx

 Run: npx tsx scripts/migrate-newsletters.ts

 5.2 Migration Steps

 1. Backup PDFs: cp -r public/newsletter public/newsletter-backup
 2. Run Prisma migration: (already done in Phase 1.1)
 3. Run migration script: npx tsx scripts/migrate-newsletters.ts
 4. Verify in admin panel: Check all 14 newsletters at /admin/newsletters       
 5. Test public page: Verify search, filters, PDF viewer at /newsletter
 6. Optional cleanup: Remove /public/newsletter/ directory after verification   

 Phase 6: Navigation

 Add to Admin Sidebar

 File: app/(dashboard)/admin/layout.tsx

 Add navigation item:
 {
   title: "Newsletters",
   href: "/admin/newsletters",
   icon: BookOpen, // Import from lucide-react
 }

 Implementation Sequence

 1. ✅ Add Newsletter model to Prisma schema
 2. ✅ Run migration and generate Prisma client
 3. ✅ Create server actions (app/actions/newsletters.ts)
 4. ✅ Update Cloudinary config
 5. ✅ Create NewslettersTable component
 6. ✅ Create NewsletterForm component
 7. ✅ Create DeleteNewsletterButton component
 8. ✅ Create admin list page
 9. ✅ Create admin new/edit pages
 10. ✅ Add navigation link to admin sidebar
 11. ✅ Update frontend client component
 12. ✅ Update frontend page component
 13. ✅ Deprecate static data file
 14. ✅ Create migration script
 15. ✅ Run migration
 16. ✅ Test and verify

 Critical Files

 New Files to Create

 - prisma/schema.prisma - Add Newsletter model
 - app/actions/newsletters.ts - Server actions for CRUD
 - components/admin/newsletters-table.tsx - Admin table component
 - components/admin/newsletter-form.tsx - Form component
 - components/admin/delete-newsletter-button.tsx - Delete with confirmation     
 - app/(dashboard)/admin/newsletters/page.tsx - List page
 - app/(dashboard)/admin/newsletters/new/page.tsx - Create page
 - app/(dashboard)/admin/newsletters/[id]/edit/page.tsx - Edit page
 - app/(dashboard)/admin/newsletters/[id]/page.tsx - View page (optional)       
 - scripts/migrate-newsletters.ts - Migration script

 Files to Modify

 - lib/cloudinary.ts - Add newsletter config
 - app/newsletter/client.tsx - Accept newsletters prop
 - app/newsletter/page.tsx - Fetch from database
 - lib/newsletters-data.ts - Add deprecation comment
 - app/(dashboard)/admin/layout.tsx - Add navigation link

 Testing Checklist

 Admin Panel

 - Create newsletter with PDF upload
 - Edit newsletter metadata
 - Delete newsletter (verify Cloudinary cleanup)
 - Toggle featured/published status
 - Duplicate issue number validation
 - All tabs filter correctly

 Public Frontend

 - All published newsletters display
 - Featured section shows featured newsletters
 - Search by title/description/topics works
 - PDF viewer modal opens correctly
 - Unpublished newsletters are hidden

 Migration

 - All 14 newsletters migrated successfully
 - Issue numbers preserved
 - Featured flags correct
 - PDF URLs work
 - No duplicates

 Key Technical Notes

 - Upload: Reuse existing /app/api/upload/route.ts with streaming progress      
 - Cloudinary: PDFs uploaded as resource_type: "image" for public access        
 (existing workaround)
 - Auth: All write operations use requireAdmin() helper
 - Cache: Use revalidatePath() on all mutations
 - Validation: Unique issue numbers enforced in server actions
 - Patterns: Follow existing patterns from Projects management (server actions, 
  admin UI, components)

 Rollback Plan

 If issues arise:
 1. Database: npx prisma migrate reset or reverse migration
 2. Frontend: Git revert changes to app/newsletter/*
 3. PDFs: Restore from public/newsletter-backup/
 4. Cloudinary: Delete folder airc-portal/newsletters/pdfs
 5. Code: Git revert to previous commit
