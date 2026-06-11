//UserRegisterForm componente para registrar un usuario
import {useState, useEffect} from "react";
import { Input, Select, Checkbox, Button } from "@/shared";
import { getDocumentTypes } from "@/services/selectService";


export default function UserRegisterForm (){
            //Estado del formulario
    const [formData, setFormData] = useState({
        userName: "",
        userEmail:"",
        userPhone:"",
        userDocumentType:"",
        userDocumentNumber:"",
        userPassword:"",
        userImage:[],
        //flags booleans
        isStaff: false,
        isActive:true,
        isSuperUser:false,
    });


    //==========================================
                  //Handle Generico
    //==========================================

    /**
     * Función que se ejecuta cada vez que cambia el valor de un input del formulario
     */
    const handleChange = (e) => {
        //Se obtiene el nombre del campo y su valor
        const { name, value, type, checked} = e.target;

        setFormData((prev) => ({
            //Se copian todos los valores anteriores del estado
            ...prev,

            //Se actualiza unicamente lo que cambió
            //Operador terniario
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    //============== HANDLE SUBMIT =================

    const handleSubmit = async (e) => {
        //Evita que el formulario recargue la página.
        e.preventDefault();

        //Validamos los datos del formulario contra el esquema Zod
        //safeParse NO lanza excepción, retoma un objerto controlado
        const result = userSchema.safeParse(formData);
        //Si la validación falla
        if(!result.success) {
            //Objeto donde almacenaremos los errores por campo
            const fieldErrors = {};

            //Recorremos cada generado por Zod
            result.error.issues.forEach((issue) => {
                //issue.path[0] corresponde al nombre del campo
                //issue.message contiene el mensaje de error definido en schema
                fieldErrors[issue.path[0]] = issue.message;
                //Actualizamos el estado de errores para mostrarlos en la UI
                setErrors(fieldErrors);
                //Cortamos la ejecución: NO se envía nada del backend

                return;
            }
            //Si la validación pasa, limpiamos errores previos
            setErrors({fieldErrors})
            
        }
        }
    }



    const [documentTypes, setDocumentTypes] = useState ([])
    
        //Uso del estado useEffect
        useEffect (() => {
            getDocumentTypes().then(setDocumentTypes)
        },[])


    return (
        <div>
            <Input
                label="Nombre"
                type="text"
                placeholder="Escribe tu nombre"
                htmlFor="user-name"
                variant = "secondary"
                size = "sm"
            />
             <Input
                label="Correo"
                type="email"
                placeholder="Escribe tu correo electronico"
                htmlFor="user-email"
            />
            <Input
                label="Teléfono"
                type="tel"
                placeholder="Escribe tu número teléfono"
                htmlFor="user-phone"
            />
            <Select
                label="Tipos de dodumento"
                name="userDocumentTypes"
                htmlFor="userDocumentTypes"
                options={documentTypes}
            />
            <Input
                label="Documento"
                type="text"
                placeholder="Escribe tu número de documento"
                htmlFor="user-document-number"
            />
            <Input
                label="Contraseña"
                type="password"
                placeholder="Escribe tu contraseña"
                htmlFor="user-password"
            />

            {/* Checkbox */}

            <Checkbox
                id="isSuperUser"
                name="isSuperUser"
                label="Es super usuario"
                checked={FormData.isSuperUser}
                onChange={handleChange}
            />
            <Checkbox
                id="isStaff"
                name="isStaff"
                label="Es Staff"
                checked={FormData.isStaff}
                onChange={handleChange}
            />
            <Checkbox
                id="isActive"
                name="isActive"
                label="Esta activo"
                checked={FormData.isActive}
                onChange={handleChange}
            />
                

            

            {/* ACTIONS */}
                <div className="flex gap-6 items-center">
                    <Button
                        variant = "secondary"
                        size = "sm"
                        type = "submit"
                        onClick ={() => console.log("Se oprimió el submit")}

                    >
                        Cancelar
                    </Button>

                    <Button
                        variant = "primary"
                        size = "md"
                        type = "submit"
                        onClick ={() => console.log("Se oprimió el submit")}

                    >
                        Guardar
                    </Button>
                </div>
        </div>
    )
}