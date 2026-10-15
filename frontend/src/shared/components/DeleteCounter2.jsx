// Ejemplo de contador sin usar datos

export default function DeleteCounter2(){



    let count = 0;

    const increment = () =>{
        count = count + 1
        console.log("Nuevo valor: ", count)
    }


    return(
        <div>
            <p>Contador: {count} </p>
            <button onClick={increment} className="border p-6 rounded-md bg-yellow-500">Incrementar</button>

        </div>
    )


}