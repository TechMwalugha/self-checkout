import InstasendNode from 'intasend-node'

export function requestPayment() {
    let intasend = new InstasendNode(
        process.env.INSTASEND_PUBLISHABLE_KEY,
        process.env.INSTASEND_SECRET_KEY,
        true
    )
    
    let collection = intasend.collection()
    
    collection.charge({
        first_name: "Emmanuel",
        last_name: 'Mwalugha',
        email: 'emmanuelmwalugha001@gmail.com',
        host: `${process.env.HOST}`,
        amount: 10,
        currency: 'KES',
        api_ref: 'test',
        redirect_url: `${process.env.HOST}/thank-you`,
    })
    .then((res: any) => {
        console.log(res)
        return res
    })
    .catch((err: any) => {
        console.error(err)
        return err.message
    })
}