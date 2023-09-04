import { ACTIONS } from "./App";
import { useEffect } from "react";

export default function DigitButton({dispatch, digit}) {

      useEffect(() => {
        const handler = (event) => {
          if (event.key === digit) {
            dispatch({
              type: ACTIONS.ADD_DIGIT,
              payload: { digit: event.key }
            });
          }
        };        
    
        window.addEventListener('keypress', handler);

        return () => {
          window.removeEventListener('keyup', handler);
        };
      }, []); 


    return <button onClick={ ()=>{dispatch( {type: ACTIONS.ADD_DIGIT, payload:{digit} })} }> {digit} </button>
} 