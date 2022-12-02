export function carregarCamposTela(bookGerado) {
  bookGerado.forEach((campo) => {
    let campoGerado = `<div id="${campo.id}" class="campo">`;
    campoGerado += `<input type="text" class="titulo" value="${campo.nivel} ${campo.nome}" />PIC`;
    campoGerado += `<select class="select"><option></option>`;
    campoGerado +=
      campo.tipo === 'X'
        ? `<option selected="selected" value="X"> X </option>`
        : `<option value="X"> X </option>`;
    campoGerado +=
      campo.tipo === '9'
        ? `<option selected="selected" value="9"> 9 </option>`
        : `<option value="9"> 9 </option>`;
    campoGerado += `</select> ( <input class="tamanho" type="text" value="${campo.tamanho}" /> ) VALUE`;
    campoGerado += `<input class="book" type="text" value="${campo.valor}" />`;
    campoGerado += `<span class="fechar" title="Remover campo.">X</span></div>`;

    $('.secao-campos-gerados-detalhe').append(campoGerado);
  });
}
