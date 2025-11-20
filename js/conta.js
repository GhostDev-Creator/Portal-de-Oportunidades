let uploadedImageBase64 = null;
const inputFoto = document.getElementById('upload-foto');
const imagemPerfil = document.getElementById('profile-img');
const salvarBtn = document.getElementById('salvarBtn');

// DEFINA AQUI A URL DA IMAGEM PADRÃO
const defaultImgSrc = "images/image/perfil.jpg"; 
function checkAuthAndLoad() {
    // 1. CHECAGEM DE AUTENTICAÇÃO
    const isLogged = localStorage.getItem('usuarioLogado');
    if (isLogged !== 'true') {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html'; 
        return;
    }

    // 2. CARREGAMENTO DOS DADOS DO PERFIL
    const dadosJSON = localStorage.getItem('configuracoesUsuario');
    
    if (dadosJSON) {
        const dadosSalvos = JSON.parse(dadosJSON);
        
        // Preenche os campos da página de conta
        document.getElementById('nome').value = dadosSalvos.nomeDoUsuario || '';
        document.getElementById('email').value = dadosSalvos.emailDoUsuario || '';
        document.getElementById('telefone').value = dadosSalvos.telefoneDoUsuario || '';
        document.getElementById('localizacao').value = dadosSalvos.localizacaoDoUsuario || '';
        document.getElementById('nascimento').value = dadosSalvos.nascimentoDoUsuario || '';
        
        // Lógica para carregar a imagem
        if (dadosSalvos.urlFoto && dadosSalvos.urlFoto !== null) {
            imagemPerfil.src = dadosSalvos.urlFoto;
            uploadedImageBase64 = dadosSalvos.urlFoto;
        } else {
            // Se não houver foto salva, usa a padrão
            imagemPerfil.src = defaultImgSrc;
            uploadedImageBase64 = defaultImgSrc;
        }
    } else {
        // Se não houver dados salvos, carrega imagem padrão
        imagemPerfil.src = defaultImgSrc;
        uploadedImageBase64 = defaultImgSrc;
    }
}

// Evento para carregar nova foto
inputFoto.addEventListener('change', function(event) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagemPerfil.src = e.target.result;
            uploadedImageBase64 = e.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }
});

// Botão Salvar
salvarBtn.addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const localizacao = document.getElementById('localizacao').value;
    const nascimento = document.getElementById('nascimento').value;

    const dadosParaSalvar = {
        nomeDoUsuario: nome,
        emailDoUsuario: email,
        telefoneDoUsuario: telefone,
        localizacaoDoUsuario: localizacao,
        nascimentoDoUsuario: nascimento,
        urlFoto: uploadedImageBase64, // Salva a foto (padrão ou personalizada)
        dataHoraSalvamento: new Date().toLocaleString()
    };

    localStorage.setItem('configuracoesUsuario', JSON.stringify(dadosParaSalvar));
    alert('✅ Alterações salvas com sucesso!');
    
    checkAuthAndLoad(); 
});

// Lógica de LOGOUT
function handleLogout() {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('emailUsuarioLogado');
    window.location.href = 'index.html'; 
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.querySelector('.logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            handleLogout();
        });
    }

    checkAuthAndLoad();
});

// Atualiza foto no menu (se existir na página)
document.addEventListener('DOMContentLoaded', () => {
    const imagemMenu = document.getElementById('menu-profile-img');

    const dadosJSON = localStorage.getItem('configuracoesUsuario');
   
    if (dadosJSON && imagemMenu) {
        try {
            const dadosSalvos = JSON.parse(dadosJSON);
           
            if (dadosSalvos.urlFoto) {
                imagemMenu.src = dadosSalvos.urlFoto;
            } else {
                imagemMenu.src = defaultImgSrc;
            }
        } catch (e) {
            console.error('Erro ao analisar dados do localStorage:', e);
            imagemMenu.src = defaultImgSrc;
        }
    } else if (imagemMenu) {
        imagemMenu.src = defaultImgSrc;
    }
});

// FUNÇÃO DE REGISTRO - Define foto padrão ao criar conta
function iniciarRegistro(email, password, phone, birthdate, city) {
    const dadosDePerfil = {
        nomeDoUsuario: 'Usuário Novo', 
        emailDoUsuario: email,
        telefoneDoUsuario: phone,
        localizacaoDoUsuario: city,
        nascimentoDoUsuario: birthdate,
        urlFoto: defaultImgSrc, // DEFINE A FOTO PADRÃO AQUI
    };
    localStorage.setItem('configuracoesUsuario', JSON.stringify(dadosDePerfil));
    
    const dadosLogin = {
        email: email,
        password: password,
    };
    localStorage.setItem('dadosLogin', JSON.stringify(dadosLogin)); 
    
    window.location.href = "login.html"; 
}

function validarERegistrar(event) {
    event.preventDefault(); 
    const form = document.getElementById('registro-form');
    
    if (form.checkValidity()) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        const birthdate = document.getElementById('birthdate').value;
        const city = document.getElementById('city').value;
        
        iniciarRegistro(email, password, phone, birthdate, city);
        
    } else {
        form.reportValidity(); 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('registro-form');
    if (formRegistro) {
        formRegistro.addEventListener('submit', validarERegistrar);
    }
});