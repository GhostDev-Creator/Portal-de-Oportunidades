document.addEventListener('DOMContentLoaded', () => {
    const imagemMenu = document.getElementById('menu-profile-img');
    const defaultImgSrc = "images/image/default-avatar.png"; 

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
