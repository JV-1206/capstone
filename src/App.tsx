import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes, Navigate } from "react-router-dom"
import { Container } from "react-bootstrap"
import { NewCar } from "./NewCar"
import { useLocalStorage } from "./useLocalStorage"
import { useMemo } from "react"
import {v4 as uuidV4 } from "uuid"
import { CarList } from "./CarList"
import { CarLayout } from "./CarLayout"
import { Car } from "./Car"
import { EditCar } from "./EditCar"

export type Car = {
  id: string

} & CarData

export type RawCar = {
  id: string

} & RawCarData

export type RawCarData = {
  title: string
  markdown: string
  year: string
  tagIds: string[]
}

export type CarData = {
  title: string
  markdown: string
  year: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setCars] = useLocalStorage<RawCar[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(car => {
      return { ...car, tags: tags.filter(tag => car.tagIds.includes(tag.id))}
    })
  }, [notes, tags] )

  function onCreateCar({ tags, ...data }: CarData) {
    setCars(prevCars => {
      return [...prevCars, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)},
      ]
    })
  }

  function onDeleteCar(id: string) {
    setCars(prevCars => {
      return prevCars.filter(car => car.id !== id)
    })
  }

  function onUpdateCar(id: string, {tags, ...data}:
    CarData ) {
      setCars(prevCars => {
        return prevCars.map(car => {
          if (car.id === id) {
            return { ...car, ...data, tagIds: tags.map(tag => tag.id)}
          } else {
            return car
          }
        })
        
      })

    }

  function addTag(tag: Tag ) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label}
        } else {
          return tag
        }
      })
    })

  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })

  }
 
  return (
    <Container className="my-4">
  <Routes>
    <Route path="/" element={<CarList notes={notesWithTags} availableTags={tags} 
    onUpdateTag={updateTag}
    onDeleteTag={deleteTag}/>} />
    <Route path="/new" element={<NewCar
    onSubmit={onCreateCar} 
    onAddTag={addTag} 
    availableTags={tags}  
    />
    } 
    />
    <Route path="/:id" element={<CarLayout notes={notesWithTags} />}>
      <Route index element={<Car onDelete={onDeleteCar} />} />
      <Route path="edit" element={<EditCar 
      onSubmit={onUpdateCar} 
      onAddTag={addTag} 
      availableTags={tags}  
      />
      } 
      />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />

  </Routes>
  </Container>
  )
}

export default App