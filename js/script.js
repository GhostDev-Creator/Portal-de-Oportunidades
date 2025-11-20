const oportunidadesList = document.querySelector('.cards-container');
const tipoFiltro = document.getElementById('tipo-oportunidade');
const areaFiltro = document.getElementById('area-interesse');
const dataLimiteFiltro = document.getElementById('data-limite');
const publicoFiltro = document.getElementById('publico-alvo');
const buscarBtn = document.getElementById('buscar-btn');

function filterCards(category) {
    const clickedButton = document.querySelector(`.tab-button[onclick="filterCards('${category}')"]`);
    
    if (clickedButton && clickedButton.classList.contains('active')) {
        console.log(`Filtro "${category}" já está ativo. Ação cancelada.`);
        return; 
    }

    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    if (clickedButton) {
        clickedButton.classList.add('active');
    }

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function getIconForType(tipo) {
    switch (tipo) {
        case 'concurso': return '<i class="fas fa-award"></i>';
        case 'edital': return '<i class="fas fa-file-alt"></i>';
        case 'workshop': return '<i class="fas fa-tools"></i>';
        case 'palestra': return '<i class="fas fa-microphone"></i>';
        default: return '<i class="fas fa-info-circle"></i>';
    }
}

function handleVerDetalhes(event) {
    const id = event.target.dataset.id;
    localStorage.setItem('oportunidadeId', id);
    window.location.href = 'detalhes.html';
}

const verDetalhesButtons = document.querySelectorAll('.card .details-button');
if (verDetalhesButtons.length > 0) {
    verDetalhesButtons.forEach(btn => {
        btn.addEventListener('click', handleVerDetalhes);
    });
}

if (buscarBtn) {
    buscarBtn.addEventListener('click', () => {
        const tipoSelecionado = tipoFiltro.value;
        const areaSelecionada = areaFiltro.value;

        document.querySelectorAll('.card').forEach(card => {
            let showCard = true;

            if (tipoSelecionado && tipoSelecionado !== 'all' && !card.classList.contains(tipoSelecionado)) {
                showCard = false;
            }

            if (areaSelecionada && areaSelecionada !== 'all' && !card.classList.contains(areaSelecionada)) {
                showCard = false;
            }

            card.style.display = showCard ? 'block' : 'none';
        });
    });
}