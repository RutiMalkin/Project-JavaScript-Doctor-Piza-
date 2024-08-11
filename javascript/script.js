//( jsonע"י שליפה מה )מכיל את כל התוספות לפי סוגים 
const data = {
    additionals: []
};
//משתנה סכימה של הסל
let sumPrice = document.createElement('div');
sumPrice.classList.add('sumPrice');

//מערך המוצרים שבסל
let arryBasket = [];

// לכל מוצר שנכנס לעגלהid
let idproduct = 0;

// של המשתנה של הסכוםdome שליפה מה 
let allprice = document.querySelector('.allPrice');

window.onload = () => {
    loadPicturesDetailes();
    loadAdditionalDetailes();
};

//json טעינה של קובץ 
const loadPicturesDetailes = () => $.ajax({
    url: "../data/products.json",
    success: (response) => {
        console.log(response);
        printproductsbtn(response);
    },
    error: (error) => {
        console.error(error);
    }
});

const loadAdditionalDetailes = () => $.ajax({
    url: "../data/additional.json",
    success: (response) => {
        console.log(response);
        data.additionals = response;
    },
    error: (error) => {
        console.error(error);
    }
});

// הדפסת המוצרים שבחנות
const printproductsbtn = (products) => {

    const container = document.querySelector('#under-products');

    const innerContainer = document.createElement('div');

    products.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('div-products');

        const nameh3 = document.createElement('h3');
        nameh3.innerHTML = product.categoryName;
        nameh3.classList.add('name-products');

        const image = document.createElement('img');
        image.src = product.img;
        image.classList.add('img-products');

        div.append(image);
        div.append(nameh3);

        div.onclick = () => printAditional(product.typadition);

        innerContainer.append(div);

    });

    container.append(innerContainer);
}

