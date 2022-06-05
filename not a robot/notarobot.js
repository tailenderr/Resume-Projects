const imageArr=[ "image1.jpg","image2.jpg","image3.jpg","image4.jpg","image5.jpg"];
const imgElement=document.getElementsByClassName("img");
// console.log(imgElement);
const selectedImg=[];
const renderImg=[];
const resetElement=document.getElementById("reset");
const verifyElement=document.getElementById("btn");
const result=document.getElementById("para");

//function for uploding images in random slots everytime

(function uploadImage(){
    while(renderImg.length!==imageArr.length){
        const num=Math.floor(Math.random()*5);
        if(renderImg.indexOf(num)===-1){
            renderImg.push(num);
        }
    }
    renderImg.splice(Math.floor(Math.random()*5),0,Math.floor(Math.random()*5));

    // console.log(renderImg);
    for(let i=0;i<6;i++){
        imgElement[i].setAttribute("src",imageArr[renderImg[i]]);
        imgElement[i].setAttribute("data-ns-test","img"+renderImg[i]);
        // console.log(renderImg[i]);
    }
})();
//function when user click o image to select
function selectImg(imgId){
    // console.log(imgId);
    const selectedElement= document.getElementById(imgId);
    if(selectedImg.indexOf(imgId)===-1){
        selectedImg.push(imgId);
        const img=document.getElementById(imgId);
        img.style.width="80%";
        img.style.height="80%";
        img.style.opacity="0.6";
        // console.log(selectedImg);
        // console.log(imgId);
    }
    if(selectedImg.length>=1){
        resetElement.style.display="flex";
    }
    if(selectedImg.length===2){
        verifyElement.style.display="flex";
    }
    if(selectedImg.length>2){
        verifyElement.style.display="none";
    }
}

//function for the functionality of reset button
function reset(){
    // console.log(selectedImg);
    verifyElement.style.display="none";
    resetElement.style.display="none";
    for(let i=0;i<selectedImg.length;i++){
        const remove=document.getElementById(selectedImg[i]);
        remove.style.width="100%";
        remove.style.height="100%";
        remove.style.opacity="1";
    }
    selectedImg.length=0;
}

//function for the functionality of verify button
function verifyImg(){
    let flag="false";
    for(let i=0;i<selectedImg.length-1;i++){
        if(document.getElementById(selectedImg[i]).getAttribute("data-ns-test")===document.getElementById(selectedImg[i+1]).getAttribute("data-ns-test")){
            flag="true";
        }
        showResult(flag);
    }
}
//function which declares final result
function showResult(flag){
    // console.log(flag);
    resetElement.style.display="none";
    verifyElement.style.display="none";
    result.style.display="flex";
    if(flag==="true"){
        result.innerText=("You are a human. Congratulations!");
    }
    else{
        result.innerText=("We can't verify you as a human. You selected the non-identical tiles.");
    }
    for(let i=0;i<imgElement.length;i++){
        imgElement[i].setAttribute("onclick","");
    }
}