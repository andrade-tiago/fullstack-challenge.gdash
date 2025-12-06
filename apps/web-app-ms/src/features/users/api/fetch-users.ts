import { api } from "@/shared/api/api"
import type { Pagination } from "@/shared/types/pagination"
import type { User } from "../types/user"

type FetchOptions = {
  pageSize: number
  pageNumber: number
}

async function fetchUsers(options: FetchOptions) {
  const response = await api.get<Pagination<User>>('users', {
    params: {
      pageSize: options.pageSize,
      pageNumber: options.pageNumber,
    },
  })

  return response.data
}

export {
  fetchUsers,
}