// Product database
const products = {
    'runner-pro': {
        id: 'runner-pro',
        name: 'Tênis Runner Pro',
        price: 299.90,
        originalPrice: 399.90,
        image: 'img/tenis.png',
        description: 'Tênis profissional para corrida com tecnologia de amortecimento avançada.',
        rating: 5,
        reviews: 127,
        colors: ['Preto', 'Branco', 'Azul'],
        sizes: ['39-40', '41-42', '43-44'],
        category: 'Tênis de Corrida'
    },
    'urban-style': {
        id: 'urban-style',
        name: 'Tênis Urban Style',
        price: 199.90,
        image: 'img/urban.png',
        description: 'Design moderno e confortável para uso diário na cidade.',
        rating: 4,
        reviews: 89,
        colors: ['Preto', 'Cinza', 'Branco'],
        sizes: ['37-38', '39-40', '41-42'],
        category: 'Tênis Casuais'
    },
    'fashion-elite': {
        id: 'fashion-elite',
        name: 'Tênis Fashion Elite',
        price: 349.90,
        image: 'img/fashion.png',
        description: 'Tendência em calçados com design exclusivo e materiais premium.',
        rating: 5,
        reviews: 203,
        colors: ['Preto', 'Branco', 'Vermelho'],
        sizes: ['37-38', '39-40', '41-42', '43-44'],
        category: 'Tênis de Moda'
    },
    'sport-max': {
        id: 'sport-max',
        name: 'Tênis Sport Max',
        price: 279.90,
        image: 'fas fa-basketball-ball',
        description: 'Ideal para atividades esportivas com máximo suporte e flexibilidade.',
        rating: 4,
        reviews: 156,
        colors: ['Preto', 'Azul', 'Branco'],
        sizes: ['39-40', '41-42', '43-44'],
        category: 'Tênis Esportivos'
    },
    'jordan': {
        id: 'jordan',
        name: 'Tênis Air Jordão : Pobre Edition',
        price: 99.90,
        image: 'fas fa-basketball-ball',
        description: 'Ideal para atividades esportivas se o seu orçamento não permite um produto superior',
        rating: 3,
        reviews: 125,
        colors: ['Preto', 'Vermelho', 'Branco'],
        sizes: ['39-40', '41-42', '43-44'],
        category: 'Tênis Esportivos'
    },
    'jordan-rico': {
        id: 'jordan-rico',
        name: 'Tênis Air Jordão : Rich Edition',
        price: 999.90,
        image: 'fas fa-basketball-ball',
        description: 'Ideal para fingir que faz atividades esportivas e ostentação de herança',
        rating: 5,
        reviews: 5,
        colors: ['Preto', 'Vermelho', 'Branco'],
        sizes: ['39-40', '41-42', '43-44'],
        category: 'Tênis Esportivos'
    },
    'feminino-deluxe': {
        id: 'feminino-deluxe',
        name: 'Tênis Feminino Deluxe',
        price: 229.90,
        image: 'fas fa-heart',
        description: 'Elegância e conforto especialmente desenvolvido para o público feminino.',
        rating: 5,
        reviews: 178,
        colors: ['Branco', 'Rosa', 'Cinza'],
        sizes: ['35-36', '37-38', '39-40'],
        category: 'Tênis Femininos'
    },
    'training-force': {
        id: 'training-force',
        name: 'Tênis Training Force',
        price: 259.90,
        image: 'fas fa-dumbbell',
        description: 'Resistente e versátil para treinos intensos e atividades fitness.',
        rating: 4,
        reviews: 94,
        colors: ['Preto', 'Cinza', 'Azul'],
        sizes: ['39-40', '41-42', '43-44'],
        category: 'Tênis Esportivos'
    },
    'corrida': {
        id: 'corrida',
        name: 'Tênis para Corrida',
        price: 299.90,
        originalPrice: 399.90,
        image: 'fas fa-running',
        description: 'Tecnologia avançada para máximo desempenho',
        rating: 5,
        reviews: 215,
        colors: ['Azul', 'Laranja', 'Preto'],
        sizes: ['39-40', '41-42', '43-44'],
        category: 'Tênis de Corrida'
    },
    'casuais': {
        id: 'casuais',
        name: 'Tênis Casuais',
        price: 199.90,
        image: 'fas fa-walking',
        description: 'Estilo e conforto para o dia a dia',
        rating: 4,
        reviews: 167,
        colors: ['Marrom', 'Bege', 'Cinza'],
        sizes: ['37-38', '39-40', '41-42', '43-44'],
        category: 'Tênis Casuais'
    },
    'moda': {
        id: 'moda',
        name: 'Tênis de Moda',
        price: 249.90,
        image: 'fas fa-star',
        description: 'Tendências atuais em design exclusivo',
        rating: 5,
        reviews: 142,
        colors: ['Branco', 'Preto', 'Verde'],
        sizes: ['37-38', '39-40', '41-42'],
        category: 'Tênis de Moda'
    }
};

