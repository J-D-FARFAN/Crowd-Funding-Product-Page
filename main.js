const bookmark = {
    content: document.querySelector(".bx--bookmark"),
    icon: document.querySelector(".colorCircle"),
    flag: document.querySelector(".flagBookmark"),
    text: document.querySelector(".bookmark")
};

const modal = {
    backProject: document.querySelector(".btn--backThisProject"),
    contain: document.querySelector(".bx--containModel"),
    blurPage: document.querySelector(".montionBlur"),
    close: document.querySelector(".iconCloseModal"),
    inputs: document.querySelectorAll(".activeSelectedReward"),
    selectedReward: document.querySelectorAll(".content--enterPledge"),
    borderActive: document.querySelectorAll(".bx--cardModalReward"),
    openPledge: document.querySelectorAll(".openSectionReward"),
    submit: document.querySelectorAll("#submit")
};

const success = document.querySelector(".bx--success");
const btnGoIt = document.querySelector(".gotIt");
const valuePledges = document.querySelectorAll(".valuePledge");

const menu = document.querySelector(".menuBurguerPage")
const navBar = document.querySelector(".navbar")

function showMenu(){
    if(!menu.classList.contains("menuBurguerPageClose")){
        menu.classList.remove("menuBurguerPage")
        menu.classList.add("menuBurguerPageClose")
        gsap.from(".navbar", {x: 900})
        navBar.style.display = "flex"
        modal.blurPage.style.display = "block";
    }else{
        menu.classList.add("menuBurguerPage")
        menu.classList.remove("menuBurguerPageClose")
        navBar.style.display = "none"
        modal.blurPage.style.display = "none";
    }
}

function toggleBookmarkColor() {
    const isActive = bookmark.icon.classList.toggle("colorActiveBookmark");
    bookmark.flag.style.fill = isActive ? "white" : "";
    bookmark.text.style.color = isActive ? "hsl(176, 50%, 47%)" : "";
}

function showModal() {
    modal.contain.style.display = "block";
    modal.blurPage.style.display = "block";

    gsap.from(".bx--containModel", {
        x: 900,
        duration: 0.7,
    });

    modal.close.addEventListener("click", closeModal);
}

function closeModal() {
    modal.contain.style.display = "none";
    modal.blurPage.style.display = "none";
    resetModalInputs();
}

function resetModalInputs() {
    modal.selectedReward.forEach(el => el.style.display = "none");
    modal.borderActive.forEach(el => el.style.borderColor = "");
    modal.inputs.forEach(input => input.checked = false);
    valuePledges.forEach(input => {
        input.value = '';
        input.style.borderColor = '';
    });
}

function handleInputValidation(input, index) {
    const value = input.value;
    const minValues = [25, 75];
    const isValid = value && parseInt(value) >= minValues[index];

    input.style.borderColor = isValid ? '' : 'tomato';
    return isValid;
}

function validateInputs() {
    let inputValid = false;
    valuePledges.forEach((input, index) => {
        inputValid = handleInputValidation(input, index) || inputValid;

        input.addEventListener("blur", () => handleInputValidation(input, index));
        input.addEventListener("focus", () => input.style.borderColor = '');
        input.addEventListener("input", () => handleInputValidation(input, index));
    });
    return inputValid;
}

function handleSubmit(event) {
    event.preventDefault();
    if (validateInputs()) {
        gsap.from(".bx--success", { x: -900, duration: 0.7 });
        modal.contain.style.display = "none";
        success.style.display = "block";
        btnGoIt.addEventListener("click", btnGoItReset);
    }
}

function handleRewardSelection(index) {
    modal.selectedReward.forEach(el => el.style.display = "none");
    modal.borderActive.forEach(el => el.style.borderColor = "");
    if (modal.borderActive[index]) {
        modal.borderActive[index].style.borderColor = "hsl(176, 50%, 47%)";
    }
}

function handlePledgeOpen(index) {
    if (modal.selectedReward[index]) {
        modal.selectedReward[index].style.display = "block";
    }
}

function btnGoItReset() {
    success.style.display = "none";
    modal.blurPage.style.display = "none";
    resetModalInputs();
}

bookmark.content.addEventListener("click", toggleBookmarkColor);
modal.backProject.addEventListener("click", showModal);
modal.inputs.forEach((input, index) => input.addEventListener("click", () => handleRewardSelection(index)));
modal.openPledge.forEach((input, index) => input.addEventListener("click", () => handlePledgeOpen(index)));
modal.submit.forEach(btn => btn.addEventListener("click", handleSubmit));
menu.addEventListener("click", showMenu)


const btnSelectedReward = document.querySelectorAll("#sltReward");
btnSelectedReward.forEach(btn => {
    btn.addEventListener("click", () => {
        gsap.from(".bx--success", { x: -900, duration: 0.7 });
        success.style.display = "block";
        modal.blurPage.style.display = "block";
        btnGoIt.addEventListener("click", btnGoItReset);
    });
});
