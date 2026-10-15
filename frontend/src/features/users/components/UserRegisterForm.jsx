// UserRegisterForm componente para registrar un usuario

import { useState, useEffect } from "react";
import { Input, Select, Checkbox, Button, FileInput } from "@/shared";
import { getDocumentTypes } from "@/services/selectService";
import { useNavigate} from "react-router-dom";
import {userSchema} from "../schemas/userSchema";
import { User, Calendar } from "lucide-react";
import { showSuccessAlert } from "@/shared/services/alertServices";
import { showCancelAlert } from "@/shared/services/alertServices";
import { createUser } from "../services/userServices"




export default function UserRegisterForm (){
        //Estado
        const [isSubmitting, setIsSubmitting] = useState(false);

        //Navegacion
        const navigate = useNavigate();

        //Estado del error
         const [errors, setErrors] = useState({})

        // Estado del formulario 
        const [formData, setformData] =  useState({
            userName: "",
            userEmail: "",
            userPhone: "",
            userDocumentTypes: "",
            userDocumentNumber: "",
            userPassword: "",
            userImage: [],

            //Flags booleanos
            isStaff: false,
            isActive: true,
            isSuperUser: false,
        });

        //Estado para los tipos de documento
        const [documentTypes, setDocumentTypes] = useState([]);
    
        // Uso del estado useEffect 
        useEffect(() => {
            getDocumentTypes().then(setDocumentTypes);
        },[])

        //========================================
        //          Handle Generico
        //========================================
        /**
         * Función que se ejecuta cada vez que cambia el valor de un input del formulario
         */
        const handleChange = (e) => {
            // Se obtiene el nombre del campo y su valor
            const { name, value, type, checked } = e.target;

        setformData((prev) => ({
            // Se copian todos los valores anteriores del estado
            ...prev,

            // Se actualiza unicamente lo que cambio
            [name]: type === "checkbox" ? checked : value,
        }));
    };

 

    //===================== HANDLE SUBMIT =============================
    const handleSubmit = async(e) => {
        //Evita que el formulario recargue la pagina
        e.preventDefault();

        console.log("FORM DATA:", formData);
        console.log("BOOLEANS:", {
            isStaff: formData.isStaff,
            isActive: formData.isActive,
            isSuperUser: formData.isSuperUser,
        });

        //Validamos los datos del formulario contra el esquema Zod
        //saFeParse NO lanza exceptcion, retorna un objeto controlado
        const result = userSchema.safeParse(formData);
        
        //Resultado del ZOD
        console.log("RESULTADO ZOD:", result);

        //Verificar en consola si el esquema está funcionado correctamente 
        // console.log(result);

        //Si la validacion falla
        if(!result.success){

            console.log("ENTRO AL ERROR DEL SCHEMA")
            console.log("ISSUES:", result.error.issues);
            alert("fallo la validacion")

            //Objeto donde almacenaremos los errores por campo
            const fieldErrors = {};

            // Recorremos cada error generado por Zod
            result.error.issues.forEach((issue) => {
                //issue.path[0] corresponde al nombre del campo
                // issue.message contiene el mensaje de error definido en el schema
                fieldErrors[issue.path[0]] = issue.message;
            });

            // Actualizamos el estado de errores para mostrarlos en el UI 
            setErrors(fieldErrors);

            // Cortamos la ejecución: NO se envia nada al backend

            return;
        }
        // Si la validacion pasa, limpiamos errores previos
        setErrors({});

        //Activamos eestado de envio (util para desahibilitar el boton)
        // setIsSubmitting(true);

        try {
            //llamamos al servivio frontend que soncume la API 
            //result.data contiene los datos ya validamos por Zod
            const responde = await createUser(result.data); //linea comentada es un servicio 

            //Log informativo para desarrolllo
            console.log("Usuario creado:", responde)
            //Feedback basico al usuario 
            await showSuccessAlert({
                title: "Usuario creado",
                text: "El usuario fue creado correctamente",
                timer: 3000,
            });


            //Navegamos a la vista anterior
            // navigate (-1) equivale a "volver atras"
            navigate(-1);
        } catch (error){
            //Caoturamos errores de red o errores lanzados por el service
            console.error("Error:" , error.message);

            //Mstramos el mensaje de error al usuario 
            alert(error.message);
        } finally {
            //Pase lo que pase, desactivamos el esrado de envio 
            setIsSubmitting(false);
        }
    };

    const handledCancel = async () => {
        //Desplegamos la alerta de confirmacion
        const result = await showCancelAlert ({
            title: "Cancelado",
                text: "Los cambios se perderan",
                timer: 3000,
        });
    //Si el usuario confirma (por ejemplo: result.isConfirmed), navegamos atras
        if (result.isConfirmed) {
            navigate(-1);
        }
    };

    //========================================
    //          Handle NameChange
    //========================================

    // const handleNameChange = (e) => {
    //     const value = e.target.value.trim();

    //     if (value === "") {
    //         console.log("El nombre no puede estar vacio");
    //     }
    // };

return(
        <div className="grid items-center justify-center">
            <h1 className="mx-auto my-12 text-title font-heading font-bold ">
                Registro de usuarios</h1>
            {/* Formulario*/}
            <form 
                action=""
                onSubmit={handleSubmit}
            >

                  <Input
                    label="Nombre"
                    name="userName"
                    type="text"
                    value={formData.userName}
                    placeholder="Escribe tu nombre"
                    htmlFor="user-name"
                    onChange={handleChange}
                    error={errors.userName}
            />
            <Input
                    label="Correo"
                    name="userEmail"
                    type="email"
                     value={formData.userEmail}
                    placeholder="Escribe tu correo electronico"
                    htmlFor="user-email"
                    onChange={handleChange}
                    error={errors.userEmail}
            />
            <Input
                    label="Telefono"
                    name="userPhone"
                    type="tel"
                    value={formData.userPhone}
                    placeholder="Escribe tu numero de telefono"
                    htmlFor="user-phone"
                    onChange={handleChange}
                    error={errors.userPhone}
            />

            <Select
                    label="Tipo de documento"
                    name="userDocumentTypes"
                    value={formData.userDocumentTypes}
                    htmlFor="userDocumentTypes"
                    options={documentTypes}
                    onChange={handleChange}
                    error={errors.userDocumentTypes}
            />
             <Input
                    label="Documento"
                    name="userDocumentNumber"
                    type="text"
                    value={formData.userDocumentNumber}
                    placeholder="Escribe tu numero de documento"
                    htmlFor="user-document-number"
                    onChange={handleChange}
                    error={errors.userDocumentNumber}
            />
             <Input
                    label="Contraseña"
                    name="userPassword"
                    type="password"
                    value={formData.userPassword}
                    placeholder="Escribe tu contraseña"
                    htmlFor="user-password"
                    onChange={handleChange}
                    error={errors.userPassword}
                    />

                    {/*Checkbox*/}
            <div className="grid gap-4 my-2">
                <Checkbox
                    id="isSuperUser"
                    name="isSuperUser"
                    label="Es super usuario"
                    checked = {formData.isSuperUser}
                    onChange={handleChange}
                />
                <Checkbox
                    id="isStaff"
                    name="isStaff"
                    label="Es staff"
                    checked = {formData.isStaff}
                    onChange={handleChange}
                />
                <Checkbox
                    id="isActive"
                    name="isActive"
                    label="Esta activo"
                    checked = {formData.isActive}
                    onChange={handleChange}
                />

                <div>
                    <p>Archivo minimo 1 y maximo 12 para su registro</p>
                    <p>Peso máximo 10MB</p>
                </div>


                <FileInput 
                    value={formData.userImage}
                    onChange={(files) => 
                        setformData((prev) => ({ ...prev, userImage: files }))
                    }
                    multiple={true}
                />
        {errors.userImage && (
            <span className="text-red-500 text-sm">{errors.userImage}</span>
        )}

            </div>

            
            


            {/* Actions */}
                <div className="flex gap-6 items-center">
                    <Button
                        variant="secondary"
                        size="sm"
                        type="button"
                        onClick={handledCancel}
                    >
                     Cancelar
                    </Button>
                    {/* <Button
                        
                        variant="primary"
                        size="md"
                        type="submit"
                        onClick={() => {console.log("Se oprimió el submit")}}
                    >
                     Guardar
                    </Button> */}
                  
                    <Button
                        variant="primary"
                        size="md"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Guardando..." : "Guardar"}
                    </Button>
                  
                </div>
                
                {/* IconButton de ejemplo */}
                <User/>
                <Calendar/>
          </form>
        </div>
    );
}