// Cart functionality
let cart = [];

function addToCart(productId) {
    const product = products[productId];
    if (!product) {
        console.error('Produto não encontrado:', productId);
        return;
    }

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();
    showToast('Produto adicionado ao carrinho!', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showToast('Produto removido do carrinho!', 'info');
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartUI();
    }
}

function updateCartUI() {
    const cartBadge = document.getElementById('cart-badge');
    const cartItems = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const emptyCart = document.getElementById('empty-cart');
    const cartFooter = document.getElementById('cart-footer');

    // Update badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'block' : 'none';
    }

    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartItems) cartItems.style.display = 'none';
        if (cartFooter) cartFooter.style.display = 'none';
    } else {
        if (emptyCart) emptyCart.style.display = 'none';
        if (cartItems) cartItems.style.display = 'block';
        if (cartFooter) cartFooter.style.display = 'block';

        // Update cart items
        if (cartItems) {
            cartItems.innerHTML = cart.map(item => `
                <div class="card mb-3">
                    <div class="card-body p-3">
                        <div class="row align-items-center">
                            <div class="col-md-2 col-12 text-center mb-2 mb-md-0">
                                <div style="font-size: 2rem; color: var(--primary-color);">
                                    <img src="${item.image} "style="width:100px" >
                                </div>
                            </div>
                            <div class="col-md-4 col-12 mb-2 mb-md-0">
                                <h6 class="card-title mb-1">${item.name}</h6>
                                <small class="text-muted">${item.description}</small>
                            </div>
                            <div class="col-md-3 col-6 mb-2 mb-md-0">
                                <label class="form-label small text-muted d-block d-md-none">Quantidade:</label>
                                <div class="input-group input-group-sm">
                                    <button class="btn btn-outline-secondary px-2 py-1" onclick="updateQuantity('${item.id}', ${item.quantity - 1})" style="min-width: 32px; font-size: 0.8rem;">-</button>
                                    <input type="text" class="form-control text-center px-1" value="${item.quantity}" readonly style="max-width: 45px; font-size: 0.85rem;">
                                    <button class="btn btn-outline-secondary px-2 py-1" onclick="updateQuantity('${item.id}', ${item.quantity + 1})" style="min-width: 32px; font-size: 0.8rem;">+</button>
                                </div>
                            </div>
                            <div class="col-md-2 col-6 text-center mb-2 mb-md-0">
                                <label class="form-label small text-muted d-block d-md-none">Subtotal:</label>
                                <strong class="text-danger">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</strong>
                                ${item.originalPrice ? `<br><small class="text-muted text-decoration-line-through">R$ ${(item.originalPrice * item.quantity).toFixed(2).replace('.', ',')}</small>` : ''}
                            </div>
                            <div class="col-md-1 col-12 text-center">
                                <label class="form-label small text-muted d-block d-md-none">Remover:</label>
                                <button class="btn btn-outline-danger btn-sm px-2 py-1" onclick="removeFromCart('${item.id}')" style="font-size: 0.8rem;">
                                    <i class="fas fa-trash" style="font-size: 0.75rem;"></i>
                                    <span class="d-md-none ms-1">Remover</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Update total
    if (cartTotalElement) {
        cartTotalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

function openCart() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        const modal = new bootstrap.Modal(cartModal);
        modal.show();
    } else {
        console.error('Modal do carrinho não encontrado!');
        showToast('Erro ao abrir o carrinho. Tente novamente.', 'danger');
    }
}

function clearCart() {
    if (cart.length === 0) return;

    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        cart = [];
        updateCartUI();
        showToast('Carrinho limpo!', 'info');
    }
}

function checkout() {
    if (cart.length === 0) {
        showToast('Seu carrinho está vazio!', 'warning');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    alert(`🛒 Finalizando compra!\n\n📦 ${itemCount} item(s) no carrinho\n💰 Total: R$ ${total.toFixed(2).replace('.', ',')}\n\n✅ Redirecionando para o pagamento...`);

    // Simulate checkout process
    setTimeout(() => {
        cart = [];
        updateCartUI();
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            const modal = bootstrap.Modal.getInstance(cartModal);
            if (modal) modal.hide();
        }
        showToast('Compra finalizada com sucesso! Obrigado pela preferência!', 'success');
    }, 1000);
}

function showToast(message, type = 'success') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.alert[style*="z-index: 9999"]');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    const bgClass = type === 'success' ? 'alert-success' : type === 'warning' ? 'alert-warning' : type === 'info' ? 'alert-info' : 'alert-danger';
    const icon = type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : type === 'info' ? 'fa-info-circle' : 'fa-times-circle';

    toast.className = `position-fixed top-0 end-0 m-3 alert ${bgClass} alert-dismissible fade show`;
    toast.style.zIndex = '9999';
    toast.innerHTML = `
        <i class="fas ${icon} me-2"></i>${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 4000);
}

// Search functionality
function initializeSearch() {
    const searchButtons = document.querySelectorAll('.btn-outline-secondary');
    const searchInputs = document.querySelectorAll('input[placeholder="Buscar tênis..."]');

    if (searchButtons.length === 0 || searchInputs.length === 0) {
        console.log('Elementos de busca não encontrados');
        return;
    }

    searchButtons.forEach((button, index) => {
        const searchInput = searchInputs[index];

        if (button && searchInput) {
            // Remove existing event listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);

            const newInput = searchInput.cloneNode(true);
            searchInput.parentNode.replaceChild(newInput, searchInput);

            // Click event
            newButton.addEventListener('click', function () {
                performSearch(newInput.value);
            });

            // Enter key event
            newInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    performSearch(this.value);
                }
            });
        }
    });
}

