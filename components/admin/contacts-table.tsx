"use client"
import { useState } from "react"
import { Contact } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, MoreHorizontal, Mail, CheckCircle, Archive } from "lucide-react"
import { format } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { updateContactStatus } from "@/app/actions/contact"
import { toast } from "sonner"

interface ContactsTableProps {
  contacts: Contact[]
}

export function ContactsTable({ contacts }: ContactsTableProps) {
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  const handleStatusUpdate = async (contactId: string, status: "NEW" | "READ" | "RESPONDED" | "ARCHIVED") => {
    setUpdatingStatus(true)
    const result = await updateContactStatus(contactId, status)

    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }

    setUpdatingStatus(false)
  }

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact)
    setViewDialogOpen(true)

    // Mark as read if it's new
    if (contact.status === "NEW") {
      handleStatusUpdate(contact.id, "READ")
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      NEW: { variant: "default" as const, label: "New", className: "bg-blue-500 hover:bg-blue-600" },
      READ: { variant: "secondary" as const, label: "Read", className: "" },
      RESPONDED: { variant: "default" as const, label: "Responded", className: "bg-green-500 hover:bg-green-600" },
      ARCHIVED: { variant: "outline" as const, label: "Archived", className: "" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.NEW

    return (
      <Badge variant={config.variant} className={`rounded-full shadow-none ${config.className}`}>
        {config.label}
      </Badge>
    )
  }

  const getSubjectLabel = (subject: string) => {
    const subjectMap = {
      BOOTCAMP: "Bootcamp Inquiry",
      COLLABORATION: "Research Collaboration",
      CONSULTING: "Consulting Services",
      PRESS: "Press & Media",
      OTHER: "Other",
    }
    return subjectMap[subject as keyof typeof subjectMap] || subject
  }

  if (contacts.length === 0) {
    return (
      <Card className="p-12 text-center rounded-2xl border-slate-200 shadow-none">
        <p className="text-muted-foreground">No contact messages found</p>
      </Card>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-4 font-semibold uppercase tracking-wider text-xs">Name</th>
              <th className="text-left p-4 font-semibold uppercase tracking-wider text-xs">Email</th>
              <th className="text-left p-4 font-semibold uppercase tracking-wider text-xs">Subject</th>
              <th className="text-left p-4 font-semibold uppercase tracking-wider text-xs">Status</th>
              <th className="text-left p-4 font-semibold uppercase tracking-wider text-xs">Received</th>
              <th className="text-right p-4 font-semibold uppercase tracking-wider text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-b hover:bg-muted/30">
                <td className="p-4 py-5 font-medium">
                  {contact.firstName} {contact.lastName}
                </td>
                <td className="p-4">
                  <a href={`mailto:${contact.email}`} className="text-muted-foreground hover:text-foreground hover:underline">
                    {contact.email}
                  </a>
                </td>
                <td className="p-4">
                  <Badge variant="outline" className="rounded-full shadow-none">
                    {getSubjectLabel(contact.subject)}
                  </Badge>
                </td>
                <td className="p-4">
                  {getStatusBadge(contact.status)}
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {format(new Date(contact.createdAt), "MMM d, yyyy 'at' h:mm a")}
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full" disabled={updatingStatus}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewContact(contact)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Message
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={`mailto:${contact.email}`} className="flex items-center">
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleStatusUpdate(contact.id, "RESPONDED")}
                          disabled={updatingStatus || contact.status === "RESPONDED"}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Responded
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusUpdate(contact.id, "ARCHIVED")}
                          disabled={updatingStatus || contact.status === "ARCHIVED"}
                        >
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Message</DialogTitle>
            <DialogDescription>
              Received on {selectedContact && format(new Date(selectedContact.createdAt), "MMMM d, yyyy 'at' h:mm a")}
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-base font-medium">
                    {selectedContact.firstName} {selectedContact.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-base">
                    <a href={`mailto:${selectedContact.email}`} className="text-primary hover:underline">
                      {selectedContact.email}
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Subject</label>
                <p className="text-base font-medium">{getSubjectLabel(selectedContact.subject)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <div className="mt-2 p-4 bg-muted/50 rounded-lg border">
                  <p className="text-base whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => {
                    handleStatusUpdate(selectedContact.id, "RESPONDED")
                    setViewDialogOpen(false)
                  }}
                  disabled={updatingStatus || selectedContact.status === "RESPONDED"}
                  className="rounded-full"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Responded
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="rounded-full"
                >
                  <a href={`mailto:${selectedContact.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
