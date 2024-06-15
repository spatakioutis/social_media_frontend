import '../../styles/Input.css'

function Input({inputContext, label, name, type, register, error}) {

    return (
        <div className={"input--field "+ inputContext}>
            <label 
                className="input--label" 
                htmlFor={name+  "--" + inputContext}
            >
                {label}
            </label>
            <input
                id={name + "--" + inputContext}
                name={name}
                className="input" 
                type={type} 
                {...register(name)}
                placeholder={type === 'date' ? 'dd/mm/yyyy' : ''}
            />
            { error && (
                <span 
                    className={inputContext + "--error"}
                >
                    {`*${error.message}`}
                </span>
            )}
        </div>
    )
}
export default Input