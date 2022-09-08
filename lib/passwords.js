import { compare, hash } from 'bcrypt'

export const hashPassword = async (password) => {
  const hashed = await hash(password, 12)
  return hashed
}

export const comaprePasswords = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword)
  return isValid
}
