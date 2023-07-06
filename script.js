// Código responsável por mostrar checkboxs dentro do select input, e atualizar o valor selecionado
var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    $(checkboxes).slideDown(100);
    expanded = true;
  } else {
    $(checkboxes).slideUp(100);
    expanded = false;
  }
}

function updateSelectedOptions() {
  var selectedOptions = [];
  var checkboxes = document.querySelectorAll("#checkboxes input[type='checkbox']");

  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      selectedOptions.push(checkbox.nextSibling.nextSibling.textContent.trim());
    }
  });

  var select = document.getElementById("mySelect");
  if (selectedOptions.length > 0) {
    if (selectedOptions.length <= 2) {
      select.options[0].textContent = selectedOptions.join(", ");
    } else {
      select.options[0].textContent = selectedOptions[0] + " ( +" + (selectedOptions.length - 1) + ")";
    }
  } else {
    select.options[0].textContent = "Selecionar especialidade...";
  }
}

$(document).ready(function () {

  // Mascaras dos inputs
  $('#cpf-cnpj').mask('000.000.000-00');
  $('#cep').mask('00.000-000');
  $('#numero').mask('0000');
  $('#celular').mask('(00) 00000-0000');
  $('#fixo').mask('(00) 00000-0000');

  // Alteração de CPF/CNPJ de acordo com o tipo selecionado (fisica ou juridica)
  $('input[name="tipo"]').on('change', function() {
    var tipo = $(this).val();
    var label = $('#label-cpf-cnpj');
    var input = $('#cpf-cnpj');

    if (tipo === 'cnpj') {
      label.text('* CNPJ');
      input.mask('00.000.000/0000-00');
      input.attr('placeholder', '00.000.000/0000-00');

    } else {
      label.text('* CPF');
      input.mask('000.000.000-00');
      input.attr('placeholder', '000.000.000-00');
    }
  });

  // Código responsável pela lógica dos steps do formulário
  var currentStep = 0;
  var formSteps = $(".form-step");
  var steps = $(".step");

  function showStep(step) {
    formSteps.hide();
    $(formSteps[step]).show();
  }

  function updateStepIndicator(step) {
    steps.removeClass("active");
    steps.children().removeClass("active");
    steps.children().children().removeClass("active");

    $(steps[step]).addClass("active");

    // adiciona a classe 'active' para step-circle e step-name
    $(steps[step]).children().addClass("active");

    // adiciona a classe 'active' para step-number, primeiro filho de step-circle
    $(steps[step]).children().children().addClass("active");
  }

  function validateStep(step) {
    var inputs = $(formSteps[step]).find("input[required], textarea[required]");
    var isValid = true;

    inputs.each(function () {
      if ($(this).val() === "") {
        isValid = false;
        $(this).addClass("error");
      } else {
        $(this).removeClass("error");
      }
    });

    return isValid;
  }

  showStep(currentStep);
  updateStepIndicator(currentStep);

  $(".next-step").click(function (e) {
    e.preventDefault();

    if (validateStep(currentStep)) {
      currentStep++;
      showStep(currentStep);
      updateStepIndicator(currentStep);
    }
  });

  $(".prev-step").click(function (e) {
    e.preventDefault();

    currentStep--;
    showStep(currentStep);
    updateStepIndicator(currentStep);
  });

  $("form").submit(function (e) {
    if (!validateStep(currentStep)) {
      e.preventDefault();
    }
  });



  // Area "drag and drop" e seletor de arquivos
  var dropArea = $('#drop-area');
  var fileSelector = $('#custom-file-selector');
  var fileInput = $('<input type="file">');
  var fileCounter = $('#file-counter');
  var fileCount = 0;
  var previewContainer = $('#preview-container');

  dropArea.on('dragover', function(e) {
    e.preventDefault();
    dropArea.addClass('dragged');
  });

  dropArea.on('dragleave', function() {
    dropArea.removeClass('dragged');
  });

  dropArea.on('drop', function(e) {
    e.preventDefault();
    dropArea.removeClass('dragged');
  
    var files = e.originalEvent.dataTransfer.files;
    handleFiles(files);
  });

  fileSelector.on('click', function() {
    fileInput.click();
  });

  fileInput.on('change', function(e) {
    var files = e.target.files;
    handleFiles(files);
  });

  // Função para lidar com os arquivos, mostrando seu preview e aumentando o contador
  function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
      var previewElement = createPreviewElement(files[i]);
      previewContainer.append(previewElement);
    }
    
    fileCount += files.length;
    fileCounter.text(fileCount + '/2 arquivos anexados');
  }

  function createPreviewElement(file) {
    var previewElement = $('<div class="preview">');
    var previewText = $('<span class="preview-text">');

    previewText.text(file.name);
    previewElement.append(previewText);

    return previewElement;
  }

  // Contador do text area
  $('#observacoes').on('input', function() {
    var text = $(this).val();
    var count = text.length;
    $('#charCount').text(count + '/800 caracteres');
  });


  // Modal e botão vertical
  $('.openModalButton').click(function() {
    $('#modalOverlay').fadeIn();
    $('#modal').css('right', '0');
  });

  $('#closeModalButton').click(function() {
    $('#modalOverlay').fadeOut();
    $('#modal').css('right', '-400px');
  });

  $(".faq-toggle").click(function() {
    $(this).next(".faq-content").slideToggle();
    $(this).addClass('activeToggle')
    $(this).find('.fa-toggle').toggleClass('rotate');

  });
  
  $(".close").click(function() {
    $("#myModal").hide();
  });
  
  $("openModalButton").click(function() {
    $("#myModal").show();
  });

  $('#modalOverlay').click(function(event) {
    if (event.target === this) {
      $('#modalOverlay').fadeOut();
      $('#modal').css('right', '-400px');

    }
  });

});
