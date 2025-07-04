document.addEventListener('DOMContentLoaded', function() {
    // Função para trocar de página
    function showPage(pageId) {
        // Esconde todas as páginas
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Mostra a página solicitada
        document.getElementById(pageId).classList.add('active');
        
        // Atualiza menu ativo
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`.nav-link[data-page="${pageId}"]`).classList.add('active');
    }

    // Event listeners para os links de navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Handler para o formulário de cadastro
    const makerForm = document.getElementById('makerForm');
    if (makerForm) {
        makerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar notificação
            const notification = document.getElementById('notification');
            notification.style.display = 'flex';
            
            // Esconder notificação após 5 segundos
            setTimeout(() => {
                notification.style.display = 'none';
            }, 5000);
            
            // Redirecionar para home (opcional)
            setTimeout(() => showPage('home'), 2000);
        });
    }

    // Handler para busca (exemplo básico)
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = document.getElementById('searchInput').value;
            alert(`Busca realizada por: ${searchTerm}`);
            // Aqui você implementaria a lógica real de busca
        });
    }
});