import { useState } from "react";
import { parse, formatLisp, canonicalize, evaluate } from "../utils/parser";
import { formatComplex } from "../utils/formatters";

// Hook customizado que gerencia toda a lógica da calculadora
export function useCalculator() {
const [displayValue, setDisplayValue] = useState("");
const [lispOutput, setLispOutput] = useState("");
const [error, setError] = useState("");
  const [history, setHistory] = useState([]); // Guarda os últimos 10 cálculos
  const [showHistory, setShowHistory] = useState(false); // Mostra/esconde o modal

const handleButtonClick = (value) => {
    // Se tinha erro, limpa quando clicar em qualquer botão
    if (error) {
    setError("");
    }

    switch (value) {
    case "C":
        setDisplayValue("");
        setLispOutput("");
        break;
    case "DEL":
        setDisplayValue((prev) => prev.slice(0, -1));
        break;
    case "%":
        if (displayValue && displayValue !== "0") {
        const currentValue = parseFloat(displayValue);

        if (!isNaN(currentValue)) {
            setDisplayValue(String(currentValue / 100));
        }
        }
        break;
    case "=":
        handleEquals();
        break;
    default:
        // Se tá mostrando resultado ou 0, começa uma nova expressão
        if (
        (displayValue === "0" && value !== ".") ||
        displayValue === "Verdadeiro" ||
        displayValue === "Falso"
        ) {
        setDisplayValue(value);
        } else {
        setDisplayValue((prev) => prev + value);
        }
        break;
    }
};

  // Função que roda quando aperta '=' ou 'equal'
  // Pode calcular o resultado OU comparar duas expressões
const handleEquals = () => {
    if (!displayValue) {
    return;
    }

    // Salva a expressão antes de calcular (pro histórico)
    const currentExpression = displayValue;
    let resultString = "";
    let lispString = "";

    try {
      // Primeiro transforma a expressão numa árvore
    const ast = parse(currentExpression);
    lispString = formatLisp(ast);
    setLispOutput(lispString);
    console.log("Notação LISP:", lispString);

      // Vê se é cálculo normal ou comparação com 'equal'
    if (Array.isArray(ast) && ast[0] === "equal") {
        // Modo comparação simbólica
        if (ast.length !== 3) {
        throw new Error("Sintaxe 'equal' inválida. (Ex: A equal B)");
        }

        const leftNode = ast[1];
        const rightNode = ast[2];

        // Normaliza os dois lados da equação
        const canonicalLeft = canonicalize(leftNode);
        const canonicalRight = canonicalize(rightNode);

        // Compara se são matematicamente iguais
        const isEqual =
        JSON.stringify(canonicalLeft) === JSON.stringify(canonicalRight);

        resultString = isEqual ? "Verdadeiro" : "Falso";
    } else {
        // Modo cálculo normal
        // Avalia a árvore e calcula o resultado
        const result = evaluate(ast);

        // Formata pra exibir bonitinho
        resultString = formatComplex(result);
    }

      // Atualiza o Display
    setDisplayValue(resultString);

      // Adiciona à Pilha de Histórico
    const newEntry = { expression: currentExpression, result: resultString };
    setHistory((prevHistory) => {
        const newStack = [newEntry, ...prevHistory]; // Adiciona ao topo (LIFO)
        if (newStack.length > 10) {
          newStack.pop(); // Remove o item mais antigo (do fim) se > 10
        }
        return newStack;
    });
    } catch (err) {
    console.error(err);
    setError(err.message || "Erro de Sintaxe");
    setDisplayValue("Erro");
    setLispOutput("");
    }
};

const toggleHistoryModal = () => {
    setShowHistory((prev) => !prev);
};

return {
    displayValue,
    lispOutput,
    error,
    history,
    showHistory,
    handleButtonClick,
    toggleHistoryModal,
};
}
