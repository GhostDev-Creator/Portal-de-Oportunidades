let currentDate = new Date();
const monthYearElement = document.getElementById("month-year");
const calendarBody = document.getElementById("calendar-body");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const tituloOportunidadeElement = document.getElementById("titulo-oportunidade");
const subtituloOportunidadeElement = document.getElementById("subtitulo-oportunidade");
const tipoOportunidadeDet = document.getElementById("tipo-oportunidade-detalhe");
const areaInteresseDet = document.getElementById("area-interesse-detalhe");
const dataOportunidadeDet = document.getElementById("data-oportunidade-detalhe");
const publicoAlvoDet = document.getElementById("publico-alvo-detalhe");
const descricaoOportunidadeElement = document.getElementById("descricao-oportunidade");
const acoesContainer = document.getElementById('acoes-container');

// --- FUNÇÕES DE CONTROLE (BOTÃO DE INSCRIÇÃO E CALENDÁRIO) ---

function formatarParaCalendar(dataStr, horarioStr = '08:00') {
    if (!dataStr) return '';
    const dataFormatada = dataStr.replace(/-/g, '');
    const [horas, minutos] = horarioStr.split(':');
    const horarioFormatado = `${horas}${minutos}00`;
    return `${dataFormatada}T${horarioFormatado}`;
}

function getBotaoOriginalHTML(oportunidade) {
    const iconeClass = (oportunidade.dataEvento) 
        ? "fas fa-calendar-check" 
        : "fas fa-external-link-alt";
    const classeAcao = (oportunidade.dataEvento) 
        ? "secondary" : "primary";
    return `
        <button id="btn-inscrever" class="btn-acao ${classeAcao}" data-link="${oportunidade.linkExterno || '#'}">
            Inscreva-se Agora <i class="${iconeClass}"></i>
        </button>
    `;
}

function handleRetirarInscricaoClick(oportunidadeId, oportunidade) {
    if (!acoesContainer) return;
    const statusKey = `inscrito_${oportunidadeId}`;
    localStorage.removeItem(statusKey);
    acoesContainer.innerHTML = getBotaoOriginalHTML(oportunidade);
    const novoBotaoInscrever = document.getElementById('btn-inscrever');
    if (novoBotaoInscrever) {
        novoBotaoInscrever.addEventListener('click', (e) => handleInscricaoClick(e, oportunidade));
    }
}

