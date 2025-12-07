enum UserRole {
  Admin = "admin",
  User = "user",
}

type User = {
  id: string
  email: string
  name: string
  role: UserRole
}

export {
  type User,
  UserRole,
}
