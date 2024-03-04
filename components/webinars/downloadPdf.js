"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "../commons/button/Button";

export default function DownloadPdf({ file }) {
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
    axios
      .post(
        `https://prod-20.brazilsouth.logic.azure.com:443/workflows/4a0de618d958419bb7dc99ba7a3245b7/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QsAL47KtZeSa5He1YXBvXMI4ZsD802JoaITVlC2wXhs`,
        data
      )
      .then(() => {
        window.open(file, "_ blank");
        setSuccess(true);
      });
  };

  return (
    <>
      {success ? (
        <div>
          <h2>Muchas gracias</h2>
          <p>La nota completa se abrirá en una nueva pestaña</p>
          <p>
            En caso de que esto no suceda, por favor haga{" "}
            <a href={file} target="_blank">
              click aquí
            </a>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center pb-3 w-8/12">
          <input
            type="text"
            className="mt-5 text-black bg-[#f6f6f6] rounded font-gotham text-m w-full py-2 px-3"
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
            className="mt-5 text-black bg-[#f6f6f6] rounded font-gotham text-m w-full py-2 px-3"
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
            className="mt-5 text-black bg-[#f6f6f6] rounded font-gotham text-m w-full py-2 px-3"
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
          <input
            type="text"
            className="mt-5 text-black bg-[#f6f6f6] rounded font-gotham text-m w-full py-2 px-3"
            placeholder="Teléfono"
            aria-describedby="passwordHelpBlock"
            {...register("phone", {
              required: {
                value: true,
                message: "Por favor, ingrese su telefono",
              },
            })}
          />
          {errors.phone && (
            <p className="w-full text-s text-danger">
              {errors?.phone?.message}
            </p>
          )}
          <Button text="Descargar" variant="secondary" fullWidth onClick={()=> handleSubmit(onSubmit)} />
        </form>
      )}
    </>
  );
}
