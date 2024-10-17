'use client'
import * as z from "zod"

export const itemFormSchema = z.object({
    name: z.string().min(5, { message: 'The name is too short'}).max(70, { message: 'The name is too long'}),
    itemId: z.string().min(6).max(6),
    description: z.string().min(10, { message: 'The description is too short'}).max(200, { message: 'The description is too long'}),
    price: z.coerce.number().min(1, { message: 'The price is too low'}).max(1000000, { message: 'The price is too high'}),
    image: z.string(),
    quantity: z.string()
})