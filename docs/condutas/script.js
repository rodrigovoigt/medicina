$(document).ready(function() {
  function fetchDoencas(query = '') {
    $.get('https://xvencedor.pythonanywhere.com/doencas', function(data) {
      $('.menu-links').empty(); // Limpa a lista existente

      // Filtra as doenças com base na consulta
      const filteredDoencas = data.filter(doenca => doenca.doenca.toLowerCase().includes(query.toLowerCase()));

      // Ordena as doenças em ordem alfabética
      filteredDoencas.sort((a, b) => a.doenca.localeCompare(b.doenca));

      // Adiciona as doenças filtradas e ordenadas à lista
      filteredDoencas.forEach(function(doenca) {
        $('.menu-links').append(`
          <li class="nav-link">
            <a href="#" class="doenca-link" data-doenca="${encodeURIComponent(doenca.doenca)}">
              <span class="text nav-text">${doenca.doenca}</span>
            </a>
            <button class="delete-button" data-doenca="${encodeURIComponent(doenca.doenca)}">
              <i class="bx bx-trash"></i> <!-- Ícone de lixeira -->
            </button>
          </li>
        `);
      });
    }).fail(function() {
      console.error('Erro ao buscar doenças');
    });
  }

  function fetchMedicacao(doenca) {
    $.get(`https://xvencedor.pythonanywhere.com/doencas/${encodeURIComponent(doenca)}`, function(data) {
      $('.content-title').text(decodeURIComponent(doenca)); // Atualiza o título com o nome da doença
      $('.content-textarea').val(data.medicacao); // Atualiza a medicação na área de texto
    }).fail(function() {
      console.error('Erro ao buscar medicação');
    });
  }

  function updateMedicacao(doenca, medicacao) {
    $.ajax({
      url: `https://xvencedor.pythonanywhere.com/doencas/${encodeURIComponent(doenca)}`, // Endpoint para atualizar a medicação
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ medicacao: medicacao }),
      success: function(response) {
        console.log('Medicação atualizada com sucesso');
      },
      error: function() {
        console.error('Erro ao atualizar medicação');
      }
    });
  }

  function deleteDoenca(doenca) {
    $.ajax({
      url: `https://xvencedor.pythonanywhere.com/doencas/${encodeURIComponent(doenca)}`, // Endpoint para deletar a doença
      type: 'DELETE',
      success: function(response) {
        console.log('Doença deletada com sucesso');
        fetchDoencas($('#search-input').val()); // Atualiza a lista de doenças após a exclusão
      },
      error: function() {
        console.error('Erro ao deletar doença');
      }
    });
  }

  function addDoenca(doenca, medicacao) {
    $.ajax({
      url: 'https://xvencedor.pythonanywhere.com/doencas',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ doenca: doenca, medicacao: medicacao }),
      success: function(response) {
        console.log('Doença adicionada com sucesso');
        fetchDoencas($('#search-input').val()); // Atualiza a lista de doenças após a adição
        closePopup(); // Fecha o popup após adicionar
      },
      error: function() {
        console.error('Erro ao adicionar doença');
      }
    });
  }

  // Mostrar o popup
  $('.adicionar-button').on('click', function() {
    $('#popup').show();
  });

  // Fechar o popup
  $('.close').on('click', function() {
    closePopup();
  });

  function closePopup() {
    $('#popup').hide();
    $('#add-form')[0].reset(); // Limpa o formulário
  }

  // Adicionar a doença ao banco de dados
  $('#add-form').on('submit', function(event) {
    event.preventDefault();
    var doenca = $('#doenca').val();
    var medicacao = $('#medicacao').val();
    addDoenca(doenca, medicacao);
  });

  // Chama a função ao carregar a página
  fetchDoencas(); // Carrega todas as doenças inicialmente

  // Adiciona um evento de input ao campo de pesquisa
  $('#search-input').on('input', function() {
    var query = $(this).val();
    fetchDoencas(query); // Atualiza a lista de doenças com base na pesquisa
  });

  // Adiciona um evento de clique aos links de doenças
  $(document).on('click', '.doenca-link', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do link
    var doenca = decodeURIComponent($(this).data('doenca')); // Decodifica o nome da doença
    fetchMedicacao(doenca); // Busca a medicação correspondente
  });

  // Adiciona um evento de input para atualizar a medicação em tempo real
  $('.content-textarea').on('input', function() {
    var doenca = $('.content-title').text(); // Obtém o nome da doença atual
    var medicacao = $(this).val(); // Obtém o conteúdo do textarea
    if (doenca) {
      updateMedicacao(doenca, medicacao); // Atualiza a medicação no banco de dados
    }
  });

  // Adiciona um evento de clique ao ícone de lixeira
  $(document).on('click', '.delete-button', function() {
    var doenca = decodeURIComponent($(this).data('doenca')); // Decodifica o nome da doença
    if (confirm('Você tem certeza que deseja excluir esta doença?')) { // Confirma a exclusão
      deleteDoenca(doenca); // Deleta a doença do banco de dados
    }
  });
});