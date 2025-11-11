import React, { useState, useEffect } from 'react';
// import Complex from 'https://cdn.esm.sh/complex.js@2.1.1'; // Removido para importação dinâmica

// --- Funções do "Cérebro" da Calculadora ---

/**
 * Tokeniza uma string de expressão em números e operadores.
 * NOVO: Reconhece "equal" como um token.
 */
function tokenize(str) {
  // Remove espaços
  const expression = str.replace(/\s+/g, '');
  // Usa regex para encontrar números (incluindo decimais) ou operadores, ou a palavra 'equal'
  const tokens = expression.match(/(\d+\.\d+|\d+|[+\-*/√()i]|equal)/g);
  if (!tokens) {
    throw new Error("Entrada inválida");
  }
  return tokens;
}

/**
 * Constrói uma Árvore de Sintaxe Abstrata (AST) a partir dos tokens.
 * NOVO: O ponto de entrada (parse) agora procura por 'equal'.
 */
function parse(expression) {
  const tokens = tokenize(expression);
  let index = 0;

  function peek() {
    return tokens[index];
  }

  function consume() {
    return tokens[index++];
  }

  // parseFactor lida com os números, parênteses e operadores unários (√)
  function parseFactor() {
    const token = peek(); // Usa peek() para verificar sem consumir

    if (/\d/.test(token)) {
      return consume(); // Consome o número
    }
    
    if (token === 'i') {
      return consume(); // Consome 'i'
    }

    if (token === '√') {
      consume(); // Consome '√'
      const arg = parseFactor(); // Pega o argumento (pode ser um número ou parênteses)
      return ['√', arg];
    }

    if (token === '(') {
      consume(); // Consome '('
      const node = parseEquality(); // Começa a parsear a expressão interna
      if (peek() !== ')') {
        throw new Error("Esperando ')'");
      }
      consume(); // Consome ')'
      return node;
    }

    throw new Error(`Token inesperado: ${token}`);
  }

  // parseTerm lida com *, / e multiplicação implícita (ex: 4i, (2)i, i(2))
  function parseTerm() {
    let node = parseFactor();

    // Continua a parsear termos enquanto houver *, /, ou um
    // token que implique multiplicação (como 'i' ou '(' logo após um fator)
    while (peek() === '*' || peek() === '/' || peek() === 'i' || peek() === '(') {
      let op;
      let right;

      if (peek() === '*' || peek() === '/') {
        // Multiplicação ou divisão explícita
        op = consume();
        right = parseFactor();
      } else if (peek() === 'i' || peek() === '(') {
        // Multiplicação implícita, ex: "4i" ou "(3+2)i" ou "i(5)"
        op = '*';
        right = parseFactor(); // parseFactor vai lidar com 'i' ou '('
      } else {
        // Não é um operador de termo, quebra o loop
        break;
      }
      
      node = [op, node, right];
    }
    return node;
  }

  // parseExpression lida com + e - (precedência média)
  function parseExpression() {
    let node = parseTerm();
    while (peek() === '+' || peek() === '-') {
      const op = consume();
      const right = parseTerm();
      node = [op, node, right];
    }
    return node;
  }
  
  // parseEquality lida com 'equal' (precedência mais baixa)
  function parseEquality() {
    let node = parseExpression();
    if (peek() === 'equal') {
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

/**
 * Formata a AST (árvore) em uma string de notação LISP.
 * Ex: ['+', '5', ['*', '2', '3']] -> "(+ 5 (* 2 3))"
 */
function formatLisp(node) {
  if (Array.isArray(node)) {
    const [op, ...args] = node;
    return `(${op} ${args.map(formatLisp).join(' ')})`;
  }
  // É um nó "folha" (um número)
  return node;
}

/**
 * NOVO: Coloca uma árvore AST numa "Forma Canónica".
 * Isto ordena os argumentos de operadores comutativos (+ e *)
 * para que (3+2) e (2+3) tenham a mesma representação.
 */
function canonicalize(node) {
  if (!Array.isArray(node)) {
    return node; // É uma folha (número ou 'i')
  }
  
  const [op, ...args] = node;
  // Canonicaliza recursivamente os argumentos primeiro
  const canonicalArgs = args.map(canonicalize);

  // Se o operador for comutativo (+ ou *), ordena os argumentos
  if (op === '+' || op === '*') {
    // Ordena com base na representação de string (suficiente para este caso)
    canonicalArgs.sort((a, b) => {
      const strA = JSON.stringify(a);
      const strB = JSON.stringify(b);
      return strA.localeCompare(strB);
    });
  }
  
  return [op, ...canonicalArgs];
}


/**
 * Avalia a AST (árvore) e retorna o resultado numérico.
 * Ex: ['+', '5', ['*', '2', '3']] -> 11
 * Esta função AGORA DEPENDE de 'Complex'
 */
function evaluate(node, Complex) {
  if (!Complex) throw new Error("Biblioteca Complex.js não carregada");

  if (Array.isArray(node)) {
    const [op, ...args] = node;
    
    // 'equal' é tratado simbolicamente em handleEquals, não aqui.
    if (op === 'equal') {
       throw new Error("'equal' não pode ser avaliado numericamente.");
    }

    // Avalia recursivamente os "filhos" da árvore primeiro
    const evaluatedArgs = args.map(arg => evaluate(arg, Complex)); // Passa Complex para chamadas recursivas
    
    switch (op) {
      case '√':
        return evaluatedArgs[0].sqrt();
      case '+':
        return evaluatedArgs[0].add(evaluatedArgs[1]);
      case '-':
        return evaluatedArgs[0].sub(evaluatedArgs[1]);
      case '*':
        return evaluatedArgs[0].mul(evaluatedArgs[1]);
      case '/':
        if (evaluatedArgs[1].re === 0 && evaluatedArgs[1].im === 0) {
          throw new Error("Divisão por zero");
        }
        return evaluatedArgs[0].div(evaluatedArgs[1]);
      default:
        throw new Error(`Operador desconhecido: ${op}`);
    }
  }
  // É um nó "folha" (um número ou 'i')
  if (node === 'i') {
    return Complex.I;
  }
  if (isNaN(parseFloat(node))) {
     throw new Error(`Número inválido: ${node}`);
  }
  return new Complex(parseFloat(node));
}

/**
 * Formata um objeto Complex.js em uma string legível.
 * Ex: {re: 5, im: 2} -> "5 + 2i"
 */
function formatComplex(c) {
  // Arredonda para evitar longas casas decimais
  const re = parseFloat(c.re.toFixed(10));
  const im = parseFloat(c.im.toFixed(10));

  if (im === 0) {
    return String(re);
  }
  if (re === 0) {
    return (im === 1 ? 'i' : (im === -1 ? '-i' : `${im}i`));
  }
  if (im > 0) {
    return `${re} + ${im === 1 ? 'i' : `${im}i`}`;
  }
  // im < 0
  return `${re} - ${im === -1 ? 'i' : `${-im}i`}`;
}


// --- Componente React ---

// Componente de Botão reutilizável
const Button = ({ value, onClick, className = '', children }) => (
  <button
    onClick={() => onClick(value)}
    className={`bg-gray-700 hover:bg-gray-600 text-white text-2xl font-semibold p-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 ${className}`}
  >
    {children || value}
  </button>
);

// Componente Modal do Histórico
const HistoryModal = ({ history, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
    <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Histórico (Últimos 10)</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-3xl font-bold"
        >
          &times;
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto space-y-2">
        {history.length === 0 ? (
          <p className="text-gray-400 text-center">Nenhuma operação no histórico.</p>
        ) : (
          history.map((item, index) => (
            <div key={index} className="bg-gray-700 p-3 rounded-md font-mono">
              <p className="text-gray-300 text-sm truncate" title={item.expression}>{item.expression} =</p>
              <p className="text-white text-lg font-bold truncate" title={item.result}>{item.result}</p>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);


// Componente Principal da Aplicação
export default function App() {
  const [displayValue, setDisplayValue] = useState('');
  const [lispOutput, setLispOutput] = useState('');
  const [error, setError] = useState('');
  
  // Estado para guardar a biblioteca complex.js carregada
  const [Complex, setComplex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Novos Estados para o Histórico ---
  const [history, setHistory] =useState([]); // A pilha de histórico
  const [showHistory, setShowHistory] = useState(false); // Controla o modal

  // Carrega a biblioteca ao montar o componente
  useEffect(() => {
    import('https://cdn.esm.sh/complex.js@2.1.1')
      .then(module => {
        // A biblioteca complex.js parece exportar-se como 'default'
        setComplex(() => module.default);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Não foi possível carregar complex.js", err);
        setError("Falha ao carregar a biblioteca de cálculo");
        setIsLoading(false);
      });
  }, []); // O array vazio assegura que isto corre apenas uma vez

  const handleButtonClick = (value) => {
    // Limpa o erro em qualquer clique
    if (error) {
      setError('');
    }

    switch (value) {
      case 'C':
        setDisplayValue('');
        setLispOutput('');
        break;
      case '=':
        handleEquals();
        break;
      default:
        // Se o display atual for um resultado (ou 0) e não um operador,
        // limpe-o antes de adicionar um novo número.
        if ((displayValue === '0' && value !== '.') || displayValue === 'Verdadeiro' || displayValue === 'Falso') {
           setDisplayValue(value);
        } else {
           setDisplayValue(prev => prev + value);
        }
        break;
    }
  };

  /**
   * NOVO: handleEquals agora tem duas rotas:
   * 1. Cálculo numérico (como antes)
   * 2. Comparação simbólica (se o operador 'equal' for usado)
   */
  const handleEquals = () => {
    // Não calcular se a biblioteca não estiver carregada
    if (!Complex || isLoading) {
      setError("Biblioteca ainda a carregar...");
      return;
    }

    if (!displayValue) {
      return;
    }
    
    // Guarda a expressão atual ANTES de calcular
    const currentExpression = displayValue;
    let resultString = ''; // Para guardar o resultado (string)
    let lispString = ''; // Para guardar a string LISP

    try {
      // 1. Parse: Cria a árvore (AST)
      const ast = parse(currentExpression);
      lispString = formatLisp(ast);
      setLispOutput(lispString);
      console.log("Notação LISP:", lispString);
      
      // 2. Decide a rota: Cálculo ou Comparação
      if (Array.isArray(ast) && ast[0] === 'equal') {
        // --- Rota de Comparação Simbólica ---
        if (ast.length !== 3) {
          throw new Error("Sintaxe 'equal' inválida. (Ex: A equal B)");
        }
        
        const leftNode = ast[1];
        const rightNode = ast[2];
        
        // 3. Canonicaliza os dois lados
        const canonicalLeft = canonicalize(leftNode);
        const canonicalRight = canonicalize(rightNode);
        
        // 4. Compara as formas canónicas
        const isEqual = JSON.stringify(canonicalLeft) === JSON.stringify(canonicalRight);
        
        resultString = isEqual ? 'Verdadeiro' : 'Falso';
        
      } else {
        // --- Rota de Cálculo Numérico (como antes) ---
        // 3. Calculate: Avalia a árvore para obter o resultado
        const result = evaluate(ast, Complex); // Passa o objeto Complex carregado
        
        // 4. Display Result
        resultString = formatComplex(result);
      }
      
      // 5. Atualiza o Display
      setDisplayValue(resultString);
      
      // 6. Adiciona à Pilha de Histórico
      const newEntry = { expression: currentExpression, result: resultString };
      setHistory(prevHistory => {
        const newStack = [newEntry, ...prevHistory]; // Adiciona ao topo (LIFO)
        if (newStack.length > 10) {
          newStack.pop(); // Remove o item mais antigo (do fim) se > 10
        }
        return newStack;
      });
      // --- Fim da Lógica de Histórico ---

    } catch (err) {
      console.error(err);
      setError(err.message || "Erro de Sintaxe");
      setDisplayValue("Erro");
      setLispOutput('');
    }
  };

  const toggleHistoryModal = () => {
    setShowHistory(prev => !prev);
  };

  // Mapeia classes de estilo especiais
  const getButtonClass = (btn) => {
    if (['+', '-', '*', '/', '√', '(', ')', 'i'].includes(btn)) {
      return 'bg-yellow-500 hover:bg-yellow-400';
    }
    if (btn === 'C') {
      return 'bg-red-500 hover:bg-red-400';
    }
    if (btn === '=') {
      return 'bg-green-500 hover:bg-green-400';
    }
    // NOVO: Estilo para 'equal'
    if (btn === 'equal') {
      return 'bg-purple-500 hover:bg-purple-400';
    }
    // Botão de Histórico
    if (btn === 'Histórico') {
      return 'bg-blue-500 hover:bg-blue-400';
    }
    if (btn === '0') {
      return '';
    }
    return '';
  };
  
  // Mostra um estado de carregamento enquanto a biblioteca não está pronta
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 font-sans text-white">
        A carregar biblioteca de matemática...
      </div>
    );
  }

  return (
    <>
      {/* O Modal de Histórico (só é visível se showHistory for true) */}
      {showHistory && <HistoryModal history={history} onClose={toggleHistoryModal} />}

      <div className="flex items-center justify-center min-h-screen bg-gray-900 font-sans">
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-2xl border border-gray-700">
          <h1 className="text-2xl font-bold text-center text-white mb-4">Calculadora LISP</h1>
          
          {/* Display Principal */}
          <div className="bg-gray-900 text-white text-right p-4 rounded-md mb-2 h-20 flex flex-col justify-end border border-gray-700">
            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}
            <div className="text-4xl font-mono truncate" title={displayValue}>
              {displayValue || '0'}
            </div>
          </div>
          
          {/* Display LISP */}
          <div className="bg-gray-900 text-yellow-300 text-right p-2 rounded-md mb-4 h-12 font-mono text-sm border border-gray-700 overflow-x-auto" title={lispOutput}>
            {lispOutput || 'Notação LISP...'}
          </div>

          {/* Numpad */}
          {/* A grid agora tem 7 linhas (grid-rows-7) */}
          <div className="grid grid-cols-4 grid-rows-7 gap-2">
            
            {/* Layout Fixo para melhor controle */}
            {/* Row 1 */}
            <Button value="(" onClick={handleButtonClick} className={getButtonClass('(')}>(</Button>
            <Button value=")" onClick={handleButtonClick} className={getButtonClass(')')}>)</Button>
            <Button value="i" onClick={handleButtonClick} className={getButtonClass('i')}>i</Button>
            <Button value="C" onClick={handleButtonClick} className={getButtonClass('C')}>C</Button>
            
            {/* Row 2 */}
            <Button value="7" onClick={handleButtonClick} className={getButtonClass('7')}>7</Button>
            <Button value="8" onClick={handleButtonClick} className={getButtonClass('8')}>8</Button>
            <Button value="9" onClick={handleButtonClick} className={getButtonClass('9')}>9</Button>
            <Button value="/" onClick={handleButtonClick} className={getButtonClass('/')}>÷</Button>
            
            {/* Row 3 */}
            <Button value="4" onClick={handleButtonClick} className={getButtonClass('4')}>4</Button>
            <Button value="5" onClick={handleButtonClick} className={getButtonClass('5')}>5</Button>
            <Button value="6" onClick={handleButtonClick} className={getButtonClass('6')}>6</Button>
            <Button value="*" onClick={handleButtonClick} className={getButtonClass('*')}>*</Button>
            
            {/* Row 4 */}
            <Button value="1" onClick={handleButtonClick} className={getButtonClass('1')}>1</Button>
            <Button value="2" onClick={handleButtonClick} className={getButtonClass('2')}>2</Button>
            <Button value="3" onClick={handleButtonClick} className={getButtonClass('3')}>3</Button>
            <Button value="-" onClick={handleButtonClick} className={getButtonClass('-')}>-</Button>

            {/* Row 5 */}
            <Button value="√" onClick={handleButtonClick} className={getButtonClass('√')}>√</Button>
            <Button value="0" onClick={handleButtonClick} className={getButtonClass('0')}>0</Button>
            <Button value="." onClick={handleButtonClick} className={getButtonClass('.')}>.</Button>
            <Button value="+" onClick={handleButtonClick} className={getButtonClass('+')}>+</Button>

            {/* Row 6 - Botões '=' e 'equal' */}
            <Button value="=" onClick={handleButtonClick} className={`${getButtonClass('=')} col-span-2`}>=</Button>
            <Button value="equal" onClick={handleButtonClick} className={`${getButtonClass('equal')} col-span-2`}>equal</Button>
            
            {/* Row 7 - Botão de Histórico */}
            <button
              onClick={toggleHistoryModal}
              className={`col-span-4 ${getButtonClass('Histórico')} text-white text-2xl font-semibold p-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500`}
            >
              Histórico
            </button>

          </div>
        </div>
      </div>
    </>
  );
}