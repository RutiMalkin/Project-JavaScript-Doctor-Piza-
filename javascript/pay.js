//רשימת הסניפים
const arrcities=[
    "ירושלים",
    "בני-ברק",
    "תל-אביב",
    "רמת-גן",
    "אלעד",
    "מודיעין-עילית",
    "מודיעין",
    "ביתר",
    "בית-שמש",
    "כרמיאל",
    "לוד",
    "צפת",
    "גבעתיים",
    "מירון",
    "מלעלות",
    "אופקים",
    "רכסים",
    "טבריה",
    "נתניה",
    "חיפה",
    "אילת",
    "אשדוד",
    "ערד",
    "פתח-תקווה",
    "זכרון-יעקב",
    "קרית-יערם",
    "בית-קל",
    "גורן"   
];
 
const divcities =document.querySelector('.incities');

let area="";

const inputcity = document.querySelector('#search');

// פונקצית חיפוש סניף משם יגיע המשלוח

inputcity.onkeyup =()=>{
    let flag=0;
    divcities.replaceChildren();
    arrcities.forEach(city =>{
        if(city.indexOf(inputcity.value)!=-1){
            flag=1;
            const divcity=document.createElement('div');

            divcity.innerHTML=city;
            divcity.classList.add('divcity');
            divcities.append(divcity);
            divcity.onclick= () =>{
                area=city;

                divcity.style="color: #d8c08c";
                inputcity.value=area; 
                
                divcities.classList.add('none');
            }
            divcities.classList.remove('none');
        }
    })
    if(flag==0)
    {
        const diverorr=document.createElement('div');
        diverorr.classList.add('diverorr');
        diverorr.innerHTML="!לא קיים סניף באיזור זה";
        divcities.append(diverorr);
    }
}

const ok = document.querySelector('.ok');

let infromation={
    namecard:null,
    id:null,
    number:null,
    expmonth:null,
    phon:null,
};

//בעת לחיצה על אישור שמירה על האינפורמציה מהפורם
ok.onclick= () => { 
    
    allInfromation.replaceChildren();

    const namecard=document.querySelector('#name-input');

    const id=document.querySelector('#id-input');
 
    const number=document.querySelector('#card-number-input');

    const expmonth=document.querySelector('#expmonth-input');

    const phon=document.querySelector('#phon-number-input');

    const divFrom = document.querySelector('.form-pay');
   if(namecard.value!=""&&id.value!=""&&number.value!=""&&expmonth.value!=""&& phon.value!="")
   {
      infromation.namecard=namecard.value;
      infromation.id=id.value;
      infromation.number=number.value;
      infromation.expmonth=expmonth.value;
      infromation.phon=phon.value;
      if(area!=""){
            printAllInformation();
        }
      else{
        alert("יש לבחור סניף ממנו ישלח המשלוח!");
      }
   }
   else{
        alert("יש למלא את כל פרטי ההזמנה!");
   }

};