// הדפסת תוספות לכל מוצר
const printAditional = (type) => {

    const curAdditional = data.additionals.find((item) => item.type == type);

    sumPrice.innerHTML = curAdditional.price;
    $('#additionalModal').modal('show');

    const divMidel = document.querySelector('#modal-body');
    divMidel.classList.add('divMidel');
    divMidel.replaceChildren();

    const divInnHader = document.querySelector('.innHader');
    divInnHader.replaceChildren();

    const h1Name = document.createElement('h1');
    h1Name.innerHTML = curAdditional.categoryName;

    const iconImg = document.createElement('img');
    iconImg.classList.add('iconImg');
    iconImg.src = curAdditional.iconImg;

    divInnHader.append(h1Name);
    divInnHader.append(iconImg);


    //אם לחצו על מוצר שתיה או צ'יפס
    if (type == 0 || type == 4) {
        curAdditional.productSaditionals.forEach(add => {
            const div = document.createElement('div');
            div.classList.add('card');


            const divImage = document.createElement('div');
            divImage.style = "width: 150px;";
            divImage.style = "height: 150px;"
            divImage.classList.add('back-img');

            divImage.style.backgroundImage = "url('" + add.img1 + "')";


            const nameh3 = document.createElement('h3');
            nameh3.innerHTML = add.name;
            nameh3.classList.add('name-addition-products');

            const span = document.createElement('span');
            span.innerHTML = add.price;
            span.classList.add('price-addition-products');

            const save = document.querySelector('.save');
            save.style = "display: none;";

            div.append(divImage);
            div.append(nameh3);
            div.append(span);

            div.onclick = () => printProductAdd(div, add.name, add.price, add.img1);

            divMidel.append(div);
        })
    }
    else {//אחרת

        //יצירת אוביקט מסוג המוצר הנבחר כאשר שלוחצים על הוספה מוסיף את האוביקט למערך הסל
        let objProduct = {
            name: curAdditional.categoryName,
            id: idproduct,
            price: parseFloat(sumPrice.innerHTML),
            additionals: []
        }
        const sav = document.querySelector('.save');
        sav.style = "display: ;";

        const divsumprice = document.createElement('div')
        divsumprice.classList.add('divsumprice');

        const p = document.createElement('span');
        p.innerHTML = '₪';

        divsumprice.append(p);

        const pr = document.createElement('span');
        pr.innerHTML = ':מחיר';

        const divPizzaposition = document.createElement('div');
        //אם המוצר הוא פיצה
        if (type == 1) {
            const imgPizza = document.createElement('img');
            imgPizza.src = curAdditional.pizzaAssembly;
            imgPizza.classList.add('pizzaAssembly');

            const divunderdivPizzaposition = document.createElement('div');
            divunderdivPizzaposition.classList.add('underPizza');

            divsumprice.append(sumPrice);

            divsumprice.append(pr);

            divunderdivPizzaposition.append(divsumprice);

            divPizzaposition.append(imgPizza);
            divMidel.append(divPizzaposition);
            divMidel.append(divunderdivPizzaposition);

            const underunderpizza = document.createElement('div');
            underunderpizza.classList.add('underunderpizza');
            divMidel.append(underunderpizza);
        }
        else {
            const divAboveAdditional = document.createElement('div');
            divAboveAdditional.classList.add('divAboveAdditional');

            divsumprice.append(sumPrice)

            divsumprice.append(pr);

            divAboveAdditional.append(divsumprice);

            const divUnderAbove = document.createElement('div');
            divUnderAbove.classList.add('divUnderAbove');

            divMidel.append(divAboveAdditional);
            divMidel.append(divUnderAbove);
        }

        const divalladditional = document.createElement('div');

        curAdditional.productSaditionals.forEach(addopasititi => {

            const imgP = document.createElement('img');

            if (type == 1) {
                imgP.src = addopasititi.img2;
                imgP.style.zIndex = 2;
                imgP.classList.add('optionsPos');
                divPizzaposition.append(imgP);

                imgP.classList.add('optionsopacity');
            }
            const divadd = document.createElement('div');
            divadd.classList.add('divadd');

            const imgOptions = document.createElement('img');
            imgOptions.classList.add('imgOptions');
            imgOptions.src = addopasititi.img1;

            const h3Name = document.createElement('h3');
            h3Name.classList.add('h3Name');
            h3Name.innerHTML = addopasititi.name;

            const priceadd = document.createElement('span');
            priceadd.classList.add('priceadd');
            priceadd.innerHTML = addopasititi.price;

            divadd.append(imgOptions);
            divadd.append(h3Name);
            divadd.append(priceadd);

            divalladditional.classList.add('divalladditional');

            divalladditional.append(divadd);
            divadd.onclick = () => printOpacityAdditioAdd(divadd, imgP, type, objProduct, addopasititi.name, addopasititi.price);

        })


        divMidel.append(divalladditional);

        const save = document.querySelector('.save');
        save.onclick = () => {
            arryBasket.push(objProduct);

            const inBasket = document.querySelector('.inBasket');
            const divProductInBasket = document.createElement('div');
            divProductInBasket.id = idproduct;
            divProductInBasket.classList.add('divProductInBasket');

            const nameproduct = document.createElement('h3');
            nameproduct.classList.add('nameproduct');
            nameproduct.innerHTML = objProduct.name;

            const imgproduct = document.createElement('div')
            imgproduct.classList.add('imgproductInBasket')
            imgproduct.style.backgroundImage = " url('" + curAdditional.imgUp + "')";

            const priceproduct = document.createElement('span');
            priceproduct.innerHTML = objProduct.price;
            const divprice = document.createElement('div');
            divprice.classList.add('divprice');
            divprice.innerHTML = '₪';

            divprice.append(priceproduct);
            const less = document.createElement('div');
            less.classList.add('less');
            less.innerHTML = "להסרה";
            less.onclick = () => lessProduct(divProductInBasket.id, priceproduct);

            divProductInBasket.append(less);
            divProductInBasket.append(divprice);
            divProductInBasket.append(nameproduct);
            divProductInBasket.append(imgproduct);

            inBasket.append(divProductInBasket);

            allprice.innerHTML = parseFloat(allprice.innerHTML) + parseFloat(priceproduct.innerHTML);

            idproduct += 1;
        }
    }
}

//onclick

//pizza tost salad
const printOpacityAdditioAdd = (divadd, imgP, type, objProduct, name, price) => {
    divadd.style = "border: 2px ;";
    divadd.style = " border-color:#d8c08c;";
    divadd.style = "border-style: ridge;";

    if (type == 1)
        imgP.classList.remove('optionsopacity');

    const add = {
        name: name,
        price: price
    }

    objProduct.additionals.push(add);

    sumPrice.innerHTML = parseFloat(sumPrice.innerHTML) + parseFloat(price.slice(1));
    objProduct.price = parseFloat(sumPrice.innerHTML);
    divadd.onclick = () => printOpacityAdditionLess(divadd, imgP, type, objProduct, name, price);
}

