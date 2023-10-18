import { Row, Container, Form, Button, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ShareNews from "../news/share";

export default function Forms({ status, dataForm, source, title, subTitle }) {
    const [success, setSuccess] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onTouched",
        defaultValues: {
            origin: "Webinar",
            source: source,
            yourname: "",
            enterprise: "",
            email: "",
            phone: "",
        },
    });

    const onSubmit = (data) => {
        axios.post(`https://prod-20.brazilsouth.logic.azure.com:443/workflows/4a0de618d958419bb7dc99ba7a3245b7/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QsAL47KtZeSa5He1YXBvXMI4ZsD802JoaITVlC2wXhs`, data).then(() => {
            window.open(file, "_ blank");
            setSuccess(true);
        });
        console.log(data);
    };
    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)} id="formNews">
                <Row className="text-center">
                    <h1>{status ? dataForm.Titulo_pre : dataForm.Titulo_post}</h1>
                </Row>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <Form.Control
                            type="text"
                            className="formField"
                            placeholder="Nombre y apellido"
                            aria-describedby="passwordHelpBlock"
                            {...register("yourname", {
                                required: {
                                    value: true,
                                    message: "Por favor, ingrese su nombre",
                                },
                            })}
                        />
                        {errors.yourname && <Alert variant="danger">{errors?.yourname?.message}</Alert>}
                        <Form.Control
                            type="text"
                            className="formField"
                            placeholder="Empresa"
                            aria-describedby="passwordHelpBlock"
                            {...register("enterprise", {
                                required: {
                                    value: true,
                                    message: "Por favor, ingrese la organización a la que pertenece",
                                },
                            })}
                        />
                        {errors.enterprise && <Alert variant="danger">{errors?.enterprise?.message}</Alert>}
                        <Form.Control
                            type="text"
                            className="formField"
                            placeholder="Email"
                            aria-describedby="passwordHelpBlock"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "El email es obligatorio",
                                },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email no es valido",
                                },
                            })}
                        />
                        {errors.email && <Alert variant="danger">{errors?.email?.message}</Alert>}
                        <Form.Control
                            type="text"
                            className="formField"
                            placeholder="Teléfono"
                            aria-describedby="passwordHelpBlock"
                            {...register("phone", {
                                required: {
                                    value: true,
                                    message: "Por favor, ingrese su telefono",
                                },
                            })}
                        />
                        {errors.phone && <Alert variant="danger">{errors?.phone?.message}</Alert>}
                        <Row>
                            <Col md={12} className="d-flex justify-content-center">
                                <Button variant="primary" type="Submit" id="sendForm">
                                    {status ? dataForm.Boton_pre : dataForm.Boton_post}
                                </Button>
                            </Col>
                        </Row>
                        <ShareNews title={title} subTitle={subTitle} />
                    </Col>
                </Row>
            </form>
        </Container>
    );
}
