window.addEventListener("load", () => {

    const loader =
    document.querySelector(".loader");

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 1200);

});

// ==========================
// HEADER SCROLL
// ==========================

const header =
document.getElementById("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});

// ==========================
// MENU MOBILE
// ==========================

const menuToggle =
document.getElementById("menu-toggle");

const nav =
document.getElementById("nav");

menuToggle.addEventListener("click", () => {

    nav.classList.toggle("active");

});

// ==========================
// CERRAR MENU
// ==========================

document.querySelectorAll("nav a")
.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});

// ==========================
// ANIMACIONES
// ==========================

const elements =
document.querySelectorAll(
".fade-up, .fade-left, .fade-right"
);

const observer =
new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

elements.forEach(el => {

    observer.observe(el);

});

// ==========================
// LIGHTBOX GALERIA
// ==========================

const galleryImages =
document.querySelectorAll(
".gallery-container img"
);

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        const overlay =
        document.createElement("div");

        overlay.classList.add("lightbox");

        const img =
        document.createElement("img");

        img.src = image.src;

        overlay.appendChild(img);

        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => {

            overlay.remove();

        });

    });

});

// ==========================
// CARRITO PREMIUM
// ==========================

const cartFloating =
document.getElementById("cart-floating");

const cartPanel =
document.getElementById("cart-panel");

const closeCart =
document.getElementById("close-cart");

const cartItems =
document.getElementById("cart-items");

const cartTotal =
document.getElementById("cart-total");

const cartCount =
document.getElementById("cart-count");

const addCartButtons =
document.querySelectorAll(".add-cart");

const sendWhatsapp =
document.getElementById("send-whatsapp");

const clearCartBtn =
document.getElementById("clear-cart");

const cartOverlay =
document.getElementById("cart-overlay");

// ==========================
// STORAGE
// ==========================

let cart =
JSON.parse(
localStorage.getItem("morenaCart")
) || [];

// ==========================
// ABRIR CARRITO
// ==========================

cartFloating.addEventListener("click", () => {

    cartPanel.classList.add("active");

    cartOverlay.classList.add("active");

});

// ==========================
// CERRAR
// ==========================

function closeCartPanel(){

    cartPanel.classList.remove("active");

    cartOverlay.classList.remove("active");

}

closeCart.addEventListener(
"click",
closeCartPanel
);

cartOverlay.addEventListener(
"click",
closeCartPanel
);

// ==========================
// AGREGAR SERVICIO
// ==========================

addCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name =
        button.dataset.name;

        const price =
        Number(button.dataset.price);

        const existingItem =
        cart.find(item => item.name === name);

        if(existingItem){

            existingItem.quantity++;

        }else{

            cart.push({
                name,
                price,
                quantity:1
            });

        }

        saveCart();

        updateCart();

        animateCart();

    });

});

// ==========================
// ANIMACION ICONO
// ==========================

function animateCart(){

    cartFloating.classList.add("bounce");

    setTimeout(() => {

        cartFloating.classList.remove("bounce");

    }, 500);

}

// ==========================
// GUARDAR
// ==========================

function saveCart(){

    localStorage.setItem(
        "morenaCart",
        JSON.stringify(cart)
    );

}

// ==========================
// ACTUALIZAR CARRITO
// ==========================

function updateCart(){

    cartItems.innerHTML = "";

    let total = 0;

    let totalItems = 0;

    if(cart.length === 0){

        cartItems.innerHTML = `
        
        <p class="empty-cart">
            No has agregado servicios
        </p>
        
        `;

    }

    cart.forEach((item,index) => {

        total += item.price * item.quantity;

        totalItems += item.quantity;

        cartItems.innerHTML += `
        
        <div class="cart-item">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p>
                    $${item.price.toLocaleString()}
                </p>

            </div>

            <div class="cart-controls">

                <button
                onclick="decreaseQuantity(${index})">

                    -

                </button>

                <span>${item.quantity}</span>

                <button
                onclick="increaseQuantity(${index})">

                    +

                </button>

            </div>

            <button
            class="remove-item"
            onclick="removeItem(${index})">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

    });

    cartTotal.textContent =
    "$" + total.toLocaleString();

    cartCount.textContent =
    totalItems;

}

// ==========================
// AUMENTAR
// ==========================

function increaseQuantity(index){

    cart[index].quantity++;

    saveCart();

    updateCart();

}

// ==========================
// DISMINUIR
// ==========================

function decreaseQuantity(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    saveCart();

    updateCart();

}

// ==========================
// ELIMINAR
// ==========================

function removeItem(index){

    cart.splice(index,1);

    saveCart();

    updateCart();

}

// ==========================
// VACIAR
// ==========================

clearCartBtn.addEventListener("click", () => {

    cart = [];

    saveCart();

    updateCart();

});

// ==========================
// WHATSAPP
// ==========================

sendWhatsapp.addEventListener("click", () => {

    if(cart.length === 0){

        alert(
        "Agrega al menos un servicio"
        );

        return;

    }

    const clientName =
    document.getElementById("client-name").value;

    const clientPhone =
    document.getElementById("client-phone").value;

    let message =
    `Hola, quiero reservar:%0A%0A`;

    if(clientName){

        message +=
        `👤 Nombre: ${clientName}%0A`;

    }

    if(clientPhone){

        message +=
        `📞 Teléfono: ${clientPhone}%0A`;

    }

    message += `%0A`;

    cart.forEach(item => {

        message +=
        `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}%0A`;

    });

    message +=
    `%0ATotal: ${cartTotal.textContent}`;

    window.open(
    `https://wa.me/573202114207?text=${message}`,
    "_blank"
    );

});

// ==========================
// INIT
// ==========================

updateCart();
