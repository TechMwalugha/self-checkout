import HelpCenterAccordion from "@/components/HelpCenterAccordion"
import { helpCenterAnswers } from "@/constants"
import Image from "next/image"


const page = () => {
  return (
    <>
    <div className="my-5 flex-center flex-col">
        <Image 
        src={'/assets/help-line.jpg'}  
        width={300}
        height={200}
        alt="Help line Image"
        />
        <h3 className="text-heading3-bold">Help center</h3>
        <p>Hi, how can we help you?</p>
    </div>
    
    {
        helpCenterAnswers.map((item: { trigger: string; content: string; }, index: number) =>  <HelpCenterAccordion 
        key={index}
        trigger={item.trigger}
        content={item.content}/>)
    }

    </>

    
  )
}

export default page
