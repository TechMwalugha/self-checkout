'use server'

import { AddNewItemInterface } from "@/interfaces";
import Item from "../models/items.model";
import connectToDB from "../mongoose";

export async function addNewItem(
    { 
        name, 
        description,
        price,
        image,
        quantity
    } : AddNewItemInterface) {
    try{
        connectToDB()


        const item: any = new Item({
            name: name,
            description: description,
            price: price,
            image: image,
            quantity: quantity
        })

        await item.save()
        
        return {
            success: true,
            message: 'Item added successfully',
        }

    } catch (error: any) {
        console.log(error.message)
        return {
            success: false,
            message: `An error occurred while adding new item: ${error.message}`
        }
    }
}