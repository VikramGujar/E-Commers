document.addEventListener('DOMContentLoaded', () => {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartCountElement = document.getElementById('count');
    

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log(cartItems)
    if (cartItems.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        let totalQuantity = 0;
        cartItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');

            const itemImage = document.createElement('img');
            itemImage.src = item.thumbnail;
            itemImage.alt = item.title;
            itemImage.style.width = '100px'; 
            const itemTitle = document.createElement('h2');
            itemTitle.textContent = item.title;

            const itemPrice = document.createElement('p');
            itemPrice.textContent = `Price: $${item.price}`;


            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❎';
            deleteButton.style.marginLeft = '20px';
            deleteButton.addEventListener('click', () => {
                removeItemFromCart(index);
            });

            itemDiv.append(itemImage, itemTitle, itemPrice, deleteButton);
            cartItemsDiv.appendChild(itemDiv);

            totalQuantity = cartItems.length;
        });

        cartCountElement.textContent = totalQuantity;

        localStorage.setItem('itemsCount', totalQuantity);
    }

    function removeItemFromCart(index) {
        cartItems.splice(index, 1);

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        location.reload();
    }
});
