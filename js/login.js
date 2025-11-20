// Arquivo: js/login.js

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('login-form');
    
    if (formLogin) {
        formLogin.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = document.getElementById('email').value;
            const passwordInput = document.getElementById('password').value;
            
            // 1. Tenta buscar os dados de login salvos no registro
            const dadosLoginJSON = localStorage.getItem('dadosLogin');
            
            if (dadosLoginJSON) {
                const dadosLogin = JSON.parse(dadosLoginJSON);
                
                // 2. Verifica as credenciais
                if (emailInput === dadosLogin.email && passwordInput === dadosLogin.password) {
                    // Login bem-sucedido!
                    
                    // 3. Define o usuário como logado no localStorage
                    localStorage.setItem('usuarioLogado', 'true');
                    localStorage.setItem('emailUsuarioLogado', emailInput); // Opcional, mas útil
                    
                    window.location.href = 'dash.html'; 
                } else {
                    alert('Erro: E-mail ou senha incorretos.');
                }
            } else {
                alert('Erro: Nenhuma conta registrada encontrada. Crie uma conta primeiro.');
            }
        });
    }
});