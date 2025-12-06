import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import React from "react"
import type { User } from "../types/user"
import { deleteUser } from "../api/delete-user"

type DeleteUserDialog = {
  user: User | null
  onSuccess?: () => void
} & React.ComponentProps<typeof AlertDialog>

function DeleteUserDialog(props: DeleteUserDialog) {
  async function handleDeleteUser() {
    if (!props.user) return

    const success = await deleteUser(props.user.id)

    if (success) props.onSuccess?.()
  }

  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você tem certeza?
          </AlertDialogTitle>
          <AlertDialogDescription>
            O usuário será excluído permanentemente. Esta ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteUser}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export {
  DeleteUserDialog,
}
