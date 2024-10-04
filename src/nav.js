// Navigation menu for mobile
const menuBars = document.getElementById("menu-bars");
const mobileMenu = document.getElementById("mobile-menu");
const closeBtn = document.getElementById("closeBtn");
const navSearchMobile = document.getElementById("nav-search-mobile")

menuBars.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.add("flex");
  document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.remove("flex");
  document.body.style.overflow = 'auto';
});

const links = document.getElementsByClassName("link");

for (let i = 0; i < links.length; i++) {
  const element = links[i];
  element.addEventListener("click" , ()=> {
    closeBtn.click();
  })
}

// Changing nav on scroll
const navigationPanel = document.getElementById("navigationPanel");
const exploreOption = document.getElementById("explore-option")
const signin = document.getElementsByClassName("signin");
const navSearch = document.getElementById("nav-search");
const dropDowns = document.getElementsByClassName("drop-downs");
const arrow = document.getElementsByClassName("arrow");
const navSearchPortrait = document.getElementById("navSearchPortrait");
const navSearchInput = document.getElementById("navSearchInput");
const dropDownsOptions = document.getElementsByClassName("drop-down-option");




const isProfilePage = window.location.pathname.startsWith("/userProfile");

function toCheckForNavSearchVisibility() {

  const isScreenSizeMd = window.innerWidth >= 768;
  if (isProfilePage && isScreenSizeMd) {  
    navSearch.classList.add("block");
    navSearch.classList.remove("hidden");
    navSearchPortrait.classList.remove("hidden")
  } 
  else {
    navSearch.classList.add("hidden")
    navSearch.classList.remove("block")
    navSearchPortrait.classList.remove("hidden")
  }
  
  return;
}


if (isProfilePage) {
  toCheckForNavSearchVisibility();
  window.addEventListener("resize", toCheckForNavSearchVisibility);
} 


window.addEventListener("resize" , changeNav)


window.onscroll = function () {
  changeNav();
};

function changeNav() {
  
  const isScreenSizeMd = window.innerWidth >= 768;
  const scrolled = document.body.scrollTop > 30 || document.documentElement.scrollTop > 30
  if (scrolled) {
    navigationPanel.style.background = "white";
    navigationPanel.style.color = "black";
    exploreOption.style.background = "rgba(209,213,219,0.5)";
    exploreBtn.style.color = "black"
    navigationPanel.classList.add("shadow-lg");

    exploreOption.addEventListener("mouseover", () => {
      exploreOption.style.background = "rgba(209,213,219,0.7)";
    });
    exploreOption.addEventListener("mouseout", () => {
      exploreOption.style.background = "rgba(209,213,219,0.5)";
    });

    if (isScreenSizeMd) {
      navSearch.classList.remove("hidden")
      navSearch.classList.add("block")
    } else {
      navSearch.classList.add("hidden")
      navSearch.classList.remove("block")
      navSearchPortrait.classList.remove("hidden")
    }

    for (let i = 0; i < dropDowns.length; i++) {
      dropDowns[i].style.background = "#191b26";
      dropDowns[i].style.color = "#d1d5db";
    }

    
    for (let i = 0; i < dropDownsOptions.length; i++) {
      dropDownsOptions[i].addEventListener("mouseover" , ()=> {
        dropDownsOptions[i].style.background = "rgba(243,244,246,0.2)"
      })
      dropDownsOptions[i].addEventListener("mouseout" , ()=> {
        dropDownsOptions[i].style.background = "transparent"
      })
    }


  

    for (let i = 0; i < arrow.length; i++) {
      arrow[i].style.color = "rgba(0,0,0,0.9)";
    }

    for (let i = 0; i < signin.length; i++) {
      const element = signin[i];
      element.style.background = "rgba(209,213,219,0.5)";
      element.addEventListener("mouseover", () => {
        element.style.background = "rgba(209,213,219,0.7)";
      });
      element.addEventListener("mouseout", () => {
        element.style.background = "rgba(209,213,219,0.5)";
      });
    }
  } else {
    navigationPanel.style.background = "transparent";
    navigationPanel.style.color = "white";
    navigationPanel.classList.remove("shadow-lg");
    exploreOption.style.background = "rgb(107,114,128,0.3)";
    exploreBtn.style.color = "white";

    exploreOption.addEventListener("mouseover", () => {
      exploreOption.style.background = "rgb(107,114,128,0.6)";
    });
    exploreOption.addEventListener("mouseout", () => {
      exploreOption.style.background = "rgb(107,114,128,0.3)";
    });

    if (searchBarPortrait.classList.contains("flex")) {
      closeSearchBarPortrait()
    }

    if (!isProfilePage) {
      navSearch.classList.add("hidden")
      navSearch.classList.remove("block")
      navSearchPortrait.classList.add("hidden")
    } 

    for (let i = 0; i < dropDowns.length; i++) {
      dropDowns[i].style.background = "white";
      dropDowns[i].style.color = "black";
    }

       
    for (let i = 0; i < dropDownsOptions.length; i++) {
      dropDownsOptions[i].addEventListener("mouseover" , ()=> {
        dropDownsOptions[i].style.background = "#e5e7eb"
      })
      dropDownsOptions[i].addEventListener("mouseout" , ()=> {
        dropDownsOptions[i].style.background = "transparent"
      })
    }

    for (let i = 0; i < arrow.length; i++) {
      arrow[i].style.color = "white";
    }


    for (let i = 0; i < signin.length; i++) {
      const element = signin[i];
      element.style.background = "rgba(107,114,128,0.3)";
      element.addEventListener("mouseover", () => {
        element.style.background = "rgba(107,114,128,0.6)";
      });
      element.addEventListener("mouseout", () => {
        element.style.background = "rgba(107,114,128,0.3)";
      });
    }

  }
}