function performSearch(searchTerm) {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
        showToast('Digite algo para pesquisar!', 'warning');
        return;
    }

    console.log('Realizando busca por:', term);

    // If we're on the shop page, filter products
    if (window.location.pathname.includes('shop.html') || document.querySelector('.filter-section')) {
        filterProductsBySearch(term);
    } else {
        // If not on shop page, redirect to shop page with search parameter
        window.location.href = `shop.html?search=${encodeURIComponent(term)}`;
    }
}

function filterProductsBySearch(searchTerm) {
    const productItems = document.querySelectorAll('.product-item');
    let foundResults = false;

    productItems.forEach(item => {
        const title = item.querySelector('.card-title').textContent.toLowerCase();

        // Busca apenas no título do produto
        const matches = title.includes(searchTerm);

        if (matches) {
            item.style.display = 'block';
            foundResults = true;
        } else {
            item.style.display = 'none';
        }
    });

    // Show message if no results found
    const noResultsMessage = document.getElementById('no-results-message');
    if (!foundResults) {
        if (!noResultsMessage) {
            const productsGrid = document.getElementById('products-grid');
            const message = document.createElement('div');
            message.id = 'no-results-message';
            message.className = 'col-12 text-center py-5';
            message.innerHTML = `
                <i class="fas fa-search text-muted" style="font-size: 3rem;"></i>
                <h4 class="text-muted mt-3">Nenhum produto encontrado</h4>
                <p class="text-muted">Não encontramos resultados para "${searchTerm}"</p>
                <button class="btn btn-custom" onclick="clearSearch()">Limpar Busca</button>
            `;
            if (productsGrid) {
                productsGrid.appendChild(message);
            }
        }
    } else if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

function clearSearch() {
    const searchInputs = document.querySelectorAll('input[placeholder="Buscar tênis..."]');
    searchInputs.forEach(input => {
        input.value = '';
    });

    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.style.display = 'block';
    });

    const noResultsMessage = document.getElementById('no-results-message');
    if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

// Check URL for search parameter on shop page load
function checkUrlSearchParam() {
    if (window.location.pathname.includes('shop.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');

        if (searchParam) {
            const searchInputs = document.querySelectorAll('input[placeholder="Buscar tênis..."]');
            searchInputs.forEach(input => {
                input.value = searchParam;
            });
            filterProductsBySearch(searchParam);
        }
    }
}

