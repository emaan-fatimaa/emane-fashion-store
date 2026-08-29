document.addEventListener("DOMContentLoaded", function () {

    const cartBtn = document.getElementById("cartBtn");
    const closeCart = document.getElementById("closeCart");

    const cartSidebar = document.getElementById("cartSidebar");
    const cartOverlay = document.getElementById("cartOverlay");

    const cartItemsContainer = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");
    const checkoutBtn = document.querySelector(".checkout-btn");
    const addCartButtons = document.querySelectorAll(".add-cart-btn");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    // ==========================
    // OPEN CART
    // ==========================

    cartBtn.addEventListener("click", function () {

        cartSidebar.classList.add("active");
        cartOverlay.classList.add("active");

    });


    // ==========================
    // CLOSE CART
    // ==========================

    function closeCartSidebar() {

        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");

    }


    closeCart.addEventListener("click", closeCartSidebar);

    cartOverlay.addEventListener("click", closeCartSidebar);


    // ==========================
    // ADD PRODUCT TO CART
    // ==========================

    addCartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productCard =
                button.closest(".product-card");

            const productName =
                productCard.dataset.name;

            const productPrice =
                Number(productCard.dataset.price);


            // Check if product already exists

            const existingProduct =
                cart.find(function (item) {

                    return item.name === productName;

                });


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({

                    name: productName,

                    price: productPrice,

                    quantity: 1

                });

            }


            updateCart();


            // Open cart automatically

            cartSidebar.classList.add("active");

            cartOverlay.classList.add("active");

        });

    });


    // ==========================
    // UPDATE CART
    // ==========================

    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        cartItemsContainer.innerHTML = "";


        // EMPTY CART

        if (cart.length === 0) {

            cartItemsContainer.innerHTML = `
                <p class="empty-cart">
                    Your cart is empty.
                </p>
            `;

        } else {


            // CREATE CART ITEMS

            cart.forEach(function (item, index) {

                const cartItem =
                    document.createElement("div");

                cartItem.classList.add("cart-item");


                cartItem.innerHTML = `

                    <div class="cart-item-info">

                        <h4>${item.name}</h4>

                        <p>
                            PKR ${item.price.toLocaleString()}
                        </p>

                    </div>


                    <div class="cart-item-actions">


                        <div class="quantity-controls">

                            <button
                                class="decrease-btn"
                                data-index="${index}"
                            >
                                −
                            </button>


                            <span>
                                ${item.quantity}
                            </span>


                            <button
                                class="increase-btn"
                                data-index="${index}"
                            >
                                +
                            </button>

                        </div>


                        <button
                            class="remove-item"
                            data-index="${index}"
                        >
                            Remove
                        </button>


                    </div>

                `;


                cartItemsContainer.appendChild(
                    cartItem
                );

            });

        }


        // ==========================
        // CART COUNT
        // ==========================

        const totalItems =
            cart.reduce(function (total, item) {

                return total + item.quantity;

            }, 0);


        cartCount.textContent =
            totalItems;


        // ==========================
        // TOTAL PRICE
        // ==========================

        const totalPrice =
            cart.reduce(function (total, item) {

                return total +
                    (item.price * item.quantity);

            }, 0);


        cartTotal.textContent =
            "PKR " +
            totalPrice.toLocaleString();


        // ==========================
        // QUANTITY BUTTONS
        // ==========================

        const increaseButtons =
            document.querySelectorAll(".increase-btn");


        increaseButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    cart[index].quantity++;


                    updateCart();

                }
            );

        });


        const decreaseButtons =
            document.querySelectorAll(".decrease-btn");


        decreaseButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    // If quantity is more than 1

                    if (
                        cart[index].quantity > 1
                    ) {

                        cart[index].quantity--;

                    } else {

                        // Remove item

                        cart.splice(
                            index,
                            1
                        );

                    }


                    updateCart();

                }
            );

        });


        // ==========================
        // REMOVE BUTTON
        // ==========================

        const removeButtons =
            document.querySelectorAll(".remove-item");


        removeButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    cart.splice(index, 1);


                    updateCart();

                }
            );

        });

    }
     // Go to checkout page

