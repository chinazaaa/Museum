import React from 'react';
import './css/Alert.css';

type AlertProps = {
    type: string,
    handleCloseAlert: any,
    message: string
}
const Alert: React.FC<AlertProps> = (props) => {
    //This simply displays the message sent as prop, setting CSS className to be prop called type.
    //Also notice that onClick event is trapped and prop set to be implemented by caller
    return(
        <h3 className={props.type} onClick={props.handleCloseAlert}>{props.message}</h3>
    )
}

export default Alert