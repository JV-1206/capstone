import { CarData, Tag } from "./App"

import { CarForm } from "./CarForm"

type NewCarProps = {
    onSubmit: (data: CarData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export function NewCar({ onSubmit, onAddTag, availableTags}: NewCarProps) {
    return (
    <>
         <h1 className="mb-4">New Car</h1>
         <CarForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </>
    )
}