checkoutBtn.addEventListener("click", function () {

    window.location.href = "checkout.html";

});

// QUICK VIEW POPUP

const quickViewButtons =
    document.querySelectorAll(".quick-view-btn");


const quickViewOverlay =
    document.getElementById("quickViewOverlay");


const quickViewModal =
    document.getElementById("quickViewModal");


const quickViewClose =
    document.getElementById("quickViewClose");


const quickViewImage =
    document.getElementById("quickViewImage");


const quickViewName =
    document.getElementById("quickViewName");


const quickViewPrice =
    document.getElementById("quickViewPrice");


const quickViewAddCart =
    document.getElementById("quickViewAddCart");


let selectedProduct = null;


// OPEN QUICK VIEW

quickViewButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard =
            button.closest(".product-card");


        const productName =
            productCard.dataset.name;


        const productPrice =
            productCard.dataset.price;


        const productImage =
            productCard.querySelector("img").src;


        selectedProduct = {

            name: productName,

            price: Number(productPrice),

            image: productImage,

            quantity: 1

        };


        quickViewImage.src =
            productImage;


        quickViewName.textContent =
            productName;


        quickViewPrice.textContent =
            "PKR " +
            Number(productPrice).toLocaleString();


        quickViewOverlay.classList.add(
            "active"
        );


        quickViewModal.classList.add(
            "active"
        );

    });

});


// CLOSE QUICK VIEW

function closeQuickView() {

    quickViewOverlay.classList.remove(
        "active"
    );


    quickViewModal.classList.remove(
        "active"
    );

}


quickViewClose.addEventListener(
    "click",
    closeQuickView
);


quickViewOverlay.addEventListener(
    "click",
    closeQuickView
);


// ADD PRODUCT FROM QUICK VIEW TO CART

quickViewAddCart.addEventListener(
    "click",
    function () {

        if (!selectedProduct) {

            return;

        }


        const existingProduct =
            cart.find(function (item) {

                return item.name ===
                    selectedProduct.name;

            });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push(
                selectedProduct
            );

        }


        updateCart();


        closeQuickView();

    }
);

    // PRODUCT SEARCH

const productSearch =
    document.getElementById("productSearch");


const productCards =
    document.querySelectorAll(".product-card");


productSearch.addEventListener(
    "input",
    function () {

        const searchValue =
            productSearch.value
                .toLowerCase()
                .trim();


        productCards.forEach(
            function (card) {

                const productName =
                    card.dataset.name
                        .toLowerCase();


                if (
                    productName.includes(
                        searchValue
                    )
                ) {

                    card.style.display =
                        "";

                } else {

                    card.style.display =
                        "none";

                }

            }
        );

    }
);


    // Load saved cart when website opens

    updateCart();

});

// Back To Top Button

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTop.style.display = "flex";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}); 

// PRELOADER

window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");

    setTimeout(function () {
        preloader.classList.add("hide");
    }, 1500);
});

// =========================
// QUICK VIEW FUNCTIONALITY
// =========================

const quickViewModal = document.getElementById("quickViewModal");
const closeQuickView = document.getElementById("closeQuickView");

const quickViewImage = document.getElementById("quickViewImage");
const quickViewName = document.getElementById("quickViewName");
const quickViewCollection = document.getElementById("quickViewCollection");
const quickViewPrice = document.getElementById("quickViewPrice");

const quickViewButtons = document.querySelectorAll(".quick-view-btn");

quickViewButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const product = button.closest(".collection-product");

        const image = product.querySelector("img").src;
        const name = product.querySelector("h3").textContent;
        const collection = product.querySelector("p").textContent;

        const priceElement = product.querySelector(".price");
        const price = priceElement.textContent;

        quickViewImage.src = image;
        quickViewName.textContent = name;
        quickViewCollection.textContent = collection;
        quickViewPrice.textContent = price;

        quickViewModal.classList.add("active");

    });

});

closeQuickView.addEventListener("click", function () {

    quickViewModal.classList.remove("active");

});

quickViewModal.addEventListener("click", function (event) {

    if (event.target === quickViewModal) {

        quickViewModal.classList.remove("active");

    }

});

