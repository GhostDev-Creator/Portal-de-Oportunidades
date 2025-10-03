const oportunidades = [
    {
      id: 1,
      titulo: "Concurso de Culinária",
      subtitulo: "Batalha de Talentos",
      tipo: "concurso",
      area: "culinaria",
      dataLimite: "2025-11-15",
      dataEvento: null,
      publico: "estudante",
      descricao:
        "Participe do nosso concurso de culinária 'Batalha de Talentos'! Mostre sua criatividade na cozinha e concorra a prêmios incríveis. Regras e inscrições no link.",
      linkExterno: "#",
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
      descricao:
        "Explore as últimas tendências e o futuro da Inteligência Artificial em nossa palestra exclusiva. Palestrante renomado da área. Garanta sua vaga!",
      linkExterno: "#",
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
      descricao:
        "Editais abertos para bolsas de mestrado em diversas áreas. Oportunidade para aprofundar seus estudos e desenvolver pesquisas inovadoras. Consulte os requisitos.",
      linkExterno: "#",
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
      descricao:
        "Mostre seu talento artístico no concurso 'Expo Jovem Artista'! Aberto para estudantes com trabalhos em pintura, escultura, fotografia e mais. Detalhes no link.",
      linkExterno: "#",
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
      descricao:
        "Aprenda as melhores estratégias de marketing para impulsionar seu negócio ou carreira. Palestra focada em resultados e inovação. Vagas limitadas!",
      linkExterno: "#",
    },
    {
      id: 6,
      titulo: "Tecnologia Front-End",
      subtitulo: "Hackathon de Frontend",
      tipo: "maratona",
      area: "tecnologia",
      dataLimite: "2025-11-30",
      dataEvento: null,
      publico: "geral",
      descricao:
        "Seja parte de uma experiência imersiva de 48 horas onde a criatividade e a tecnologia se unem para criar soluções impactantes. Nosso hackathon de tecnologia frontend é a sua chance de tirar ideias do papel e construir projetos incríveis que podem mudar a forma como interagimos com a web",
      linkExterno: "#",
    },
    {
      id: 7,
      titulo: "Roda de Ideias Culinárias",
      subtitulo: "Concurso de Culinária",
      tipo: "concurso",
      area: "tecnologia",
      dataLimite: null,
      dataEvento: "2025-11-30",
      publico: "geral",
      descricao:
        "Participe de uma experiência gastronômica completa: concorra a prêmios no Concurso de Culinária e, em seguida, troque receitas e dicas na Roda de Ideias, celebrando o melhor da culinária em um só evento.",
      linkExterno: "#",
    },
    {
      id: 8,
      titulo: "Música e Dança",
      subtitulo: "Oficina de Ritmos Afro-Brasileiros",
      tipo: "oficina",
      area: "cultura e arte",
      dataLimite: null,
      dataEvento: "2025-11-30",
      publico: "geral",
      descricao:
        "Participe de uma imersão nos ritmos afro-brasileiros. A oficina une música e dança para explorar a história e a cultura por trás desses movimentos, proporcionando uma experiência completa e envolvente.",
      linkExterno: "#",
    },
  ];
  
  let currentDate = new Date();
  const monthYearElement = document.getElementById("month-year");
  const calendarBody = document.getElementById("calendar-body");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");
  const tituloOportunidadeElement = document.getElementById(
    "titulo-oportunidade"
  );
  const subtituloOportunidadeElement = document.getElementById(
    "subtitulo-oportunidade"
  );
  const tipoOportunidadeDet = document.getElementById(
    "tipo-oportunidade-detalhe"
  );
  const areaInteresseDet = document.getElementById("area-interesse-detalhe");
  const dataOportunidadeDet = document.getElementById(
    "data-oportunidade-detalhe"
  );
  const publicoAlvoDet = document.getElementById("publico-alvo-detalhe");
  const descricaoOportunidadeElement = document.getElementById(
    "descricao-oportunidade"
  );
  const linkExternoElement = document.getElementById("link-externo");
  const adicionarCalendarioBtn = document.getElementById("adicionar-calendario");
  
  function renderCalendar(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();
  
    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
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
      cell.dataset.date = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        date
      ).padStart(2, "0")}`;
  
      const today = new Date();
      if (
        year === today.getFullYear() &&
        month === today.getMonth() &&
        date === today.getDate()
      ) {
        cell.classList.add("today");
      }
  
      const oportEsp = oportunidades.find((op) => {
        const opDate = op.dataEvento ? op.dataEvento : op.dataLimite;
        return opDate && opDate === cell.dataset.date;
      });
  
      if (oportEsp) {
        cell.classList.add("event-day");
        cell.title = `${oportEsp.titulo} - ${oportEsp.subtitulo}`;
        cell.addEventListener("click", () => {
          const eventId = oportEsp.id;
          localStorage.setItem("oportunidadeId", eventId);
          window.location.href = "detalhes.html";
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
  
  function loadDetalhesOportunidade() {
    const oportId = localStorage.getItem("oportunidadeId");
    const oportunidade = oportunidades.find((op) => op.id == oportId);
  
    if (!oportunidade) {
      tituloOportunidadeElement.textContent = "Oportunidade não encontrada";
      descricaoOportunidadeElement.textContent =
        "Desculpe, não conseguimos encontrar os detalhes para esta oportunidade. Verifique se o link está correto ou volte para a página principal.";
      document.querySelector(".detalhes-principais").style.display = "none";
      document.querySelector(".acoes-oportunidade").style.display = "none";
      return;
    }
  
    tituloOportunidadeElement.textContent = oportunidade.titulo;
    subtituloOportunidadeElement.textContent = oportunidade.subtitulo;
    tipoOportunidadeDet.textContent =
      oportunidade.tipo.charAt(0).toUpperCase() + oportunidade.tipo.slice(1);
    areaInteresseDet.textContent =
      oportunidade.area.charAt(0).toUpperCase() + oportunidade.area.slice(1);
  
    let displayDate = "";
    let dateLabel = "";
    if (oportunidade.tipo === "palestra") {
      displayDate = oportunidade.dataEvento
        ? oportunidade.dataEvento.split("-").reverse().join("/")
        : "Data Indisponível";
      dateLabel = "Data do Evento:";
    } else {
      displayDate = oportunidade.dataLimite
        ? oportunidade.dataLimite.split("-").reverse().join("/")
        : "Data Indisponível";
      dateLabel = "Data Limite:";
    }
    dataOportunidadeDet.textContent = displayDate;
    const labelElement = dataOportunidadeDet.previousElementSibling;
    if (labelElement) {
      labelElement.textContent = `${dateLabel} `;
    }
  
    publicoAlvoDet.textContent =
      oportunidade.publico.charAt(0).toUpperCase() +
      oportunidade.publico.slice(1);
    descricaoOportunidadeElement.textContent = oportunidade.descricao;
    linkExternoElement.href = oportunidade.linkExterno;
  
    if (oportunidade.tipo === "concurso" || oportunidade.tipo === "edital") {
      linkExternoElement.classList.add("primary");
      linkExternoElement.classList.remove("secondary");
      linkExternoElement.querySelector("i").className =
        "fas fa-external-link-alt";
    } else {
      linkExternoElement.classList.add("secondary");
      linkExternoElement.classList.remove("primary");
      linkExternoElement.querySelector("i").className = "fas fa-calendar-check";
    }
  
    adicionarCalendarioBtn.addEventListener("click", () => {
      alert(
        "Funcionalidade de adicionar ao calendário ainda não implementada. Em um sistema real, aqui você integraria com APIs de calendário."
      );
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    if (monthYearElement) {
      renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
      if (prevMonthBtn) prevMonthBtn.addEventListener("click", goToPrevMonth);
      if (nextMonthBtn) nextMonthBtn.addEventListener("click", goToNextMonth);
      loadDetalhesOportunidade();
    }
  });