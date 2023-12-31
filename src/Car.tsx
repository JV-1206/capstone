import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useCar } from "./CarLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type CarProps = {
    onDelete: (id: string) => void
}

export function Car({onDelete}: CarProps) {
    const car = useCar()
    const navigate = useNavigate()

    return (
    <>
    <Row className="align-items-center mb-4">
        <Col>
         <h1>{car.title}</h1>
        {car.tags.length > 0 && (
          <Stack gap={1} direction="horizontal"
                 className="flex-wrap">
                     {car.tags.map(tag => (
                         <Badge className="text-truncate" key={tag.id}>{tag.label}
                         </Badge>
                     ))}
                     </Stack>
            )}
        </Col>
        <Col xs="auto">
            <Stack gap={2} direction="horizontal">
                <Link to={`/${car.id}/edit`}>
                    <Button variant="primary">Edit</Button>
                </Link>
                <Button onClick={() => {
                    onDelete(car.id)
                    navigate("/")
                }} variant="outline-danger">Delete</Button>
                <Link to="/">
                    <Button variant="outline-secondary">Back</Button>
                </Link>
            </Stack>
        </Col>
    </Row>
    <ReactMarkdown>{car.markdown}</ReactMarkdown>
</>
)
}