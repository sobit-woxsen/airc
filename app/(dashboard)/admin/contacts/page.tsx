import { requireAdmin } from "@/lib/auth-helpers"
import { getAllContacts } from "@/app/actions/contact"
import { ContactsTable } from "@/components/admin/contacts-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function AdminContactsPage() {
  await requireAdmin()
  const contacts = await getAllContacts()

  const newContacts = contacts.filter((c) => c.status === "NEW")
  const readContacts = contacts.filter((c) => c.status === "READ")
  const respondedContacts = contacts.filter((c) => c.status === "RESPONDED")
  const archivedContacts = contacts.filter((c) => c.status === "ARCHIVED")

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-medium tracking-tighter">Contact Messages</h1>
        <p className="text-muted-foreground mt-1">
          View and manage contact form submissions
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">
            All ({contacts.length})
          </TabsTrigger>
          <TabsTrigger value="new">
            New ({newContacts.length})
          </TabsTrigger>
          <TabsTrigger value="read">
            Read ({readContacts.length})
          </TabsTrigger>
          <TabsTrigger value="responded">
            Responded ({respondedContacts.length})
          </TabsTrigger>
          <TabsTrigger value="archived">
            Archived ({archivedContacts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <ContactsTable contacts={contacts} />
        </TabsContent>

        <TabsContent value="new" className="mt-6">
          <ContactsTable contacts={newContacts} />
        </TabsContent>

        <TabsContent value="read" className="mt-6">
          <ContactsTable contacts={readContacts} />
        </TabsContent>

        <TabsContent value="responded" className="mt-6">
          <ContactsTable contacts={respondedContacts} />
        </TabsContent>

        <TabsContent value="archived" className="mt-6">
          <ContactsTable contacts={archivedContacts} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
