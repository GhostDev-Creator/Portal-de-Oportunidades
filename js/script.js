const oportunidades = [
    {
        id: 1,
        titulo: "Batalha de Talentos",
        subtitulo: "Concurso de Culinária",
        tipo: "concurso",
        area: "culinaria",
        dataLimite: "2025-09-14",
        dataEvento: null,
        publico: "estudante",
        descricao: "Participe do nosso concurso de culinária 'Batalha de Talentos'! Mostre sua criatividade na cozinha e concorra a prêmios incríveis. Regras e inscrições no link.",
        linkExterno: "#"
    },
    {
        id: 2,
        titulo: "Futuro da IA",
        subtitulo: "Palestra sobre Inteligência Artificial",
        tipo: "palestra",
        area: "tecnologia",
        dataLimite: null,
        dataEvento: "2025-11-10",
        publico: "estudante",
        descricao: "Explore as últimas tendências e o futuro da Inteligência Artificial em nossa palestra exclusiva. Palestrante renomado da área. Garanta sua vaga!",
        linkExterno: "#"
    },
    {
        id: 3,
        titulo: "Bolsas de Mestrado",
        subtitulo: "Edital de Fomento à Pesquisa",
        tipo: "edital",
        area: "educacao",
        dataLimite: "2025-11-20",
        dataEvento: null,
        publico: "profissional",
        descricao: "Editais abertos para bolsas de mestrado em diversas áreas. Oportunidade para aprofundar seus estudos e desenvolver pesquisas inovadoras. Consulte os requisitos.",
        linkExterno: "#"
    },
    {
        id: 4,
        titulo: "Expo Jovem Artista",
        subtitulo: "Concurso de Artes Visuais",
        tipo: "concurso",
        area: "artes",
        dataLimite: "2025-11-25",
        dataEvento: null,
        publico: "estudante",
        descricao: "Mostre seu talento artístico no concurso 'Expo Jovem Artista'! Aberto para estudantes com trabalhos em pintura, escultura, fotografia e mais. Detalhes no link.",
        linkExterno: "#"
    },
    {
        id: 5,
        titulo: "Estratégias de Marketing",
        subtitulo: "Palestra sobre Empreendedorismo",
        tipo: "palestra",
        area: "negocios",
        dataLimite: null,
        dataEvento: "2025-12-05",
        publico: "geral",
        descricao: "Aprenda as melhores estratégias de marketing para impulsionar seu negócio ou carreira. Palestra focada em resultados e inovação. Vagas limitadas!",
        linkExterno: "#"
    },
    {
        id: 6,
        titulo: "Roda de Ideias Culinárias",
        subtitulo: "Concurso de Culinária",
        tipo: "concurso",
        area: "culinaria",
        dataLimite: "2025-11-30",
        dataEvento: null,
        publico: "geral",
        descricao: "Participe de uma 'Roda de Ideias Culinárias' e compartilhe suas receitas e técnicas. Um evento para todos os amantes da boa comida!",
        linkExterno: "#"
    }
];

const oportunidadesList = document.querySelector('.cards-container');
const tipoFiltro = document.getElementById('tipo-oportunidade');
const areaFiltro = document.getElementById('area-interesse');
const dataLimiteFiltro = document.getElementById('data-limite');
const publicoFiltro = document.getElementById('publico-alvo');
const buscarBtn = document.getElementById('buscar-btn');

function filterCards(category) {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    const clickedButton = document.querySelector(`.tab-button[onclick="filterCards('${category}')"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
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