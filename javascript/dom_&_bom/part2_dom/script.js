// Example 1
document.getElementById("changeTextButton").addEventListener("click", () => {
    let paragraph = document.getElementById("myParagraph");
    paragraph.textContent = "The paragraph is changed.";
});

// Example 2
document.getElementById("highlightFirstCity").addEventListener("click", () => {
    document
        .getElementById("citiesList")
        .firstElementChild.classList.add("highlight");
});

// Example 3
document.getElementById("changeOrder").addEventListener("click", () => {
  let coffee = (document.getElementById("coffeeType"))
    coffee.innerText = "Espresso";
    coffee.style.backgroundColor = "brown"
    coffee.style.padding = "5px"
})

// Example 4
let newLi = document.createElement("li")
newLi.innerText = "Egg"
let ul = document.getElementById("shoppingList")
document.getElementById("addNewElement").addEventListener("click", () => {
  let ul = document.getElementById("shoppingList");
  let newLi = document.createElement("li");
  newLi.innerText = "Egg";
  ul.appendChild(newLi)
})


// Example 5
document.getElementById("removeLastTask").addEventListener("click", () => {
  let parent = document.getElementById("taskList")
  parent.lastElementChild.remove()
})

// Example 6
document.getElementById("clickMeButton").addEventListener("dblclick", () => {
  console.log("Hola")
})

// Example 7
document.getElementById("teaList").addEventListener("click", (event) => {
  // console.log(event.target)
  if (event.target && event.target.matches(".teaItem")) {
    console.log(`You selected: ${event.target.textContent}`)
  }
})

// Example 8
document.getElementById("feedbackForm").addEventListener("submit", (event) => {
  event.preventDefault()
  let feedback = document.getElementById("feedbackInput").value
  let display = document.getElementById("feedbackDisplay")
  display.textContent = `Feedback: ${feedback}`;
  let label = document.querySelector(`label[for="feedbackInput"]`)
  label.textContent = "Hello: "
})

// Example 9
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("domStatus").textContent = "DOM Fully Loaded"
})

// Example 10
document.getElementById("toggleHighlight").addEventListener("click", () => {
  let descriptionText = document.getElementById("descriptionText")
  descriptionText.classList.toggle("highlight")
})