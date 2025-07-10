const productList = document.getElementById('product-list');
const categorySelect = document.getElementById('category-select');
const searchInput = document.getElementById('search');
const cartCount = document.getElementById('cart-count');

let allProducts = [];
let cart = 0;


fetch('https://fakestoreapi.com/products/categories')
  .then(res => res.json())
  .then(categories => {
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      categorySelect.appendChild(option);
    });
  });


fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    displayProducts(allProducts);
  })
  .catch(error => {
    console.error('Error fetching products:', error);
    productList.innerHTML = '<p>Failed to load products.</p>';
  });

function displayProducts(products) {
  productList.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <div class="price">₹${product.price}</div>
      <button class="add-to-cart">Add to Cart</button>
    `;

    card.querySelector('.add-to-cart').addEventListener('click', () => {
      cart++;
      cartCount.textContent = cart;
    });

    productList.appendChild(card);
  });
}

// Filter by category
categorySelect.addEventListener('change', () => {
  const selected = categorySelect.value;

  const filtered = selected === 'all'
    ? allProducts
    : allProducts.filter(p => p.category === selected);

  displayProducts(filtered);
});


searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(query)
  );
  displayProducts(filtered);
});

