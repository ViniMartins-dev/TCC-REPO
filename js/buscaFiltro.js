const filtros = {
    racas: [],
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

function aplicarFiltros() {
    const idadeRadios = document.getElementsByName('idades');
    filtros.idade = '';
    for (const radio of idadeRadios) {
        if (radio.checked) {
            filtros.idade = radio.nextElementSibling.textContent.trim();
            break;
        }
    }
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
        query.raca.forEach(r => params.append('raca', r));
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

    // Fazer fetch GET para a API
    fetch('http://localhost:3000/animal/filtrar/?' + params.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'bearer': '000'
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        mostrarResultado(data);
    })
    .catch(err => {
        console.error('Erro na busca:', err);
    });
}

function mostrarResultado(animais) {

}