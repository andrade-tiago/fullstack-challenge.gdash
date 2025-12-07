import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRole, type User } from "../types/user"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from "react"
import z from "zod"
import { updateUser } from "../api/update-user"
import { validation } from "../constants/validation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const schema = z.object({
  name: z.string().trim()
    .min(validation.USER_NAME_MIN_LENGTH,
      `O nome deve ter pelo menos ${validation.USER_NAME_MIN_LENGTH} caracteres`)
    .max(validation.USER_NAME_MAX_LENGTH,
      `O nome deve ter no máximo ${validation.USER_NAME_MAX_LENGTH} caracteres`),

  role: z.enum(UserRole),
})
type SchemaData = z.infer<typeof schema>

const userRoleLabel: Record<UserRole, string> = {
  admin: "Admin",
  user: "Usuário",
}

type UpdateUserDialogProps = {
  user: User | null
  onSuccess?: () => void
} & React.ComponentProps<typeof Dialog>

function UpdateUserDialog(props: UpdateUserDialogProps) {
  const form = useForm<SchemaData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    }
  })

  async function handleSubmit(data: SchemaData) {
    if (!props.user) return

    const success = await updateUser(props.user.id, data)

    if (success) props.onSuccess?.()
  }

  React.useEffect(() => {
    if (props.user) {
      form.setValue('name', props.user.name)
      form.setValue('role', props.user.role)
    }
  }, [props.user])

  if (!props.user) return null

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="max-w-sm">
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>
                Editar usuário
              </DialogTitle>
              <DialogDescription>
                Atualizar informações do usuário.
              </DialogDescription>
            </DialogHeader>

            <div className="my-12 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex.: Cicrano" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Privilégio
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o papel do usuário" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(userRoleLabel).map(role =>
                          <SelectItem key={role} value={role}>
                            {userRoleLabel[role as UserRole]}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={!form.formState.isValid}>
                Atualizar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export {
  UpdateUserDialog,
}
