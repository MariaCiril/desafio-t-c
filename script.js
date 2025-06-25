document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validação simples (em produção use autenticação segura)
    if(username.trim() !== '' && password.trim() !== '') {
        // Simula login bem-sucedido
        document.getElementById('infoBox').classList.remove('hidden');
        
        // Atualiza informações do usuário (exemplo)
        document.getElementById('userDescription').textContent = 
            `Olá ${username}! Bem-vindo ao nosso serviço premium.`;
    } else {
        alert('Por favor, preencha todos os campos!');
    }
});

function abrirWhatsApp() {
    // Substitua pelo seu número no formato 5511999999999
    const phoneNumber = 'SEU_NUMERO_WHATSAPP';
    const message = 'Olá! Gostaria de mais informações.';
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}