import Style from '../Button/Button.module.css'

export const Button = (props) => {

    return (

        <>

            <button id={props.buttonStyle} className={Style.buttonStyle} src={props.buttonSrc} onClick={props.buttonClick}>
                {props.buttonText}
            </button>
        
        </>

    )

}