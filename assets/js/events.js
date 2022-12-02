import { completaCampo } from './tratar-book.js';

export function gerarCommarea(bookGerado) {
  let commarea = '';
  bookGerado.forEach((linha) => {
    commarea += linha.valor;
  });

  return commarea;
}

////////////////////funcao eh chamada no evento .focus() do input (.book)//////////////////////
export function preencher(input, book) {
  let id = Number(input.parentNode.id);
  book.forEach((linha) => {
    if (linha.id === id) {
      $(input).attr('maxlength', linha.tamanho);
      linha.valor = completaCampo(
        linha.tipo,
        linha.tamanho,
        input.value
      ).toUpperCase();
      $(input).val(linha.valor);
    }
  });

  return book;
}
