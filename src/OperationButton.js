import { ACTIONS } from "./App";
import { useEffect } from "react";

export default function OperationButton({dispatch, operation}) {

    useEffect(()=>{
        const handler = ( event )=>{
            if (event.key === operation) {
                dispatch( {type: ACTIONS.CHOOSE_OPERATION, payload:{operation}} );
            }
        }

        window.addEventListener('keypress', handler);

        return () => {
            window.removeEventListener('keypress', handler);
        };
    }, [])
    
    return <button onClick={ ()=> { dispatch( {type: ACTIONS.CHOOSE_OPERATION, payload:{operation}} ) }}> {(operation === "/")? "÷" : operation} </button>
} 