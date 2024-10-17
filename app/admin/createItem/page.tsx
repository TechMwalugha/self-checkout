import CreateNewItem from "@/components/forms/CreateNewItem";

export default function Home () {
    return (
        <div className="flex items-center justify-center flex-col">
            <h2 className="text-heading2-bold mb-5">Welcome back, Mr. Emmanuel Mwalugha</h2>
            <CreateNewItem />
        </div>
    )
}
