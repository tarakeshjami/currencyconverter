const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025.10.24/v1/currencies/";
const drops = document.querySelectorAll(".dropdowns select");
const a=document.querySelector("#amount");

const c=document.querySelector("#from-select");
const d=document.querySelector("#to-select");
for (let x of drops) {
    for (let y in countryList) {
        let option = document.createElement("option");
        option.value = y;
        option.innerText = y;

        if (y === "USD" && x.id === "from-select") {
            option.selected = "selected";
        }
        if (y === "INR" && x.id === "to-select") {
            option.selected = "selected";
        }
        x.append(option);
    }
}

// Add event listener to all select elements
drops.forEach((select) => {
    select.addEventListener("change", (ele) => {
        updateflag(ele.target);
    });
});

function updateflag(target) {
    let newcountry = target.value; // Get the selected currency code (e.g., "USD")
    let countryCode = countryList[newcountry]; // Map currency code to country code using countryList
    let newimgsrc = `https://flagsapi.com/${countryCode}/shiny/64.png`; // Construct the flag URL
    target.parentElement.querySelector("img").src = newimgsrc; // Update the flag image
}

mybutton=document.getElementById("convert-btn");
mybutton.addEventListener('click',(ele)=>{
    ele.preventDefault();
    changemsg();
});
// window.addEventListener("load", () => {
//   changemsg();
// });
async function changemsg(){
     if(a.value===""){
        alert("Please enter amount to convert");
        return;
    }
    else if(a.value<=0){
        alert("Please enter a valid amount greater than zero");
        return;
    }
    let url=`${base_url}${c.value.toLowerCase()}.json`;
    let f=await fetch(url);
    let data=await f.json();
    // console.log(data);
    // console.log(a.value);
    
        console.log(a.value * data[c.value.toLowerCase()][d.value.toLowerCase()]);
    let msg=document.querySelector("#message");
    msg.innerText=` ${a.value}  ${c.value} in ${d.value} = ${ (a.value * data[c.value.toLowerCase()][d.value.toLowerCase()])}`;

}
