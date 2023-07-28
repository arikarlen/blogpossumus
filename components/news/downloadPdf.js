import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Alert } from "react-bootstrap";
import { useRouter } from "next/router";
export default function DownloadPdf({ file, source }) {
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onTouched",
        defaultValues: {
            source: source,
            name: "",
            enterprise: "",
            mail: "",
            phone: "",
        },
    });

    const onSubmit = (data) => {
        window.open(file, "_ blank");
        setSuccess(true);
    };

    return (
        <>
            <h1>¿Desea conocer mas?</h1>
            <p>Dejenos sus datos para acceder a la nota completa en formato pdf</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Control
                    type="text"
                    className="formField"
                    placeholder="Nombre y apellido"
                    aria-describedby="passwordHelpBlock"
                    {...register("name", {
                        required: {
                            value: true,
                            message: "Por favor, ingrese su nombre",
                        },
                    })}
                />
                {errors.name && <Alert variant="danger">{errors?.name?.message}</Alert>}
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
                    {...register("mail", {
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
                {errors.mail && <Alert variant="danger">{errors?.mail?.message}</Alert>}
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
                {success && <Alert variant="success">Muchas gracias. El documento se abrira en una ventana nueva</Alert>}
            </form>
        </>
    );
}
