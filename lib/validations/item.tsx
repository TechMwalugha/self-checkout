'use client'
import * as z from "zod"

const trimString: any = (u: unknown) => typeof u === "string" ? u.replaceAll(' ','') : u;

export const itemFormSchema = z.object({
    name: z.string().min(5, { message: 'The name is too short'}).max(70, { message: 'The name is too long'}),
    itemId: z.string().min(6).max(6),
    description: z.string().min(10, { message: 'The description is too short'}).max(200, { message: 'The description is too long'}),
    price: z.coerce.number().min(1, { message: 'The price is too low'}).max(1000000, { message: 'The price is too high'}),
    image: z.string(),
    quantity: z.string()
})

export const checkOutSchema = z.object({
    fullName: z.string().min(5, { message: 'Please enter your fullname'}).max(50, { message: 'Too long'}),
    email: z.preprocess(trimString, z.string().min(4, {message: 'Email is too short'}).max(50, {message: 'too long'}).email("This is not a valid email.").email()),
    phoneNumber: z.preprocess(trimString, z.string().refine(phoneNumber => /^(07\d|01\d|2547\d|2541\d)\d{7}$/.test(phoneNumber), {
        message: 'Invalid M-PESA phone number format'
    })),
})