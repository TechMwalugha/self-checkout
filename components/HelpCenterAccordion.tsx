import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

const HelpCenterAccordion = ({ trigger, content }: { trigger: string; content: string}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
            <AccordionTrigger className="text-pretty">{trigger}</AccordionTrigger>
            <AccordionContent>
                {content}
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  )
}

export default HelpCenterAccordion
