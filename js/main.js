let overlay = document.querySelector(".overlay");
let overRow = document.querySelector(".over-row");
let leftImage = document.querySelector(".left-image img");
let title = document.querySelector(".right-info h3");
let price = document.querySelector(".price4");
let minus = document.querySelector(".minus");
let plus = document.querySelector(".plus");
let count = document.querySelector(".left-count input");
let close1 = document.querySelector("#close");
let addToCart2 = document.querySelector(".addToCart");
let cart2 = document.querySelector(".cart");
let closeCart = document.querySelector("#close2");
let empty = document.querySelector(".empty");
let choose = document.querySelector(".choose");
let clearAll = document.querySelector(".clearAll");
let upper = document.querySelector(".upper");
let bars = document.querySelectorAll("#bars");
let aside1 = document.querySelector(".aside1");
let close3 = document.querySelector(".close3");

window.addEventListener("scroll", function(){
    const nav = document.querySelector(".nav");
    let x = scrollY;
    if(x > 200){
        nav.style.transform = "translateY(0)";
        upper.style.transform = "translateY(0)";
    }else{
        upper.style.transform = "translateY(100%)";
        nav.style.transform = "translateY(calc(-100% + -1px))";
    };
});

upper.addEventListener("click", function(){
    scrollTo(0,0)
})

let up = document.querySelector(".up");
let closeUp = document.querySelector(".up i");

closeUp.addEventListener("click", function(){
    up.style.display = "none";
});

let row = document.querySelector(".products-row");
let spanCount = document.querySelectorAll("#basket span");
let openCart = document.querySelectorAll("#basket");

let list = [];
let index1;

let cart;
if(localStorage.getItem("jj") == null){
    cart = [];
    checkBtn();
    displayThings();
}else{
    cart = JSON.parse(localStorage.getItem("jj"));
    checkBtn();
    displayThings();
};

let getData = async function(){
    let api = await fetch("data.json");
    let response = await api.json();
    let products = response.products;
    displayProducts(products);
    list = products;
};
getData();

function displayProducts(take){
    let card = "";
    take.forEach((item, index) => {
        card += `
        <div class="card">
        <div class="image">
            <div class="top-icons">
                <div class="icon" onclick="addToCart(${index})" title="Add To Cart"><i class="fa-solid fa-bag-shopping"></i></div>
                <div class="icon" title="Add To Compare"><i class="fa-solid fa-signal"></i></div>
            </div>
            <img src="${item.image}" alt="">
            <button onclick="openInfo(${index})">quick view</button>
        </div>
        <div class="card-body">
            <div class="nameWithWishlist">
                <h4>${item.name}</h4>
                <i class="fa-regular fa-heart"></i>
            </div>
            <div class="stars2">
                <div class="star2"><i class="fa-solid fa-star"></i></div>
                <div class="star2"><i class="fa-solid fa-star"></i></div>
                <div class="star2"><i class="fa-solid fa-star"></i></div>
                <div class="star2"><i class="fa-solid fa-star"></i></div>
                <div class="star2"><i class="fa-solid fa-star"></i></div>
            </div>
            <div class="allPrice">
                <p class="disc">${item.disc}</p>
                <p class="price2">$${item.price}</p>
            </div>
        </div>
        </div>
        `
    });
    row.innerHTML = card;
};

function openInfo(index){
    index1 = index;
    overlay.style.display = "flex";
    setTimeout(() => {
        overRow.style.transform = "translateY(0)";
        overRow.style.opacity = "1";
    }, 100);
    title.textContent = list[index].name;
    price.textContent = list[index].price;
    leftImage.src = list[index].image;
};

close1.addEventListener("click", function(){
    overRow.style.transform = "translateY(-30%)";
    overRow.style.opacity = "0";
    setTimeout(() => {
        overlay.style.display = "none";
    }, 400);
});

let save;

plus.addEventListener("click", function(){
    count.value++;
    save = count.value;
});


minus.addEventListener("click", function(){
    count.value--;
    if(count.value < 0){
        count.value = 0;
    };
});

function addToCart(index){
    let choosenProduct = list[index];
    let final = cart.find((item) => item.id == choosenProduct.id);
    if(final){
        final.counts++;
    }else{
        cart.push({...choosenProduct, counts: 1});
    };
    displayThings();
    checkBtn();
    localStorage.setItem("jj", JSON.stringify(cart));
};

addToCart2.addEventListener("click", function(){
    let choosenProduct = list[index1];
    let final = cart.find((item) => item.id == choosenProduct.id);
    if(count.value > 1 && final){
        final.counts = count.value;
    }else{
        cart.push({...choosenProduct, counts: 1});
    };
    displayThings();
    checkBtn();
    localStorage.setItem("jj", JSON.parse(cart));
});

openCart.forEach((item) => {
    item.addEventListener("click", function(){
        cart2.style.transform = "translateX(0)";
    });
});

closeCart.addEventListener("click", function(){
    cart2.style.transform = "translateX(calc(100% + 4px))";
});

function displayThings(){
    let card = "";
    cart.forEach((item, index) => {
        card += `
        <div class="cards">
        <div class="left2">
            <i class="fa-solid fa-xmark" onclick="deleteElement(${index})"></i>
            <img src="${item.image}" alt="">
        </div>
        <div class="right2">
            <h4>${item.name}</h4>
            <p>$${item.price}</p>
            <span>Qty: ${item.counts}</span>
        </div>
        </div>
        `
    });
    choose.innerHTML = card;
};

function deleteElement(index){
    cart.splice(index, 1);
    localStorage.setItem("jj", JSON.stringify(cart));
    checkBtn();
    displayThings();
};

clearAll.addEventListener("click", function(){
    cart.splice(0);
    localStorage.clear();
    checkBtn();
    displayThings();
});

function checkBtn(){
    if(cart.length == 0){
        clearAll.style.display = "none";
        empty.style.display = "block";
        spanCount.forEach((item) => {
            item.innerHTML = 0;
        });
    }else{
        clearAll.style.display = "inline-block";
        empty.style.display = "none";
        spanCount.forEach((item) => {
            item.innerHTML = cart.length;
        });
    };
};

bars.forEach((item) => {
    item.addEventListener("click", function(){
        aside1.style.transform = "translateX(0)";
    });
});

close3.addEventListener("click", function(){
    aside1.style.transform = "translateX(calc(-100% + -41px))";
});