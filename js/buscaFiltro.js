const filtros = {
    racas: '',
    personalidade: '',
    idade: '',
};

function selecionar(el) {
    if (el.classList.contains('filPersonalidade-option')) {
        document.querySelectorAll('.filPersonalidade-option').forEach(div => div.classList.remove('selecionada'));
        el.classList.add('selecionada');
        filtros.personalidade = el.textContent.trim();
    } else if (el.classList.contains('filRaca-option')) {
        if (el.classList.contains('selecionada')) {
            el.classList.remove('selecionada');
            filtros.racas = filtros.racas.filter(r => r !== el.textContent.trim());
        } else {
            el.classList.add('selecionada');
            filtros.racas.push(el.textContent.trim());
        }
    }
}

function pegarRacasSelecionadas() {
  const racasLista = document.querySelectorAll('.filRaca-option');
  const selecionadas = [];

  for (const raca of racasLista) {
    if (raca.classList.contains("checked")) {
      selecionadas.push(raca.textContent.trim());
    }
  }

  const query = selecionadas.join(",");
  return query;
}

function pegarPersonalidadesSelecionadas() {
  let query = "";
  const personalidadesLista = document.querySelectorAll('.filPersonalidade-option')
  for (const personalidade of personalidadesLista) {
    if (personalidade.classList.contains("checked")) {
      query += personalidade.textContent.trim()
    }
  }  
  // Separa a str das personalidades e coloca um "," entre cada
  query = query.split(/(?=[A-Z])/).join(",");
  return query
}

function pegarIdadeSelecionada() {
  const idadeRadios = document.getElementsByName('idades');
  for (const radio of idadeRadios) {
    if (radio.checked) {
      return radio.nextElementSibling.textContent.trim();
    }
  }
}

function aplicarFiltros() {
  filtros.idade = pegarIdadeSelecionada()
  filtros.personalidade = pegarPersonalidadesSelecionadas()
  filtros.racas = pegarRacasSelecionadas()
  const query = {};

  if (filtros.racas.length > 0) {
    query.raca = filtros.racas; // Array de raças
  }

  if (filtros.personalidade) {
    query.personalidade = filtros.personalidade;
  }

  switch (filtros.idade) {
    case 'Até 1 ano':
      query.idadeMax = 1;
      break;
    case 'Até 2 anos':
      query.idadeMax = 2;
      break;
    case 'Até 3 anos':
      query.idadeMax = 3;
      break;
    case 'Até 4 anos':
      query.idadeMax = 4;
      break;
    case 'A partir de 5 anos':
      query.idadeMin = 5;
      break;
    default:
      break;
  }

  const params = new URLSearchParams();

  // Se raca é array, enviar múltiplos parâmetros: raca=xxx&raca=yyy
  if (query.raca) {
    params.append('raca', query.raca)
  }

  if (query.personalidade) {
    params.append('personalidade', query.personalidade);
  }

  if (query.idadeMin !== undefined) {
    params.append('idadeMin', query.idadeMin);
  }

  if (query.idadeMax !== undefined) {
    params.append('idadeMax', query.idadeMax);
  }
  return params.toString()
}

function mostrarResultado(animais) {
  console.log(animais)
}
