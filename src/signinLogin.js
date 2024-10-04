// Toggling between login and signup
function displayTab(ele , formType) {
  
  var tabContent , tabLink , i;

  tabContent = document.getElementsByClassName("tab-content");
  
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].classList.add("hidden")
  }

  tabLink = document.getElementsByClassName("tabLink");
  
  for (let i = 0; i < tabLink.length; i++) {
    tabLink[i].classList.remove("active");
    tabLink[i].classList.remove("bg-blue-950");
    tabLink[i].classList.remove("text-white");
  }

  document.getElementById(formType).classList.remove("hidden");
  ele.classList.add("bg-blue-950")
  ele.classList.add("text-white")
  
}

document.getElementById("error-close").addEventListener("click" , ()=> {
  document.getElementById("error").classList.add("hidden")
})




