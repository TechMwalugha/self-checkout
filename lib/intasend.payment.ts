
import IntaSend from "intasend-node";
export async function payHandler() {
    
    try {
        let intasend = new IntaSend(
            'ISPubKey_live_de0dd599-70a1-4007-939a-0d6dda00df6c',
            'ISSecretKey_live_4394243d-8604-432d-af9b-2429c97e0b7c',
            false, // Test ? Set true for test environment
        );

        let collection = intasend.collection();

            const response = await collection
            .charge({
                    first_name: 'Joe',
                    last_name: 'Doe',
                    email: 'joe@doe.com',
                    host: 'https://self-checkout-tau.vercel.app',
                    amount: 10,
                    currency: 'KES',
                    api_ref: 'live',
                    redirect_url:'https://self-checkout-tau.vercel.app/thank-you'
            })

            console.log(response)
        // setIsLoading(false)
        
    } catch (error: any) {
        console.log(error)
        return {
            status: false,
            message: 'An error occurred while initiating payment. Please try again.'
        }
    }
}