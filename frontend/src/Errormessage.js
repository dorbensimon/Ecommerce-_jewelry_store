import React from 'react'
import { Alert } from 'react-bootstrap'

const Errormessage = ({variant="info",children}) => {
    return (
        <Alert variant={variant} style={{fontSize:15,marginTop:'7rem'}}>
            <strong>{children}</strong>
        </Alert>
    )
}

export default Errormessage
