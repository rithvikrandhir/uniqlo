import { TweenMax } from "gsap/TweenMax";

let userData = [];
let parent = document.querySelector('.container');
let formContainer = document.querySelector('.form-container');
let name = document.querySelector('.name-box');
let story = document.querySelector('.story');
let upload = document.querySelector('.upload-button');
let submit = document.querySelector('.submit-form');
let colorArray = ['#61EACE', '#FFFF00', '#32CBF0', '#32A1ED', '#CC79E6', '#34E548', '#5BC0EB', '#FDE74C', '#9BC53D', '#E55934', '#FA7921', '#34E548'];
let imageArray = ['../images/heads/11.png', '../images/heads/12.png', '../images/heads/13.png', '../images/heads/14.png', '../images/heads/15.png', '../images/heads/16.png', '../images/heads/17.png', '../images/heads/18.png',];
let logoArray = ['../images/uniqlo.png', '../images/uniqlo-jap.jpg'];
let movement = ['up', 'down', 'left', 'right'];
let boxSize = 100;
let toggle = true;
let nameValue = "";
let storyValue = "";
let uploadedImage = document.getElementById('#upload-button');
let goBack = document.querySelector('.go-back');
window.addEventListener('load', () => {

    TweenMax.to(".main-box", 1, { width: '100vw', height: '100vw', x: 0 });
    for (let i = 0; i < Math.floor(window.innerHeight / (boxSize + 20)); i++) { // rows
        for (let j = 0; j < Math.floor(window.innerWidth / (boxSize + 20)); j++) { //columns

            let child = document.createElement('div');
            let childImage = document.createElement('img');
            child.classList += `box`;
            child.classList += " "
            child.classList += `box-${i}-${j}`;
            child.classList += " "
            child.classList += `${movement[Math.floor(Math.random() * movement.length)]}`;
            child.appendChild(childImage);
            parent.appendChild(child);
        }
    }
    const something = async () => {
        await window.setTimeout(() => {
            TweenMax.to(".main-box", 2, { scale: 0, opacity: 0.5 });
            TweenMax.fromTo(".up", 3, { y: -200, opacity: 0 }, { y: 0, opacity: 1 });
            TweenMax.fromTo(".down", 3, { y: 200, opacity: 0 }, { y: 0, opacity: 1 }, 1);
            TweenMax.fromTo(".left", 3, { x: -200, opacity: 0 }, { x: 0, opacity: 1 }, 2);
            TweenMax.fromTo(".right", 3, { x: 200, opacity: 0 }, { x: 0, opacity: 1 }, 3);
            console.log("Timeout 1 ");
            for (let i = 0; i < window.innerHeight / (boxSize + 20); i++) { // rows
                for (let j = 0; j < Math.floor(window.innerWidth / (boxSize + 20)); j++) { //columns

                    let child = document.querySelector(`.box-${i}-${j}`);
                    let childImage = child.getElementsByTagName('img');
                    child.style.backgroundColor = colorArray[Math.floor(Math.random() * colorArray.length)];

                    if (i % 2 === 0) {
                        childImage[0].src = imageArray[Math.floor(Math.random() * imageArray.length)];
                    } else {
                        if (Math.random() > 0.8) {

                            child.classList += " logo";
                            childImage[0].src = logoArray[Math.floor(Math.random() * logoArray.length)];
                        }
                    }
                }
            }
        }, 6000); //6000
        await window.setTimeout(() => {
            console.log("Second Timeout");
            TweenMax.fromTo(".up", 3, { y: 0, opacity: 1 }, { y: -200, opacity: 0 });
            TweenMax.fromTo(".down", 3, { y: 0, opacity: 1 }, { y: 200, opacity: 0 }, 1);
            TweenMax.fromTo(".left", 3, { x: 0, opacity: 1 }, { x: -200, opacity: 0 }, 2);
            TweenMax.fromTo(".right", 3, { x: 0, opacity: 1 }, { x: 200, opacity: 0 }, 3);
            
        }, 10000); //10000
        await window.setTimeout(() => {
            console.log("Third Timeout");
            const myNode = document.querySelectorAll(".box");
            for (let node of myNode) {
                document.querySelector(".container").removeChild(node);
            }
            formContainer.style.display = 'grid';
            parent.style.display = 'none';
            TweenMax.fromTo(".form-container", 1, { opacity: 0 }, {opacity: 1 });
            TweenMax.to(".main-logo img", 1, {opacity: 1 });
            TweenMax.to(".go-back", 1, {opacity: 1 });
            
        }, 12000); //12000

    }
    something();
})
name.addEventListener('focus', ()=>{
    //console.log(name.value);
    nameValue = name.value;
    name.value = "";
});


story.addEventListener('focus', ()=>{
   // console.log(name.value);
    storyValue = story.value;
    story.value = "";
});

upload.addEventListener('change', (e) => {
    upload.getElementsByTagName('p')[0].innerHTML = "Image Uploaded";
    let icons = upload.querySelectorAll('.fas');
    if(e.target !== null){
        icons[0].style.display = "none";
        icons[1].style.display = "initial";
    }
});
submit.addEventListener('click', () => {
    userData.push({name: name.value, story: story.value, image: upload.value});
    name.value = nameValue;
    story.value = storyValue;
    let icons = upload.querySelectorAll('.fas');
    icons[0].style.display = "initial";
    icons[1].style.display = "none";
    upload.getElementsByTagName('p')[0].innerHTML = "Upload A Picture";
    TweenMax.fromTo(".response", 3, {height: '50px', opacity: 1}, {height: '0', opacity: 0});

});
goBack.addEventListener('click', () => {
    window.location.replace('/index.html');
})