import Complex from "./Complex.js";

// Quebra a expressão em pedacinhos (tokens) pra facilitar a análise
// Reconhece números, operadores e a palavra 'equal' também
export function tokenize(str) {
  // Remove espaços
const expression = str.replace(/\s+/g, "");
  // Usa regex para encontrar números (incluindo decimais) ou operadores, ou a palavra 'equal'
const tokens = expression.match(/(\d+\.\d+|\d+|[+\-*/^√()i]|equal|conj)/g);
if (!tokens) {
    throw new Error("Entrada inválida");
}
return tokens;
}

// Transforma os tokens numa árvore (AST) que representa a expressão
// Isso ajuda a respeitar a ordem das operações (tipo PEMDAS)
export function parse(expression) {
const tokens = tokenize(expression);
let index = 0;

function peek() {
    return tokens[index];
}

function consume() {
    return tokens[index++];
}

  // parseFactor pega os elementos mais "atômicos": números, i, raiz, parênteses
function parseFactor() {
    const token = peek(); // Espia o próximo token sem removê-lo ainda

    if (/\d/.test(token)) {
      return consume(); // É um número, consome ele
    }

    if (token === "i") {
      return consume(); // Unidade imaginária
    }

    if (token === "√") {
      consume(); // Operador raiz quadrada
      const arg = parseFactor(); // Pega o que vem depois da raiz
    return ["√", arg];
    }

    if (token == "conj") {
    consume();
    const arg = parseFactor();
    return ["conj", arg];
    }

    if (token === "-") {
    consume();
    const args = parseFactor();
    return ["-", "0", args];
    }

    if (token === "(") {
      consume(); // Abre parênteses
      const node = parseEquality(); // Processa o que está dentro
    if (peek() !== ")") {
        throw new Error("Esperando ')'");
    }
      consume(); // Fecha parênteses
    return node;
    }

    throw new Error(`Token inesperado: ${token}`);
}

function parsePower() {
    let node = parseFactor();

    if (peek() == "^") {
    const op = consume();
    const right = parsePower();
    node = [op, node, right];
    }
    return node;
}

  // parseTerm cuida de * e / (também entende multiplicação implícita tipo 4i ou 2(3))
function parseTerm() {
    let node = parsePower();

    // Fica processando multiplicações e divisões em sequência
    // Também detecta multiplicação implícita (quando vem 'i' ou '(' direto)
    while (
    peek() === "*" ||
    peek() === "/" ||
    peek() === "i" ||
    peek() === "("
    ) {
    let op;
    let right;

    if (peek() === "*" || peek() === "/") {
        // Tem operador explícito (* ou /)
        op = consume();
        right = parsePower(); // Corrigido: chama parsePower em vez de parseFactor
    } else if (peek() === "i" || peek() === "(") {
        // Sem operador mas vem 'i' ou '(' = multiplicação implícita
        op = "*";
        right = parseFactor();
    } else {
        // Acabou a sequência de multiplicações/divisões
        break;
    }

    node = [op, node, right];
    }
    return node;
}

  // parseExpression trata somas e subtrações (vem depois de * e /)
function parseExpression() {
    let node = parseTerm();
    while (peek() === "+" || peek() === "-") {
    const op = consume();
    const right = parseTerm();
    node = [op, node, right];
    }
    return node;
}

  // parseEquality é pra comparação simbólica (menor precedência de todas)
function parseEquality() {
    let node = parseExpression();
    if (peek() === "equal") {
    const op = consume();
    const right = parseExpression();
    node = [op, node, right];
    }
    return node;
}

  // O ponto de entrada é agora a função de precedência mais baixa
const ast = parseEquality();

  // Se ainda houver tokens, significa que a sintaxe estava errada
if (index !== tokens.length) {
    throw new Error("Sintaxe inválida");
}
return ast;
}

// Converte a árvore pro formato LISP (aquele com um monte de parênteses)
// Exemplo: ['+', '5', ['*', '2', '3']] vira "(+ 5 (* 2 3))"
export function formatLisp(node) {
if (Array.isArray(node)) {
    const [op, ...args] = node;
    return `(${op} ${args.map(formatLisp).join(" ")})`;
}
  // Se não for array, é uma folha da árvore (número ou 'i')
return node;
}

// Normaliza a árvore pra facilitar comparações
// Exemplo: (3+2) e (2+3) ficam iguais porque soma é comutativa
export function canonicalize(node) {
if (!Array.isArray(node)) {
    return node; // É uma folha (número ou 'i')
}

const [op, ...args] = node;
  // Canonicaliza recursivamente os argumentos primeiro
const canonicalArgs = args.map(canonicalize);

  // Se o operador for comutativo (+ ou *), ordena os argumentos
if (op === "+" || op === "*") {
    // Ordena alfabeticamente (simples mas funciona)
    canonicalArgs.sort((a, b) => {
    const strA = JSON.stringify(a);
    const strB = JSON.stringify(b);
    return strA.localeCompare(strB);
    });
}

return [op, ...canonicalArgs];
}

// Percorre a árvore e calcula o resultado final
// Tudo aqui usa nossa classe Complex própria
export function evaluate(node) {
if (Array.isArray(node)) {
    const [op, ...args] = node;

    // 'equal' não pode ser calculado aqui, ele é só pra comparação
    if (op === "equal") {
    throw new Error("'equal' não pode ser avaliado numericamente.");
    }

    // Calcula os filhos primeiro (recursão)
    const evaluatedArgs = args.map((arg) => evaluate(arg)); // Passa Complex para chamadas recursivas

    switch (op) {
    case "√":
        return evaluatedArgs[0].sqrt();
    case "^":
        return evaluatedArgs[0].pow(evaluatedArgs[1]);
    case "conj":
        return evaluatedArgs[0].conjugate();
    case "+":
        return evaluatedArgs[0].add(evaluatedArgs[1]);
    case "-":
        return evaluatedArgs[0].sub(evaluatedArgs[1]);
    case "*":
        return evaluatedArgs[0].mul(evaluatedArgs[1]);
    case "/":
        if (evaluatedArgs[1].re === 0 && evaluatedArgs[1].im === 0) {
        throw new Error("Divisão por zero");
        }
        return evaluatedArgs[0].div(evaluatedArgs[1]);
    default:
        throw new Error(`Operador desconhecido: ${op}`);
    }
}
  // Chegou numa folha da árvore
if (node === "i") {
    return Complex.I; // Unidade imaginária
}
if (isNaN(parseFloat(node))) {
    throw new Error(`Número inválido: ${node}`);
}
  return new Complex(parseFloat(node)); // Número normal vira complexo com im=0
}
