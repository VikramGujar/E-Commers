// Update the cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    
    // Update the cart count in local storage
    localStorage.setItem('itemsCount', totalCount);
    
    // Update cart count displayed on the page
    const cartCountElements = document.querySelectorAll('#count');
    cartCountElements.forEach(el => {
        el.textContent = totalCount;
    });
};

// Function to add a product to the cart
const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
};

const removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
};
