const order = document.getElementById("order");
const orderOptions = document.getElementById("order-options");
const orientationArrow = document.getElementById("orientationArrow");

// Logic to toggle order options
order.addEventListener("click", (event) => {
  event.stopPropagation();

  if (!exploreOptions.classList.contains("hidden")) {
    exploreOptions.classList.add("hidden");
    exploreOptions.classList.remove("flex");
    exploreIcon.classList.toggle("fa-caret-up");
    exploreIcon.classList.toggle("fa-caret-down");
  }

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

  orderOptions.classList.toggle("hidden");
  orderOptions.classList.toggle("flex");
  orientationArrow.classList.toggle("fa-caret-down");
  orientationArrow.classList.toggle("fa-caret-up");
});

// Logic to close order-options
document.addEventListener("click", () => {
  if (!orderOptions.classList.contains("hidden")) {
    orderOptions.classList.add("hidden");
    orderOptions.classList.remove("flex");
    orientationArrow.classList.toggle("fa-caret-down");
    orientationArrow.classList.toggle("fa-caret-up");
  }
});

// Initial Variables
let isLoading = false;
let page = 1;
let LoadBtn = false;
let breakPointForGalleryContainer = 8000;
const gallery = document.getElementById("gallery");
const galleryContainer = document.getElementById("gallery-container");
const loader = document.getElementById("loader");
const blurBg = document.getElementById("blur-bg");
const LoadMoreBtn = document.getElementById("LoadMoreBtn");
const exploreMoreBtn = document.getElementById("exploreMoreBtn");
const titleForResult = document.getElementById("title");
const endOfResult = document.getElementById("endOfResultsMsg");
const resultsNotFound = document.getElementById("ResultsNotFound");
const aboutSection = document.getElementById("about");
let currentQuery = "";
let NoResults = true;

titleForResult.innerHTML = "Free Stock Images";

let imgURLs = new Set();


