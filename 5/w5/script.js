let products = [
    {
        name:"Headphones",
        price:7999,
        category:"electronics",
        img:"https://images.unsplash.com/photo-1518444028904-4d3a5d1d7d0c?w=400"
    },
    {
        name:"Smartwatch",
        price:12999,
        category:"electronics",
        img:"https://images.unsplash.com/photo-1511732351155-6b7e8a94c0c1?w=400"
    },
    {
        name:"T-Shirt",
        price:999,
        category:"fashion",
        img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
    },
    {
        name:"Shoes",
        price:2999,
        category:"fashion",
        img:"https://images.unsplash.com/photo-1528701800489-20be3c6c0b9d?w=400"
    }
];
function displayProducts(list) {
    let container = document.getElementById("productcontainer");
    container.innerHTML = "";
    list.forEach(p => {
        let card = `
        <div class="col-md-4col-sm-6 mb-4">
            <div class="card">
                <img src="${p.img}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${p.name}</h5>
                    <p class="card-text">₹${p.price}</p>
                </div>
            </div>
        </div>
        `
        container.innerHTML += card;
    })
}
function filterproducts(category) {
    if(category === "all") {
        displayProducts(products);
    } else {
        let filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}
displayProducts(products);