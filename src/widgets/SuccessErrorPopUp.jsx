import React from 'react'
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
    return <MuiAlert elevation={6} 
                     variant="filled" {...props} />;
}

const SuccessErrorPopUp = (props) => {
    return (
        <Alert severity={props.severity}>{props.message}</Alert>
           
    )
}

export default SuccessErrorPopUp
