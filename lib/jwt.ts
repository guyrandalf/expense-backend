import jwt from "jsonwebtoken"

interface AuthToken {
  userId: string
  email: string
  iat?: number
  exp?: number
}

export function verifyAuthToken(token: string): AuthToken | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as AuthToken
  } catch (error) {
    return null
  }
}

export function generateAuthToken(payload: { userId: string; email: string }): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" })
}
