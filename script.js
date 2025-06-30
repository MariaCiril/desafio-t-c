
        // Navegação entre páginas
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remover classe ativa de todos os links
                document.querySelectorAll('.nav-link').forEach(el => {
                    el.classList.remove('active');
                });
                
                // Adicionar classe ativa ao link clicado
                this.classList.add('active');
                
                // Esconder todas as páginas
                document.querySelectorAll('.page').forEach(page => {
                    page.classList.remove('active');
                });
                
                // Mostrar a página correspondente
                const pageId = this.getAttribute('data-page');
                document.getElementById(pageId).classList.add('active');
                
                // Rolar para o topo
                window.scrollTo(0, 0);
            });
        });
        
        // Dados de exemplo de fabricantes e produtos
        const soapMakers = [
            {
                id: 1,
                name: "Ana Silva",
                business: "Saboaria Ecológica Ana",
                email: "ana@email.com",
                phone: "(11) 99999-8888",
                whatsapp: "https://wa.me/5511999998888",
                address: "Rua das Flores, 123 - Jardim Botânico",
                city: "São Paulo",
                state: "SP",
                bio: "Produzo sabões ecológicos há 5 anos, utilizando óleo reciclado e ingredientes naturais. Meu foco é criar produtos que respeitam a pele e o meio ambiente.",
                photo: ""
            },
            {
                id: 2,
                name: "Carlos Mendes",
                business: "EcoSabões Artesanais",
                email: "carlos@email.com",
                phone: "(21) 98888-7777",
                whatsapp: "https://wa.me/5521988887777",
                address: "Av. Beira Mar, 456 - Copacabana",
                city: "Rio de Janeiro",
                state: "RJ",
                bio: "Artista plástico que encontrou na produção de sabões ecológicos uma forma de unir arte e sustentabilidade. Meus sabões são verdadeiras obras de arte funcionais!",
                photo: ""
            }
        ];
        
        const soapProducts = [
            {
                id: 1,
                makerId: 1,
                name: "Sabão em pedra",
                type: "barra",
                icon: "🧼",
                location: "São Paulo, SP"
            },
            {
                id: 2,
                makerId: 1,
                name: "Sabão Líquido ",
                type: "liquido",
                icon: "🧴",
                location: "São Paulo, SP"
            },
           
            
        ];
        
        // Função para encontrar fabricante por ID
        function findMakerById(id) {
            return soapMakers.find(maker => maker.id === id);
        }
        
        // Função para renderizar produtos
        function renderProducts(products) {
            const container = document.getElementById('productsContainer');
            container.innerHTML = '';
            
            if (products.length === 0) {
                container.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px; font-size: 1.2rem;">Nenhum sabão encontrado com esses critérios.</p>';
                return;
            }
            
            products.forEach(product => {
                const maker = findMakerById(product.makerId);
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-image">
                        <div>${product.icon}</div>
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <div class="product-meta">
                            <span><i class="fas fa-user"></i> ${maker.business || maker.name}</span>
                            <span><i class="fas fa-tag"></i> ${product.type.charAt(0).toUpperCase() + product.type.slice(1)}</span>
                        </div>
                        <p class="product-description">${product.description}</p>
                        <div class="product-location">
                            <i class="fas fa-map-marker-alt"></i> ${product.location}
                        </div>
                        <div style="margin-top: 20px;">
                            <a href="${maker.whatsapp}" class="btn btn-whatsapp" target="_blank">
                                <i class="fab fa-whatsapp"></i> Contato via WhatsApp
                            </a>
                        </div>
                    </div>
                `;
                container.appendChild(productCard);
            });
        }
        
        // Inicializar produtos
        renderProducts(soapProducts);
        
        // Filtragem de produtos
        let currentFilters = {
            type: 'all',
            ingredient: 'all'
        };
        
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', function() {
                const filterType = this.getAttribute('data-filter');
                const filterValue = this.getAttribute('data-value');
                
                // Atualizar filtro atual
                currentFilters[filterType] = filterValue;
                
                // Atualizar estado ativo dos botões
                document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // Filtrar produtos
                const filteredProducts = soapProducts.filter(product => {
                    const typeMatch = currentFilters.type === 'all' || product.type === currentFilters.type;
                    const ingredientMatch = currentFilters.ingredient === 'all' || 
                                         (product.ingredients && product.ingredients.includes(currentFilters.ingredient));
                    return typeMatch && ingredientMatch;
                });
                
                renderProducts(filteredProducts);
            });
        });
        
        // Busca de produtos
        document.getElementById('searchBtn').addEventListener('click', searchProducts);
        document.getElementById('searchInput').addEventListener('keyup', function(e) {
            if (e.key === 'Enter') searchProducts();
        });
        
        function searchProducts() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            
            if (!searchTerm) {
                renderProducts(soapProducts);
                return;
            }
            
            const results = soapProducts.filter(product => {
                const maker = findMakerById(product.makerId);
                return product.name.toLowerCase().includes(searchTerm) || 
                       product.description.toLowerCase().includes(searchTerm) ||
                       (maker && maker.name.toLowerCase().includes(searchTerm)) ||
                       (maker && maker.business && maker.business.toLowerCase().includes(searchTerm));
            });
            
            renderProducts(results);
        }
        
        // Cadastro de novo fabricante
        document.getElementById('makerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter valores do formulário
            const name = document.getElementById('makerName').value;
            const business = document.getElementById('makerBusiness').value;
            const email = document.getElementById('makerEmail').value;
            const phone = document.getElementById('makerPhone').value;
            const whatsapp = document.getElementById('makerWhatsApp').value;
            const address = document.getElementById('makerAddress').value;
            const city = document.getElementById('makerCity').value;
            const state = document.getElementById('makerState').value;
            const bio = document.getElementById('makerBio').value;
            const photo = document.getElementById('makerPhoto').value;
            
            // Criar novo objeto de fabricante
            const newMaker = {
                id: soapMakers.length + 1,
                name,
                business,
                email,
                phone,
                whatsapp,
                address,
                city,
                state,
                bio,
                photo
            };
            
            // Adicionar à lista de fabricantes
            soapMakers.push(newMaker);
            
            // Mostrar notificação
            const notification = document.getElementById('notification');
            notification.textContent = "Fabricante cadastrado com sucesso!";
            notification.innerHTML = '<i class="fas fa-check-circle"></i> <div>Fabricante cadastrado com sucesso!</div>';
            notification.classList.add('show');
            
            // Limpar formulário
            this.reset();
            
            // Esconder notificação após 3 segundos
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
            
            // Ir para a página de produtos
            document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
            document.querySelector('[data-page="products"]').classList.add('active');
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            document.getElementById('products').classList.add('active');
        });
    