//מדפיסה את כל האינפורמציה
const printAllInformation = () =>{

    const body =document.querySelector('.body'); 
    const allInfromation = document.querySelector('.allInfromation');
    allInfromation.style="display: block;"
     
    const helloUser = document.createElement('div');
    helloUser.classList.add('helloUser');

    let emailUser;
    let nameUser;
    //  localStorageנתונים לוקח ממנו ואם לא לוקח מהsessionStorageבדיקה אם יש ב
    if(sessionStorage.getItem("nameInput")!=null)
    {
        
        nameUser=sessionStorage.getItem("nameInput");
        emailUser=sessionStorage.getItem("emailInput");
    }
    else
    {
        nameUser=localStorage.getItem("nameInput");
        emailUser=localStorage.getItem("emailInput");
    }

    helloUser.innerHTML=nameUser+" שלום";

    allInfromation.append(helloUser);

    const titelMenu = document.createElement('div');
    titelMenu.classList.add('titelMenu');
    titelMenu.innerHTML=":התפריט שלי";

    allInfromation.append(titelMenu);
    
    const divAllProduct = document.createElement('div');
    divAllProduct.classList.add('divAllProduct');

    const menu = JSON.parse(sessionStorage.getItem("arryBasket"));

    menu.forEach(product =>{
        const divProduct=document.createElement('div');
        divProduct.classList.add('divProduct');

        const nameProduct=document.createElement('div');
        nameProduct.classList.add('nameProduct');
        nameProduct.innerHTML=product.name;

        const priceProduct=document.createElement('div');
        priceProduct.classList.add('priceProduct');
        priceProduct.innerHTML="₪"+product.price;
        
        divProduct.append(priceProduct);
        divProduct.append(nameProduct);
        
         divAllProduct.append(divProduct);
         //אם המוצר הנוכחי הוא פיצה טוסט או סלט יש הדפס נוספת של כל התוספות
        if(product.name=='סלט'|| product.name=='טוסט' || product.name=='פיצה')
        {
            nameProduct.append(":");
            const divAdditionals = document.createElement('div');
            divAdditionals.classList.add('divAdditionals');

            product.additionals.forEach(Add =>{

                const nameAdd=document.createElement('div');
                nameAdd.classList.add('nameAdd');
                nameAdd.innerHTML=Add.name;
        
                const priceAdd=document.createElement('div');
                priceAdd.classList.add('priceAdd');
                priceAdd.innerHTML=Add.price;

                const divAdd = document.createElement('div');
                divAdd.classList.add('divAdd');

                divAdd.append(priceAdd);
                divAdd.append(nameAdd);
                
                divAdditionals.append(divAdd);
            });
            divAllProduct.append(divAdditionals);
        }
       
    });
    allInfromation.append(divAllProduct);
    body.append(allInfromation);


    const divAllPrice = document.createElement('div');
    divAllPrice.classList.add('divAllPrice');
    divAllPrice.innerHTML="₪"+sessionStorage.getItem("allprice");

    allInfromation.append(divAllPrice);

    const sent=document.createElement('div');
    sent.classList.add('sent');
    sent.innerHTML="משלוח: ₪15"
    allInfromation.append(sent);

    const divAllSumPrice = document.createElement('div');
    divAllSumPrice.classList.add('divAllSumPrice');
    
    divAllSumPrice.innerHTML="₪"+(parseFloat(sessionStorage.getItem("allprice"))+15)+" :סך הכל לתשלום";
    allInfromation.append(divAllSumPrice);

    const titelInfor=document.createElement('div');
    titelInfor.classList.add('titelInfor');
    titelInfor.innerHTML=" :פרטי הזמנה";
    allInfromation.append(titelInfor);

    const infor= document.createElement('div');
    infor.classList.add('divInfor');

    const email =document.createElement('div');
    email.classList.add('infor');
    email.innerHTML="מייל: "+emailUser;
    infor.append(email);

    const nameCard= document.createElement('div');
    nameCard.classList.add('infor');
    nameCard.innerHTML="שם בעל הכרטיס: "+infromation.namecard;
    infor.append(nameCard);

    const id= document.createElement('div');
    id.classList.add('infor');
    id.innerHTML="תעודת זהות: "+infromation.id;
    infor.append(id);

    const number= document.createElement('div');
    number.classList.add('infor');
    number.innerHTML="מספר אשראי: "+infromation.number;
    infor.append(number);

    const expmonth= document.createElement('div');
    expmonth.classList.add('infor');
    expmonth.innerHTML="תוקף: "+infromation.expmonth;
    infor.append(expmonth);

    const phon= document.createElement('div');
    phon.classList.add('infor');
    phon.innerHTML="טלפון: "+infromation.phon;
    infor.append(phon);

    const city=document.createElement('div');
    city.classList.add('infor');
    city.innerHTML="סניף ממנו תשלח ההזמנה: "+area;
    infor.append(city);

    allInfromation.append(infor);

    const toChange= document.createElement('div');
    toChange.classList.add('toChange');
    toChange.innerHTML="!לשינוי הפרטים יש לחזור לטופס ולאשר שוב";

    allInfromation.append(toChange);

    //סיום ושמירת ההזמנה
    const toFinish=document.createElement('div');
    toFinish.classList.add('toFinish');
    toFinish.innerHTML="לסיום";
    
    allInfromation.append(toFinish);
    toFinish.onclick=()=>{
        const enterInfromation=document.querySelector('.enterInfromation');
        enterInfromation.style="display: none;";
        allInfromation.style="display: none;";

        const finish = document.createElement('div');
        finish.classList.add('finish');
        finish.innerHTML="ההזמנה בדרך אליך, קבלה תשלח במייל";

        body.append(finish);

        const finishHappy = document.createElement('div');
        finishHappy.classList.add('finishHappy');
        finishHappy.innerHTML="!נשמח לראותך שוב";

        body.append(finishHappy);

        body.style="display: flex;";
        body.style= "justify-content: center;";
    }

}

