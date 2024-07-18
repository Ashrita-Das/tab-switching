// Show the "Men" tab by default
document.addEventListener('DOMContentLoaded', () => {
    showTab('men');
    fetchProducts();
});


function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    const activeTab = document.getElementById(tabId);
    activeTab.classList.add('active');

}

function fetchProducts() {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            const menProducts = data.categories.find(category => category.category_name === "Men").category_products;
            const womenProducts = data.categories.find(category => category.category_name === "Women").category_products;
            const kidsProducts = data.categories.find(category => category.category_name === "Kids").category_products;

            displayProducts(menProducts, 'men-products');
            displayProducts(womenProducts, 'women-products');
            displayProducts(kidsProducts, 'kids-products');
        })
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            ${product.badge_text ? `<div class="badge">${product.badge_text}</div>` : ''}
            <img src="${product.image}" alt="${product.title}">
            <p class="text"><span class="title">${product.title}</span><span class="vendor"> • ${product.vendor}</span></p>
            <p class="price">Rs.${parseFloat(product.price).toFixed(2)}
            <span class="prev-price">${parseFloat(product.compare_at_price).toFixed(2)}</span>
            <span class="discount">${discount(product.price, product.compare_at_price)}% Off</span>
            </p>
            <button class="add">Add to Cart</button>
            `;
        container.appendChild(productDiv);
    });
}
// calculate discount price
function discount(curr_price, prev_price) {
    const discountPrice = ((prev_price - curr_price) / prev_price) * 100;
    return parseFloat(discountPrice).toFixed(0);
}