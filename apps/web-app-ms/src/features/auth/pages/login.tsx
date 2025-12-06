import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { useAuth } from "../context/auth-context"
import React from "react"
import { Navigate } from "react-router-dom"
import { login } from "../api/login"

const INCORRECT_DATA = "E-mail ou senha incorretos."
const PASSWORD_MAX_LENGTH = 72

const schema = z.object({
  email: z.email("Insira um endereo de e-mail válido."),
  password: z.string()
    .nonempty("Digite algo.")
    .max(PASSWORD_MAX_LENGTH),
})
type SchemaValues = z.infer<typeof schema>

function LoginPage() {
  const auth = useAuth()
  const form = useForm({ resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const [ isLoading, setIsLoading ] = React.useState(false)

  const handleSubmit = form.handleSubmit(async (values: SchemaValues) => {
    setIsLoading(true)  
    form.clearErrors()

    const result = await login({
      email: values.email,
      password: values.password,
    })

    if (!result) {
      form.setError("email", { message: INCORRECT_DATA })
      form.setError("password", { message: INCORRECT_DATA })
      setIsLoading(false)
      return
    }
    auth.login(result.accessToken)
  })

  if (auth.user) {
    return <Navigate to="/" />
  }
  return (
    <Card className="w-full max-w-sm mx-auto">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>
              Login
            </CardTitle>
            <CardDescription>
              Insira seu e-mail e senha para acessar a aplicação.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 my-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <div className="w-full flex justify-end">
              <Button type="submit" disabled={isLoading} className="w-full md:w-max">
                Login
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export {
  LoginPage,
}
