document.addEventListener('DOMContentLoaded', () => {
    // Initial product category
    let currentCategory = 'Men';

    // Fetch product data from the API
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            showProducts(currentCategory, data);
        })
        .catch(error => console.error('Error fetching product data:', error));
});

function showProducts(category, data) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`${category}-tab`).classList.add('active');

    // Filter products by category
   
    const products = data.categories.find(cat => cat.category_name === 'Women').category_products;   

    const productContainer = document.querySelector('.product-list');
    productContainer.innerHTML = '';

    // Populate product cards
    products.forEach(product => {
        const card = createProductCard(product);
        productContainer.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const image = document.createElement('img');
    image.src = product.image;
    card.appendChild(image);

    const title = document.createElement('div');
    title.classList.add('title');
    const h3 = document.createElement('h3');
    h3.textContent = `${product.title}`;
    const p = document.createElement('p');
    p.textContent = product.vendor;
    title.appendChild(h3);
    title.appendChild(p);
    card.appendChild(title);


    const price = document.createElement('div');
    price.classList.add('price');
    const actual = document.createElement('h5');
    actual.textContent = `Rs ${product.price}.00`
    price.appendChild(actual);
    const old = document.createElement('h5');
    old.textContent = `${product.compare_at_price}.00`;
    const discount = document.createElement('p');
    discount.textContent = `50% off`;
    price.appendChild(actual);
    price.appendChild(old);
    price.appendChild(discount);
    card.appendChild(price);

    const addToCartBtn = document.createElement('button');
    addToCartBtn.textContent = 'Add to Cart';
    card.appendChild(addToCartBtn);

    return card;
}
