"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Alert, Image, Row } from "react-bootstrap";
import axios from "axios";

export default function DownloadPdf({ file, source, title }) {
    const [success, setSuccess] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onTouched",
        defaultValues: {
            origin: `Quiero que me avisen`, //Se quitan caracteres provenientes de Strapi, ya que title es tipo richText
            source: "webinar",
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
    };

    return (
        <>
            {success ? (
                <Row>
                    <h1>Muchas gracias</h1>
                    <p>La nota completa se abrirá en una nueva pestaña</p>
                    <p>
                        En caso de que esto no suceda, por favor haga{" "}
                        <a href={file} target="_blank">
                            click aquí
                        </a>
                    </p>
                </Row>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} id="formDownloadWebinars">
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
                    <Button variant="primary" type="Submit" id="sendForm">
                        Descargar
                    </Button>
                </form>
            )}
        </>
    );
}
