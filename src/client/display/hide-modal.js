// const modals = [...document.querySelectorAll(".modal")];

// function hideModal() {
//     modals.forEach(modal => {
//         modal.classList.remove("show-modal");
//     });
// }

function hideGamelogModal() {
    document.querySelector(".gamelog").classList.remove("show-modal");
}
function hideLeaderboardModal() {
    document.querySelector(".leaderboard").classList.remove("show-modal");
}
function hideRulesModal() {
    document.querySelector(".rules").classList.remove("show-modal");
}
function hideDisconnectModal() {
    document.querySelector(".disconnect").classList.remove("show-modal");
}
function hideDashboardModal() {
    document.querySelector(".dashContainer").classList.remove("show-modal");
}

function hideProfile() {
    document
        .querySelector(".containerProfile")
        .classList.remove("show-profile");
}

export {hideGamelogModal};
export {hideLeaderboardModal};
export {hideRulesModal};
export {hideDisconnectModal};
export {hideDashboardModal};
export {hideProfile};
