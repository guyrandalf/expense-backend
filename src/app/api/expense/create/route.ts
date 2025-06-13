import {NextResponse} from "next/server"
import {withAuth} from "@/lib/auth";
import {prisma} from "@/lib/prisma";

export const POST = withAuth(async (req: Request, userId: string) => {
  try {
    const { amount, name, isRecurring } = await req.json()

    // Validate input
    if (amount === undefined || isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 }
      )
    }

    // Create expense record
    const expense = await prisma.expense.create({
      data: {
        userId,
        amount: Number(amount),
        name: name || null,
        isRecurring: Boolean(isRecurring),
      },
    })

    return NextResponse.json(expense, { status: 201 })
  } catch (error) {
    console.error("Error creating expense:", error)
    return NextResponse.json(
      { error: "Failed to create expense" },
      { status: 500 }
    )
  }
})
