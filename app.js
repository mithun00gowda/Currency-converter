const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns =  document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".msg");
let amount = document.querySelector(".amount input");
console.log(dropdowns);


for(let select of dropdowns){
for( code in countryList){
 let newOption = document.createElement("option");
 newOption.innerText = code;
 newOption.value = code;
 if(select.name === "from" && code === "USD"){
    newOption.selected = "selected";
 } else if(select.name === "to" && code === "INR"){
    newOption.selected = "selected";
 }
 select.append(newOption);
}
select.addEventListener("change", (evt) =>{
    updateFlag(evt.target);
});
}



const updateFlag = (element) => {
 let currCode = element.value;
 console.log(currCode);
 let countryCode = countryList[currCode];
 let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
 let img = element.parentElement.querySelector("img");
 img.src = newSrc;
};


btn.addEventListener("click",  async (evt) =>{
    evt.preventDefault();
    
    
    let amountValue = amount.value;
    console.log(amountValue);
    if(amountValue === "" || amountValue < 1){
        amountValue = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data =  await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmount = amount.value * rate;
    console.log(finalAmount);
    message.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});