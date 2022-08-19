$(document).ready(() => {
  //Funçao para exibir o modal de doação/ajuda
  $(".menu__item").click(function () {
    const itemClicado = $(this).text();

    itemClicado === "DOAR"
      ? $(".modal-doar").fadeIn()
      : $(".modal-ajuda").fadeIn();
  });

  //Funçao para fechar o modal de doação/ajuda
  $(".fechar-modal").click(function () {
    $(this).parent().parent().parent().fadeOut();
  });
});
