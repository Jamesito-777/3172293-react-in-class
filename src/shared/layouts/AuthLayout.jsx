import { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";
import authBg from "@/assets/images/bg-1.png";
import { 
    Input,
    Button,
    DeleteCounter2,
    Select,
    Checkbox
    } from "@/shared"
import { getDocumentTypes } from "../../services/selectService";


export default function AuthLayout () {

    //Estado para los tipos de documentos
    const [documentTypes, setDocumentTypes] = useState ([])

    //Uso del estado useEffect
    useEffect (() => {
        getDocumentTypes().then(setDocumentTypes)
    },[])

    return (
        <>
            <div
                className="min-h-screen w-full"
                style={{
                    backgroundImage: `url(${authBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <main className="mx-auto">
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
                        <Input
                        label="Borrar Tipo de documento"
                        type="text"
                        placeholder="Escribe tu nombre"
                        htmlFor="Campo de nombre"
                        />
                        <Input
                        label="Documento"
                        type="text"
                        placeholder="Escribe tu número de documento"
                        htmlFor="user-document-number"
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
                            </div>{/*Actions */}
                            {/*Implementación del estado useState */}
                            <div className="mt-10">
                                <h1>Ejemplo sin useState</h1>
                            <DeleteCounter2/>
                            </div>

                        {/* <h1>Hola que tal</h1> */}
                        {/*Implementación de useEffect */}
                        {/* <div>
                            <h1>Este es mi useEffect</h1>
                            <div className="mt-12"></div>
                            <EffectDemo/>
                        </div> */}
                        {/* <CounterEffect/> */}

                        <Select
                            label="Tipos de dodumento"
                            name="userDocumentTypes"
                            htmlFor="userDocumentTypes"
                            options={documentTypes}
                            />

                            <Checkbox/>

                            
                    <Outlet/>
                </main>
            </div>
        </>
    );
}