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
import type { User } from "../types/user"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from "react"
import z from "zod"
import { updateUser } from "../api/update-user"

const USER_NAME_MIN_LENGTH = 2
const USER_NAME_MAX_LENGTH = 24

const schema = z.object({
  name: z.string().trim()
    .min(USER_NAME_MIN_LENGTH,
      `O nome deve ter pelo menos ${USER_NAME_MIN_LENGTH} caracteres`)
    .max(USER_NAME_MAX_LENGTH,
      `O nome deve ter no máximo ${USER_NAME_MAX_LENGTH} caracteres`),
})
type SchemaData = z.infer<typeof schema>

type UpdateUserFormProps = {
  user: User | null
  onSuccess?: () => void
} & React.ComponentProps<typeof Dialog>

function UpdateUserDialog(props: UpdateUserFormProps) {
  const form = useForm<SchemaData>({ resolver: zodResolver(schema),
    defaultValues: {
      name: props.user?.name ?? "",
    }
  })

  async function handleSubmit(data: SchemaData) {
    if (!props.user) return

    const success = await updateUser(props.user.id, { ...data })

    if (success) props.onSuccess?.()
  }

  if (!props.user) return null
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="max-w-96">
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

            <div className="my-12">
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
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">
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
