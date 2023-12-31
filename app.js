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

// ... (resto del código)


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

let drinks = [
    {
        id: 13,
        name: 'Agua Mineral',
        Image: 'agua3.jpg',
        price: 500,
    },
    {
        id: 14,
        name: 'Coca-Cola',
        Image: 'cocacola.jpg',
        price: 900,
    },
    {
        id: 15,
        name: 'Jugo de Naranja',
        Image: 'jugo.jpg',
        price: 800,
    },
    {
        id: 16,
        name: 'Cerveza',
        Image: 'cerveza.jpg',
        price: 1100,
    },
    {
        id: 17,
        name: 'Cafe',
        Image: 'cafe.jpg',
        price: 800,
    },
    {
        id: 18,
        name: 'Vino',
        Image: 'vino.jpg',
        price: 1800,
    },
    {
        id: 19,
        name: 'Te',
        Image: 'te.jpg',
        price: 800,
    },
    {
        id: 20,
        name: 'Fernet con Coca',
        Image: 'fcc.jpg',
        price: 1400,
    },
    {
        id: 21,
        name: 'Cerveza Roja',
        Image: 'roja.jpg',
        price: 900,
    },
    {
        id: 22,
        name: 'Sprite',
        Image: 'sprite.jpg',
        price: 800,
    },
    {
        id: 23,
        name: 'Smoothy',
        Image: 'smoo.jpg',
        price: 1200,
    },
    {
        id: 24,
        name: 'Cerveza Negra',
        Image: 'negra.jpg',
        price: 1100,
    },
    // Puedes agregar más bebidas según sea necesario
];


let listCards = [];

function initApp() {
    initMenu('food', products);
    initMenu('drink', drinks);
}

function initMenu(menuType, menuItems) {
    let menuContainer = document.getElementById(`${menuType}Menu`);
    menuContainer.innerHTML = ''; // Limpiar el contenido existente

    menuItems.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img class="menu-item" src="image/${value.Image}"/>
            <div class="title">${value.name}</div>
            <div class="price">$${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${value.id})">Agregar al Carrito</button>
        `;
        menuContainer.appendChild(newDiv);
    });
}

// ... (tu código existente)

function addToCard(id) {
    let menuType = id <= products.length ? 'food' : 'drink';

    if (menuType === 'food') {
        addToFoodCard(id);
    } else {
        addToDrinkCard(id);
    }
}

function addToFoodCard(id) {
    let menuIndex = id - 1;
    let existingProductIndex = listCards.findIndex((product) => product.id === id && product.menuType === 'food');

    if (existingProductIndex !== -1) {
        listCards[existingProductIndex].quantity++;
        listCards[existingProductIndex].price = listCards[existingProductIndex].quantity * getMenuPrice('food', menuIndex);
    } else {
        let newProduct = {
            id: id,
            menuType: 'food',
            name: getMenuName('food', menuIndex),
            Image: getMenuImage('food', menuIndex),
            price: getMenuPrice('food', menuIndex),
            quantity: 1,
        };
        listCards.push(newProduct);
    }

    reloadCard();
}

function addToDrinkCard(id) {
    let menuIndex = id <= products.length ? id - 1 : id - products.length - 1;
    if (menuIndex < 0) {
        menuIndex = id - 1;
    }

    let existingProductIndex = listCards.findIndex((product) => product.id === id && product.menuType === 'drink');

    if (existingProductIndex !== -1) {
        listCards[existingProductIndex].quantity++;
        listCards[existingProductIndex].price = listCards[existingProductIndex].quantity * getMenuPrice('drink', menuIndex);
    } else {
        let newProduct = {
            id: id,
            menuType: 'drink',
            name: getMenuName('drink', menuIndex),
            Image: getMenuImage('drink', menuIndex),
            price: getMenuPrice('drink', menuIndex),
            quantity: 1,
        };
        listCards.push(newProduct);
    }

    reloadCard();
}


// ... (tu código existente)


function getMenuName(menuType, index) {
    return menuType === 'food' ? products[index].name : drinks[index].name;
}

function getMenuImage(menuType, index) {
    return menuType === 'food' ? products[index].Image : drinks[index].Image;
}

function getMenuPrice(menuType, index) {
   return menuType === 'food' ? products[index].price : drinks[index].price;
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
                <div>$${value.price.toLocaleString()}</div>
                
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });
    total.innerHTML = `$${totalPrice.toLocaleString()}`;
    quantity.innerHTML = count;
}

function changeQuantity(key, quantity) {
    if (quantity === 0) {
        listCards.splice(key, 1);
    } else {
        let product = listCards[key];
        product.quantity = quantity;
        product.price = quantity * getMenuPriceById(product.id);
    }
    reloadCard();
}

function getMenuPriceById(id) {
    let menuType = id <= products.length ? 'food' : 'drink';
    let menuIndex = id <= products.length ? id - 1 : id - products.length - 1;

    return getMenuPrice(menuType, menuIndex);
}

function divideBill(people) {
    if (people <= 0) return;

    let totalValue = totalValueFromListCards();
    
    console.log('Total Value:', totalValue);

    if (!isNaN(totalValue)) {
        let dividedTotal = totalValue / people;
        dividedTotal = dividedTotal.toFixed(2);

        console.log('Divided Total:', dividedTotal);

        console.log(`Total: $${totalValue}, Cliente: ${people}, Cada persona paga: $${dividedTotal}`);
        alert(`Total: $${totalValue}, Cliente: ${people}, Cada persona Paga: $${dividedTotal}`);
    } else {
        alert('Error al obtener el total.');
    }
}

function totalValueFromListCards() {
    return listCards.reduce((total, product) => total + product.price, 0);
}





function showMenu(menuType) {
    if (menuType === 'food') {
        document.getElementById('foodMenu').style.display = 'grid';
        document.getElementById('drinkMenu').style.display = 'none';
    } else if (menuType === 'drinks') {
        document.getElementById('foodMenu').style.display = 'none';
        document.getElementById('drinkMenu').style.display = 'grid';
    }

    
}
function initApp() {
    initMenu('food', products);
    initMenu('drink', drinks);
}

// Función para inicializar los menús en la interfaz
function initMenu(menuType, menuItems) {
    let menuContainer = document.getElementById(`${menuType}Menu`);
    menuContainer.innerHTML = ''; // Limpiar el contenido existente

    menuItems.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img class="menu-item" src="image/${value.Image}"/>
            <div class="title">${value.name}</div>
            <div class="price">$${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${value.id})">Agregar al Carrito</button>
        `;
        menuContainer.appendChild(newDiv);
    });
}

