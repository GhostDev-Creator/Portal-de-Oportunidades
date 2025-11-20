document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formulario-contato');
    const statusDiv = document.getElementById('mensagem-status');

    if (form) {
        form.addEventListener('submit', function(event) {
            
            event.preventDefault(); 

            statusDiv.style.display = 'none';
            statusDiv.className = 'mensagem-status';
            statusDiv.innerHTML = '';
            setTimeout(function() {
                
                statusDiv.classList.add('sucesso');
                statusDiv.innerHTML = '✅ Mensagem enviada com sucesso!! Agradecemos seu contato.';
                statusDiv.style.display = 'block';

                form.reset(); 
                
                setTimeout(function() {
                    statusDiv.style.display = 'none';
                }, 2000); 

            }, 1000); 
        });
    }
});