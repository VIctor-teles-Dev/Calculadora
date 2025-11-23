// Implementação própria de números complexos sem usar bibliotecas externas
// A ideia aqui é criar nossa própria classe para trabalhar com números da forma a + bi
class Complex {
constructor(real = 0, imaginary = 0) {
    this.re = real;
    this.im = imaginary;
}

  // Retorna a unidade imaginária 'i', que é basicamente 0 + 1i
static get I() {
    return new Complex(0, 1);
}

  // Soma dois números complexos: só somar as partes reais e imaginárias separadamente
add(other) {
    return new Complex(this.re + other.re, this.im + other.im);
}

  // Subtração funciona parecido com a soma, mas subtraindo
sub(other) {
    return new Complex(this.re - other.re, this.im - other.im);
}

  // Multiplicação de complexos usa a distributiva e lembra que i² = -1
mul(other) {
    const real = this.re * other.re - this.im * other.im;
    const imag = this.re * other.im + this.im * other.re;
    return new Complex(real, imag);
}

  // Divisão é mais chata: precisa multiplicar pelo conjugado do denominador
  // Isso elimina o 'i' do denominador pra facilitar a conta
div(other) {
    const denominator = other.re * other.re + other.im * other.im;
    if (denominator === 0) {
    throw new Error("Divisão por zero");
    }
    const real = (this.re * other.re + this.im * other.im) / denominator;
    const imag = (this.im * other.re - this.re * other.im) / denominator;
    return new Complex(real, imag);
}

  // Conjugado é só trocar o sinal da parte imaginária
conjugate() {
    return new Complex(this.re, -this.im);
}

  // Módulo é tipo o "tamanho" do número complexo (teorema de Pitágoras)
abs() {
    return Math.sqrt(this.re * this.re + this.im * this.im);
}

  // Argumento é o ângulo que o número faz no plano complexo
arg() {
    return Math.atan2(this.im, this.re);
}

  // Raiz quadrada usando forma polar (converte pra polar, tira a raiz, volta pro formato retangular)
sqrt() {
    const r = this.abs();
    const theta = this.arg();
    const newR = Math.sqrt(r);
    const newTheta = theta / 2;
    return new Complex(newR * Math.cos(newTheta), newR * Math.sin(newTheta));
}

  // Potenciação: se for expoente inteiro pequeno, multiplica várias vezes
  // Se for expoente grande ou decimal, usa forma polar que é mais eficiente
pow(exponent) {
    // Se vier um número complexo como expoente, pega só a parte real
    const n = exponent instanceof Complex ? exponent.re : exponent;

    // Qualquer coisa elevada a zero é 1
    if (n === 0) {
    return new Complex(1, 0);
    }

    // Zero elevado a qualquer coisa é zero
    if (this.re === 0 && this.im === 0) {
    return new Complex(0, 0);
    }

    // Se for expoente inteiro positivo pequeno, é mais rápido multiplicar direto
    if (Number.isInteger(n) && n > 0 && n < 100) {
    let result = new Complex(1, 0);
    for (let i = 0; i < n; i++) {
        result = result.mul(this);
    }
    return result;
    }

    // Expoente negativo: calcula o positivo e depois faz 1/resultado
    if (Number.isInteger(n) && n < 0 && n > -100) {
    let result = new Complex(1, 0);
    for (let i = 0; i < -n; i++) {
        result = result.mul(this);
    }
    return new Complex(1, 0).div(result);
    }

    // Pra outros casos (decimais, expoentes grandes), forma polar é melhor
    const r = this.abs();
    const theta = this.arg();
    const newR = Math.pow(r, n);
    const newTheta = theta * n;
    return new Complex(newR * Math.cos(newTheta), newR * Math.sin(newTheta));
}
}

export default Complex;
