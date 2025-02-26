
const Filter = ({ variable, setVariable }) => {

    const handleSearch = (event) => {
        console.log('Busqueda cambiada a: ', event.target.value)
        setVariable(event.target.value)
    }

    return (
        <div>
            filter: <input value={variable} onChange={handleSearch}/>
        </div>
    )

}

export default Filter