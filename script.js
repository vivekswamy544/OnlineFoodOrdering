
// Food Menu Data

const foods = [

    {
        id: 1,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 250,
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500"
    },

    {
        id: 2,
        name: "Cheese Burger",
        category: "Burger",
        price: 150,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
    },

    {
        id: 3,
        name: "Chicken Biryani",
        category: "Biryani",
        price: 220,
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=500"
    },

    {
        id: 4,
        name: "Cold Coffee",
        category: "Drinks",
        price: 100,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500"
    },

    {
        id: 5,
        name: "Pepperoni Pizza",
        category: "Pizza",
        price: 350,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
    },

    {
        id: 6,
        name: "Veg Burger",
        category: "Burger",
        price: 120,
        image: "https://images.unsplash.com/photo-155 burger"
    }

];


// Shopping Cart

let cart = [];


// Display Food Items

function displayFoods(category = "All") {

    const container =
        document.getElementById("food-container");

    container.innerHTML = "";

    const filteredFoods = category === "All"
        ? foods
        : foods.filter(food => food.category === category);

    filteredFoods.forEach(food => {

        const card = document.createElement("div");

        card.className = "food-card";

        card.innerHTML = `

            <img src="${food.image}"
                 alt="${food.name}">

            <h3>${food.name}</h3>

            <p>Category: ${food.category}</p>

            <p class="price">
                ₹${food.price}
            </p>

            <button class="add-btn"
                    data-testid="add-to-cart"
                    onclick="addToCart(${food.id})">

                Add to Cart

            </button>

        `;

        container.appendChild(card);

    });

}


// Category Filtering

document.querySelectorAll(".category-btn")
    .forEach(button => {

        button.addEventListener("click", function() {

            document.querySelectorAll(".category-btn")
                .forEach(btn => btn.classList.remove("active"));

            this.classList.add("active");

            const category = this.dataset.category;

            displayFoods(category);

        });

    });


// Add Food to Cart

function addToCart(id) {

    const food = foods.find(item => item.id === id);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...food,
            quantity: 1
        });

    }

    updateCart();

}


// Update Cart

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const totalPrice =
        document.getElementById("total-price");

    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;

    if (cart.length === 0) {

        cartItems.textContent = "Your cart is empty.";

    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;

        const div = document.createElement("div");

        div.textContent =
            `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`;

        cartItems.appendChild(div);

    });

    cartCount.textContent = count;

    totalPrice.textContent = total;

}


// Checkout

function checkout() {

    const message =
        document.getElementById("order-message");

    if (cart.length === 0) {

        message.textContent =
            "Please add food items before placing an order.";

        return;

    }

    message.textContent =
        "Your order has been placed successfully!";

    cart = [];

    updateCart();

}


// Initial Display

displayFoods();

updateCart();
