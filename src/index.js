console.log('%c HI', 'color: firebrick')
const breeds = [];//challenge 4: to filer we want to add a global variable--empty array
/* 
Challenge 1: First create an addEventListener('DOMContentLoaded')- b/c it requests for images to appear on page load with a function for fetchImages because that's what's happening; then we want to define the fetchImages function return the response using JSON (resp=>resp.json), then.(results)=>{results.message} means that we're taking the array of data and in this case doing something w/ images; use forEach url add the images/image tag; access src property to set img to url; add image to dog-img-container by using querySelector(that's where the imaged belong); then use appendChild to add the image as a child of the dog-image-container. Note: console.log the results to find out if the code is an array or object(it will either read array, or {...} for object)
*/
document.addEventListener('DOMContentLoaded', function() {
    fetchImages();
    fetchBreeds();
});

function fetchImages(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch (imgUrl)
    .then(resp => resp.json())
    .then(results=>{
        //console.log(results)
        results.message.forEach(url => {
            const img = document.createElement('img')
            img.src = url;
            document.querySelector('#dog-image-container').appendChild(img)
        })
        

    });
}
function fetchBreeds(){
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch (breedUrl)
    .then(resp => resp.json())
    .then(results=>{
        console.log(results)
        //object.keys returns an array which is why we write results.message to create an array.
        Object.keys(results.message).forEach(breed =>{
            const ul = document.querySelector('#dog-breeds')
            const li = document.createElement('li')
            //add text of breed to li
            li.textContent = breed;
            //add eventListener to each li so that the color changes when user clicks on any of them (challenge 3)
            li.addEventListener('click', function(){
              li.style.color = 'red'  
            })
            //add the li's to the DOM
            ul.appendChild(li)
            //every time we add a new breed this will help add it to the global breeds array
            breeds.push(breed)
        }) 
        filter(breeds)
    })

}

//select dropdown id and create a variable for it; add an eventlistener called 'change' to the variable --> changing the status of the drop down (always use "change" even for dropdowns).
function filter(breeds){
    let breedDropdown = document.querySelector("#breed-dropdown");
    //when we make selection in dropdown, we're accessing our ul
    breedDropdown.addEventListener('change', function(e){
        let ul = document.querySelector('#dog-breeds');
        //usually always use target when we have an e or event function
        if(e.target.value !== ''){
            //emptying the ul, so we can only displauy the breeds we want
            ul.innerHTML=''
            //newBreeds array(.filter returns an array)= filtering all the breeds so that we are able to get a list of the all the breeds that start with a specific letter:: e.target.value = a,b,c,d in the dropdown
            let newBreeds = breeds.filter(breed => breed.startsWith(e.target.value))
            newBreeds.forEach(breed =>{
            const list = document.createElement('li')
            list.innerText = breed;
            ul.append(list)
            })
        }else{

        }
    });
}





    
    


