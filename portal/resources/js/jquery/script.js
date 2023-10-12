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
        adicionarProduto();
    });

    $(document).on('click', '.calcular-valor-total', function () {
        var row = $(this).closest('tr');
        calcularValorTotal(row);
    });

    $(document).on('click', '.remover-produto', function () {
        var row = $(this).closest('tr');
        removerProduto(row);
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
        "<td><button type='button' class='remover-produto'>Remover Produto</button></td>" +
        "</tr>";

    $('#tabelaProdutos').append(novaLinha);
}

// Função para calcular o valor total
function calcularValorTotal(row) {
    var quantidade = parseFloat(row.find('.produto-und-medida').val());
    var valorUnitario = parseFloat(row.find('.produto-valor').val());
    var total = quantidade * valorUnitario;

    // Atualiza o valor total na tabela
    row.find('.valor-total').text(total.toFixed(2));
}

$(document).on('click', '.calcular-valor-total', function () {
    var row = $(this).closest('tr');
    calcularValorTotal(row);
});

// Função para remover a linha do produto
function removerProduto(row) {
    row.remove();
}

// Adiciona evento de clique para calcular o valor total ao clicar no botão
var botoesCalcularValorTotal = document.querySelectorAll('.calcular-valor-total');
botoesCalcularValorTotal.forEach(function (botao) {
    botao.addEventListener('click', function () {
        calcularValorTotal($(this).closest('.produto'));
    });
});


function removerLinha(index) {
    $('#tabelaProdutos tr').eq(index).remove();
}

var contadorProduto = 1; 

// Função para adicionar um produto
function adicionarProduto() {

    var novoProduto = "<tr class='produto'>" +
        "<td>Novo Produto</td>" +
        "<td><input type='text' class='produto-nome' name='novoProduto" + contadorProduto + "' required></td>" +
        "<td>UND. Medida</td>" +
        "<td><input type='number' class='produto-und-medida' name='novoUndMedida" + contadorProduto + "' required></td>" +
        "<td>QDTDE. em Estoque</td>" +
        "<td><input type='text' class='produto-estoque' name='novoEstoque" + contadorProduto + "' required></td>" +
        "<td>Valor Unitário</td>" +
        "<td><input type='text' class='produto-valor' name='novoValor" + contadorProduto + "' required></td>" +
        "<td class='valor-total'>0</td>" +
        "<td><button type='button' class='calcular-valor-total'>Calcular Valor Total</button></td>" +
        "<td><span class='remover-produto' onclick='removerProduto(this)'>🗑️</span></td>" +
        "</tr>";

    $('#tabelaProdutos').append(novoProduto);


    contadorProduto++;
}


// Função para remover um produto
function removerProduto(element) {
    $(element).closest('tr').remove();
}


$('.adicionar-produto').on('click', function () {
    adicionarProduto();
});

// Evento de clique para calcular o valor total ao clicar no botão
$('#tabelaProdutos').on('click', '.calcular-valor-total', function () {
    calcularValorTotal($(this).closest('.produto'));
});

// Função para calcular o valor total
function calcularValorTotal(row) {
    var quantidade = parseFloat(row.find('.produto-und-medida').val());
    var valorUnitario = parseFloat(row.find('.produto-valor').val());
    var total = quantidade * valorUnitario;


    row.find('.valor-total').text(total.toFixed(2));
}

// Função para enviar os dados
function enviarDados() {
    alert("Salvo!");

    // Limpar campos após envio
    $('.produto-nome, .produto-und-medida, .produto-estoque, .produto-valor').val('');
    $('input[type=file]').val('');
}
 
 var contadorDocumentos = 1;

 // Função para adicionar um novo campo de documento
 function adicionarAnexo() {
     contadorDocumentos++;

     var novaLinha = `<tr class="anexo">
                         <td>Documento - ${contadorDocumentos}</td>
                         <td><input type="file" name="documento${contadorDocumentos}" id="documento${contadorDocumentos}" required></td>
                         <td><button type="button" onclick="excluirDocumento(${contadorDocumentos})">Excluir</button></td>
                         <td><button type="button" onclick="visualizarDocumento(${contadorDocumentos})">Visualizar</button></td>
                     </tr>`;

     $('#tabelaAnexos').append(novaLinha);
 }

 // Função para excluir documento
 function excluirDocumento(numeroDocumento) {
   $(`#documento${numeroDocumento}`).closest('tr').remove();
 }

 // Função para visualizar documento
 function visualizarDocumento(numeroDocumento) {
     var input = document.getElementById(`documento${numeroDocumento}`);

     if (input.files && input.files[0]) {
         alert(`Visualizando Documento - ${numeroDocumento}`);
     }
 }

 $('.adicionar-anexo').on('click', function () {
     adicionarAnexo();
 });
