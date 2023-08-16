import { CarData, Tag } from "./App"
import { CarForm } from "./CarForm"
import { useCar } from "./CarLayout"

type EditCarProps = {
    onSubmit: (id: string, data: CarData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export function EditCar({ onSubmit, onAddTag, availableTags}: EditCarProps) {
    const car = useCar()
    return (
    <>
         <h1 className="mb-4">Edit Car</h1>
         <CarForm 
         title={car.title}
         markdown={car.markdown}
         tags={car.tags}
         onSubmit={data => onSubmit(car.id, data)} 
         onAddTag={onAddTag} 
         availableTags={availableTags} />
    </>
    )
}