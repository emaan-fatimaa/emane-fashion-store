document.addEventListener("DOMContentLoaded", function () {

    // Get saved cart from Local Storage

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    // Get checkout elements

    const checkoutItems =
        document.getElementById("checkoutItems");

    const checkoutTotal =
        document.getElementById("checkoutTotal");


    // Check if cart is empty

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p class="checkout-empty">
                Your cart is empty.
            </p>
        `;

        return;

    }


    // Show products in order summary

    cart.forEach(function (item) {

        const checkoutItem =
            document.createElement("div");


        checkoutItem.classList.add(
            "checkout-item"
        );


        checkoutItem.innerHTML = `

            <div>

                <h4>
                    ${item.name}
                </h4>

                <p>
                    Quantity: ${item.quantity}
                </p>

            </div>


            <strong>

                PKR ${(
                    item.price *
                    item.quantity
                ).toLocaleString()}

            </strong>

        `;


        checkoutItems.appendChild(
            checkoutItem
        );

    });


    // Calculate total

    const total =
        cart.reduce(
            function (sum, item) {

                return sum +
                    (
                        item.price *
                        item.quantity
                    );

            },
            0
        );


    // Show total

    checkoutTotal.textContent =
        "PKR " +
        total.toLocaleString();

        // Place order through WhatsApp

const checkoutForm =
    document.getElementById("checkoutForm");


checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const customerName =
            document.getElementById(
                "customerName"
            ).value;


        const customerPhone =
            document.getElementById(
                "customerPhone"
            ).value;


        const customerAddress =
            document.getElementById(
                "customerAddress"
            ).value;


        let orderMessage =
            "✨ *NEW EMANÈ ORDER* ✨\n\n";


        orderMessage +=
            "*Customer Name:* " +
            customerName +
            "\n";


        orderMessage +=
            "*Phone Number:* " +
            customerPhone +
            "\n";


        orderMessage +=
            "*Delivery Address:* " +
            customerAddress +
            "\n\n";


        orderMessage +=
            "🛍️ *ORDER DETAILS*\n\n";


        cart.forEach(
            function (item) {

                const itemTotal =
                    item.price *
                    item.quantity;


                orderMessage +=
                    "• " +
                    item.name +
                    "\n";


                orderMessage +=
                    "Quantity: " +
                    item.quantity +
                    "\n";


                orderMessage +=
                    "Price: PKR " +
                    itemTotal.toLocaleString() +
                    "\n\n";

            }
        );


        orderMessage +=
            "💰 *TOTAL: PKR " +
            total.toLocaleString() +
            "*";


        // Your WhatsApp number

        const whatsappNumber =
            "923190718182"; // Replace with your number


        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(
                orderMessage
            );


        window.open(
            whatsappURL,
            "_blank"
        );

    }
);
});