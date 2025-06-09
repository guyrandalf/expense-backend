import {prisma} from "../../../../lib/prisma"
import { withAuth } from "../../../../lib/auth"
import { NextResponse } from "next/server"


export const GET = withAuth(async (_req: Request, userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }
      
    const income = await prisma.income.findMany({
        where: { userId: user?.id },
    })

    return NextResponse.json(income)
  } catch (error) {
    console.error("Error in get-session:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
})