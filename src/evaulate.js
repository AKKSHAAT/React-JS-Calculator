export default function evaulate({
  currentOperand,
  previousOperand,
  operation,
}) {
  console.log(currentOperand + operation + previousOperand);

  const current = parseFloat(currentOperand);
  const previous = parseFloat(previousOperand);

  if (isNaN(current) || isNaN(previous)) return "";

  let computation = "";

  switch (operation) {
    case "+":
      computation = previous + current;
      break;
    case "-":
      computation = previous - current;
      break;
    case "*":
      computation = previous * current;
      break;
    case "/":
      computation = previous / current;
      break;
  }
  
  return computation.toString();
}
