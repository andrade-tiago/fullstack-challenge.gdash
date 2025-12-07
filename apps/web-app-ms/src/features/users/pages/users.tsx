import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react"
import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "@/shared/api/query-client"
import { UserRole, type User } from "../types/user"
import { Input } from "@/components/ui/input"
import { UpdateUserDialog } from "../components/update-user-dialog"
import { DeleteUserDialog } from "../components/delete-user-dialog"
import { fetchUsers } from "../api/fetch-users"
import { CreateUserDialog } from "../components/create-user-dialog"
import { Badge } from "@/components/ui/badge"
import type { UserRoleBadge } from "../types/user-role-badge"

const pageSize = 10

const userRoleBadge: Record<UserRole, UserRoleBadge> = {
  "admin": {
    label: "Admin",
    className: "bg-amber-600",
  },
  "user": {
    label: "Usuário",
    className: "bg-cyan-600",
  }
}

function UsersPage() {
  const [pageNumber, setPageNumber] = React.useState(1)

  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)
  const [showCreateUserDialog, setShowCreateUserDialog] = React.useState(false)
  const [showUpdateUserDialog, setShowUpdateUserDialog] = React.useState(false)
  const [showDeleteUserDialog, setShowDeleteUserDialog] = React.useState(false)

  const users = useQuery({
    queryFn: () => fetchUsers({ pageSize, pageNumber }),
    queryKey: ["users", { pageSize, pageNumber }],
    staleTime: 60 * 1,
  })

  const isLastPage = pageNumber === users.data?.totalPages
  const isFirstPage = pageNumber === 1

  function handleCreateUser() {
    setShowCreateUserDialog(true)
  }
  function handleCreateUserCompleted() {
    queryClient.invalidateQueries({
      queryKey: ["users"],
    })
  }

  function handleUpdateUser(user: User) {
    setSelectedUser(user)
    setShowUpdateUserDialog(true)
  }
  function handleUpdateUserCompleted() {
    setSelectedUser(null)

    queryClient.invalidateQueries({
      queryKey: ["users"],
    })
  }

  function handleDeleteUser(user: User) {
    setSelectedUser(user)
    setShowDeleteUserDialog(true)
  }
  function handleDeleteUserCompleted() {
    setSelectedUser(null)
    setPageNumber(1)

    queryClient.invalidateQueries({
      queryKey: ["users"],
    })
  }

  function handleChangePageNumber(value: string) {
    if (!users.data) return

    let pageNumber = Number.parseInt(value)
    if (pageNumber < 1)
      pageNumber = 1
    else if (pageNumber > users.data.totalPages)
      pageNumber = users.data.totalPages

    setPageNumber(pageNumber)
  }
  function handleFirstPage() {
    setPageNumber(isFirstPage ? pageNumber : 1)
  }
  function handlePreviousPage() {
    setPageNumber(isFirstPage ? pageNumber : pageNumber - 1)
  }
  function handleNextPage() {
    setPageNumber(isLastPage ? pageNumber : pageNumber + 1)
  }
  function handleLastPage() {
    setPageNumber(isLastPage ? pageNumber : (users.data?.totalPages ?? 1))
  }

  return (
    <div className="p-5">
      <Card>
        <CardHeader>
          <CardAction>
            <Button onClick={handleCreateUser} className="ml-auto bg-cyan-800 hover:bg-cyan-900">
              Adicionar
            </Button>
          </CardAction>
          <CardTitle>
            Usuários
          </CardTitle>
          <CardDescription className="flex flex-col gap-8">
            Todos os usuários cadastrados e suas opções.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-2 text-sm mb-4">
            <p>
              Total de páginas: {users.data?.totalPages}
            </p>
            <p>
              Usuários: {users.data?.totalCount}
            </p>
          </div>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Privilégio</TableHead>
                <TableHead className="flex justify-center">Opções</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.isLoading && Array.from({ length: pageSize }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 4 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-5 w-1/3" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {users.data && users.data.data.map(user =>
                <TableRow key={user.id}>
                  <TableCell>
                    {user.name}
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge className={userRoleBadge[user.role].className}>
                      {userRoleBadge[user.role].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <Button
                      variant="secondary"
                      onClick={() => handleUpdateUser(user)}>
                      <PencilIcon />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteUser(user)}>
                      <TrashIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 mx-auto">
            <Button variant="outline" disabled={isFirstPage} onClick={handleFirstPage}>
              <ChevronsLeftIcon />
            </Button>
            <Button variant="outline" disabled={isFirstPage} onClick={handlePreviousPage}>
              <ChevronLeftIcon />
            </Button>
            <Input
              disabled
              type="number"
              className="w-12"
              value={pageNumber}
              onChange={event => handleChangePageNumber(event.target.value)}
            />
            <Button variant="outline" disabled={isLastPage} onClick={handleNextPage}>
              <ChevronRightIcon />
            </Button>
            <Button variant="outline" disabled={isLastPage} onClick={handleLastPage}>
              <ChevronsRightIcon />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <CreateUserDialog
        open={showCreateUserDialog}
        onOpenChange={setShowCreateUserDialog}
        onSuccess={handleCreateUserCompleted}
      />
      <UpdateUserDialog
        user={selectedUser}
        open={showUpdateUserDialog}
        onOpenChange={setShowUpdateUserDialog}
        onSuccess={handleUpdateUserCompleted}
      />
      <DeleteUserDialog
        user={selectedUser}
        open={showDeleteUserDialog}
        onOpenChange={setShowDeleteUserDialog}
        onSuccess={handleDeleteUserCompleted}
      />
    </div>
  )
}

export {
  UsersPage,
}
