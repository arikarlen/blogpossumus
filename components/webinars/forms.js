import { Row, Container, Form, Button, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ShareNews from "../news/share";
import countriesCod from "./data/countries.json";

export default function Forms({ status, dataForm, title, subTitle }) {
  const [success, setSuccess] = useState(false);
  const [prefix, setPrefix] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      origin: "Webinar -" + title.replaceAll("\n", "").replaceAll("#", ""), //Se quitan caracteres provenientes de Strapi, ya que title es tipo richText
      source: "webinar",
      yourname: "",
      enterprise: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data) => {
    axios
      .post(
        `https://prod-20.brazilsouth.logic.azure.com:443/workflows/4a0de618d958419bb7dc99ba7a3245b7/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QsAL47KtZeSa5He1YXBvXMI4ZsD802JoaITVlC2wXhs`,
        {...data, phone: prefix + data.phone}
      )
      .then(() => {
        // window.open(file, "_ blank");
        setSuccess(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} id="formNews">
        <Row className="text-center">
          <h1>{status ? dataForm.Titulo_pre : dataForm.Titulo_post}</h1>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
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
            {errors.yourname && (
              <Alert variant="danger">{errors?.yourname?.message}</Alert>
            )}
            <Form.Control
              type="text"
              className="formField"
              placeholder="Empresa"
              aria-describedby="passwordHelpBlock"
              {...register("enterprise", {
                required: {
                  value: true,
                  message:
                    "Por favor, ingrese la organización a la que pertenece",
                },
              })}
            />
            {errors.enterprise && (
              <Alert variant="danger">{errors?.enterprise?.message}</Alert>
            )}
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
            {errors.email && (
              <Alert variant="danger">{errors?.email?.message}</Alert>
            )}
            <Form.Group className="d-flex align-items-center">
              <Col md={4}>
                <Form.Select
                  className="formField"
                  onChange={(e) => setPrefix(e.target.value)}
                >
                  <option selected disabled>
                    Seleccione su país
                  </option>
                  {countriesCod.countries.map((code, idx) => (
                    <option value={code.dial_code} key={idx}>
                      {code.name_es}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={{span:7, offset: 1}} className="d-flex phone">
                <Col md={2}>
                  <Form.Control
                    className="formField prefix"
                    value={prefix}
                    disabled
                  />
                </Col>
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
                    validate: {
                      validatePrefix: () =>
                        prefix.length === 0
                        ? "Seleccione el prefijo de su país"
                        : true
                    }
                  })}
                />
              </Col>
            </Form.Group>
            {errors.phone && (
              <Alert variant="danger">{errors?.phone?.message}</Alert>
            )}
            <Row className="justify-content-center">
              <Col md={6} className="d-flex flex-column justify-content-center">
                {success && (
                  <Alert variant="success">
                    {status
                      ? "¡Ya estás inscripto!"
                      : "¡Te vamos a avisar en proximos eventos!"}
                  </Alert>
                )}
                <Button
                  variant="primary"
                  type="Submit"
                  id="sendForm"
                  disabled={success}
                >
                  {success
                    ? "Ya estás inscripto"
                    : status
                    ? dataForm.Boton_pre
                    : dataForm.Boton_post}
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
