const leftDiv = document.getElementById("left");
const rightDiv = document.getElementById("right");

const fetchProduct = async () => {
    const pid = new URLSearchParams(window.location.search).get('pid');
    if (!pid) {
        leftDiv.innerHTML = `<p>No product ID found.</p>`;
        return;
    }

    try {
        const res = await fetch(`https://dummyjson.com/products/${pid}`);
        const data = await res.json();
        displayProduct(data);
    } catch (err) {
        console.log(err);
        leftDiv.innerHTML = `<p>Unable to load product details. Please try again later.</p>`;
    }
};

const displayProduct = (product) => {
    const productImg = document.createElement('img');
    productImg.src = product.thumbnail;
    productImg.alt = product.title;
    productImg.style.width = '30%';

    const productTitle = document.createElement('h2');
    productTitle.textContent = product.title;

    const productPrice = document.createElement('p');
    productPrice.textContent = `Price: $${product.price}`;

    const productDesc = document.createElement('p');
    productDesc.textContent = product.description;

    leftDiv.append(productImg, productTitle, productPrice, productDesc);

    const backLink = document.createElement('a');
    backLink.href = 'index.html';
    backLink.textContent = 'Back to Product List';
    backLink.classList.add('btn', 'btn-primary');

    rightDiv.append(backLink);
};

fetchProduct();