// Shop specific functionality
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    // Convert products object to array for the shop
    const productsArray = Object.values(products);

    productsGrid.innerHTML = productsArray.map(product => `
        <div class="col-md-4 mb-4 product-item" 
             data-category="${product.category}"
             data-price="${product.price}"
             data-colors="${product.colors.join(',')}"
             data-sizes="${product.sizes.join(',')}">
            <div class="card product-card h-100">
                <div class="product-image" >
                    <img src="${product.image} "style="width:300px" >
                </div>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5> 
                    <p class="card-text">${product.description}</p>
                    <div class="mb-2">
                        <span class="h5 text-danger">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                        ${product.originalPrice ? `<small class="text-muted text-decoration-line-through ms-2">R$ ${product.originalPrice.toFixed(2).replace('.', ',')}</small>` : ''}
                    </div>
                    <div class="mb-2">
                        ${'<i class="fas fa-star text-warning"></i>'.repeat(product.rating)}
                        ${product.rating < 5 ? '<i class="far fa-star text-warning"></i>'.repeat(5 - product.rating) : ''}
                        <small class="text-muted">(${product.reviews} avaliações)</small>
                    </div>
                    <div class="mb-2">
                        <small class="text-muted">
                            <strong>Cores:</strong> ${product.colors.join(', ')} | 
                            <strong>Tamanhos:</strong> ${product.sizes.join(', ')}
                        </small>
                    </div>
                    <div class="d-grid gap-2">
                        <button class="btn btn-custom" onclick="addToCart('${product.id}')">Adicionar ao Carrinho</button>
                        <button class="btn btn-outline-secondary">Ver Detalhes</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter functionality for shop
function initializeFilters() {
    const categorySelect = document.querySelector('select');
    const priceSelect = document.querySelectorAll('select')[1];
    const sizeSelect = document.querySelectorAll('select')[2];
    const colorSelect = document.querySelectorAll('select')[3];

    if (!categorySelect) return;

    function applyFilters() {
        const selectedCategory = categorySelect.value;
        const selectedPrice = priceSelect.value;
        const selectedSize = sizeSelect.value;
        const selectedColor = colorSelect.value;

        const productItems = document.querySelectorAll('.product-item');

        productItems.forEach(item => {
            const category = item.getAttribute('data-category');
            const price = parseFloat(item.getAttribute('data-price'));
            const colors = item.getAttribute('data-colors').split(',');
            const sizes = item.getAttribute('data-sizes').split(',');

            let categoryMatch = selectedCategory === 'Todos os Tênis' || category === selectedCategory;
            let priceMatch = true;
            let sizeMatch = selectedSize === 'Todos os Tamanhos' || sizes.includes(selectedSize);
            let colorMatch = selectedColor === 'Todas as Cores' || colors.includes(selectedColor);

            // Aplicar filtro de preço
            switch (selectedPrice) {
                case 'Até R$ 150':
                    priceMatch = price <= 150;
                    break;
                case 'R$ 150 - R$ 300':
                    priceMatch = price >= 150 && price <= 300;
                    break;
                case 'R$ 300 - R$ 500':
                    priceMatch = price >= 300 && price <= 500;
                    break;
                case 'Acima de R$ 500':
                    priceMatch = price > 500;
                    break;
                default:
                    priceMatch = true;
            }

            // Mostrar/ocultar baseado em todos os filtros
            const shouldShow = categoryMatch && priceMatch && sizeMatch && colorMatch;
            item.style.display = shouldShow ? 'block' : 'none';
        });
    }

    // Adicionar event listeners a todos os selects
    [categorySelect, priceSelect, sizeSelect, colorSelect].forEach(select => {
        select.addEventListener('change', applyFilters);
    });

    // Adicionar botão de limpar filtros
    if (!document.querySelector('#clear-filters')) {
        const filterSection = document.querySelector('.filter-section');
        if (filterSection) {
            const clearButton = document.createElement('button');
            clearButton.id = 'clear-filters';
            clearButton.type = 'button';
            clearButton.className = 'btn btn-outline-secondary btn-sm mt-3';
            clearButton.textContent = 'Limpar Todos os Filtros';
            clearButton.onclick = clearAllFilters;
            filterSection.appendChild(clearButton);
        }
    }
}

function clearAllFilters() {
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.selectedIndex = 0;
    });

    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.style.display = 'block';
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function () {
    updateCartUI();
    initializeSearch();
    checkUrlSearchParam();

    // Initialize shop if on shop page
    if (window.location.pathname.includes('shop.html') || document.querySelector('.filter-section')) {
        loadProducts();
        initializeFilters();
    }
});