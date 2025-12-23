"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Department, User } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createUser, updateUser } from "@/app/actions/users"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"

const userFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  designation: z.string().optional(),
  password: z.string().optional(),
  roles: z.array(z.enum(["ADMIN", "ENGINEER"])).min(1, "At least one role is required"),
  departmentId: z.string().optional(),
})

interface UserFormProps {
  user?: User
  departments: Department[]
}

export function UserForm({ user, departments }: UserFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const isEditing = !!user

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      designation: user?.designation || "",
      password: "",
      roles: user?.roles || ["ENGINEER"],
      departmentId: user?.departmentId || undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    console.log("Submitting form with values:", values)
    setIsLoading(true)

    try {
      const result = isEditing
        ? await updateUser(user.id, {
          name: values.name,
          email: values.email,
          designation: values.designation || null,
          roles: values.roles,
          departmentId: values.departmentId === "none" ? null : (values.departmentId || null),
        })
        : await createUser({
          ...values,
          departmentId: values.departmentId === "none" ? null : (values.departmentId || undefined),
        } as any)

      if (result.success) {
        toast.success(result.message)
        router.push("/admin/users")
        router.refresh()
      } else {
        console.error("Submission failed:", result.message)
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Error in onSubmit:", error)
      toast.error("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Debug validation errors to toast for user
  const errors = form.formState.errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form validation errors:", errors)
      const errorMessages = Object.values(errors).map(e => (e as any).message).filter(Boolean)
      if (errorMessages.length > 0) {
        toast.error(`Please check the form: ${errorMessages[0]}`)
      }
    }
  }, [errors])

  return (
    <Card className="rounded-2xl border-slate-200 shadow-none">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Senior Engineer, Project Lead"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    User's job title or position
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isEditing && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>
                      Must be at least 8 characters long
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roles *</FormLabel>
                  <FormDescription>
                    Select one or more roles. Admins can manage users and approve projects.
                  </FormDescription>
                  <div className="space-y-3 rounded-lg border p-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="role-engineer"
                        checked={field.value?.includes("ENGINEER")}
                        onCheckedChange={(checked) => {
                          const currentRoles = field.value || []
                          if (checked) {
                            field.onChange([...currentRoles, "ENGINEER"])
                          } else {
                            field.onChange(currentRoles.filter((r) => r !== "ENGINEER"))
                          }
                        }}
                      />
                      <label
                        htmlFor="role-engineer"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Engineer
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="role-admin"
                        checked={field.value?.includes("ADMIN")}
                        onCheckedChange={(checked) => {
                          const currentRoles = field.value || []
                          if (checked) {
                            field.onChange([...currentRoles, "ADMIN"])
                          } else {
                            field.onChange(currentRoles.filter((r) => r !== "ADMIN"))
                          }
                        }}
                      />
                      <label
                        htmlFor="role-admin"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Admin
                      </label>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">No Department</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Assign user to a specific department
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-black text-white hover:bg-black/90 rounded-full h-11 px-8 transition-all hover:scale-105 active:scale-95"
              >
                {isLoading
                  ? isEditing
                    ? "Updating..."
                    : "Creating..."
                  : isEditing
                    ? "Update User"
                    : "Create User"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/users")}
                disabled={isLoading}
                className="rounded-full px-6"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
