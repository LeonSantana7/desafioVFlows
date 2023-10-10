// Buscar o endereço pelo cep
// Evento blur é disparado quando um determinado elemento perde o foco
$('#cep').blur(function () {
    var cep = this.value;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(dados => {
            $('#endereco').val(dados.logradouro);
            $('#numero').val(dados.numero);
            $('#complemento').val(dados.complemento);
            $('#bairro').val(dados.bairro);
            $('#municipio').val(dados.localidade);
            $('#estado').val(dados.uf);
        })
        .catch(error => {
            alert('CEP não encontrado.');
        });
})

// Tabela Produto

$(document).ready(function () {

    $('.adicionar-produto').click(function () {
        adicionarLinha();
    });

   
    $(document).on('click', '.calcular-valor-total', function () {
        var index = $(this).closest('tr').index() + 1;
        calcularValorTotal(index);
    });


    $(document).on('click', '.remover-linha', function () {
        var index = $(this).closest('tr').index() + 1;
        removerLinha(index);
    });


    $('.adicionar-anexo').click(function () {
        adicionarAnexo();
    });

 
    $('.enviar-dados').click(function () {
        enviarDados();
    });
});


function adicionarLinha() {

    var novaLinha = "<tr class='produto'>" +
        "<td>Novo Produto</td>" +
        "<td><input type='text' class='produto-nome' name='novoProduto' required></td>" +
        "<td>UND. Medida</td>" +
        "<td><input type='number' class='produto-und-medida' name='novoUndMedida' required></td>" +
        "<td>QDTDE. em Estoque</td>" +
        "<td><input type='number' class='produto-estoque' name='novoEstoque' required></td>" +
        "<td>Valor Unitário</td>" +
        "<td><input type='text' class='produto-valor' name='novoValor' required></td>" +
        "<td><button type='button' class='calcular-valor-total'>Calcular Valor Total</button></td>" +
        "<td><button type='button' class='remover-linha'>Remover Produto</button></td>" +
        "</tr>";

    $('#tabelaProdutos').append(novaLinha);
}


function calcularValorTotal(index) {

    var quantidade = parseFloat($('#tabelaProdutos tr').eq(index).find('.produto-und-medida').val()) || 0;
    var valorUnitario = parseFloat($('#tabelaProdutos tr').eq(index).find('.produto-valor').val().replace(',', '.')) || 0;


    var valorTotal = quantidade * valorUnitario;

  
    $('#tabelaProdutos tr').eq(index).find('.produto-valor-total').val('R$ ' + valorTotal.toFixed(2));
}


function removerLinha(index) {
   
    $('#tabelaProdutos tr').eq(index).remove();
}

// Função para adicionar um anexo
function adicionarAnexo() {
    // Criar uma nova linha na tabela de anexos
    var novoAnexo = "<tr class='anexo'>" +
        "<td>Novo Anexo</td>" +
        "<td><input type='file' name='novoAnexo' required></td>" +
        "<td><button type='button' class='remover-anexo'>Remover</button></td>" +
        "<td><button type='button' class='visualizar-anexo'>Visualizar</button></td>" +
        "</tr>";

    $('#tabelaAnexos').append(novoAnexo);
}

// Função para enviar os dados
function enviarDados() {
    // Implemente a lógica para enviar os dados
    alert("Implemente a lógica para enviar os dados.");

    // Limpar campos após envio
    $('.produto-nome, .produto-und-medida, .produto-estoque, .produto-valor').val('');
    $('input[type=file]').val('');
}

// Evento para remover um anexo
$(document).on('click', '.remover-anexo', function () {
    $(this).closest('tr').remove();
});

// Evento para visualizar um anexo (Você precisa implementar esta lógica)
$(document).on('click', '.visualizar-anexo', function () {
    alert("Implemente a lógica para visualizar o anexo.");
});