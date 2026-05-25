export default function Input({
    label,
    htmlFor,
    type = "text",
    ...props /* Las propiedades tienen clave y valor */
}){


    return(
        <div className="w-80">
            {/*LABEL */}
            <label 
                htmlFor={htmlFor}
                className="
                    block
                    text-caption
                    mb-1
                    text-secondary
                "
                >
                {label}
            </label>

            {/*Contenedor del input */}
            <div
                className="
                    relative
                    h-12
                    flex
                    items-center

                "
            >
                {/*Área interactiva de (48px) */}
                <div
                    className="
                        absolute 
                        inset-0
                    "
                    onMouseDown={(e) => {
                        e.preventDefault();

                        //Mueve el foco al siguiente nodo hermano en el DOM 
                        //nextSibling puede ser texto; si no es un elemento valido, focus() falla.

                        e.currentTarget.nextSibling.focus();
                    }}
                />
                {/*INPUT VISUAL */}
                <Input
                    type={type}
                    className="
                    relative
                    w-full
                    h-10
                    round-md
                    border border-border
                    px-4
                    text-body

                    focus:outline-none
                    focus:ring-2
                    focus:ring-ring
                    focus:ring-brand
                    "
                    {...props}
                />
                <h1>hola hola</h1>
                </div>
            </div>
    )
}