// Logic to fetch HomeImages from backend
async function fetchHomeImages(per_page = 25, query = "", orientation = "all") {
  
  if (isLoading) {
    return;
  }

  isLoading = true;
  loader.classList.remove("hidden");


  if (resultsNotFound.classList.contains("flex")) {
    resultsNotFound.classList.remove("flex");
    resultsNotFound.classList.add("hidden");
  }

  if (query !== "") {
    titleForResult.innerHTML = "Searching...";
  }

  try {
    // Build the search URL based on query presence

    const response = await fetch(
      `/search?page=${page}&per_page=${per_page}&query=${query}&orientation=${orientation}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (data.data.length === 0) {
      resultsNotFound.classList.remove("hidden");
      resultsNotFound.classList.add("flex");
      titleForResult.innerHTML = "Results not found";
      NoResults = true;
      return;
    }

    titleForResult.innerHTML =
      query !== "" ? `Results for ${query}` : "Free Stock Images";

    console.log(data.data);

    if (data.data.length > 0) {
      displayImages(data.data);
      page++;
    }

    if (galleryContainer.offsetHeight > breakPointForGalleryContainer) {
      galleryContainer.style.height = `${breakPointForGalleryContainer}px`;
      galleryContainer.style.overflow = "hidden";
      blurBg.classList.remove("hidden");
      blurBg.classList.add("flex");
      LoadMoreBtn.classList.remove("hidden");
      endOfResult.classList.add("hidden");
      LoadBtn = true;
      aboutSection.classList.remove("hidden");
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading = false;
    loader.classList.add("hidden");
  }
}

async function loadMoreImages() {
  LoadBtn = false;

  breakPointForGalleryContainer += 4000;

  if (currentQuery === "") {
    await fetchHomeImages((per_page = 10), currentQuery);
  } else {
    await fetchHomeImages((per_page = 50), currentQuery);
  }

  galleryContainer.style.height = `${breakPointForGalleryContainer}px`;
  galleryContainer.style.overflow = `hidden`;

  if (breakPointForGalleryContainer > 16000) {
    if (currentQuery === "") {
      exploreMoreBtn.classList.remove("hidden");
      LoadMoreBtn.classList.add("hidden");
    } else {
      endOfResult.classList.remove("hidden");
      LoadMoreBtn.classList.add("hidden");
    }

    galleryContainer.style.height = "auto";
  }

  LoadBtn = true;
}

function displayImages(images) {
  
  images.forEach((image) => {
    const imgURL = image.webformatURL || image.urls.regular;

    if (imgURLs.has(imgURL)) {
      return;
    } else {
      imgURLs.add(imgURL);
    }

    // Calculate the aspect ratio of the image (width / height)
    const aspectRatio = image.imageWidth / image.imageHeight;

    const container = document.createElement("div");
    // Create a container for the image that preserves the aspect ratio
    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
    imageContainer.style.paddingBottom = `${(1 / aspectRatio) * 100}%`; // Padding top for aspect ratio

    // Create a placeholder element
    const placeholder = document.createElement("div");
    placeholder.className = "placeholder";
    imageContainer.appendChild(placeholder);

    // Create a hover effect for downloads
    const imgOptionsContainer = document.createElement("div");
    const imgOptions = document.createElement("div");
    imgOptionsContainer.classList.add("imgOptionsContainer");
    imgOptions.classList.add("imgOptions");

    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = "Download";
    downloadBtn.className = "downloadBtn";

    const tags = document.createElement("p");
    tags.innerHTML = image.tags;
    tags.className = "tags";

    const likeBtn = document.createElement("i");
    likeBtn.classList.add("fa-solid", "fa-heart", "likeBtn");


    const imgLink = document.createElement("a");
    imgLink.href = image.pageURL;
    imgLink.target = "blank";

    downloadBtn.addEventListener("click", () => {

      const userData = document.getElementById("user-data")
      console.log(userData);
      
      const userDataAttribute = userData.getAttribute("data-user")

      if (userDataAttribute) {

        imgLink.click()
      } else {
        window.location.href = "/user/login"
      }
    });

    downloadBtn.addEventListener("mouseover", () => {
      downloadBtn.style.background = "rgba(209, 213,219,1)";
    });
    downloadBtn.addEventListener("mouseout", () => {
      downloadBtn.style.background = "rgba(209, 213,219,0.8)";
    });



    imgOptions.appendChild(downloadBtn);
    imgOptions.appendChild(likeBtn);

    // Create the image element
    const img = new Image();
    img.src = imgURL;
    img.alt = "Image";
    img.loading = "lazy";
    img.classList.add("img");

    // Replace placeholder with the image once it's loaded
    img.onload = () => {
      placeholder.style.display = "none";
      img.classList.add("visible");
    };

    // Append the image inside the container
    imageContainer.appendChild(img);

    // Append the container to the gallery
    container.className = "container";
    container.appendChild(imageContainer);
    container.appendChild(imgOptionsContainer);
    imgOptionsContainer.appendChild(tags);
    imgOptionsContainer.appendChild(imgOptions);

    let details = navigator.userAgent;

    let regexp = /android|iphone|kindle|ipad/i;

    let isMobileDevice = regexp.test(details);

    if (isMobileDevice) {
      container.addEventListener("click", () => {
        document.querySelectorAll(".imgOptionsContainer").forEach((element) => {
          element.classList.remove("toggleOpacity");
        });

        imgOptionsContainer.classList.toggle("toggleOpacity");
      });

      likeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    } else {
      container.addEventListener("mouseover", () => {
        imgOptionsContainer.classList.toggle("toggleOpacity");
      });
      container.addEventListener("mouseout", () => {
        imgOptionsContainer.classList.toggle("toggleOpacity");
      });
    }

    gallery.appendChild(container);

  });
}

// fetch images on load
window.onload = async () => {
  await fetchHomeImages();
};

LoadMoreBtn.addEventListener("click", () => {
  loadMoreImages();
});

function performSearch(event , category = "") {
  event.preventDefault();
  const searchQueryValues = document.getElementsByClassName("searchQueryValue");

  if (category === "") {
    for (let i = 0; i < searchQueryValues.length; i++) {
      const element = searchQueryValues[i];
  
      if (element.value === "") {
        continue;
      }
      currentQuery = element.value;
      element.value = "";
    }
  } else {
    currentQuery = category;
  }

  window.scrollTo(0, 100); 

  gallery.innerHTML = "";
  galleryContainer.style.height = "auto";
  breakPointForGalleryContainer = 8000;
  page = 1;


  if (blurBg.classList.contains("flex")) {
    blurBg.classList.add("hidden");
    blurBg.classList.remove("flex");
  }
  if (!exploreMoreBtn.classList.contains("hidden")) {
    exploreMoreBtn.classList.add("hidden");
  }

  if (!aboutSection.classList.contains("hidden")) {
    aboutSection.classList.add("hidden");
  }

  if (LoadBtn) {
    LoadBtn = false;
  }

  if (NoResults) {
    NoResults = false;
  }

  fetchHomeImages(50, currentQuery);
}

const orientationValue = document.getElementById("orientationValue");

function filterOrientation(filterOrientationValue) {
  gallery.innerHTML = "";
  galleryContainer.style.height = "auto";
  breakPointForGalleryContainer = 8000;
  page = 1;

  if (blurBg.classList.contains("flex")) {
    blurBg.classList.add("hidden");
    blurBg.classList.remove("flex");
  }
  if (!exploreMoreBtn.classList.contains("hidden")) {
    exploreMoreBtn.classList.add("hidden");
  }

  if (!aboutSection.classList.contains("hidden")) {
    aboutSection.classList.add("hidden");
  }

  if (LoadBtn) {
    LoadBtn = false;
  }

  if (NoResults) {
    NoResults = false;
  }

  window.scrollTo(0, 100); 

  if (filterOrientationValue === "horizontal") {
    orientationValue.innerHTML = "Landscape";
  } else if (filterOrientationValue === "vertical") {
    orientationValue.innerHTML = "Portrait";
  } else {
    orientationValue.innerHTML = "All";
  }

  fetchHomeImages(50, currentQuery, filterOrientationValue);
}

let isScrolling = false;
window.addEventListener("scroll", async () => {
  showscrollbtn();

  if (isScrolling || LoadBtn || NoResults) return;
  isScrolling = true;

  setTimeout(async () => {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    if (scrollableHeight - scrolled < 300) {
      await fetchHomeImages(50, currentQuery);
    }
    isScrolling = false;
  }, 500);
});

function showscrollbtn() {
  let btn = document.getElementById("scroll-top");
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    btn.classList.remove("hidden");
  } else {
    btn.classList.add("hidden");
  }
}

function scrolltop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
