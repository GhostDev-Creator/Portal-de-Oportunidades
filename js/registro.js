function iniciarRegistro(email, password, phone, birthdate, city) {
    // 1. Salva os dados de PERFIL (que serão lidos pela conta.html)
    // O nome é colocado como 'Usuário Novo' para que o usuário preencha depois na página da conta.
    const dadosDePerfil = {
        nomeDoUsuario: 'Usuário Novo', 
        emailDoUsuario: email,
        telefoneDoUsuario: phone,
        localizacaoDoUsuario: city,
        nascimentoDoUsuario: birthdate,
        urlFoto: null, 
    };
    localStorage.setItem('configuracoesUsuario', JSON.stringify(dadosDePerfil));
    
    // 2. Salva os dados de LOGIN (email e senha) para que o login.js possa verificar
    const dadosLogin = {
        email: email,
        password: password, // Em um ambiente real, NUNCA salvar a senha em texto simples.
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