'use server'

import CheckOut from "../models/checkout.model"
import connectToDB from "../mongoose"

export async function createCheckOut({
    apiRef, fullName, email, phoneNumber, amount, items
}: {
    apiRef: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    amount: number;
    items: { name: string; description: string; price: number; image: string; quantity: string; frequency: number; }[];
}) {
    try {
        connectToDB()

        const checkout = new CheckOut({
            apiRef: apiRef,
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            amount: amount,
            items: items,
        })

        await checkout.save()

        return {
            success: true,
            message: 'Item added, please wait'
        }
        
    } catch (error: any) {
        console.log(error.message)
        return {
            success: false,
            message: 'An error occurred while creating payment. Please try Again'
        }
    }
}

export async function retrieveCheckOut({
    apiRef
}: {
    apiRef: string
}) {
    try {

        connectToDB()

        const checkOut = await CheckOut.findOne({
            apiRef: apiRef
        })

        if(!checkOut) return false
        
        return checkOut
        
    } catch (error: any) {
        console.log(error)
        throw new Error('Server error')
    }
}

export async function updatePaymentCheckOutUrl({apiRef, paymentUrl} : { apiRef: string; paymentUrl: string}) {
    try {
        connectToDB()

        const checkOut = await CheckOut.findOne({ apiRef: apiRef })

        if(!checkOut) {
            return {
                success: false,
                message: 'Checkout not found.'
            }
        }

        checkOut.paymentUrl = paymentUrl

        await checkOut.save()

        return {
            success: true,
            message: 'Checkout updated successfully',
        }

        
    } catch (error: any) {
        console.error(`An error occurred while creating payment url: ${error.message}`)
        return {
            success: false,
            message: 'An error occurred while creating payment url'
        }
    }
}
