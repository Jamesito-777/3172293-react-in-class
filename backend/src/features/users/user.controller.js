//Este archivo implementa el controlado hhttp del feature users. orquestar la peticion delegar la logica de negocio y contruir una resputsta http

//Importamos el servicio de usuarios.
// El controller NO implementa lógica de negocio, 
// solo delega la operación al service correspondiente.
import { userService } from "./user.service.js";

// Exportamos un objeto controlador.
// Agrupar handlers en un objeto permite escalabildad
// (create, update, deleta, getById, etc.)
export const userController ={

    // Método encargado de manejar la creación de un usuario
    // se asume que este método será usado como handler de una ruta Express
    async create(req, res) {

        // Log del cuerpo de la petición 
        // Útil en desarrollo para vlidar que el fontend envía correctamente los datos
        // En producción suele reemplazarse por loging estructurado o eliminarse 
        console.log("BODY RECIBIDO:", req.body); //CLAVE

        try {
            // Llamamos al servicio de usuario, pasando los datos recibidos
            // Aquí ocurre la lógica real de negocio (validaciones, persistencia, etc.)
            const user = await userService.createUser(req.body);

            // Respuesta HTTP en caso de éxito 
            // 201: recurso creado correctamente según el estándar REST
            res.status(201).json ({
                // Mensaje informativo para el cliente
                message: "Usuario creado correctamente",
                
                // Retornamos únicamente el ID del susuario creado
                // Evite exponer información sensible innecesaria
                userId: user.id,
            });
        } catch (err) {
            // Capturamos cualquier error lanzado por el sercice o capas inferiores
            // Se registra el error completo para depuración en backend
            console.error("ERROR BACKEND:", err);

            // Respuesta HTTP de error génerico 
            // 500: error interno del servidor 
            res.status(500).json({
                // Se envía el mensaje del error para diagnóstico
                // En producción suele mapearse a mensajes controlados
                error: err.message,
            });
        }
    },
};