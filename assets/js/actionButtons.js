import { tratarBook } from './tratar-book.js';
import { carregarCamposTela } from './gerar-campos.js';
import { preencher, gerarCommarea } from './events.js';

let bookGerado = [];

$(document).ready(() => {
  //Botao Carregar - Gera campos automaticamente de acordo com o book
  $('.bt-carregar-book').click(function () {
    if (!$('.txt-colar-book').val()) return;
    bookGerado = tratarBook($('.txt-colar-book').val());

    carregarCamposTela(bookGerado);
    mostrarConteudo();
    scrollPage('.secao-campos-gerados');

    $('.book').focus(function () {
      $(this).select();
      bookGerado = preencher(this, bookGerado);
    });

    $('.book').blur(function () {
      bookGerado = preencher(this, bookGerado);
    });

    //Botao Fechar (X) - Remove linha inteira do botao clicado
    $('.fechar').click(function () {
      $(this.parentNode).remove();
    });
  });
  //Botao Add - Adicionar campos manualmente
  $('.adicionar').click(function () {
    // validar se o campo está vazio
    if (!$('#qtidade').val()) {
      return;
    }

    mostrarConteudo();

    var i = parseInt($('#qtidade').val());
    while (i > 0) {
      $('.secao-campos-gerados-detalhe').append(
        '<div id=' +
          contCampo +
          ' class="campo"><input type="text" class="titulo" value="Campo ' +
          contCampo +
          '"> PIC <select class="select"><option></option><option value="X"> X </option><option value="9"> 9 </option></select>(<input class="tamanho" type="text">) VALUE <input onfocus="preencher(this); $(this).select();" onblur="preencher(this)" class="book" type="text"><span class="fechar" title="remover" onclick="fechar(this)">X</span></div>'
      );
      contCampo++;
      i--;
    }

    scrollPage('.secao-campos-gerados');
  });
  //Botao Gerar Commarea - Gerar string de commarea
  $('.bt-gerar-commarea').click(function () {
    let commarea = gerarCommarea(bookGerado);
    $('#recebe').val(commarea);
    $('#carac').html(commarea.length);
    scrollPage('.resultado');
    $('#recebe').focus();
    $('#recebe').select();
    navigator.clipboard.writeText(commarea);
    $('#myModal').fadeIn(500);
    $('#myModal').delay(1000);
    $('#myModal').fadeOut(1000);
    //aviso de limite de COMAREA
    if (commarea.length > 20480) {
      alert(
        'ATENÇÃO!\nA quantidade de bytes ultrapassou o limite 20KB!\nÉ possível que seus teste CICS de problema. '
      );
    }
  });
  //Botao Limpar Campos - Limpa o conteudo de todos os campos da tela
  $('.bt-limpar-campos').click(function () {
    $('#qtidade').val('');
    $('#recebe').val('');
    $('.book').val('');
    $('#carac').html('0');
  });
  //Botao Reset - Reseta toda a tela, inclusive os campos carregados dinamicamente
  $('.bt-reset').click(function () {
    $('.txt-colar-book').val('');
    $('#qtidade').val('');
    $('#recebe').val('');
    $('.campo').remove();
    $('#carac').html('0');
    scrollPage('.header');
  });
  //Botao Revalidar - Verifica se a Commarea está de acordo com os campos declarados no book
  $('.revalidar-commarea').click(function () {
    var massa = $('#recebe').val();
    var contC = parseInt($('.secao-campos-gerados-detalhe').children().length);

    for (var x = 1; x <= contC; x++) {
      var tam = parseInt($('#' + x + ' .tamanho').val());
      var valor = massa.substr(0, tam);
      massa = massa.substr(tam, massa.length);
      $('#' + x + ' .book').val(valor);
    }

    scrollPage('.secao-campos-gerados');
  });
});

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
