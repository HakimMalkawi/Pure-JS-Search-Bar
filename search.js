const searchBar = document.querySelector(".primary-search-input")
const submitButton = document.querySelector(".primary-search-button-submit")
const clearButton = document.querySelector(".primary-search-button-clear")
const deleteButton = document.querySelector(".primary-search-button-delete")
const feedbackEl = document.querySelector(".secondary-results-feedback")
const matchesEl = document.querySelector(".secondary-results-matches")
let entries

localStorage.getItem("entries") ? entries = JSON.parse(localStorage.getItem("entries")) : entries = []

const saveInput = () => {
    if(searchBar.value === "") {
        return feedbackEl.innerText = "The entry cannot be empty"   }
    entries.push(searchBar.value)
    localStorage.setItem("entries", JSON.stringify(entries))
    searchBar.value = ""
    renderFeedback()    }

const clearInput = () => {
    searchBar.value = ""
    feedbackEl.innerText = ""   
    matchesEl.innerText = ""    }

const deleteInput = () => {
    clearInput()
    entries = []
    localStorage.removeItem("entries")  }

const renderFeedback = () => {
    if (entries.length === 1) {
        return feedbackEl.innerHTML = `Your first entry is: <span>${entries[0]}</span>` }
    else if (entries.length === 2) {
        return feedbackEl.innerHTML = `Your first 2 entries are: <span>${entries[0]}</span> & <span>${entries[1]}</span>` }

    feedbackEl.innerHTML = `Your ${entries.length} latest inputs are: `

    for(const entry of entries) {
        if (entries.indexOf(entry) === entries.length-1) {return}
        entries.indexOf(entry) === entries.length-2 ?
        feedbackEl.innerHTML += `<span>${entries.at(-2)}</span> & <span>${entries.at(-1)}</span>` :
        feedbackEl.innerHTML += `<span>${entry}, <span>`    }}

const getMatches = () => {
    matchesEl.innerHTML = ""
    let matches = `<ul class="secondary-results-matches-list">`
    if (searchBar.value != "") {
        for (const entry of entries.sort()) {
            if (entry.includes(searchBar.value)) {
                matches += `<li class="secondary-results-matches-list-item">${entry}</li>` }}}
    matchesEl.innerHTML = `${matches}</ul>`   }

const keyboardControl = e => {
    switch (e.key) {
        case `Enter`:
            saveInput()
        break   }
    getMatches()    }

submitButton.addEventListener('click', saveInput)
clearButton.addEventListener('click', clearInput)
deleteButton.addEventListener('click', deleteInput)
document.body.addEventListener('keyup', keyboardControl) 