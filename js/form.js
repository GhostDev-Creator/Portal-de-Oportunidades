const form = document.getElementById('contatoForm');
const feedbackElement = document.getElementById('feedback');

form.addEventListener('submit', function(event){
    event.preventDefault();

    const formData = new FormData(form);
    
    const nome = formData.get('nome')
    const email = formData.get('email')
    const assunto = formData.get('assunto')
    const mensagem = formData.get('mensagem')

    console.log("--- Envio do Email ---");
    console.log("Dados enviados: ");
    console.log("nome: ", nome);
    console.log("email: ", email);
    console.log("assunto :",assunto);
    console.log("mensagem: ", mensagem);
    console.log("----------------------");

    feedbackElement.textContent = "Dados capturados! Verifique a sua caixa de entrada (Console do Site (F12)).";
    feedbackElement.style.color = "green";

    form.reset();

    setTimeout(() => {
        feedbackElement.textContent = '';
    }, 3500);

})
