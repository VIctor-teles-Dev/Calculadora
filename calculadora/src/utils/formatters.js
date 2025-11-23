// Transforma o número complexo numa string bonita pra exibir
// Exemplo: {re: 5, im: 2} vira "5 + 2i"
export function formatComplex(c) {
  // Arredonda pra não ficar mostrando 0.9999999999
const re = parseFloat(c.re.toFixed(10));
const im = parseFloat(c.im.toFixed(10));

if (im === 0) {
    return String(re);
}
if (re === 0) {
    return im === 1 ? "i" : im === -1 ? "-i" : `${im}i`;
}
if (im > 0) {
    return `${re} + ${im === 1 ? "i" : `${im}i`}`;
}
  // Parte imaginária negativa (troca + por -)
return `${re} - ${im === -1 ? "i" : `${-im}i`}`;
}
