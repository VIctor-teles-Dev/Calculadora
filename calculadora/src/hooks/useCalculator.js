import { useState } from "react";
import {
  parse,
  formatLisp,
  canonicalize,
  evaluate,
  extractVariables,
  substituteVariables,
} from "../utils/parser";
import { formatComplex } from "../utils/formatters";

// Hook customizado que gerencia toda a lógica da calculadora
export function useCalculator() {
  const [displayValue, setDisplayValue] = useState("");
  const [lispOutput, setLispOutput] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]); // Guarda os últimos 10 cálculos
  const [showHistory, setShowHistory] = useState(false); // Mostra/esconde o modal
  const [showVariableModal, setShowVariableModal] = useState(false); // Modal de variáveis
  const [pendingCalculation, setPendingCalculation] = useState(null); // Armazena cálculo pendente
  const [showHelpModal, setShowHelpModal] = useState(false); // Modal de ajuda

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

    try {
      // Primeiro transforma a expressão numa árvore
      const ast = parse(currentExpression);
      const lispString = formatLisp(ast);
      setLispOutput(lispString);
      console.log("Notação LISP:", lispString);

      // Verifica se há variáveis na expressão
      const variables = extractVariables(ast);

      if (variables.length > 0) {
        // Tem variáveis! Armazena o cálculo e abre o modal
        setPendingCalculation({
          expression: currentExpression,
          ast,
          lispString,
          variables,
        });
        setShowVariableModal(true);
        return; // Não calcula ainda, espera o usuário fornecer os valores
      }

      // Sem variáveis, calcula direto
      processCalculation(ast, currentExpression);
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro de Sintaxe");
      setDisplayValue("Erro");
      setLispOutput("");
    }
  };

  // Processa o cálculo após variáveis serem substituídas (ou se não houver variáveis)
  const processCalculation = (ast, originalExpression) => {
    try {
      let resultString = "";

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
      const newEntry = {
        expression: originalExpression,
        result: resultString,
      };
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

  // Callback quando usuário fornece valores das variáveis
  const handleVariableSubmit = (variableValues) => {
    if (!pendingCalculation) return;

    try {
      const { ast, expression } = pendingCalculation;

      // Substitui variáveis na AST pelos valores fornecidos
      const substitutedAst = substituteVariables(ast, variableValues);

      console.log("AST com variáveis substituídas:", substitutedAst);
      console.log("LISP substituído:", formatLisp(substitutedAst));

      // Fecha o modal e processa o cálculo
      setShowVariableModal(false);
      setPendingCalculation(null);

      // Processa o cálculo com a AST substituída
      processCalculation(substitutedAst, expression);
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro ao processar variáveis");
      setDisplayValue("Erro");
      setShowVariableModal(false);
      setPendingCalculation(null);
    }
  };

  // Callback quando usuário cancela entrada de variáveis
  const handleVariableCancel = () => {
    setShowVariableModal(false);
    setPendingCalculation(null);
    setError("Cálculo cancelado");
  };

  const toggleHistoryModal = () => {
    setShowHistory((prev) => !prev);
  };

  const toggleHelpModal = () => {
    setShowHelpModal((prev) => !prev);
  };

  return {
    displayValue,
    lispOutput,
    error,
    history,
    showHistory,
    showVariableModal,
    showHelpModal,
    pendingCalculation,
    handleButtonClick,
    toggleHistoryModal,
    toggleHelpModal,
    handleVariableSubmit,
    handleVariableCancel,
  };
}
