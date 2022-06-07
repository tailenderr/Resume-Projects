//for taking slider input
const slider = document.getElementById("lengthInput");
const output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

//funtion for generating password
let result="";
function generate () {
    if(result.length === 0){
        let lengthElement=document.getElementById("lengthInput");
        let length=lengthElement.value;
        var randomChars="";
        let checked1=document.getElementById("checkLow").checked;
        if(checked1){
            randomChars += "abcdefghijklmnopqrstuvwxyz";
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
            length--;
        }
        let checked2=document.getElementById("checkUp").checked;
        if(checked2){
            let string1="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            result += string1.charAt(Math.floor(Math.random() * string1.length));
            randomChars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            length--;
        }
        let checked3=document.getElementById("checkNum").checked;
        if(checked3){
            let string2="0123456789";
            result += string2.charAt(Math.floor(Math.random() * string2.length));
            randomChars+="0123456789";
            length--;
        }
        let checked4=document.getElementById("checkSym").checked;
        if(checked4){
            let string3="!@#$%^&";
            result += string3.charAt(Math.floor(Math.random() * string3.length));
            randomChars+="!@#$%^&";
            length--;
        }
        for(let i=0;i<length;i++){
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        const resultElement=document.getElementById("showResult");
        resultElement.innerText="";
        resultElement.innerText=result.substring(0,lengthElement.value);
    }
}

//function to reset password

function reset(){
    const displayElement=document.getElementById("showResult");
    displayElement.innerHTML="CLICK GENERATE";
    result="";
    slider.value="4";
    output.innerHTML=slider.value;
}

