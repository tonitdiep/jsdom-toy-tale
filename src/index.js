let addToy = false;
let divCollection = document.querySelector('#toy-collection')

document.addEventListener("DOMContentLoaded", () => {

      getToys()
      
    // add event listener to: 
      const createToy = document.querySelector(".add-toy-form");
      const addBtn = document.querySelector("#new-toy-btn");
      const toyFormContainer = document.querySelector(".container");
      
      createToy.addEventListener("submit", () =>{
        event.preventDefault()
        console.log(event.target)
        postToy(event.target.name.value, event.target.image.value)

        // fetch()
        // i want to grab inputs from form
        // const toyName = event.target.name.value
        // const toyImage = event.target.image.value
        // console.log(toyName, toyImage)
      
      })


      divCollection.addEventListener("click", (e) => {
       
          // console.log(e.target.previousElementSibling.innerText)
                  // if (e.target === "like-btn"){
        //   let more = parseInt(e.target.previousElementSibling.innerText)
        //   let newlikes = more + 1 
        //   (e.target.previousElementSibling.innerText) = newlikes + "likes"
        // }
          likes(e)
      })


      addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
          toyFormContainer.style.display = "block";

        } else {
          toyFormContainer.style.display = "none";
        }
      });
});

//function below gets and render all the toys
function getToys() {
  return fetch(`http://localhost:3000/toys`) 
  .then(r => r.json())
  .then(toys => {
  console.log(toys)
      let toysHTML = toys.map(function(toy){
          return `
          <div class="card">
            <h2>${toy.name}</h2>
            <img src=${toy.image} class="toy-avatar" />
            <p>${toy.likes} Likes </p>
            <button class="like-btn">Like <3</button>
        </div>
        `
        })
    console.log(toysHTML)
    document.querySelector('#toy-collection').innerHTML = toysHTML
  })
}

function postToy(name, image) {

    return fetch('http://localhost:3000/toys', {
      method: "POST", 
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      body: JSON.stringify({
          "name":  name,
          "image": image,
          "likes": 0
        }) 
      })    
      .then(res => res.json())

      .then((newToys) => {
        renderToys(newToys)
        let newToyHTML = `
        <div class="card">
          <h2>${newToys.name}</h2>
          <img src=${newToys.image} class="toy-avatar" />
          <p>${newToys.likes} Likes </p>
          <button class="like-btn">Like <3</button>
        </div>
      `
          console.log(newToyHTML)
          document.querySelector("#toy-collection").innerHTML += newToyHTML
        
      // fetch updated the DB
        // now i need to update the dom!
        // convert the newToy from JSON to html in ORDER to 
          // add to the DOM

      })
} 

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1
console.log(e)
  fetch(`http://localhost:3000/toys/:id`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"

        },
        body: JSON.stringify({
          "likes": more
        })
      })

      .then(res => res.json())
      .then((newToys => {
        e.target.previousElementSibling.innerText = `${more} likes`;
      }))

}


function renderToys(toy) {

  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollection.append(divCard)
}

