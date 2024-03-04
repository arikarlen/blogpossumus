"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ShareNews from "../../news/share";
import countriesCod from "../data/countries.json";
import Container from "../../commons/container/Container";
import Button from "../../commons/button/Button";
import styles from "./WebinarForm.module.css";

export default function WebinarForm({
  isPreWebinar,
  formularioData,
  titulo,
  bajada,
}) {
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
      origin: "Webinar -" + titulo.replaceAll("\n", "").replaceAll("#", ""), //Se quitan caracteres provenientes de Strapi, ya que titulo es tipo richText
      source: "webinar",
      yourname: "",
      enterprise: "",
      email: "",
      country: "",
      phone: "",
    },
  });

  const actualTitle = isPreWebinar
    ? formularioData.tituloPreWebinar
    : formularioData.tituloPostWebinar;
  const actualButton = isPreWebinar
    ? formularioData.botonPreWebinar
    : formularioData.botonPostWebinar;

  const onSubmit = (data) => {
    axios
      .post(
        `https://prod-20.brazilsouth.logic.azure.com:443/workflows/4a0de618d958419bb7dc99ba7a3245b7/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QsAL47KtZeSa5He1YXBvXMI4ZsD802JoaITVlC2wXhs`,
        { ...data, phone: prefix + data.phone }
      )
      .then(() => {
        // window.open(file, "_ blank");
        setSuccess(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Container className="mt-24 grid justify-items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`grid items-center justify-items-center md:w-7/12 ${styles.form}`}
        >
          <h1 className="text-center">{actualTitle}</h1>
          <input
            type="text"
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
            <p className="w-full text-s text-danger">
              {errors?.yourname?.message}
            </p>
          )}
          <input
            type="text"
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
            <p className="w-full text-s text-danger">
              {errors?.enterprise?.message}
            </p>
          )}
          <input
            type="text"
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
            <p className="w-full text-s text-danger">
              {errors?.email?.message}
            </p>
          )}
          <div className="flex gap-5">
            <div className="w-8/12 md:w-3/12">
              <select
                {...register("country", {
                  required: {
                    value: true,
                    message: "Por favor, elija su país",
                  },
                  onChange: (e) =>
                    setPrefix(
                      countriesCod.countries.filter(
                        (country) => country.name_es === e.target.value
                      )[0].dial_code
                    ),
                })}
                defaultValue="Seleccione su país"
              >
                <option disabled>Seleccione su país</option>
                {countriesCod.countries.map((code, idx) => (
                  <option value={code.name_es} id={code.dial_code} key={idx}>
                    {code.name_es}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex md:w-9/12 mb-12">
              <input
                value={prefix}
                disabled
                className="!bg-gray-d8 !rounded-r-none !w-5/12"
              />
              <input
                className="rounded-l-none"
                type="text"
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
                        : true,
                  },
                })}
              />
            </div>
          </div>
          {errors.phone && (
            <p className="w-full text-s text-danger">
              {errors?.phone?.message}
            </p>
          )}
          {success && (
            <p variant="success">
              {isPreWebinar
                ? "¡Ya estás inscripto!"
                : "¡Te vamos a avisar en proximos eventos!"}
            </p>
          )}
          <Button
            text={
              success
                ? "Ya estás inscripto"
                : isPreWebinar
                ? actualButton.texto
                : actualButton.texto
            }
            variant="secondary"
            type="Submit"
            disabled={success}
          />
        </form>
      </Container>
      <Container className="md:w-9/12">
        <ShareNews titulo={titulo} bajada={bajada} />
      </Container>
    </>
  );
}
