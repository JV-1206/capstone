import { Outlet, useParams, Navigate, useOutletContext } from "react-router-dom"
import { Car } from "./App"

type CarLayoutProps = {
    notes: Car[]
}
 


export function CarLayout({notes}: CarLayoutProps) {
    const { id } = useParams()
    const car = notes.find(n => n.id === id)

    if (car == null) return <Navigate to="/" replace />

    return <Outlet context={car} />

}

export function useCar() {
    return useOutletContext<Car>()
}