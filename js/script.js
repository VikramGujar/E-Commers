const mainDiv = document.getElementById("productsList");

const fetchData = async () => {
    try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        console.log(data);
        displayData(data);
        displayMenuData(data);
    } catch (err) {
        console.log(err);
        mainDiv.innerHTML = `<p>Unable to load products. Please try again later.</p>`;
    }
};

const displayData = (data) => {
    if (!data.products) {
        mainDiv.innerHTML = `<p>No products found.</p>`;
        return;
    }

    data.products.forEach((p) => {
        const proDiv = document.createElement('div');
        proDiv.classList.add('product');


        const proImage = document.createElement('img');
        proImage.src = p.thumbnail;
        proImage.alt = p.title;

        const proLink = document.createElement('a');
        proLink.href = `./product.html?pid=${p.id}`;
        proLink.target = '_blank';

        const proTitle = document.createElement('h2');
        proTitle.textContent = p.title;
        proLink.append(proTitle);

        const proPrice = document.createElement('p');
        proPrice.textContent = "Price: $" + p.price;

        const addButton = document.createElement('button');
        addButton.textContent = "Add to Cart";
        addButton.classList.add('btn', 'btn-primary');
        addButton.addEventListener('click', () => addToCart(p));

        proDiv.append(proImage, proLink, proPrice, addButton);
        mainDiv.append(proDiv);
    });
};

const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    cart.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.title} added to cart!`);
};

const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    document.getElementById('count').textContent = cart.length;
};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    updateCartCount();
});


const displayMenuData = (data) => {
data.products.forEach((menu) => {

const filterMenu = document.getElementById('filter-menu');
const menuList = document.createElement('li');
filterMenu.append(menuList);
menuList.textContent = menu.category;
});
};

displayMenuData();