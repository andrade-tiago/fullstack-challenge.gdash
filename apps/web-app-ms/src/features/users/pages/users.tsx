import {
  Card,
  CardContent,
  CardFooter,
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
import type { User } from "../types/user"
import { Input } from "@/components/ui/input"
import { UpdateUserDialog } from "../components/update-user-dialog"
import { DeleteUserDialog } from "../components/delete-user-dialog"
import { fetchUsers } from "../api/fetch-users"

const pageSize = 10

function UsersPage() {
  const [pageNumber, setPageNumber] = React.useState(1)

  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)
  const [showDeleteUserDialog, setShowDeleteUserDialog] = React.useState(false)
  const [showUpdateUserDialog, setShowUpdateUserDialog] = React.useState(false)

  const users = useQuery({
    queryFn: () => fetchUsers({ pageSize, pageNumber }),
    queryKey: ["users", { pageSize, pageNumber }],
    staleTime: 60 * 1,
  })

  const isLastPage = pageNumber === users.data?.totalPages
  const isFirstPage = pageNumber === 1

  function handleClickOnDeleteButton(user: User) {
    setSelectedUser(user)
    setShowDeleteUserDialog(true)
  }
  function handleDeleteUser() {
    setSelectedUser(null)
    setPageNumber(1)

    queryClient.invalidateQueries({
      queryKey: ["users", { pageSize, pageNumber }],
    })
  }

  function handleClickOnUpdateButton(user: User) {
    setSelectedUser(user)
    setShowUpdateUserDialog(true)
  }
  function handleUpdateUser() {
    setSelectedUser(null)

    queryClient.invalidateQueries({
      queryKey: ["users", { pageSize, pageNumber }],
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
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead colSpan={2}>Opções</TableHead>
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
                  <TableCell align="right">
                    <Button variant="secondary" onClick={() => handleClickOnUpdateButton(user)}>
                      <PencilIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="destructive"
                      onClick={() => handleClickOnDeleteButton(user)}>
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
              className="w-20"
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

      <DeleteUserDialog
        user={selectedUser}
        open={showDeleteUserDialog}
        onOpenChange={setShowDeleteUserDialog}
        onSuccess={handleDeleteUser}
      />
      <UpdateUserDialog
        user={selectedUser}
        open={showUpdateUserDialog}
        onOpenChange={setShowUpdateUserDialog}
        onSuccess={handleUpdateUser}
      />
    </div>
  )
}

export {
  UsersPage,
}
