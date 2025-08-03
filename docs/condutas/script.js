$(document).ready(function() {
  let currentDoencaData = null; // Armazena dados da doença atual
  let editMode = false; // Controla se está em modo edição

  function fetchDoencas(query = '') {
    $.get('https://xvencedor.pythonanywhere.com/doencas', function(data) {
      $('#disease-list').empty();

      // NÃO filtra aqui - deixa o applyFilters() fazer isso
      // Apenas ordena as doenças em ordem alfabética (pelo nome sem prefixo)
      const sortedDoencas = data.sort((a, b) => {
        const nameA = removePasswordPrefix(a.doenca).toLowerCase();
        const nameB = removePasswordPrefix(b.doenca).toLowerCase();
        return nameA.localeCompare(nameB);
      });

      // Adiciona as doenças ordenadas à lista (SEM filtrar)
      if (sortedDoencas.length === 0) {
        $('#disease-list').append(`
          <div class="list-group-item text-muted text-center">
            <i class="bx bx-info-circle me-2"></i>Nenhuma doença encontrada
          </div>
        `);
      } else {
        sortedDoencas.forEach(function(doenca) {
          const displayName = removePasswordPrefix(doenca.doenca);
          const doencaPassword = extractPasswordFromName(doenca.doenca);
          const canEdit = canUserEdit(doenca.doenca);
          
          // Ícone para mostrar status (sem revelar quem criou)
          let icon = '';
          let badgeClass = '';
          let badgeText = '';
          
          if (doencaPassword) {
            if (canEdit) {
              icon = '<i class="bx bx-edit text-success me-2" title="Você pode editar"></i>';
              badgeClass = 'bg-success';
              badgeText = 'Editável';
            } else {
              icon = '<i class="bx bx-lock text-warning me-2" title="Somente leitura"></i>';
              badgeClass = 'bg-warning text-dark';
              badgeText = 'Protegido';
            }
          } else {
            icon = '<i class="bx bx-archive text-secondary me-2" title="Item original"></i>';
            badgeClass = 'bg-secondary';
            badgeText = 'Original';
          }
          
          $('#disease-list').append(`
            <div class="list-group-item d-flex justify-content-between align-items-center doenca-item" 
                 data-doenca="${encodeURIComponent(doenca.doenca)}"
                 data-can-edit="${canEdit}">
              <div class="d-flex align-items-center flex-grow-1">
                ${icon}
                <span class="doenca-name flex-grow-1">${displayName}</span>
                <span class="badge ${badgeClass} ms-2">${badgeText}</span>
              </div>
            </div>
          `);
        });
      }
      
      addEventListeners();
      
      // Aplica filtros após carregar a lista
      setTimeout(() => {
        if (typeof applyFilters === 'function') {
          applyFilters();
        }
      }, 200);
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
    const displayName = removePasswordPrefix(decodeURIComponent(doenca));
    const canEdit = canUserEdit(decodeURIComponent(doenca));
    
    // Armazena dados da doença atual
    currentDoencaData = {
      fullName: decodeURIComponent(doenca),
      displayName: displayName,
      canEdit: canEdit
    };
    
    $('.content-title').text(displayName);
    $('.content-textarea').addClass('loading');
    
    $.get(`https://xvencedor.pythonanywhere.com/doencas/${encodeURIComponent(doenca)}`, function(data) {
      $('.content-textarea').val(data.medicacao).removeClass('loading');
      setupContentArea();
      // Atualiza a dica de clique
      updateEditModeUI();
    }).fail(function() {
      console.error('Erro ao buscar medicação');
      $('.content-textarea').val('Erro ao carregar medicação para esta doença.').removeClass('loading');
      setupContentArea();
      updateEditModeUI();
    });
  }

  function setupContentArea() {
    const canEdit = currentDoencaData && currentDoencaData.canEdit;
    const cardHeader = $('.content-textarea').closest('.card').find('.card-header');
    
    // Limpa botões existentes
    cardHeader.find('.btn-group').remove();
    
    // Sempre adiciona botão de copiar
    let buttonsHTML = `
      <div class="btn-group ms-auto" role="group">
        <button class="btn btn-sm btn-outline-info copy-btn" title="Copiar conteúdo">
          <i class="bx bx-copy me-1"></i>Copiar
        </button>
    `;
    
    if (canEdit && !isReadOnly) {
      // Adiciona botões de edição/exclusão apenas se pode editar
      buttonsHTML += `
        <button class="btn btn-sm btn-outline-primary edit-btn" id="editBtn">
          <i class="bx bx-edit me-1"></i>Editar
        </button>
        <button class="btn btn-sm btn-outline-danger delete-btn" id="deleteBtn">
          <i class="bx bx-trash me-1"></i>Excluir
        </button>
      `;
    }
    
    buttonsHTML += `</div>`;
    cardHeader.append(buttonsHTML);
    
    // Event listeners para os botões
    $('.copy-btn').off('click').on('click', copyToClipboard);
    
    if (canEdit && !isReadOnly) {
      $('#editBtn').off('click').on('click', toggleEditMode);
      $('#deleteBtn').off('click').on('click', confirmDelete);
    }
    
    // Configura textarea
    $('.content-textarea').prop('readonly', !editMode || isReadOnly);
    updateEditModeUI();
  }

  function copyToClipboard() {
    const textarea = $('.content-textarea');
    const content = textarea.val();
    
    if (!content || content.trim() === '' || content.includes('Selecione uma doença')) {
      showNotification('Nenhum conteúdo para copiar', 'warning');
      return;
    }
    
    // Método moderno para copiar
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(content).then(() => {
        showNotification('Conteúdo copiado para área de transferência!', 'success');
        // Feedback visual no botão
        const copyBtn = $('.copy-btn');
        const originalHTML = copyBtn.html();
        copyBtn.html('<i class="bx bx-check me-1"></i>Copiado!').addClass('btn-success').removeClass('btn-outline-info');
        setTimeout(() => {
          copyBtn.html(originalHTML).removeClass('btn-success').addClass('btn-outline-info');
        }, 2000);
      }).catch(() => {
        // Fallback para método antigo
        fallbackCopyToClipboard(content);
      });
    } else {
      // Fallback para navegadores mais antigos
      fallbackCopyToClipboard(content);
    }
  }

  function fallbackCopyToClipboard(text) {
    const textarea = $('.content-textarea');
    textarea.select();
    textarea[0].setSelectionRange(0, 99999); // Para mobile
    
    try {
      document.execCommand('copy');
      showNotification('Conteúdo copiado para área de transferência!', 'success');
      // Feedback visual no botão
      const copyBtn = $('.copy-btn');
      const originalHTML = copyBtn.html();
      copyBtn.html('<i class="bx bx-check me-1"></i>Copiado!').addClass('btn-success').removeClass('btn-outline-info');
      setTimeout(() => {
        copyBtn.html(originalHTML).removeClass('btn-success').addClass('btn-outline-info');
      }, 2000);
    } catch (err) {
      showNotification('Erro ao copiar. Tente selecionar o texto manualmente.', 'error');
    }
    
    // Remove seleção
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  }

  function showNotification(message, type = 'info') {
    // Remove notificação existente se houver
    $('.notification-toast').remove();
    
    const iconMap = {
      'success': 'bx-check-circle',
      'error': 'bx-error-circle',
      'warning': 'bx-error',
      'info': 'bx-info-circle'
    };
    
    const bgMap = {
      'success': 'bg-success',
      'error': 'bg-danger',
      'warning': 'bg-warning',
      'info': 'bg-info'
    };
    
    const toast = $(`
      <div class="toast notification-toast position-fixed top-0 end-0 m-3" role="alert" style="z-index: 9999;">
        <div class="toast-header ${bgMap[type]} text-white">
          <i class="bx ${iconMap[type]} me-2"></i>
          <strong class="me-auto">DocGO!</strong>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
          ${message}
        </div>
      </div>
    `);
    
    $('body').append(toast);
    
    // Inicializar e mostrar o toast
    const bsToast = new bootstrap.Toast(toast[0], {
      autohide: true,
      delay: 3000
    });
    bsToast.show();
    
    // Remover do DOM após esconder
    toast.on('hidden.bs.toast', function() {
      $(this).remove();
    });
  }

  function toggleEditMode() {
    if (isReadOnly) {
      showNotification('Você está no modo visualização. Faça login com uma senha para editar.', 'warning');
      return;
    }
    
    editMode = !editMode;
    updateEditModeUI();
  }

  function updateEditModeUI() {
    const textarea = $('.content-textarea');
    const editBtn = $('#editBtn');
    const cardHeader = textarea.closest('.card').find('.card-header');
    const readonlyHint = $('.readonly-hint');
    
    if (editMode && !isReadOnly) {
      // Modo edição
      textarea.prop('readonly', false).focus();
      editBtn.removeClass('btn-outline-primary').addClass('btn-success')
             .html('<i class="bx bx-check me-1"></i>Salvar');
      
      // Adiciona botão cancelar se não existir
      if (!$('#cancelBtn').length) {
        editBtn.after(`
          <button class="btn btn-sm btn-outline-secondary" id="cancelBtn">
            <i class="bx bx-x me-1"></i>Cancelar
          </button>
        `);
        $('#cancelBtn').off('click').on('click', cancelEdit);
      }
      
      // Adiciona indicador visual
      cardHeader.addClass('editing-mode');
      
      // Esconde dica de clique
      readonlyHint.hide();
      
    } else {
      // Modo visualização
      textarea.prop('readonly', true);
      if (editBtn.length) {
        editBtn.removeClass('btn-success').addClass('btn-outline-primary')
               .html('<i class="bx bx-edit me-1"></i>Editar');
      }
      
      // Remove botão cancelar
      $('#cancelBtn').remove();
      
      // Remove indicador visual
      cardHeader.removeClass('editing-mode');
      
      // Mostra dica de clique se há conteúdo
      if (textarea.val() && !textarea.val().includes('Selecione uma doença')) {
        readonlyHint.show();
      } else {
        readonlyHint.hide();
      }
      
      // Salva mudanças se estava editando
      if (editMode && currentDoencaData) {
        saveChanges();
      }
    }
  }

  function saveChanges() {
    if (!currentDoencaData || !currentDoencaData.canEdit || isReadOnly) return;
    
    const medicacao = $('.content-textarea').val();
    updateMedicacao(currentDoencaData.fullName, medicacao);
  }

  function cancelEdit() {
    editMode = false;
    // Recarrega o conteúdo original
    fetchMedicacao(encodeURIComponent(currentDoencaData.fullName));
    showNotification('Edição cancelada', 'info');
  }

  function confirmDelete() {
    if (!currentDoencaData || !currentDoencaData.canEdit || isReadOnly) {
      showNotification('Você não tem permissão para excluir este item.', 'warning');
      return;
    }
    
    const result = confirm(`Tem certeza que deseja excluir "${currentDoencaData.displayName}"?\n\nEsta ação não pode ser desfeita.`);
    if (result) {
      deleteDoenca(currentDoencaData.fullName);
    }
  }

  function updateMedicacao(doenca, medicacao) {
    $.ajax({
      url: `https://xvencedor.pythonanywhere.com/doencas/${encodeURIComponent(doenca)}`,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ medicacao: medicacao }),
      success: function(response) {
        console.log('Medicação atualizada com sucesso');
        showNotification('Alterações salvas com sucesso!', 'success');
        editMode = false;
        updateEditModeUI();
      },
      error: function() {
        console.error('Erro ao atualizar medicação');
        showNotification('Erro ao salvar alterações. Tente novamente.', 'error');
      }
    });
  }

  function deleteDoenca(doenca) {
    $.ajax({
      url: `https://xvencedor.pythonanywhere.com/doencas/${encodeURIComponent(doenca)}`,
      type: 'DELETE',
      success: function(response) {
        console.log('Doença deletada com sucesso');
        showNotification('Item excluído com sucesso!', 'success');
        fetchDoencas($('#search-input').val());
        
        // Limpar área de conteúdo
        $('.content-title').text('Selecione uma doença');
        $('.content-textarea').val('Selecione uma doença da lista para ver as informações de prescrição...');
        $('.content-textarea').closest('.card').find('.btn-group').remove();
        currentDoencaData = null;
        editMode = false;
      },
      error: function() {
        console.error('Erro ao deletar doença');
        showNotification('Erro ao excluir item. Tente novamente.', 'error');
      }
    });
  }

  function addDoenca(doenca, medicacao) {
    if (isReadOnly) {
      showNotification('Você está no modo visualização. Faça login com uma senha para adicionar doenças.', 'warning');
      return;
    }
    
    const doencaComPrefixo = addPasswordPrefix(doenca);
    
    $.ajax({
      url: 'https://xvencedor.pythonanywhere.com/doencas',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ doenca: doencaComPrefixo, medicacao: medicacao }),
      success: function(response) {
        console.log('Doença adicionada com sucesso');
        showNotification('Nova doença adicionada com sucesso!', 'success');
        fetchDoencas($('#search-input').val());
        $('#addModal').modal('hide');
        $('#add-form')[0].reset();
        
        // Selecionar a doença recém-adicionada
        setTimeout(() => {
          $(`.doenca-item[data-doenca="${encodeURIComponent(doencaComPrefixo)}"]`).click();
        }, 500);
      },
      error: function() {
        console.error('Erro ao adicionar doença');
        showNotification('Erro ao adicionar doença. Tente novamente.', 'error');
      }
    });
  }

  function addEventListeners() {
    // Click na doença
    $('.doenca-item').off('click').on('click', function() {
      const doenca = $(this).data('doenca');
      
      // Se estava editando, pergunta se quer salvar
      if (editMode) {
        const save = confirm('Você está editando. Deseja salvar as alterações antes de continuar?');
        if (save) {
          saveChanges();
        }
        editMode = false;
      }
      
      // Remove active de todos e adiciona ao clicado
      $('.doenca-item').removeClass('active');
      $(this).addClass('active');
      
      fetchMedicacao(doenca);
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
      showNotification('Por favor, preencha todos os campos.', 'warning');
    }
  });

  // Busca em tempo real
  $('#search-input').on('input', function() {
    // Não chama fetchDoencas mais - o applyFilters faz tudo
    if (typeof applyFilters === 'function') {
      applyFilters();
    }
  });

  // Clique na textarea para copiar (principal)
  $('.content-textarea').on('click', function() {
    if (!editMode && $(this).val() && !$(this).val().includes('Selecione uma doença')) {
      copyToClipboard();
    }
  });

  // Duplo clique para copiar (backup)
  $('.content-textarea').on('dblclick', function() {
    if (!editMode) {
      copyToClipboard();
    }
  });

  // Atalho de teclado Ctrl+C no textarea
  $('.content-textarea').on('keydown', function(e) {
    if (e.ctrlKey && e.key === 'c' && !editMode) {
      e.preventDefault();
      copyToClipboard();
    }
  });

  // Inicialização - será chamada após login
  window.fetchDoencas = fetchDoencas;
});
