function desmembrarElementos(linhaBookTratada) {
  const campoBook = {};

  let [nivelENome, tipoETamanho] = linhaBookTratada.split('PIC'); //Divide a string em dois usando PIC como separador
  nivelENome = nivelENome.trim(); //Remover espaços antes e depois de cada item no array

  //Regex pra adicionar um * entre o nivel e o nome. Logo depois dividir em um array de 2 posiçoes usando o * adicionado como separador.
  let [nivel, nome] = nivelENome.replace(/\s{1}/, '*').split('*');

  campoBook.nivel = Number(nivel.trim());
  campoBook.nome = nome.trim();
  campoBook.tipo = tipoETamanho.replace('S', '').trim().substr(0, 1);
  campoBook.tamanho = calcularTamanho(tipoETamanho.replace('S', '').trim());
  campoBook.valor = gerarValor(campoBook.tipo, campoBook.tamanho, tipoETamanho);

  return campoBook;
}

function calcularTamanho(tam) {
  let strPosV = ' ';
  let strAntV = ' ';

  let size = 0;
  let direita = 0;
  let esquerda = 0;
  let temVirgula = 0;

  //*****************************************************************
  //***                TRTAR CAMPO COM VIRGULA                   ****
  //*****************************************************************
  if (tam.indexOf('V9') >= 0) {
    temVirgula = 1;
    strAntV = tam.substr(0, tam.indexOf('V'));
    strPosV = tam.substr(
      parseInt(tam.indexOf('V')) + 1,
      tam.length - parseInt(tam.indexOf('V'))
    );

    //**************************************************************
    // ESQUERDA
    if (strAntV[1].indexOf('(') >= 0) {
      esquerda = strAntV.substr(2, strAntV.indexOf(')') - 2);
      while (esquerda.startsWith('0')) {
        esquerda = esquerda.replace('0', '');
      }
    } else
      switch (strAntV) {
        case '999999999999999999':
          esquerda = 18;
          break;
        case '99999999999999999':
          esquerda = 17;
          break;
        case '9999999999999999':
          esquerda = 16;
          break;
        case '999999999999999':
          esquerda = 15;
          break;
        case '99999999999999':
          esquerda = 14;
          break;
        case '9999999999999':
          esquerda = 13;
          break;
        case '999999999999':
          esquerda = 12;
          break;
        case '99999999999':
          esquerda = 11;
          break;
        case '9999999999':
          esquerda = 10;
          break;
        case '999999999':
          esquerda = 9;
          break;
        case '99999999':
          esquerda = 8;
          break;
        case '9999999':
          esquerda = 7;
          break;
        case '999999':
          esquerda = 6;
          break;
        case '99999':
          esquerda = 5;
          break;
        case '9999':
          esquerda = 4;
          break;
        case '999':
          esquerda = 3;
          break;
        case '99':
          esquerda = 2;
          break;
        case '9':
          esquerda = 1;
          break;
      }

    // DIREITA
    if (strPosV[1].indexOf('(') >= 0) {
      direita = strPosV.substr(2, strPosV.indexOf(')') - 2);
      while (direita.startsWith('0')) {
        direita = direita.replace('0', '');
      }
    } else
      switch (strPosV) {
        case '999999999999999999':
          direita = 18;
          break;
        case '99999999999999999':
          direita = 17;
          break;
        case '9999999999999999':
          direita = 16;
          break;
        case '999999999999999':
          direita = 15;
          break;
        case '99999999999999':
          direita = 14;
          break;
        case '9999999999999':
          direita = 13;
          break;
        case '999999999999':
          direita = 12;
          break;
        case '99999999999':
          direita = 11;
          break;
        case '9999999999':
          direita = 10;
          break;
        case '999999999':
          direita = 9;
          break;
        case '99999999':
          direita = 8;
          break;
        case '9999999':
          direita = 7;
          break;
        case '999999':
          direita = 6;
          break;
        case '99999':
          direita = 5;
          break;
        case '9999':
          direita = 4;
          break;
        case '999':
          direita = 3;
          break;
        case '99':
          direita = 2;
          break;
        case '9':
          direita = 1;
          break;
      }

    size = parseInt(direita) + parseInt(esquerda);
  } else {
    size = tam.substr(2, tam.indexOf(')') - 2);
    //eliminar zeros a esquerda
    while (size.startsWith('0')) {
      size = size.replace('0', '');
    }
  }

  return (size = parseInt(size));
}

/////Preenche o input de acordo com o tipo do campo (X, 9)/////////////////
function gerarValor(pic, tamanho, value) {
  let valueDoCampo = '';
  if (value.indexOf('VALUE') > 0) {
    if (pic == 'X') {
      valueDoCampo = value.substr(value.indexOf("'") + 1, tamanho);
    }
    if (pic == '9') {
      let valorPego = value.split('VALUE')[1].trim();
      valueDoCampo = valorPego.substr(0, tamanho);
    }
  }
  return completaCampo(pic, tamanho, valueDoCampo);
}
/////Preenche o input de acordo com o tipo do campo (X, 9)/////////////////
export function completaCampo(tipo, tamanho, valor) {
  if (tipo === 'X') {
    var tam = tamanho - valor.length;
    while (tam > 0) {
      valor = valor + ' ';
      tam--;
    }
  } else if (tipo === '9') {
    var tam = tamanho - valor.length;
    while (tam > 0) {
      valor = '0' + valor;
      tam--;
    }
  }
  return valor;
}
//tratar cada linha do book, mantendo somente as informacoes
//necessarias para gerar os valores da massa.
export function tratarBook(dados, ultimoId) {
  const bookGerado = [];
  const book = dados.split('.'); // cria um array com as linhas do book, as separando pelo ponto, que no COBOL indica fim de comando

  book.forEach((linhaBookSemTratamento, indice) => {
    linhaBookSemTratamento = $.trim(linhaBookSemTratamento).toUpperCase(); //remove espaços no inicio e no fim da string e converte todas a letras para maiusculo

    if (
      !linhaBookSemTratamento.startsWith('*') &&
      linhaBookSemTratamento.indexOf('PIC') !== -1
    ) {
      let linhaTratada = desmembrarElementos(linhaBookSemTratamento);
      linhaTratada.id = indice + ultimoId;
      bookGerado.push(linhaTratada);
    }
  });

  return bookGerado;
}
