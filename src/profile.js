const profileImage = document.getElementById("profile-img");
const profileImageInput = document.getElementById("profile-img-input");
const userProfileForm = document.getElementById("user-profile-form")

profileImage.addEventListener("click" , ()=> {
    profileImageInput.click()
})

profileImageInput.addEventListener("change" , ()=> {
    userProfileForm.submit();
})

const aboutSection = document.getElementById("about");

if (aboutSection.classList.contains("hidden")) {
    aboutSection.classList.add("block");
    aboutSection.classList.remove("hidden");
    aboutSection.classList.remove("border-b-2");
}