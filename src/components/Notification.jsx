
const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    const style = type === 'error' ? 'error' : 'success'
    
    return (
        <div className={style}>
            {message}
        </div>
    )
}

export default Notification