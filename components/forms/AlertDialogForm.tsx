'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useForm } from "react-hook-form"
import { checkOutSchema } from "@/lib/validations/item"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import LoadingBtn from "../shared/LoadingBtn"
import { CheckOutInterface } from "@/interfaces"
import {  useState } from "react"
import { createCheckOut } from "@/lib/actions/checkout.action"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError, notifySuccess } from "@/constants/toast"
import { useRouter } from "next/navigation"

  export function AlertDialogForm({ currentCartItems, totalPrice } : CheckOutInterface) {
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const apiRef = crypto.randomUUID()

    const form = useForm<z.infer<typeof checkOutSchema>>({
      resolver: zodResolver(checkOutSchema),
      defaultValues: {
          fullName: '',
          email: '',
          phoneNumber: ''
      }
  })

  async function onSubmit(values: z.infer<typeof checkOutSchema>) {
    setIsLoading(true)

    const firstResponse = await createCheckOut({
      apiRef: apiRef, 
      fullName: values.fullName, 
      email: values.email, 
      phoneNumber: values.phoneNumber, 
      amount: totalPrice, 
      items: currentCartItems,
    })

    if(!firstResponse.success) {
      setIsLoading(false)

      notifyError({
        message: firstResponse.message
      })

      return
    }


        const data = {
            public_key: 'ISPubKey_live_de0dd599-70a1-4007-939a-0d6dda00df6c',
            first_name: values.fullName,
            email: values.email,
            phone_number: values.phoneNumber,
            host: 'https://self-checkout-tau.vercel.app',
            amount: totalPrice,
            currency: 'KES',
            api_ref: 'live',
            redirect_url: 'https://self-checkout-tau.vercel.app/thank-you'
        }

        const response = await fetch('https://payment.intasend.com/api/v1/checkout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()
        if(!response.ok) {
            setIsLoading(false)
            console.log('An error occurred')
        }
        
        
        notifySuccess({
          message: firstResponse.message
        })
        setIsLoading(false)
        router.push(responseData.url)
  }
    return (
        <AlertDialog>
            <AlertDialogTrigger
            disabled={false}
             className="w-full mt-3 cursor-pointer bg-black text-white p-2 rounded-sm">
            
            {`Pay Ksh. ${totalPrice}`} 

            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Complete Your Order</AlertDialogTitle>
              <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full shadow-md p-5 rounded-md">
            <ToastContainer />
                <h5 className="text-heading4-medium font-serif text-center mb-4">Enter your details to make Payment</h5>
                <FormField
                control={form.control}
                name='fullName'
                render={( { field} ) => (
                    <FormItem
                    className="my-3"
                    >
                        <FormLabel className="block text-black text-left">Full Name</FormLabel>
                        <FormControl>
                            <input 
                            placeholder="Joe Doe" 
                            {...field}
                            className="w-full border-none outline-none p-3 shadow-md rounded-sm"
                            />
                        </FormControl>
                        <FormMessage className="text-tiny-medium text-red-500"/>
                    </FormItem>
                )}
                />

              <FormField
                control={form.control}
                name='email'
                render={( { field} ) => (
                    <FormItem
                    className="my-3"
                    >
                        <FormLabel className="block text-black text-left">Email</FormLabel>
                        <FormControl>
                            <input 
                            type='email'
                            placeholder="joedoe@gmail.com" 
                            {...field}
                            className="w-full border-none outline-none p-3 shadow-md rounded-sm"
                            />
                        </FormControl>
                        <FormMessage className="text-tiny-medium text-red-500"/>
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name='phoneNumber'
                render={( { field} ) => (
                    <FormItem
                    className="my-3"
                    >
                        <FormLabel className="block text-black text-left">Phone Number</FormLabel>
                        <FormControl>
                            <input 
                            placeholder="2547**********" 
                            {...field}
                            className="w-full border-none outline-none p-3 shadow-md rounded-sm"
                            />
                        </FormControl>
                        <FormMessage className="text-tiny-medium text-red-500"/>
                    </FormItem>
                )}
                />

                <LoadingBtn 
                loading={isLoading}
                title="Complete Order"
                styles="w-full"
                />
            </form>
        </Form>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    )
  }