$(document).ready(function() {
    listarTipoImovel();
});
 
function listarTipoImovel(){
    $.get('https://localhost:5001/Proprietario/Listar')
        .done(function(resposta) { 
            for(i = 0; i < resposta.length; i++) {
                $('#imovel').append($('<option></option>').val(resposta[i].id).html(resposta[i].tipoimovel));
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
}