// Logic to close profile-options tab on click

document.addEventListener("click", () => {
  for (let i = 0; i < profileOptions.length; i++) {
    if (!profileOptions[i].classList.contains("hidden")) {
      profileOptions[i].classList.add("hidden");
      profileOptions[i].classList.remove("flex");
    }
  }
  for (let i = 0; i < arrow.length; i++) {
    if (!arrow[i].classList.contains("hidden")) {
      arrow[i].classList.add("hidden");
    }
  }

  if (!exploreOptions.classList.contains("hidden")) {
    exploreOptions.classList.add("hidden")
    exploreOptions.classList.remove("flex")
    exploreIcon.classList.toggle("fa-caret-up");
    exploreIcon.classList.toggle("fa-caret-down");
  }

});

// Showing profile-options
const profileImg = document.getElementsByClassName("profile-img");
const profileOptions = document.getElementsByClassName("profile-options")
const logo = document.getElementById("logo");

for (let i = 0; i < profileImg.length; i++) {
  profileImg[i].addEventListener("click", (event) => {
    event.stopPropagation();

    if (!exploreOptions.classList.contains("hidden")) {
      exploreOptions.classList.add("hidden")
      exploreOptions.classList.remove("flex")
      exploreIcon.classList.toggle("fa-caret-up");
      exploreIcon.classList.toggle("fa-caret-down");
    }

    if (!isProfilePage) {
      if (!orderOptions.classList.contains("hidden")) {
        orderOptions.classList.toggle("hidden");
        orderOptions.classList.toggle("flex");
        orientationArrow.classList.toggle("fa-caret-down");
        orientationArrow.classList.toggle("fa-caret-up");
      }
    }

    for (let i = 0; i < profileOptions.length; i++) {
      profileOptions[i].classList.toggle("hidden");
      profileOptions[i].classList.toggle("flex");
    }
    for (let i = 0; i < arrow.length; i++) {
      arrow[i].classList.toggle("hidden");
    }
  });
}

const exploreOptions = document.getElementById("explore-options");
const exploreBtn = document.getElementById("explore-btn");
const exploreIcon = document.getElementById("explore-icon");

exploreBtn.addEventListener("click" , (event)=> {
  event.stopPropagation()

  for (let i = 0; i < profileOptions.length; i++) {
    if (!profileOptions[i].classList.contains("hidden")) {
      profileOptions[i].classList.add("hidden");
      profileOptions[i].classList.remove("flex");
    }
  }
  for (let i = 0; i < arrow.length; i++) {
    if (!arrow[i].classList.contains("hidden")) {
      arrow[i].classList.add("hidden");
    }
  }

  if (!isProfilePage) {
    if (!orderOptions.classList.contains("hidden")) {
      orderOptions.classList.toggle("hidden");
      orderOptions.classList.toggle("flex");
      orientationArrow.classList.toggle("fa-caret-down");
      orientationArrow.classList.toggle("fa-caret-up");
    }
  }


  exploreOptions.classList.toggle("hidden");
  exploreOptions.classList.toggle("flex");
  exploreIcon.classList.toggle("fa-caret-up");
  exploreIcon.classList.toggle("fa-caret-down");
}) 

const searchBarPortrait = document.getElementById("SearchBarPortrait")

navSearchPortrait.addEventListener("click" , ()=> {
  searchBarPortrait.classList.remove("hidden");
  searchBarPortrait.classList.add("flex");
})

function closeSearchBarPortrait() {
  searchBarPortrait.classList.add("hidden")
  searchBarPortrait.classList.remove("flex")
}

const exploreBtnMobilePortrait = document.getElementById("explore-btn-mobile-portrait");
const exploreOptionsMobilePortrait = document.getElementById("explore-options-mobile-portrait");
const exploreIconMobilePortrait = document.getElementById("explore-icon-mobile-portrait");

exploreBtnMobilePortrait.addEventListener("click" , ()=> {
  exploreOptionsMobilePortrait.classList.toggle("flex");
  exploreOptionsMobilePortrait.classList.toggle("hidden");
  exploreIconMobilePortrait.classList.toggle("fa-caret-up");
  exploreIconMobilePortrait.classList.toggle("fa-caret-down");
})




 

