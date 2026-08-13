document.addEventListener('DOMContentLoaded', function (e) {

    let productContainer = document.getElementById('product-container')
    let products = [
        { name: "Product 1", price: 35.99, id: "1", qty: 1 },
        { name: "Product 2", price: 45.99, id: "2", qty: 1 },
        { name: "Product 3", price: 55.99, id: "3", qty: 1 },
        { name: "Product 4", price: 95.99, id: "4", qty: 1 }
    ]

    var total = 0;
    var cart = [];
    products.forEach((each) => {
        renderProduct(each);
    })

    function renderProduct(product) {
        // Grab UI elements
        let parentDiv = document.createElement('div');
        let productInfo = document.createElement('h2')
        let addToCartBtn = document.createElement('button')

        // Create elements, add properties and innerHTML
        parentDiv.classList = "flex justify-between bg-neutral-100/10 px-2 py-1 rounded-sm";
        parentDiv.setAttribute('data-id', product.id);

        productInfo.classList = "text-white"
        productInfo.innerText = `${product.name} - ${product.price}`


        addToCartBtn.classList = "text-white bg-indigo-700 rounded-sm px-2 cursor-pointer hover:bg-indigo-700/70 transition duration-100"
        addToCartBtn.innerText = "Add to Cart"
        addToCartBtn.addEventListener('click', function (e) {
            // check if product exists in array
            const existingProduct = cart.find((item) => item.id === product.id);

            if (existingProduct) {
                existingProduct.qty += 1;
                updateCart() // updateCart re-renders UI only
            }
            else {
                product.qty = 1;
                cart.push(product)
                renderCart(product)
            }

            console.log("cart:", cart);
            makeTotal(product)

        })
        const productCard = `
        <div class="flex justify-between bg-neutral-100/10 px-2 py-1 rounded-sm" data-id="${product.id}">
            <h2 class="text-white">${product.name} - ${product.price}</h2>
            <button class="text-white bg-indigo-700 rounded-sm px-2 cursor-pointer">Add to Cart</button>
        </div>
        `

        parentDiv.appendChild(productInfo)
        parentDiv.appendChild(addToCartBtn)
        productContainer.appendChild(parentDiv);

    }

    function renderCart(product) {
        let cartContainer = document.getElementById('product-cart');
        let container = document.createElement('p')
        let span = document.createElement('span')
        let btn = document.createElement('button')

        container.classList = "flex justify-between text-white text-[16px] bg-neutral-100/10 px-2 py-1 rounded-sm"
        span.innerHTML = `${product.name} - ${product.price} | Qty: ${product.qty}`
        btn.classList = "bg-rose-800/70 px-2 rounded-sm shadow-xl cursor-pointer hover:bg-rose-800/90 transition duration-100"
        btn.innerText = "Remove"

        btn.addEventListener('click', function () {
            cart = cart.filter((each) => each.id !== product.id);
            container.remove();
            reduceTotal(product)
        })

        container.appendChild(span)
        container.appendChild(btn)

        let template = `
            <p class="flex justify-between text-white text-[16px] bg-neutral-100/10 px-2 py-1 rounded-sm">
                <span>${product.name} - ${product.price}</span>
                <button class="bg-rose-500/70 px-2 rounded-sm shadow-xl cursor-pointer hover:bg-rose-800/90 transition duration-100">Remove</button>
            
            </p> 
        `

        cartContainer.appendChild(container)
    }

    /**
    * Add current product.price to total variable 
    * Renders total element in UI
    * @param {Object} product - Takes the current product being added
    */
    function makeTotal(product) {

        total += product.price;
        console.log(total);

        let totalElement = document.getElementById('total');
        totalElement.innerText = " " + total.toFixed(2)
    }

    function reduceTotal(product) {
        let totalElement = document.getElementById('total')
        total -= (product.price * (product.qty));
        if (total < 0) {
            total = 0;
            totalElement.innerText = "";
        }
        else {
            totalElement.innerText = " " + total.toFixed(2);
        }
    }

    function updateCart() {
        let cartContainer = document.getElementById('product-cart');
        cartContainer.innerHTML = "";
        cart.forEach((each) => renderCart(each));
    }

    let buyBtn = document.getElementById('buy');
    buyBtn.addEventListener('click', function () {
        let buyNow = []
        cart.forEach((each) => buyNow.push(each));
        buyNow.push(`total: "${total.toString()}"`);
        let checkList = JSON.stringify(buyNow);
        console.log(checkList)
    })
})