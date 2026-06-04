//EffectDemo.jsx
//Efecto con array vacio, osea sin dependencias
//Este efecto se ejecuta una vez y esto ocurre cuando el componente se monta por primera vez.

import { useEffect, useState } from "react"

export default function EffectDemo(){
    const [message, setMessage] = useState ("Cargando...")
    useEffect(() => {
        setTimeout(() => {
            setMessage("Componente cargando")
        }, 2000);
    }, []);
    return <h1>{message}</h1>

}