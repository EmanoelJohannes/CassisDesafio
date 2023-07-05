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

  // Capturar os elementos de entrada
  var tipoInput = $('input[name="tipo"]');
  var nomeInput = $('input[name="nome"]');
  var cpfInput = $('input[name="cpf"]');
  var prestadorSelect = $('select[name="prestador"]');
  var especialidadeCheckboxes = $('#checkboxes input[type="checkbox"]');
  
  // Verificar o preenchimento dos campos ao alterar o valor
  tipoInput.on('change', checkFormCompletion);
  nomeInput.on('input', checkFormCompletion);
  cpfInput.on('input', checkFormCompletion);
  prestadorSelect.on('change', checkFormCompletion);
  especialidadeCheckboxes.on('change', checkFormCompletion);
  
  // Função para verificar o preenchimento dos campos
  function checkFormCompletion() {
    var isTipoSelected = tipoInput.filter(':checked').length > 0;
    var isNomeFilled = nomeInput.val().trim() !== '';
    var isCpfFilled = cpfInput.val().trim() !== '';
    var isPrestadorSelected = prestadorSelect.val() !== '';
    var isEspecialidadeSelected = especialidadeCheckboxes.filter(':checked').length > 0;
    
    var isFormComplete = isTipoSelected && isNomeFilled && isCpfFilled && isPrestadorSelected && isEspecialidadeSelected;
    
    // Habilitar ou desabilitar o botão "Próximo" com base no preenchimento do formulário
    $('.next-step').prop('disabled', !isFormComplete);
  }












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
});
