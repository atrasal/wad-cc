let products = [
    {name:"Laptop", price: 60000, desc: "AI", img:"./images/laptop.jpeg"},
    {name:"Smartphone", price: 30000, desc: "5G", img:"./images/smartphone.jpeg"},
    {name:"Headphones", price: 5000, desc: "Noise Cancelling", img:"./images/headphones.jpeg"},
    {name:"Smartwatch", price: 10000, desc: "Fitness Tracking", img:"./images/smartwatch.jpeg"},
    {name:"Camera", price: 45000, desc: "DSLR", img:"./images/camera.jpeg"},
    {name:"Gaming Console", price: 40000, desc: "4K Gaming", img:"./images/console.jpeg"},
    {name:"Tablet", price: 20000, desc: "Portable", img:"./images/tablet.jpeg"},
    {name:"Bluetooth Speaker", price: 3000, desc: "Waterproof", img:"./images/speaker.jpeg"},
    {name:"External Hard Drive", price: 8000, desc: "2TB Storage", img:"./images/harddrive.jpeg"},
    {name:"Wireless Mouse", price: 1500, desc: "Ergonomic Design", img:"./images/mouse.jpeg"},
    {name:"Mechanical Keyboard", price: 7000, desc: "RGB Lighting", img:"./images/keyboard.jpeg"},
    {name:"Fitness Tracker", price: 5000, desc: "Heart Rate Monitor", img:"./images/fitnesstracker.jpeg"},
    {name:"Smart Home Hub", price: 8000, desc: "Voice Control", img:"./images/smarthome.jpeg"}
];

let currpage = 1;
let itemsperpage = 5;
function displayProducts() {
    let tableBody = document.querySelector("#productTable tbody");
    tableBody.innerHTML = "";
    let start = (currpage - 1) * itemsperpage;
    let end = start + itemsperpage;
    let paginatedProducts = products.slice(start, end);
    paginatedProducts.forEach(p => {
        let row = `<tr>
            <td><img src = "${p.img}"></td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.desc}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}
function nextPage() {
    if( currpage * itemsperpage < products.length) {
        currpage++;
        displayProducts();
    }
}
function prevPage() {
    if(currpage > 1) {
        currpage--;
        displayProducts();
    }
}
displayProducts();