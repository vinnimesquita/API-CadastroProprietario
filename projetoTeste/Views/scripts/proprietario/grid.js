$(document).ready(function() {
    listarGrid();
    listarTipoImovel2()
    $('#filtrarImovel').change(FiltrarImovel);
    $('#salvar').click(salvar);
});
 
function listarGrid(){
    $.get('https://localhost:5001/Proprietario/Listar')
        .done(function(resposta) { 
            for(i = 0; i < resposta.length; i++) {
                let dados = resposta[i];
                
                $('#grid').append($('<tr></tr>').attr('id', dados.id));
                $('#' + dados.id).append($('<td></td>').html(dados.id));
                $('#' + dados.id).append($('<td></td>').html(dados.nome));
                $('#' + dados.id).append($('<td></td>').html(dados.endereco));
                $('#' + dados.id).append($('<td></td>').html(dados.telefone));
                $('#' + dados.id).append($('<td></td>').html(dados.tipoimovel));
                $('#' + dados.id).append($('<td></td>').html('<button type=\"button\" onclick=\"visualizar('+ dados.id +')\">Visualizar</button><button type=\"button\" onclick=\"editar('+ dados.id +')\">Editar</button> <button type=\"button\" onclick=\"excluir('+ dados.id +')\">Excluir</button>'));
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
}

function FiltrarImovel(){
    var element = document.getElementById("filtrarImovel");
    var valueImovel = element.options[element.selectedIndex].value;
    var imovel = element.options[element.selectedIndex].text;

    if(valueImovel == 0){
        listarGrid();
    }

    else {
        $.get('https://localhost:5001/Proprietario/FiltrarImovel?tipoimovel='+imovel)
        .done(function(resposta) { 
            $('#grid tr').remove();
            for(i = 0; i < resposta.length; i++) {
                let dados = resposta[i];
                
                $('#grid').append($('<tr></tr>').attr('id', dados.id));
                
                $('#' + dados.id).append($('<td></td>').html(dados.id));
                $('#' + dados.id).append($('<td></td>').html(dados.nome));
                $('#' + dados.id).append($('<td></td>').html(dados.endereco));
                $('#' + dados.id).append($('<td></td>').html(dados.telefone));
                $('#' + dados.id).append($('<td></td>').html(dados.tipoimovel));
                $('#' + dados.id).append($('<td></td>').html('<button type=\"button\" onclick=\"visualizar('+ dados.id +')\">Visualizar</button><button type=\"button\" onclick=\"editar('+ dados.id +')\">Editar</button> <button type=\"button\" onclick=\"excluir('+ dados.id +')\">Excluir</button>'));
                
                
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
        erro = true;
    }
}

function listarTipoImovel2(){
    $.get('https://localhost:5001/Proprietario/Listar')
        .done(function(resposta) { 
            for(i = 0; i < resposta.length; i++) {
                $('#filtrarImovel').append($('<option></option>').val(resposta[i].id).html(resposta[i].tipoimovel));
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
}

function excluir(id) {
    $.ajax({
        type: 'DELETE',
        url: 'https://localhost:5001/Proprietario/Excluir',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(id),
        success: function(resposta) { 
            listarGrid();
            alert(resposta);
        },
        error: function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        }
    });
}

function visualizar(id) {
    $.get('https://localhost:5001/Proprietario/Visualizar?id='+id)
        .done(function(resposta) { 
            let visualizacao = resposta.id;
            visualizacao += '\n';
            visualizacao += resposta.nome;
            visualizacao += '\n';
            visualizacao += resposta.endereco;
            visualizacao += '\n';
            visualizacao += resposta.telefone;
            visualizacao += '\n';
            visualizacao += resposta.tipoimovel;
            alert(visualizacao);
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
}

function editar(id){
    $.get('https://localhost:5001/Proprietario/Visualizar?id='+id)
        .done(function(resposta) { 
            $('#id').val(resposta.id);
            $('#nome').val(resposta.nome);
            $('#endereco').val(resposta.endereco);
            $('#telefone').val(resposta.telefone);
            $('#imovel').val(resposta.tipoimovel);
            $('#salvar').html('Editar');
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
}

function salvar(){
    var nome = $('#nome').val();
    var endereco = $('#endereco').val();
    var telefone = $('#telefone').val();
    var tipoimovel = $('#imovel').val();

    var id;
    var url;
    var metodo;

    if ($('#salvar').html() == 'Editar'){
        id = $('#id').val();
        metodo = 'PUT';
        url = 'https://localhost:5001/Proprietario/Alterar';
    }
    else{
        id = 0;
        metodo = 'POST';
        url = 'https://localhost:5001/Proprietario/Cadastrar';
    }
    
    console.log(id);
    var proprietario = {
        id: parseInt(id),
        nome: nome,
        endereco: endereco,
        telefone: telefone,
        tipoimovel: tipoimovel
    };
    
    $.ajax({
        type: metodo,
        url: url,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(proprietario),
        success: function(resposta) { 
            listarGrid();

            $('#id').val(0);
            $('#nome').val('');
            $('#endereco').val('');
            $('#imovel').val(0);
            $('#salvar').html('Salvar')
            alert(resposta);
        },
        error: function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        }
    });
}
