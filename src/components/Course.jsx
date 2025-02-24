
const Course = ( {course} ) => {

    //Hacerlo con listas
    const partes = course.parts.map(part => {
        const llave = `${course.id}-${part.id}`
        return(
            <li key={llave}>{part.name} {part.exercises}</li>
        )
    })
    
    let suma = 0 
    course.parts.forEach(element => suma += element.exercises)

    return(
        <div>
            <h1>{course.name}</h1>
            {partes}
            <p>Suma de ejercicios: {suma}</p>
        </div>
    )
}

export default Course