// Función para agregar productos al carrito
function addToCard(id) {
    let menuType = id <= products.length ? 'food' : 'drink';

    if (menuType === 'food') {
        addToFoodCard(id);
    } else {
        addToDrinkCard(id);
    }
}

// Función para agregar productos de comida al carrito
function addToFoodCard(id) {
    let menuIndex = id - 1;
    let existingProductIndex = listCards.findIndex((product) => product.id === id && product.menuType === 'food');

    if (existingProductIndex !== -1) {
        listCards[existingProductIndex].quantity++;
        listCards[existingProductIndex].price = listCards[existingProductIndex].quantity * getMenuPrice('food', menuIndex);
    } else {
        let newProduct = {
            id: id,
            menuType: 'food',
            name: getMenuName('food', menuIndex),
            Image: getMenuImage('food', menuIndex),
            price: getMenuPrice('food', menuIndex),
            quantity: 1,
        };
        listCards.push(newProduct);
    }

    reloadCard();
}

// Función para agregar productos de bebida al carrito
function addToDrinkCard(id) {
    let menuIndex = id <= products.length ? id - 1 : id - products.length - 1;
    if (menuIndex < 0) {
        menuIndex = id - 1;
    }

    let existingProductIndex = listCards.findIndex((product) => product.id === id && product.menuType === 'drink');

    if (existingProductIndex !== -1) {
        listCards[existingProductIndex].quantity++;
        listCards[existingProductIndex].price = listCards[existingProductIndex].quantity * getMenuPrice('drink', menuIndex);
    } else {
        let newProduct = {
            id: id,
            menuType: 'drink',
            name: getMenuName('drink', menuIndex),
            Image: getMenuImage('drink', menuIndex),
            price: getMenuPrice('drink', menuIndex),
            quantity: 1,
        };
        listCards.push(newProduct);
    }

    reloadCard();
}

// Resto de las funciones y eventos...

// ... (definición de funciones restantes como reloadCard, getMenuName, getMenuImage, getMenuPriceById, divideBill, showMenu, etc.)

// Inicializar la aplicación
initApp();