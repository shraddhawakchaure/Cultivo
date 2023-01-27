// let searchBox = document.querySelector('#soil_type');
// let images = document.querySelectorAll('.card');
// console.log(images)


function getResults() {
//    console.log("It fired")
   const input = document.getElementById('soil_type').value.toUpperCase();
   const cardContainer = document.getElementById('card-lists');
   const cards = cardContainer.getElementsByClassName('card');
   console.log(cards);
   for(let i=0; i<cards.length; i++) {
    let title = cards[i].querySelector('.card-body h6.card-title');
    console.log(title);
    if(title.innerText.toUpperCase().indexOf(input) > -1) {
        cards[i].style.display = "";
    }
    else {
        cards[i].style.display = "none";
    }
   }
//   images.forEach(val => {
//     val.style.display = 'none';
//     val.dataset.title.includes(e.target.value) ?
//       val.style.display = 'block' : null;
//   })
}

// searchBox.addEventListener('keyup', getResults)