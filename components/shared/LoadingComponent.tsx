import { RiLoader3Line } from "react-icons/ri";

export function LoadingComponent() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="shadow-lg p-2 rounded-full animate-spin">
            <RiLoader3Line size={30} />
            </div>
        </div>
    )
}