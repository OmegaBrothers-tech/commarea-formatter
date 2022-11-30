import { tratarBook } from './tratar-book.js';

$(document).ready(() => {
  $('.bt-carregar-book').click(function () {
    if (!$('.txt-colar-book').val()) return;
    const bookGerado = tratarBook($('.txt-colar-book').val());
    console.log(bookGerado);
    //Funcão que monta os campos na tela:
    carregarCamposTela(bookGerado);
    mostrarConteudo();
    scrollPage('.secao-campos-gerados');
  });

  ////Limpa todos os campos da tela ----////////////////////////////////////////////////////////
  $('.bt-limpar-campos').click(function () {
    $('#qtidade').val('');
    $('#recebe').val('');
    $('.book').val('');
    $('#carac').html('0');
  });
  ////Reseta toda a tela//////////////////////////////////////////////////////////
  $('.bt-reset').click(function () {
    $('.txt-colar-book').val('');
    $('#qtidade').val('');
    $('#recebe').val('');
    $('.campo').remove();
    $('#carac').html('0');
    scrollPage('.header');
  });
  //////////////////////////////////////////////////////////////////////////////////////////////
});

////FUNCOES AUXILIARES////////////////////////////////////////////////////////////
/////Exibe as seçoes da pagina onde serão carregados os campos do book.///////////
function mostrarConteudo() {
  $('.secao-campos-gerados-detalhe').slideDown();
  $('.resultado ').slideDown();
  $('.botoes-controle-commarea').css('display', 'flex');
}

/////Funcao para scrollar a tela para uma secao especifica ao click de um botao//
function scrollPage(onde) {
  const praOndeVou =
    onde == '.resultado'
      ? $('.resultado').offset().top -
        ($('.botoes-controle-commarea').height() + $('.resultado').height())
      : $(onde).offset().top;

  $([document.documentElement, document.body]).animate(
    {
      scrollTop: praOndeVou,
    },
    1000
  );
}

function carregarCamposTela(bookGerado) {
  //parei aqui
}
