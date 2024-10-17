'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Scanner from "@/components/Scanner"
import ItemId from "@/components/ItemId"
import ShoppingCart from "@/components/ShoppingCart"
import { useEffect, useState } from "react"

const Home = () => {
    const [currentCartItems, setCurrentCartItems] = useState<{ name: string; description: string; price: number; image: string; quantity: string; }[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // // Initialize state by checking localStorage, ensuring it's done only once during component mount
    // const [currentCartItems, setCurrentCartItems] = useState<{ name: string; description: string; price: number; image: string; quantity: string; }[]>(() => {
    //     const storedItems = localStorage.getItem('storedCartItems');
    //     return storedItems ? JSON.parse(storedItems) : []; // Load from localStorage or use an empty array
    // });

    // // Initialize total price based on the items in localStorage
    // const [totalPrice, setTotalPrice] = useState(() => {
    //     const storedItems = localStorage.getItem('storedCartItems');
    //     const items = storedItems ? JSON.parse(storedItems) : [];
    //     return items.reduce((acc: number, item: { price: number }) => acc + item.price, 0);
    // });

    useEffect(() => {
        // Check if we're in the browser environment
        if (typeof window !== 'undefined') {
            const storedItems = localStorage.getItem('storedCartItems');
            if (storedItems) {
                try {
                    const parsedItems = JSON.parse(storedItems);
                    setCurrentCartItems(parsedItems);
                    const newTotalPrice = parsedItems.reduce((acc: number, item: { price: number }) => acc + item.price, 0);
                    setTotalPrice(newTotalPrice);
                } catch (error) {
                    console.error("Error parsing storedCartItems from localStorage", error);
                }
            }
        }
    }, []); // This will only run once when the component mounts

    // Update localStorage whenever currentCartItems changes
    useEffect(() => {
    if (currentCartItems.length > 0) {  // Ensure we don't store empty cart items unnecessarily
        localStorage.setItem('storedCartItems', JSON.stringify(currentCartItems));
    }
    const newTotalPrice = currentCartItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(newTotalPrice);
}, [currentCartItems]);

    return (
        <div className="flex items-center justify-center flex-col w-full mt-5">
            <Tabs defaultValue="qr-code" className="sm:w-[400px] w-full">
                <TabsList className="w-full flex items-center justify-between bg-black">
                    <TabsTrigger value="qr-code">Use Qr Code Scanner</TabsTrigger>
                    <TabsTrigger value="item-id">Enter Item ID</TabsTrigger>
                </TabsList>
                <TabsContent value="qr-code">
                    <Scanner />
                </TabsContent>
                <TabsContent value="item-id">
                    <ItemId
                    currentCartItems={currentCartItems}
                    setCurrentCartItems={setCurrentCartItems}
                     />
                </TabsContent>
            </Tabs>

            <hr className="bg-black my-5 w-full" />

            <ShoppingCart
            currentCartItems={currentCartItems}
            setCurrentCartItems={setCurrentCartItems}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
            />
        </div>
    )
}

export default Home