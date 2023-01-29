// let searchBox = document.querySelector('#soil_type');
// let images = document.querySelectorAll('.card');
// console.log(images)

// home page redirect
function getProducts(result) {
    result = result.toUpperCase();
    window.location.href ='http://localhost:5000/browseproducts?result='+result;
}

function onPageLoad() {
    let urlString = window.location.href
    if(urlString.indexOf("?") > -1) {
    let paramString = urlString.split('?')[1];
        let queryString = new URLSearchParams(paramString);
        for(let pair of queryString.entries()) {
            result = pair[1];
        }
    }
    var dropdown = document.getElementById("fertilizer_type_bp");
    for(var i = 0;i < dropdown.length;i++){
        if(dropdown.options[i].value == result ){
            dropdown.options[i].selected = true;
            break;
        }
    }
    getResults(dropdown);
    
}

// Browse products filter
function getResults(ele) {
    const input = ele.options[ele.selectedIndex].text.toUpperCase();
    const cardContainer = document.getElementById('card-lists');
    const cards = cardContainer.getElementsByClassName('card');
    if(input == 'SELECT FERTILIZER TYPE') {
        for(let i=0; i<cards.length; i++) {
            cards[i].style.display = "";
        }
        return;
    } 
    else {
        for(let i=0; i<cards.length; i++) {
            let title = cards[i].querySelector('.card-body h6.card-title');
            if(title.innerText.toUpperCase().indexOf(input) > -1) {
                cards[i].style.display = "";
            }
            else {
                cards[i].style.display = "none";
            }
        }
    }
}