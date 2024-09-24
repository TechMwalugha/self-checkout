import Link from "next/link"
import { Button } from "../ui/button"

const TopBar = () => {
  return (
    <header className="flex items-center justify-between">
        <Button variant={'link'} asChild>
            <Link href="/">Home</Link>
        </Button>
        <Button variant={'link'} asChild>
            <Link href="/help-center">Help Center</Link>
        </Button>
    </header>
  )
}

export default TopBar
