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
import { UserRole } from "../types/user"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from "react"
import { validation } from "../constants/validation"
import z from "zod"
import { createUser } from "../api/create-user"
import { PassowordInput } from "@/components/password-input"

const schema = z
  .object({
    name: z.string().trim()
      .min(validation.USER_NAME_MIN_LENGTH,
        `O nome deve ter pelo menos ${validation.USER_NAME_MIN_LENGTH} caracteres.`)
      .max(validation.USER_NAME_MAX_LENGTH,
        `O nome deve ter no máximo ${validation.USER_NAME_MAX_LENGTH} caracteres.`),

    email: z
      .email("O e-mail precisa ser válido."),

    password: z.string()
      .min(validation.USER_PASS_MIN_LENGTH,
        `A senha deve ter pelo menos ${validation.USER_PASS_MIN_LENGTH} caracteres.`)
      .max(validation.USER_PASS_MAX_LENGTH,
        `A Senha deve ter no máximo ${validation.USER_PASS_MAX_LENGTH} caracteres.`)
      .regex(/[A-Z]/,
        "A senha deve conter pelo menos uma letra maiúscula.")
      .regex(/[a-z]/,
        "A senha deve conter pelo menos uma letra minúcula.")
      .regex(/[0-9]/,
        "A senha deve conter pelo menos um número.")
      .regex(/[!@#$%&*,.-^~?<>(\[\]/\\|)]/,
        "A senha deve conter pelo menos um caractere especial."),

    confirmPassword: z.string(),
      
    role: z.enum(UserRole)
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais.",
    path: ["confirmPassword"],
  })

type SchemaData = z.infer<typeof schema>

type CreateUserDialogProps = {
  onSuccess?: () => void
} & React.ComponentProps<typeof Dialog>

function CreateUserDialog(props: CreateUserDialogProps) {
  const form = useForm<SchemaData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: UserRole.User,
    }
  })

  async function handleSubmit(data: SchemaData) {
    const success = await createUser({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    })

    if (success) {
      form.reset()
      props.onOpenChange?.(false)
      props.onSuccess?.()
    }
  }

  function handleCancel() {
    form.reset()
  }

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="w-full max-w-sm">
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>
                Novo usuário
              </DialogTitle>
              <DialogDescription>
                Criar um novo usuário.
              </DialogDescription>
            </DialogHeader>

            <div className="my-12 flex flex-col gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Fulano" {...field} />
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
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="exemplo@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PassowordInput placeholder="Um@ S3nha f0rte!" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <PassowordInput placeholder="Digite a mesma senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-cyan-700 hover:bg-cyan-800">
                Criar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export {
  CreateUserDialog,
}
