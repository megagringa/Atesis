let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let splitBillBtn = document.querySelector('.splitBill');
let cancelAllBtn = document.querySelector('.cancelAll');
let callWaiterBtn = document.querySelector('.callWaiter');
let orderBeerBtn = document.querySelector('.orderBeer');
let requestBillButton = document.querySelector('.requestBill');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

splitBillBtn.addEventListener('click', () => {
    let numberOfPeople = prompt('Division de cuenta:');
    numberOfPeople = parseInt(numberOfPeople);

    if (numberOfPeople && numberOfPeople > 0) {
        divideBill(numberOfPeople);
    } else {
        alert('Division de cuenta de comensales.');
    }
});

cancelAllBtn.addEventListener('click', () => {
    listCards = [];
    reloadCard();
});

callWaiterBtn.addEventListener('click', () => {
    alert('Llamando mesero!.');
});

orderBeerBtn.addEventListener('click', () => {
    alert('Cerveza Artesanal en marcha! Disfrutala!');
});

requestBillButton.addEventListener('click', () => {
    alert('Cuenta solicitada. ¡Gracias por su visita!');
});

let products = [
    {
        id: 1,
        name: 'Fideos con Salsa',
        Image: 'fxs.jpg',
        price: 1500,
    },
    {
        id: 2,
        name: 'Ñoquis con Salsa',
        Image: 'nxs.jpeg',
        price: 2000,
    },
    {
        id: 3,
        name: 'Pizza Napolitana',
        Image: 'pizza.jpeg',
        price: 1200,
    },
    {
        id: 4,
        name: 'Canelones con Salsa',
        Image: 'cxs.jpg',
        price: 1600,
    },
    {
        id: 5,
        name: 'Ravioles con Salsa',
        Image: 'rxs.jpg',
        price: 1400,
    },
    {
        id: 6,
        name: 'Sushi',
        Image: 'sushi.jpg',
        price: 3000,
    },
    {
        id: 7,
        name: 'Paella',
        Image: 'paella.jpg',
        price: 1800,
    },
    {
        id: 8,
        name: 'Empanadas Arabes',
        Image: 'empanadas_arabes.jpeg',
        price: 450,
    },
    {
        id: 9,
        name: 'Hamburguesas con Papas',
        Image: 'hamburguesa_papas.jpg',
        price: 1450,
    },
    {
        id: 10,
        name: 'Pollo al horno con Papas',
        Image: 'pollo_papas.jpg',
        price: 2100,
    },
    {
        id: 11,
        name: 'Lomo Pizza',
        Image: 'lomo_pizza.jpg',
        price: 2500,
    },
    {
        id: 12,
        name: 'Papas Cheddar',
        Image: 'papa_cheddar.jpg',
        price: 1200,
    },
];

let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.Image}"/>
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Agregar al Carrito</button>
        `;
        list.appendChild(newDiv);
    });
}
initApp();

function addToCard(key) {
    let existingProduct = listCards.find((product) => product.id === products[key].id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        let newProduct = {
            id: products[key].id,
            name: products[key].name,
            Image: products[key].Image,
            price: products[key].price,
            quantity: 1,
        };
        listCards.push(newProduct);
    }

    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.Image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });
    total.innerHTML = totalPrice.toLocaleString();
    quantity.innerHTML = count;
}

function changeQuantity(key, quantity) {
    if (quantity === 0) {
        listCards.splice(key, 1);
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

function divideBill(people) {
    if (people <= 0) return;

    let dividedTotal = total.textContent.replace(/,/g, '') / people;
    dividedTotal = dividedTotal.toFixed(2);

    alert(`Each person pays: $${dividedTotal}`);
}