const printOpacityAdditionLess = (divadd, imgP, type, objProduct, name, price) => {
    divadd.style = "border: none;";

    let index = objProduct.additionals.findIndex((item) => item.name == name);
    objProduct.additionals.splice(index, 1);

    if (type == 1)
        imgP.classList.add('optionsopacity');

    sumPrice.innerHTML = parseFloat(sumPrice.innerHTML) - parseFloat(price.slice(1));
    objProduct.price = parseFloat(sumPrice.innerHTML);

    divadd.onclick = () => printOpacityAdditioAdd(divadd, imgP, type, objProduct, name, price);
}

//drink chips
const printProductAdd = (divadd, name, price, img) => {

    divadd.style = "border: 2px ;";
    divadd.style = " border-color:#d8c08c;";
    divadd.style = "border-style: ridge;";


    const intervalId = setTimeout(() => {
        divadd.style = "border: none;";
    }, 2000);

    const objProduct = {
        name: name,
        id: idproduct,
        price: parseFloat(price.slice(1)),
    }

    arryBasket.push(objProduct);

    const inBasket = document.querySelector('.inBasket');
    const divProductInBasket = document.createElement('div');
    divProductInBasket.id = idproduct;
    divProductInBasket.classList.add('divProductInBasket');

    const nameproduct = document.createElement('h3');
    nameproduct.classList.add('nameproduct');
    nameproduct.innerHTML = name;

    const imgproduct = document.createElement('div')
    imgproduct.classList.add('imgproductInBasket')
    imgproduct.style.backgroundImage = " url('" + img + "')";


    const priceproduct = document.createElement('span');
    priceproduct.innerHTML = objProduct.price;
    const divprice = document.createElement('div');
    divprice.classList.add('divprice');
    divprice.innerHTML = '₪';
    divprice.append(priceproduct);

    const less = document.createElement('div');
    less.classList.add('less');
    less.innerHTML = "להסרה";
    less.onclick = () => lessProduct(objProduct.id, priceproduct);

    divProductInBasket.append(less);
    divProductInBasket.append(divprice);
    divProductInBasket.append(nameproduct);
    divProductInBasket.append(imgproduct);

    inBasket.append(divProductInBasket);

    allprice.innerHTML = parseFloat(allprice.innerHTML) + parseFloat(priceproduct.innerHTML);

    idproduct += 1;
}


const lessProduct = (id, priceproduct) => {
    let index = arryBasket.findIndex((item) => item.id == id);
    arryBasket.splice(index, 1);

    const leesDivProduct = document.getElementById(id);
    leesDivProduct.style = "display: none;";

    allprice.innerHTML = parseFloat(allprice.innerHTML) - parseFloat(priceproduct.innerHTML);
}



//---------------------------בדיקה לפי השעה הנוכחית, האם החנות פתוחה או סגורה וסימון במקום המתאים---------------------------
const openORclose = document.querySelector('#openorclose');
const now = new Date();
if (now.getHours() >= 11 && now.getHours() < 22) {
    openORclose.classList.add('open');
    openORclose.classList.remove('close');
    openORclose.innerHTML = 'פתוח';
}
else {
    openORclose.classList.remove('open');
    openORclose.classList.add('close');
    openORclose.innerHTML = 'סגור';
}

//------------------------מעבר לתשלום /בדיקה שהעגלה לא ריקה והלקוח --------------------------------------------------------
const toPay = document.querySelector('.topay');
toPay.onclick = () => {

    if (arryBasket.length == 0) {
        alert('העגלה ריקה!');
    }
    else {
        if (localStorage.getItem('nameInput') == null && sessionStorage.getItem('nameInput') == null) {
            alert('יש להתחבר לאתר לפני המעבר לתשלום!');
        }
        else {
            sessionStorage.setItem("arryBasket", JSON.stringify(arryBasket));
            sessionStorage.setItem("allprice", allprice.innerHTML);
            window.open("./pay.html");
        }
    }
}

