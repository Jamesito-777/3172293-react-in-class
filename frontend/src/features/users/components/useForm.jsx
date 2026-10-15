import { useNavigate } from "react-router-dom"

const navigate = useNavigate();

import { createUser } from "../services/userServices";

const [isSubmitting, setIsSubmitting] = useState(false);

//============================================//

    const handleSubmit = async (e) => {
        //Evita que el formulario recargue la pagina
        e.preventDefault();
        //safeParse NO lanza excepción, retorna un objeto controlado }
        const result = userSchema.safeParse(formData);

        //Verificar en consola si el esquema esta funcionando correctamente 
        console.log(result);

        //Si la validación falla
        if(!result.succes) {
            //Objeto donde almacenaremos los errores por campo 
            const fieldErrors = {};

            //Recorremos cada error generado por Zod
            result.error.issues.forEach((issue) => {
                //issue.path[0] corresponde al nombre del campo
                //issue.message contiene el mensaje del error definido en el schema
                fieldErrors[issue.path[0]] = issue.message;
            });

            //Actualizamos el estado de los errores para mostrarlos en la UI
            setErrors(fieldErrors);

            //Cortamos la ejecución: NO se envia nada al backend 

            return;
        }
        //Si la validación pasa, limpiamos errores previos
        setErrors({});

        //Activamos estado de envío (útil para deshabilitar el botón)
        setIsSubmitting(true);

        try {
            //Llamamos la servicio frontend que consume la API 
            //result.data contiene los datos ya validos por Zod
            const response = await createUser(result.data);

            //Log informativo para desarrollo
            console.log("Usuario creado:", response);

            //Feedback básico al usuario
            alert("Usuario creado correctamente");

            //Navegamos a la vista anterior 
            //navigate(-1) equivale a "volver atras"
            navigate(-1);
        } catch (error) {
            //Capturamos erroes de red o errores lanzados por el service 
            console.error("Error:", error.message);

            //Mostramos el mensaje de error al usuario
            alert(error.message);
        } finally {
            //Pase lo que pase, desactivamos el estado de envío
            setIsSubmitting(false);
        }
    };