# 🧮 Calculadora Científica LISP

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.17-38B2AC?style=for-the-badge&logo=tailwind-css)
![Electron](https://img.shields.io/badge/Electron-39.2.0-47848F?style=for-the-badge&logo=electron)

Uma calculadora científica avançada com suporte a **números complexos**, **notação LISP** e **comparação simbólica de expressões**, desenvolvida com React e visual cyberpunk.

[📸Ver Screenshots](#-screenshot) • [🎯Funcionalidades](#-funcionalidades) • [🚀 Instalação](#-instalação) • [💡 Como Usar](#-como-usar)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Design e Interface](#-design-e-interface)
- [Compilação para Produção](#-compilação-para-produção)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Autor](#-autor)
- [Colaboradores](#-colaboradores)
- [Agradecimentos](#-agradecimentos)

---

## 🎯 Sobre o Projeto

A **Calculadora Científica LISP** é uma aplicação web/desktop moderna que combina computação numérica avançada com uma interface visual inspirada no estilo cyberpunk. O projeto implementa:

- **Parser de Expressões Matemáticas**: Converte expressões em notação infixa para **AST (Árvore de Sintaxe Abstrata)**
- **Notação LISP**: Exibe a representação LISP de cada expressão calculada
- **Números Complexos**: Implementação própria completa para operações com números imaginários (sem bibliotecas externas)
- **Comparação Simbólica**: Verifica se duas expressões são matematicamente equivalentes
- **Histórico de Cálculos**: Mantém os últimos 10 cálculos realizados
- **Arquitetura Modular**: Código organizado seguindo as melhores práticas do React

---

## 📸 ScreenShot

![Amostra da Calculadora](https://res.cloudinary.com/dw0qtsos5/image/upload/v1763834166/amostra_certa_da_calculadora_blba4y.png)

## ✨ Funcionalidades

### 🔢 Operações Básicas

- ➕ Adição, ➖ Subtração, ✖️ Multiplicação, ➗ Divisão
- 📊 Porcentagem (%)
- 🔢 Suporte a números decimais

### 🔤 Sistema de Variáveis

- **Entrada de Variáveis**: Use qualquer letra (a-z) como variável
  - Exemplo: `x+5`, `a*b+c`, `2*y^2`
- **Modal Interativo**: Quando você usa variáveis, a calculadora solicita seus valores
- **Suporte Complexo**: Variáveis podem ser números reais ou complexos
  - Exemplo: `x` onde x = 3+4i
- **Botões Dedicados**: Botões rápidos para x, y, z, a, b
- **Entrada Mista**: Digite variáveis pelo teclado ou clique nos botões

### 🧪 Operações Científicas

- **Números Complexos**: `i` (unidade imaginária)
- **Potenciação**: `^` (ex: `2^3 = 8`)
- **Raiz Quadrada**: `√` (ex: `√16 = 4`)
- **Conjugado Complexo**: `c̄` (ex: `conj(3+4i) = 3-4i`)
- **Multiplicação Implícita**: `4i`, `(2+3)i`, `i(5)`

### 🎓 Recursos Avançados

- **Notação LISP**: Visualize a estrutura da expressão
  - Exemplo: `2 + 3 * 4` → `(+ 2 (* 3 4))`
- **Comparador Simbólico**: Use `equal` para verificar equivalência
  - Exemplo: `(2+3)equal(3+2)` → `Verdadeiro`
  - Exemplo: `2+3equal4+1` → `Verdadeiro`
  - Exemplo: `2+3equal2+4` → `Falso`

### 🕰️ Histórico

- Armazena os últimos 10 cálculos
- Modal com visualização completa
- Interface organizada e responsiva
- Fechar com tecla **ESC** ou clicando no X

### ❓ Modal de Ajuda Interativo

- **Botão "?"** no canto superior direito
- **6 Seções Organizadas**:
  - 📐 Funções Matemáticas (√, ^, conj, equal, i)
  - ⌨️ Atalhos de Teclado - Números e Operadores
  - 🎮 Atalhos de Teclado - Comandos
  - 🔤 Variáveis (como usar)
  - 🔢 Números Complexos (exemplos)
  - 💡 Dicas úteis
- **Fechar com ESC**: Pressione ESC ou clique no X
- **Design Integrado**: Estilo cyberpunk roxo/rosa

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia      | Versão | Descrição                                |
| --------------- | ------ | ---------------------------------------- |
| **React**       | 19.2.0 | Biblioteca para construção da interface  |
| **Vite**        | 7.2.2  | Build tool e servidor de desenvolvimento |
| **TailwindCSS** | 4.1.17 | Framework CSS para estilização           |
| **Electron**    | 39.2.0 | Framework para aplicação desktop         |
| **ESLint**      | 9.39.1 | Linter para qualidade de código          |

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Git** (opcional, para clonar o repositório)

Verifique a instalação:

```bash
node --version
npm --version
```

---

## 🚀 Instalação

### 1️⃣ Clone o Repositório (ou baixe o ZIP)

```bash
git clone https://github.com/VIctor-teles-Dev/Calculadora.git
cd Calculadora/calculadora
```

### 2️⃣ Instale as Dependências

```bash
npm install
```

Ou com yarn:

```bash
yarn install
```

### 3️⃣ Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: **http://localhost:5173**

---

## 💡 Como Usar

### 🌐 Modo Web (Navegador)

1. Execute `npm run dev`
2. Abra o navegador em `http://localhost:5173`
3. Comece a calcular!

### 🖥️ Modo Desktop (Electron)

1. Execute `npm run electron:dev`
2. A aplicação será aberta como janela desktop

### 🧮 Exemplos de Uso

#### Operações Básicas

```
Entrada: 5 + 3 * 2
Resultado: 11
LISP: (+ 5 (* 3 2))
```

#### Números Complexos

```
Entrada: (3 + 4i) * (1 - 2i)
Resultado: 11 - 2i
LISP: (* (+ 3 (* 4 i)) (- 1 (* 2 i)))
```

#### Raiz Quadrada de Números Negativos

```
Entrada: √(-4)
Resultado: 2i
LISP: (√ -4)
```

#### Comparação Simbólica

```
Entrada: (2 + 3) equal (3 + 2)
Resultado: Verdadeiro

Entrada: 2 * 3 equal 3 * 2
Resultado: Verdadeiro

Entrada: 5 + 1 equal 2 + 3
Resultado: Falso
```

#### Conjugado Complexo

```
Entrada: conj(3 + 4i)
Resultado: 3 - 4i
LISP: (conj (+ 3 (* 4 i)))
```

#### Usando Variáveis

```
Entrada: x + 5
Modal solicita: x = ?
Usuário digita: x = 3
Resultado: 8
```

```
Entrada: x * y + z
Modal solicita: x = ?, y = ?, z = ?
Usuário digita: x = 2, y = 3, z = 4
Resultado: 10
LISP: (+ (* x y) z)
```

```
Entrada: conj(x)
Modal solicita: x = ?
Usuário digita: x = 3+4i (real: 3, img: 4)
Resultado: 3 - 4i
```

### 🎮 Controles

| Botão             | Função                                    |
| ----------------- | ----------------------------------------- |
| **C**             | Limpa toda a expressão                    |
| **DEL** (⌫)       | Apaga o último caractere                  |
| **=**             | Calcula a expressão                       |
| **equal**         | Compara duas expressões simbolicamente    |
| **Histórico**     | Abre o modal com os últimos 10 cálculos   |
| **x, y, z, a, b** | Insere variáveis rapidamente              |
| **?** (Help)      | Abre modal de ajuda com funções e atalhos |

### ⌨️ Atalhos de Teclado

Você também pode usar o teclado para operar a calculadora. Abaixo está o mapeamento das teclas suportadas (case-insensitive quando aplicável):

| Tecla(s)                    | Função / Equivalente                                  |
| --------------------------- | ----------------------------------------------------- |
| 0–9                         | Insere o dígito correspondente                        |
| . (ponto)                   | Separador decimal                                     |
| +, -, \*, /                 | Operadores aritméticos (+, -, ×, ÷)                   |
| x ou X                      | Multiplicação (equivalente a `*`)                     |
| ^                           | Potenciação                                           |
| %                           | Porcentagem                                           |
| ( , )                       | Parênteses                                            |
| i                           | Unidade imaginária (insere `i`)                       |
| s ou S                      | Raiz quadrada (equivalente a `√`)                     |
| **a-z** (exceto x, s, c, i) | **Insere variável** (ex: a, b, y, z, etc)             |
| Enter ou =                  | Executa o cálculo (equivalente ao botão `=`)          |
| c ou C                      | Limpa toda a expressão (equivalente ao botão `C`)     |
| **Escape**                  | **Fecha modais abertos** ou limpa expressão           |
| Backspace, Delete           | Apaga o último caractere (equivalente ao botão `DEL`) |

**Notas importantes:**

- **Variáveis**: Qualquer letra (exceto x→\*, s→√, c→C, i→i) é reconhecida como variável
- **ESC nos Modais**: Quando um modal está aberto (Ajuda, Histórico ou Variáveis), ESC fecha o modal
- **ESC na Calculadora**: Quando nenhum modal está aberto, ESC limpa a expressão
- **Entrada de Variáveis**: O teclado funciona normalmente no modal de variáveis (não interfere com a calculadora)
- As teclas alfabéticas especiais (`c`, `s`, `x`, `i`) funcionam em maiúsculas e minúsculas

---

## 📁 Estrutura do Projeto

```
calculadora/
├── electron/                        # Configuração do Electron
│   └── main.cjs                    # Processo principal do Electron
├── public/                         # Arquivos públicos estáticos
├── src/                            # Código fonte
│   ├── components/                 # Componentes React
│   │   ├── Buttons/               # Componentes de botões
│   │   │   ├── index.js          # Barrel export dos botões
│   │   │   ├── StarButtonPurpleDark.jsx
│   │   │   ├── StarButtonGray.jsx
│   │   │   ├── StarButtonPurple.jsx
│   │   │   ├── HistoryButton.jsx
│   │   │   └── EqualButton.jsx
│   │   ├── HistoryModal.jsx       # Modal de histórico
│   │   ├── HelpModal.jsx          # Modal de ajuda (funções e atalhos)
│   │   └── VariableInputModal.jsx # Modal para entrada de variáveis
│   ├── hooks/                      # Custom React Hooks
│   │   ├── useCalculator.js       # Lógica da calculadora + variáveis
│   │   └── useKeyboardInput.js    # Gerenciamento de teclado
│   ├── utils/                      # Funções utilitárias
│   │   ├── Complex.js             # Classe de números complexos
│   │   ├── parser.js              # Parser + extração/substituição de variáveis
│   │   └── formatters.js          # Formatação de números
│   ├── constants/                  # Constantes da aplicação
│   │   └── images.js              # URLs de imagens
│   ├── assets/                     # Recursos visuais
│   ├── App.jsx                     # Componente principal (~345 linhas)
│   ├── index.css                   # Estilos globais + scrollbar customizada
│   └── main.jsx                    # Ponto de entrada do React
├── .gitignore
├── eslint.config.js                # Configuração do ESLint
├── index.html                      # HTML base
├── package.json                    # Dependências e scripts
├── README.md                       # Este arquivo
└── vite.config.js                  # Configuração do Vite
```

---

## 🏗️ Arquitetura e Módulos

### 📦 Componentes (`src/components/`)

**Buttons/**

- `StarButtonPurpleDark.jsx` - Botões roxo escuro (DEL, C)
- `StarButtonGray.jsx` - Botões cinza (números 0-9, ponto decimal)
- `StarButtonPurple.jsx` - Botões roxo (operadores matemáticos)
- `HistoryButton.jsx` - Botão retangular para histórico
- `EqualButton.jsx` - Botão retangular para comparação simbólica
- `index.js` - Barrel export para importação simplificada

**HistoryModal.jsx**

- Modal responsivo com os últimos 10 cálculos
- Estilo cyberpunk com backdrop blur
- Scrollbar customizada
- Fecha com ESC ou clique no X

**HelpModal.jsx**

- Modal de ajuda interativo
- 6 seções organizadas: Funções, Atalhos, Variáveis, Complexos, Dicas
- Design cyberpunk integrado
- Fecha com ESC ou clique no X
- Link para o repositório GitHub

**VariableInputModal.jsx**

- Modal para solicitar valores de variáveis
- Campos separados para parte real e imaginária
- Validação de entrada
- Suporte a números negativos e decimais
- Fecha com ESC, Cancelar ou após submeter
- Não interfere com a captura de teclado da calculadora

### 🎣 Hooks Customizados (`src/hooks/`)

**useCalculator.js**

- Gerencia estado da calculadora (display, LISP, erro, histórico)
- Implementa lógica de cálculo e avaliação de expressões
- **Sistema de variáveis**: detecta, extrai e substitui variáveis
- Gerencia histórico (LIFO - últimos 10)
- Controla estados de modais: `showHistory`, `showHelpModal`, `showVariableModal`
- Funções: `handleButtonClick`, `handleEquals`, `toggleHistoryModal`, `toggleHelpModal`, `handleVariableSubmit`, `handleVariableCancel`

**useKeyboardInput.js**

- Captura eventos de teclado global
- Mapeia teclas para ações da calculadora
- **Suporte a variáveis**: reconhece letras (a-z) como variáveis
- **Desabilitação inteligente**: não captura eventos quando modais estão abertos
- Gerencia feedback visual de teclas ativas
- Atalhos especiais: x→\*, s→√, c→C, i→i
- Suporta: Enter, Escape, Backspace, Delete, operadores, números

### 🔧 Utilitários (`src/utils/`)

**Complex.js**

- Classe própria de números complexos (a + bi)
- Métodos: `add`, `sub`, `mul`, `div`, `conjugate`, `abs`, `arg`
- Operações avançadas: `sqrt`, `pow` (usando forma polar)
- **Zero dependências externas**

**parser.js**

- `tokenize(str)` - Converte string em tokens (inclui variáveis a-z)
- `parse(expression)` - Gera AST respeitando precedência (PEMDAS)
- `formatLisp(node)` - Converte AST para notação LISP
- `canonicalize(node)` - Normaliza AST para comparação
- `evaluate(node)` - Avalia AST e retorna resultado (Complex)
- **`extractVariables(expression)`** - Extrai todas as variáveis únicas de uma expressão
- **`substituteVariables(expression, values)`** - Substitui variáveis por seus valores complexos

**formatters.js**

- `formatComplex(c)` - Formata número complexo para exibição
- Lida com casos especiais: apenas real, apenas imaginário, ambos

### 📌 Constantes (`src/constants/`)

**images.js**

- URLs de imagens do Cloudinary
- Backgrounds e sprites dos botões

---

## 📜 Scripts Disponíveis

| Comando                | Descrição                               |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Inicia o servidor de desenvolvimento    |
| `npm run build`        | Cria build otimizado para produção      |
| `npm run preview`      | Visualiza o build de produção           |
| `npm run lint`         | Executa o linter (ESLint)               |
| `npm run electron`     | Inicia a aplicação Electron             |
| `npm run electron:dev` | Inicia Electron em modo desenvolvimento |

---

## 🎨 Design e Interface

A calculadora apresenta um visual **cyberpunk** com:

- Fundo temático animado
- Botões estilizados com formato de estrelas
- Gradientes em roxo e rosa
- Efeitos de hover e transições suaves
- Interface responsiva e moderna

---

## 🔧 Compilação para Produção

### Web Build

```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`

### Desktop Build (Electron)

```bash
npm run electron:build
```

(Necessita de configuração adicional no `package.json` com electron-builder)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

---

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença que você preferir especificar.

---

## 👤 Autor

**Victor Teles**

- GitHub: [@VIctor-teles-Dev](https://github.com/VIctor-teles-Dev)

---

## 👤 Colaboradores

**Pedro Henrique de Oliveira Carvalho**

- Github: [@Pedrohxxz](https://github.com/Pedrohxxz)

---

**Alice Martins Bahiense Bezerra Bauler**

- Github: [@lice-games](https://github.com/lice-games)

---

## 🙏 Agradecimentos

- [React](https://react.dev/) - Biblioteca JavaScript
- [Vite](https://vitejs.dev/) - Build tool ultrarrápido
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Electron](https://www.electronjs.org/) - Framework para aplicações desktop

---

<div align="center">

**Feito com ❤️ e muito ☕**

Se este projeto foi útil, considere dar uma ⭐!

</div>
