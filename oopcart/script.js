class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
        this.updateDisplay();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.updateDisplay();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    displayCart() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';

        this.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.product.name} - Quantity: ${item.quantity}, Total Price: $${item.getTotalPrice().toFixed(2)}`;
            cartItems.appendChild(li);
        });

        document.getElementById('cart-total').textContent = `Total: $${this.getTotal().toFixed(2)}`;
    }

    updateDisplay() {
        this.displayCart();
    }
}

const apple = new Product(1, 'Apple', 0.99);
const banana = new Product(2, 'Banana', 1.29);
const cherry = new Product(3, 'Cherry', 2.99);

const cart = new ShoppingCart();

document.getElementById('product-list').addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        const productId = parseInt(e.target.getAttribute('data-id'), 10);
        const quantity = parseInt(prompt('Enter quantity:'), 10);
        if (quantity > 0) {
            switch (productId) {
                case 1:
                    cart.addItem(apple, quantity);
                    break;
                case 2:
                    cart.addItem(banana, quantity);
                    break;
                case 3:
                    cart.addItem(cherry, quantity);
                    break;
            }
        }
    }
});
