export interface AddNewItemInterface {
    name: string;
    itemId: string;
    description: string;
    price: number;
    image: string;
    quantity: string;
}

export interface LoadingBtnInterface {
    loading: boolean;
    title: string;
    styles: string;
}

export interface ShoppingCartInterface {
    currentCartItems: { name: string; description: string; price: number; image: string; quantity: string; }[];
    setCurrentCartItems: React.Dispatch<React.SetStateAction<{ name: string; description: string; price: number; image: string; quantity: string; }[]>>;
    totalPrice: number;
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}