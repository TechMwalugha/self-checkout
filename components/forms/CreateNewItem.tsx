'use client'

import { itemFormSchema } from "@/lib/validations/item"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import { addNewItem } from "@/lib/actions/item.action"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError, notifySuccess } from "@/constants/toast"
import LoadingBtn from "../shared/LoadingBtn"
import { useState } from "react"

export default function CreateNewItem() {

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof itemFormSchema>>({
        resolver: zodResolver(itemFormSchema),
        defaultValues: {
            name: '',
            itemId: '',
            description: '',
            price: 0,
            image: ''
        }
    })

    async function onSubmit(values: z.infer<typeof itemFormSchema>) {
        setIsLoading(true)
        const result = await addNewItem({
            name: values.name,
            itemId: values.itemId,
            description: values.description,
            price: values.price,
            image: values.image,
            quantity: values.quantity,
        })

        if(result.success) {
            notifySuccess({ message: result.message})
            setIsLoading(false)
            return
        }

        notifyError({ message: result.message})
        setIsLoading(false)
    }
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-1/2 shadow-md p-5 rounded-md">
            <ToastContainer />
                <h5 className="text-heading4-medium font-serif text-center mb-4">Add New Item</h5>
                <FormField
                control={form.control}
                name='name'
                render={( { field} ) => (
                    <FormItem
                    className="my-3"
                    >
                        <FormLabel className="block text-black">Name</FormLabel>
                        <FormControl>
                            <input 
                            placeholder="Mumias Sugar" 
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
                name='itemId'
                render={( { field} ) => (
                    <FormItem
                    className="my-3"
                    >
                        <FormLabel className="block text-black">Item Id</FormLabel>
                        <FormControl>
                            <input 
                            placeholder="123456" 
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
                name='description'
                render={( { field} ) => (
                    <FormItem
                    className="my-3"
                    >
                        <FormLabel className="block text-black">Description</FormLabel>
                        <FormControl>
                            <input 
                            placeholder="description" 
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
                name='price'
                render={( { field} ) => (
                    <FormItem
                    className="my-3"
                    >
                        <FormLabel className="block text-black">Price in Ksh</FormLabel>
                        <FormControl>
                            <input 
                            type="number"
                            placeholder="eg. 3500" 
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
                name='image'
                render={( { field} ) => (
                    <FormItem
                    className="my-3"
                    >
                        <FormLabel className="block text-black">Image Url</FormLabel>
                        <FormControl>
                            <input 
                            placeholder="https://...." 
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
                name='quantity'
                render={( { field} ) => (
                    <FormItem
                    className="my-3"
                    >
                        <FormLabel className="block text-black">Quantity </FormLabel>
                        <FormControl>
                            <input 
                            placeholder="e.g 1 kilogram" 
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
                title="Add Item"
                styles="w-full"
                />
            </form>
        </Form>
    )
}