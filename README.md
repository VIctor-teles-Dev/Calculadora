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
- **Números Complexos**: Suporte completo para operações com números imaginários usando a biblioteca [complex.js](https://github.com/infusion/Complex.js)
- **Comparação Simbólica**: Verifica se duas expressões são matematicamente equivalentes
- **Histórico de Cálculos**: Mantém os últimos 10 cálculos realizados

---

## 📸 ScreenShot

![Amostra da Calculadora](https://res.cloudinary.com/dw0qtsos5/image/upload/v1763833722/amostra_calculadora_rvkwuj.png)

## ✨ Funcionalidades

### 🔢 Operações Básicas

- ➕ Adição, ➖ Subtração, ✖️ Multiplicação, ➗ Divisão
- 📊 Porcentagem (%)
- 🔢 Suporte a números decimais

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

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia      | Versão | Descrição                                       |
| --------------- | ------ | ----------------------------------------------- |
| **React**       | 19.2.0 | Biblioteca para construção da interface         |
| **Vite**        | 7.2.2  | Build tool e servidor de desenvolvimento        |
| **TailwindCSS** | 4.1.17 | Framework CSS para estilização                  |
| **Electron**    | 39.2.0 | Framework para aplicação desktop                |
| **Complex.js**  | 2.1.1  | Biblioteca para operações com números complexos |
| **ESLint**      | 9.39.1 | Linter para qualidade de código                 |

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

### 🎮 Controles

| Botão         | Função                                  |
| ------------- | --------------------------------------- |
| **C**         | Limpa toda a expressão                  |
| **DEL** (⌫)   | Apaga o último caractere                |
| **=**         | Calcula a expressão                     |
| **equal**     | Compara duas expressões simbolicamente  |
| **Histórico** | Abre o modal com os últimos 10 cálculos |

### ⌨️ Atalhos de Teclado

Você também pode usar o teclado para operar a calculadora. Abaixo está o mapeamento das teclas suportadas (case-insensitive quando aplicável):

| Tecla(s)          | Função / Equivalente no Numpad                        |
| ----------------- | ----------------------------------------------------- |
| 0–9               | Insere o dígito correspondente                        |
| . (ponto)         | Separador decimal                                     |
| +, -, \*, /       | Operadores aritméticos (+, -, ×, ÷)                   |
| x ou X            | Multiplicação (equivalente a `*`)                     |
| ^                 | Potenciação                                           |
| %                 | Porcentagem                                           |
| ( , )             | Parênteses                                            |
| i                 | Unidade imaginária (insere `i`)                       |
| s ou S            | Raiz quadrada (equivalente a `√`)                     |
| Enter ou =        | Executa o cálculo (equivalente ao botão `=`)          |
| c ou C, Escape    | Limpa toda a expressão (equivalente ao botão `C`)     |
| Backspace, Delete | Apaga o último caractere (equivalente ao botão `DEL`) |

Notas:

- As teclas relacionadas a operadores (por exemplo `+`, `-`, `*`, `/`, `^`, `%`) são mapeadas diretamente para os mesmos símbolos na expressão.
- As teclas de atalho são tratadas de forma sensível aos contextos da aplicação — por exemplo, `Enter` avalia a expressão atual, `Backspace` remove o último caractere.
- As teclas alfabéticas indicadas (`c`, `s`, `x`) funcionam indiferentemente entre maiúsculas e minúsculas.

---

## 📁 Estrutura do Projeto

```
calculadora/
├── electron/              # Configuração do Electron
│   └── main.cjs          # Processo principal do Electron
├── public/               # Arquivos públicos estáticos
├── src/                  # Código fonte
│   ├── assets/          # Imagens e recursos visuais
│   ├── App.jsx          # Componente principal da calculadora
│   ├── index.css        # Estilos globais
│   └── main.jsx         # Ponto de entrada do React
├── .gitignore
├── eslint.config.js     # Configuração do ESLint
├── index.html           # HTML base
├── package.json         # Dependências e scripts
├── README.md            # Este arquivo
└── vite.config.js       # Configuração do Vite
```

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

- [Complex.js](https://github.com/infusion/Complex.js) - Biblioteca para operações com números complexos
- [React](https://react.dev/) - Framework JavaScript
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS

---

<div align="center">

**Feito com ❤️ e muito ☕**

Se este projeto foi útil, considere dar uma ⭐!

</div>
