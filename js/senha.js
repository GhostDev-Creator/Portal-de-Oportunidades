// Arquivo: js/senha.js

document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('reset-form');
    const newPasswordSection = document.getElementById('new-password-section');
    const successMessage = document.getElementById('success-message');
    const confirmResetBtn = document.getElementById('confirm-reset-btn');

    let userToReset = null; // Variável para armazenar o objeto do usuário encontrado

    // --- ETAPA 1: SOLICITAR REDEFINIÇÃO (Verificar E-mail) ---
    resetForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const usuarioSalvoJSON = localStorage.getItem('usuarioRegistrado');
        
        if (!usuarioSalvoJSON) {
            alert('Erro: Nenhuma conta registrada no sistema.');
            return;
        }

        const usuarioSalvo = JSON.parse(usuarioSalvoJSON);
        
        // Verifica se o e-mail fornecido corresponde ao usuário salvo
        if (email === usuarioSalvo.email) {
            userToReset = usuarioSalvo; // Armazena o usuário para a próxima etapa
            
            // Oculta o formulário de e-mail e mostra o formulário de nova senha
            resetForm.style.display = 'none';
            successMessage.classList.remove('hidden');
            newPasswordSection.style.display = 'block';

        } else {
            alert('E-mail não encontrado. Verifique se o e-mail está correto.');
        }
    });
    
    // --- ETAPA 2: CONFIRMAR NOVA SENHA (Atualizar no localStorage) ---
    confirmResetBtn.addEventListener('click', function() {
        const newPasswordInput = document.getElementById('new-password');
        const newPassword = newPasswordInput.value;

        if (newPassword.length < 6) { // Validação simples
            alert('A nova senha deve ter pelo menos 6 caracteres.');
            return;
        }
        
        if (userToReset) {
            // 1. ATUALIZA A SENHA
            userToReset.password = newPassword;
            
            // 2. SALVA O OBJETO ATUALIZADO DE VOLTA NO localStorage
            localStorage.setItem('usuarioRegistrado', JSON.stringify(userToReset));
            
            alert('Sua senha foi redefinida com sucesso! Você será redirecionado para o Login.');
            
            // 3. Redireciona para o login
            window.location.href = 'login.html';
        }
    });

    // Função auxiliar para mostrar/esconder a mensagem de sucesso (removida a classe hidden)
    function showSuccess(show) {
        if (show) {
            successMessage.style.display = 'block';
        } else {
            successMessage.style.display = 'none';
        }
    }
});