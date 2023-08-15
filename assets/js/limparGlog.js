import { readFile } from 'fs';
import { ebcdicTable } from './EBCDICTable.js';

readFile('glog.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  tratarArea(data);
});

function tratarArea(area) {
  // const area = document.getElementById(recebe).value;
  const novaArea = area.split('\n');
  let texto = '';

  novaArea.forEach((linha) => {
    const arrtextoSemNumeroDaLinha = linha.split(':');
    const textoSemNumeroDaLinha = arrtextoSemNumeroDaLinha[1].trim();
    texto += formatarValores(textoSemNumeroDaLinha);
  });

  console.log(texto);
}

function formatarValores(linhaDoLog) {
  let arrValoresSeparados = linhaDoLog.split(' ');
  let conteudoFormatado = '';
  arrValoresSeparados.forEach((h, i) => {
    if (i < 20 && h.length == 2) {
      const letra = ebcdicTable.find(({ hex }) => hex === h);
      conteudoFormatado += letra.ebcdic;
    }
  });
  return conteudoFormatado;
}
