import './App.css';
import React, {useEffect, useReducer} from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

import evaulate from './evaulate';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate',
}



function reducer(state, { type, payload }) {
  switch (type) {

    case ACTIONS.ADD_DIGIT:
      console.log(`payload ${payload.digit} CO ${state.currentOperand}`);
      if(payload.digit === "0" && state.currentOperand === "0") return state; // if current operand and digit = 0 dont add 0
      if(payload.digit === "." && state.currentOperand.includes(".")) return state; // if current digit and ioperand is `.` dont ADD `.`
      return {
        ...state,
        currentOperand:`${state.currentOperand || ""}${payload.digit}`
        }

      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand === "" && state.previousOperand === "") return state;

        if (state.previousOperand === "") {
          return{
            ...state,
            previousOperand: state.currentOperand,
            operation: payload.operation,
            currentOperand: ""
          }
        }
        
        if ( state.currentOperand === "") {  // for changing operations  
          return {
            ...state,
            operation: payload.operation
          }
        }
        return {
          ...state,
          previousOperand: evaulate(state),
          operation: payload.operation,
          currentOperand: ""
        }
      
      case ACTIONS.EVALUATE:
        if (state.currentOperand === "" || state.previousOperand === "" || state.previousOperand ==="Ans" ) return state;

        return {
          ...state,
          overwrite: true,
          currentOperand: evaulate(state),
          previousOperand: "Ans",
          operation: ""
        }
        
      case ACTIONS.DELETE_DIGIT:

        if(state.overwrite === true) {
          return {
            ...state,
            currentOperand: "",
            previousOperand: "",
            overwrite: false
          }
        }

        if(state.currentOperand === ""){ 
          return state;
        }
        if(state.currentOperand.length === 1){
          return{
            ...state,
            currentOperand: ""
          }
        }

        return{
          ...state,
          currentOperand: state.currentOperand.slice(0, -1)
        }

      case ACTIONS.CLEAR:
        return {currentOperand:"", previousOperand: "", operation: ""}
        // return {} this does the same thing apparently but not using it cause the code looks for empty string but this will set to null


  }
}

function App() {

  useEffect(()=>{
    const handler = ( event )=>{
      switch(event.key)
      {
        case "Enter":
          dispatch( {type: ACTIONS.EVALUATE} );
          break;
        case "Backspace":
          dispatch( {type: ACTIONS.DELETE_DIGIT} );
      }
    }

    window.addEventListener("keydown", handler);
  
    return ()=> window.removeEventListener("keydown", handler);
  }, []);

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {
    currentOperand: "",
    previousOperand: "",
    operation: ""
  });

  return (
    <div className='calculator-grid'>
      <div className='output'>
          <div className='previous-operand'>{previousOperand} {operation}</div>
          <div className='current-operand'>{currentOperand}</div>
      </div>
      <button className='span-two' onClick={()=>{dispatch( {type: ACTIONS.CLEAR} )}}>AC</button>

      <button onClick={()=>{dispatch( {type: ACTIONS.DELETE_DIGIT} )}} >DEL</button>

      <OperationButton  operation={"/"} dispatch={dispatch}/> 
      <DigitButton digit={"1"} dispatch={dispatch}/> 
      <DigitButton digit={"2"} dispatch={dispatch}/> 
      <DigitButton digit={"3"} dispatch={dispatch}/> 
      <OperationButton operation={"*"} dispatch={dispatch}/> 
      <DigitButton digit={"4"} dispatch={dispatch}/> 
      <DigitButton digit={"5"} dispatch={dispatch}/> 
      <DigitButton digit={"6"} dispatch={dispatch}/> 
      <OperationButton  operation={"+"} dispatch={dispatch}/> 
      <DigitButton digit={"7"} dispatch={dispatch}/> 
      <DigitButton digit={"8"} dispatch={dispatch}/> 
      <DigitButton digit={"9"} dispatch={dispatch}/> 
      <OperationButton  operation={"-"} dispatch={dispatch}/> 
      <DigitButton digit={"."} dispatch={dispatch}/> 
      <DigitButton digit={"0"} dispatch={dispatch}/> 
      <button className='span-two' onClick={()=>{dispatch( {type: ACTIONS.EVALUATE} )}}>=</button>
    </div>
  );
}

export default App;
