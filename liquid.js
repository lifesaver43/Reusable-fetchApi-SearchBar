

function liquidMetal(query) {
    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then((response) => {
        console.log(response);
        if(response.ok) {
            return response.json();
        }else {
            throw "HTTP ERROR";
            // it will immediately go to catch error because it is being thrown inside a promise
        }
    })
    .then((data) => {
        const result = data.map(info => info.show.name)
        console.log(result)
        //Calling the function
        renderResult(result)
        //Removing error
        document.getElementById("errorMessage").innerHTML = "";
    })
    .catch((error) => {
        document.getElementById("errorMessage").innerHTML = error
        renderResult([])
    });
}

function renderResult(result) {
    const ul = document.querySelector("ul")
    ul.innerHTML = "";
    result.forEach(element => {
        const list = document.createElement("li")
        list.innerText = element
        ul.appendChild(list);
    });
}

let searchTimeoutToken = 0;

window.onload = () => {
    const searchFieldElement = document.getElementById("indaboski")
    searchFieldElement.onkeyup = () => {

        clearTimeout(searchTimeoutToken);

        if(searchFieldElement.value.trim().length === 0) {
            return;
        }

        searchTimeoutToken = setTimeout(() => {
            liquidMetal(searchFieldElement.value)
        }, 250);
    }
}
