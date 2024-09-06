let userinput = document.getElementById("searchInput");
let searchresultelement = document.getElementById("searchResults");
let loadingelement = document.getElementById("spinner")

function createandappend(search) {
    loadingelement.classList.toggle("d-none")
    let {
        title,
        link,
        description
    } = search;

    let resultelement = document.createElement("div");
    resultelement.classList.add("result-item");
    searchresultelement.appendChild(resultelement);

    let titleelement = document.createElement("a");
    titleelement.textContent = title;
    titleelement.classList.add("result-title");
    titleelement.target = "_blank";
    titleelement.href = link;
    resultelement.appendChild(titleelement)

    let titlebreak = document.createElement("br");
    resultelement.appendChild(titlebreak);

    let linkelement = document.createElement("a");
    linkelement.classList.add("result-url");
    linkelement.href = link;
    linkelement.target = "_blank";
    linkelement.textContent = link;
    resultelement.appendChild(linkelement);

    let linkbreakelement = document.createElement("br");
    resultelement.appendChild(linkbreakelement);

    let descriptionelement = document.createElement("p");
    descriptionelement.classList.add("link-description");
    descriptionelement.textContent = description;
    resultelement.appendChild(descriptionelement)
}

function display(search_results) {
    loadingelement.classList.toggle("d-none");
    for (let search of search_results) {
        createandappend(search);
    }
}

function searchkeyword(event) {
    if (event.key === "Enter") {
        loadingelement.classList.toggle("d-none");
        searchresultelement.textContent = ""
        let searchkeyword = userinput.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchkeyword;
        let option = {
            method: "GET"
        }
        fetch(url, option)
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                let {
                    search_results
                } = data;
                display(search_results);
            })
    }
}
userinput.addEventListener("keydown", searchkeyword);