//EffectDemo.jsx
//Efecto con array vacio, osea sin dependencias
//Este efecto se ejecuta una vez y esto ocurre cuando el componente se monta por primera vez.

import { useEffect, useState } from "react"

export default function EffectDemo(){
    /*Creamos un estado con message, y setmessage verifica si se hizo el cambio */
    const [message, setMessage] = useState ("Cargando...")

    useEffect(() => {
        setTimeout(() => {
            setMessage("Componente cargando")
        }, 2000);
        /**Las llaves vacias significa que lo tenemos sin dependencias */
    }, []);
    return <h1>{message}</h1>

}