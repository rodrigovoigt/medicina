$(document).ready(function() {
  function fetchDoencas(query = '') {
    $.get('https://xvencedor.pythonanywhere.com/doencas', function(data) {
      $('#disease-list').empty(); // Limpa a lista existente

      // Filtra as doenças com base na consulta
      const filteredDoencas = data.filter(doenca => doenca.doenca.toLowerCase().includes(query.toLowerCase()));

      // Ordena as doenças em ordem alfabética
      filteredDoencas.sort((a, b) => a.doenca.localeCompare(b.doenca));

      // Adiciona as doenças filtradas e ordenadas à lista
      filteredDoencas.forEach(function(doenca) {
        $('#disease-list').append(`
          <div class="list-group-item d-flex justify-content-between align-items-center doenca-item" 
               data-doenca="${encodeURIComponent(doenca.doenca)}">
            <span class="doenca-name">${doenca.doenca}</span>
            <button class="btn btn-sm btn-outline-danger delete-button" 
                    data-doenca="${encodeURIComponent(doenca.doenca)}" 
                    title="Excluir doença">
              <i class="bx bx-trash"></i>
            </button>
          </div>
        `);
      });
      
      // Adiciona event listeners
      addEventListeners();
    }).fail(function() {
      console.error('Erro ao buscar doenças');
      $('#disease-list').html(`
        <div class="list-group-item text-danger">
          <i class="bx bx-error me-2"></i>Erro ao carregar doenças
        </div>
      `);
    });
  }

  function fetchMedicacao(doenca) {
    $('.content-title').text(decodeURIComponent(doenca)); // Atualiza o título com o nome da doença
    $('.content-textarea').addClass('loading');
    
    $.get(`https://xvencedor.pythonanywhere.com/doencas/${encodeURIComponent(doenca)}`, function(data) {
      $('.content-textarea').val(data.medicacao).removeClass('loading'); // Atualiza a medicação na área de texto
    }).fail(function() {
      console.error('Erro ao buscar medicação');
      $('.content-textarea').val('Erro ao carregar medicação para esta doença.').removeClass('loading');
    });
  }

  function updateMedicacao(doenca, medicacao) {
    $.ajax({
      url: `https://xvencedor.pythonanywhere.com/doencas/${encodeURIComponent(doenca)}`,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ medicacao: medicacao }),
      success: function(response) {
        console.log('Medicação atualizada com sucesso');
        // Mostrar feedback visual
        $('.content-textarea').addClass('copied');
        setTimeout(() => $('.content-textarea').removeClass('copied'), 1000);
      },
      error: function() {
        console.error('Erro ao atualizar medicação');
        alert('Erro ao atualizar medicação. Tente novamente.');
      }
    });
  }

  function deleteDoenca(doenca) {
    if (confirm(`Tem certeza que deseja excluir a doença "${decodeURIComponent(doenca)}"?`)) {
      $.ajax({
        url: `https://xvencedor.pythonanywhere.com/doencas/${encodeURIComponent(doenca)}`,
        type: 'DELETE',
        success: function(response) {
          console.log('Doença deletada com sucesso');
          fetchDoencas($('#search-input').val());
          
          // Limpar área de conteúdo se a doença deletada estava sendo exibida
          if ($('.content-title').text() === decodeURIComponent(doenca)) {
            $('.content-title').text('Selecione uma doença');
            $('.content-textarea').val('Selecione uma doença da lista para ver as informações de prescrição...');
          }
        },
        error: function() {
          console.error('Erro ao deletar doença');
          alert('Erro ao excluir doença. Tente novamente.');
        }
      });
    }
  }

  function addDoenca(doenca, medicacao) {
    $.ajax({
      url: 'https://xvencedor.pythonanywhere.com/doencas',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ doenca: doenca, medicacao: medicacao }),
      success: function(response) {
        console.log('Doença adicionada com sucesso');
        fetchDoencas($('#search-input').val());
        $('#addModal').modal('hide');
        $('#add-form')[0].reset();
        
        // Selecionar a doença recém-adicionada
        setTimeout(() => {
          $(`.doenca-item[data-doenca="${encodeURIComponent(doenca)}"]`).click();
        }, 500);
      },
      error: function() {
        console.error('Erro ao adicionar doença');
        alert('Erro ao adicionar doença. Tente novamente.');
      }
    });
  }

  function addEventListeners() {
    // Click na doença
    $('.doenca-item').off('click').on('click', function() {
      const doenca = $(this).data('doenca');
      
      // Remove active de todos e adiciona ao clicado
      $('.doenca-item').removeClass('active');
      $(this).addClass('active');
      
      fetchMedicacao(doenca);
    });

    // Click no botão deletar
    $('.delete-button').off('click').on('click', function(e) {
      e.stopPropagation(); // Previne o click no item da lista
      const doenca = $(this).data('doenca');
      deleteDoenca(doenca);
    });
  }

  // Event listeners principais
  $('#add-form').on('submit', function(event) {
    event.preventDefault();
    const doenca = $('#doenca').val().trim();
    const medicacao = $('#medicacao').val().trim();
    
    if (doenca && medicacao) {
      addDoenca(doenca, medicacao);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  });

  // Busca em tempo real
  $('#search-input').on('input', function() {
    const query = $(this).val();
    fetchDoencas(query);
  });

  // Atualização automática da medicação quando editada
  let updateTimeout;
  $('.content-textarea').on('input', function() {
    const currentDoenca = $('.content-title').text();
    const medicacao = $(this).val();
    
    if (currentDoenca && currentDoenca !== 'Selecione uma doença') {
      clearTimeout(updateTimeout);
      updateTimeout = setTimeout(() => {
        updateMedicacao(encodeURIComponent(currentDoenca), medicacao);
      }, 1000); // Delay de 1 segundo após parar de digitar
    }
  });

  // Função para copiar texto
  $('.content-textarea').on('click', function() {
    if ($(this).val() && $(this).val() !== 'Selecione uma doença da lista para ver as informações de prescrição...') {
      $(this).select();
      document.execCommand('copy');
      
      // Feedback visual
      $(this).addClass('copied');
      setTimeout(() => $(this).removeClass('copied'), 1000);
    }
  });

  // Inicialização
  fetchDoencas();
});