function handleInscricaoClick(event, oportunidade) {
    event.preventDefault();
    const statusKey = `inscrito_${oportunidade.id}`;
    
    if (oportunidade.dataEvento) {
        const horario = oportunidade.horarioEvento || '08:00';
        const dataHoraInicio = formatarParaCalendar(oportunidade.dataEvento, horario);
        const datesParameter = `${dataHoraInicio}/${dataHoraInicio}`; 
        const tituloEvento = `Lembrete: ${oportunidade.titulo}`;
        const detalhesEvento = `Você se inscreveu em "${oportunidade.titulo}". Descrição: ${oportunidade.descricao}`;
        const URL_CALENDARIO = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(tituloEvento)}&dates=${datesParameter}&details=${encodeURIComponent(detalhesEvento)}&sf=true&output=xml`;
        localStorage.setItem(statusKey, 'true');
        window.open(URL_CALENDARIO, '_blank');
    } else {
        const link = event.currentTarget.dataset.link || '#';
        if (link && link !== '#') {
            window.open(link, '_blank');
        } else {
             alert(`Inscrição para ${oportunidade.titulo} confirmada! (Link Externo não disponível)`);
        }
        localStorage.setItem(statusKey, 'true');
    }
    
    const novoConteudoHTML = `
        <div class="status-inscricao">
            <span>Inscrito!</span>
            <button id="btn-retirar-inscricao" class="btn-retirar-acao">Retirar Inscrição</button>
        </div>
    `;

    if (acoesContainer) {
        acoesContainer.innerHTML = novoConteudoHTML;
        const btnRetirar = document.getElementById('btn-retirar-inscricao');
        if (btnRetirar) {
            btnRetirar.addEventListener('click', () => handleRetirarInscricaoClick(oportunidade.id, oportunidade));
        }
    }
}

// --- FUNÇÕES DE CALENDÁRIO ---

function renderCalendar(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
    ];
    monthYearElement.textContent = `${monthNames[month]} ${year}`;

    calendarBody.innerHTML = "";
    let date = 1;
    let row = document.createElement("tr");

    for (let i = 0; i < startingDayOfWeek; i++) {
        const cell = document.createElement("td");
        cell.classList.add("other-month");
        row.appendChild(cell);
    }

    while (date <= daysInMonth) {
        const cell = document.createElement("td");
        cell.textContent = date;
        cell.dataset.date = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

        const today = new Date();
        if (
            year === today.getFullYear() &&
            month === today.getMonth() &&
            date === today.getDate()
        ) {
            cell.classList.add("today");
        } 

        const eventosNoDia = oportunidades.filter(op => op.dataEvento === cell.dataset.date);

        const selectedId = localStorage.getItem("oportunidadeId");

        if (eventosNoDia.length > 0) {
            cell.classList.add("event-day");
            
            const primeiroEvento = eventosNoDia[0];
            cell.title = eventosNoDia.length > 1 
                ? `${eventosNoDia.length} eventos neste dia`
                : `${primeiroEvento.titulo}`;

            if (eventosNoDia.some(ev => ev.id == selectedId)) {
                cell.classList.add("selected-day");
            }

            cell.addEventListener("click", () => {
                localStorage.setItem("oportunidadeId", primeiroEvento.id);
                renderCalendar(year, month);
                loadDetalhesOportunidade();
            });
        }

        row.appendChild(cell);

        if (new Date(year, month, date).getDay() === 6) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }
        date++;
    }

    while (row.cells.length < 7) {
        const cell = document.createElement("td");
        cell.classList.add("other-month");
        row.appendChild(cell);
    }
    calendarBody.appendChild(row);
}

function goToPrevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

function goToNextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

// --- FUNÇÃO PARA NAVEGAR ATÉ O MÊS DO EVENTO ---
function navegarParaMesDoEvento(dataEvento) {
    if (!dataEvento) return;
    
    // Converter string "YYYY-MM-DD" para objeto Date
    const [ano, mes, dia] = dataEvento.split('-').map(Number);
    
    // Atualizar currentDate para o mês do evento
    currentDate = new Date(ano, mes - 1, dia);
    
    // Renderizar o calendário no mês correto
    renderCalendar(ano, mes - 1);
}

// --- FUNÇÃO DE CARREGAMENTO DE DETALHES ---

function loadDetalhesOportunidade() {
    const oportId = localStorage.getItem("oportunidadeId");
    const oportunidade = oportunidades.find((op) => op.id == oportId);

    if (!oportunidade) {
        if (tituloOportunidadeElement) tituloOportunidadeElement.textContent = "Oportunidade não encontrada";
        if (descricaoOportunidadeElement) descricaoOportunidadeElement.textContent =
            "Desculpe, não conseguimos encontrar os detalhes para esta oportunidade.";
        return;
    }

    if (tituloOportunidadeElement) tituloOportunidadeElement.textContent = oportunidade.titulo;
    if (subtituloOportunidadeElement) subtituloOportunidadeElement.textContent = oportunidade.subtitulo;
    if (tipoOportunidadeDet) tipoOportunidadeDet.textContent =
        oportunidade.tipo.charAt(0).toUpperCase() + oportunidade.tipo.slice(1);
    if (areaInteresseDet) areaInteresseDet.textContent =
        oportunidade.area.charAt(0).toUpperCase() + oportunidade.area.slice(1);

    let displayDate = "";
    let dateLabel = "";
    
    if (oportunidade.dataEvento && oportunidade.dataLimite) {
        const dataEventoFormatada = oportunidade.dataEvento.split("-").reverse().join("/");
        const dataLimiteFormatada = oportunidade.dataLimite.split("-").reverse().join("/");
        displayDate = `Inscrições até ${dataLimiteFormatada} | Evento em ${dataEventoFormatada}`;
        dateLabel = "Datas:";
    } else if (oportunidade.dataEvento) {
        displayDate = oportunidade.dataEvento.split("-").reverse().join("/");
        dateLabel = "Data do Evento:";
    } else if (oportunidade.dataLimite) {
        displayDate = oportunidade.dataLimite.split("-").reverse().join("/");
        dateLabel = "Data Limite:";
    } else {
        displayDate = "Indefinida";
        dateLabel = "Data:";
    }

    if (dataOportunidadeDet) {
        dataOportunidadeDet.textContent = displayDate;
        const labelElement = dataOportunidadeDet.previousElementSibling;
        if (labelElement) labelElement.textContent = `${dateLabel} `;
    }

    if (publicoAlvoDet) publicoAlvoDet.textContent =
        oportunidade.publico.charAt(0).toUpperCase() + oportunidade.publico.slice(1);
    if (descricaoOportunidadeElement) descricaoOportunidadeElement.textContent = oportunidade.descricao;

    const statusKey = `inscrito_${oportunidade.id}`;
    const jaInscrito = localStorage.getItem(statusKey) === 'true';

    if (!acoesContainer) return;

    if (jaInscrito) {
        acoesContainer.innerHTML = `
            <div class="status-inscricao">
                <span>Inscrito!</span>
                <button id="btn-retirar-inscricao" class="btn-retirar-acao">Retirar Inscrição</button>
            </div>
        `;
        const btnRetirar = document.getElementById('btn-retirar-inscricao');
        if (btnRetirar) {
            btnRetirar.addEventListener('click', () => handleRetirarInscricaoClick(oportunidade.id, oportunidade));
        }
    } else {
        acoesContainer.innerHTML = getBotaoOriginalHTML(oportunidade);
        const novoBotaoInscrever = document.getElementById('btn-inscrever');
        if (novoBotaoInscrever) {
            novoBotaoInscrever.addEventListener('click', (e) => handleInscricaoClick(e, oportunidade));
        }
    }
    
    // IMPORTANTE: Navegar para o mês do evento se ele tiver dataEvento
    if (oportunidade.dataEvento) {
        navegarParaMesDoEvento(oportunidade.dataEvento);
    }
}

// --- INICIALIZAÇÃO ---

document.addEventListener("DOMContentLoaded", () => {
    if (tituloOportunidadeElement) {
        loadDetalhesOportunidade();
    }
    
    // Só renderiza o calendário se não for chamado pelo loadDetalhesOportunidade
    if (monthYearElement && !tituloOportunidadeElement) {
        renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }
    
    if (prevMonthBtn) prevMonthBtn.addEventListener("click", goToPrevMonth);
    if (nextMonthBtn) nextMonthBtn.addEventListener("click", goToNextMonth);
});