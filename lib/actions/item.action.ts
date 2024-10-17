'use server'

import { AddNewItemInterface } from "@/interfaces";
import Item from "../models/items.model";
import connectToDB from "../mongoose";
import { ObjectId } from "mongoose";

export async function addNewItem(
    { 
        name, 
        itemId,
        description,
        price,
        image,
        quantity
    } : AddNewItemInterface) {
    try{
        connectToDB()

        const isItem = await Item.findOne({ itemId: itemId })

        if(isItem) {
            return {
                success: false,
                message: 'Another item exists with that Item Id',
            }
        }


        const item: any = new Item({
            name: name,
            itemId: itemId,
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

export async function retrieveItem({ itemId } : { itemId: string }) {
    try {
        connectToDB()

        const item = await Item.findOne({ itemId: itemId })

        if(!item) {
            return {
                success: false,
                message: 'Item not found'
            }
        }

        return {
            success: true,
            item: {
                name: item.name,
                description: item.description,
                price: item.price,
                image: item.image,
                quantity: item.quantity
            }
        }

    } catch (error: any) {
        return {
            success: false,
            message: `An error occurred while retrieving item: ${error.message}`
        }
    }
}