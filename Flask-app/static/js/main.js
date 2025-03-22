let counterHearts = 0;
let noCount = 0;
let clickAudio = new Audio("./static/audio/mouse-click-123856.mp3");
let pageList = ["#", "#yes", "#yes-1", "#yes-2", "#yes-3", "#yes-4", "#yes-5", "#no", "#no-1", "#no-2", "#no-3"];

const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register(
                '/sw.js',
                {
                    scope: '/',
                }
            );
            if (registration.installing) {
                console.log('Service worker installing');
            } else if (registration.waiting) {
                console.log('Service worker installed');
            } else if (registration.active) {
                console.log('Service worker active');
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};

(async () => {
    window.oncontextmenu = function (event) { // disables double tap zoom on mobile
        event.preventDefault();
        event.stopPropagation();
        return false;
    };

    let page = location.hash ?? "#";
    page = pageList.includes(page) ? page : "#";
    await setPage(page);

    window.addEventListener("popstate", popped);

    buildPageTwo();

    setInterval(addHearts, 300);

    document.querySelectorAll(".btn").forEach(addClickSoundEffect)
    document.querySelectorAll(".a--btn-non-border").forEach(addClickSoundEffect)

    await registerServiceWorker()
})();

function addHearts() {
    counterHearts = counterHearts % 5;
    let btn = document.getElementById("btn--yes");
    let containerHearts = document.querySelector("#container--hearts");
    if (btn.matches(":hover")) {
        let div = document.createElement("div");
        div.classList.add("heart", "heart--float-animation", `heart--float-animation--${counterHearts}`)
        div.append(document.createElement("div"));
        div.append(document.createElement("div"));
        div.addEventListener("animationend", handleAnimationEnd, { once: true });
        containerHearts.append(div);
    }
    counterHearts++;

}

function handleAnimationEnd(ev) {
    ev.currentTarget.remove();
}

function popped(ev) {
    // console.log("POPSTATE");
    let page = location.hash ?? "#";
    page = pageList.includes(page) ? page : "#";
    // console.log(location.hash);
    setPage(page);
}

function addClickSoundEffect(element) {
    element.addEventListener("click", (ev) => {
        clickAudio.play()
    })
}

async function setPage(hash) {

    document.querySelectorAll(".page").forEach((page) => { page.classList.add("inactive"); });

    switch (hash) {
        case "#":
            document.getElementById("pageOne").classList.remove("inactive");
            break;
        case "#yes":
            document.querySelectorAll(".pageTwo__content__title").forEach((el) => {
                el.classList.add("inactive")
            });

            document.getElementById("yes-message-0").parentElement.classList.remove("inactive");
            document.getElementById("pageTwo").classList.remove("inactive");
            break;
        case "#yes-1":
            document.querySelectorAll(".pageTwo__content__title").forEach((el) => {
                el.classList.add("inactive")
            });

            document.getElementById("yes-message-1").parentElement.classList.remove("inactive");
            document.getElementById("pageTwo").classList.remove("inactive");
            break;
        case "#yes-2":
            document.querySelectorAll(".pageTwo__content__title").forEach((el) => {
                el.classList.add("inactive")
            });

            document.getElementById("yes-message-2").parentElement.classList.remove("inactive");
            document.getElementById("pageTwo").classList.remove("inactive");
            break;
        case "#yes-3":
            document.querySelectorAll(".pageTwo__content__title").forEach((el) => {
                el.classList.add("inactive")
            });

            document.getElementById("yes-message-3").parentElement.classList.remove("inactive");
            document.getElementById("pageTwo").classList.remove("inactive");
            break;
        case "#yes-4":
            document.querySelectorAll(".pageTwo__content__title").forEach((el) => {
                el.classList.add("inactive")
            });

            document.getElementById("yes-message-4").parentElement.classList.remove("inactive");
            document.getElementById("pageTwo").classList.remove("inactive");
            break;
        case "#yes-5":
            document.querySelectorAll(".pageTwo__content__title").forEach((el) => {
                el.classList.add("inactive")
            });

            document.getElementById("yes-message-5").parentElement.classList.remove("inactive");
            document.getElementById("pageTwo").classList.remove("inactive");
            break;
        case "#no":
            noCount++;
            document.getElementById("btn--no").href = `#no-${noCount}`;

            document.querySelectorAll(".pageThree__content__title").forEach((el) => {
                el.classList.add("inactive")
            });

            document.getElementById("no-message-0").parentElement.classList.remove("inactive");
            document.getElementById("pageThree").classList.remove("inactive");
            break;
        case "#no-1":
            noCount++;
            document.getElementById("btn--no").href = `#no-${noCount}`;

            document.querySelectorAll(".pageThree__content__title").forEach((el) => {
                el.classList.add("inactive")
            });

            document.getElementById("no-message-1").parentElement.classList.remove("inactive");
            document.getElementById("pageThree").classList.remove("inactive");
            break
        case "#no-2":
            noCount++;
            document.getElementById("btn--no").href = `#no-${noCount}`;

            document.querySelectorAll(".pageThree__content__title").forEach((el) => {
                el.classList.add("inactive")
            });

            document.getElementById("no-message-2").parentElement.classList.remove("inactive");
            document.getElementById("pageThree").classList.remove("inactive");
            break
        case "#no-3":
            noCount = 0;
            document.getElementById("btn--no").href = `#no`;

            document.querySelectorAll(".pageThree__content__title").forEach((el) => {
                el.classList.add("inactive")
            });

            document.getElementById("no-message-3").parentElement.classList.remove("inactive");
            document.getElementById("pageThree").classList.remove("inactive");
            break
        default:
    }
}//Screw C++, you're my A++ and beyond. My one and only, [Lover].

function buildPageTwo() {
    let heartAnims = document.querySelectorAll(".pageTwo__content  > .container--hearts > .heart--float-animation");
    let len = heartAnims.length;
    for (let i = 0; i < len; i++) {
        let ii = ((i % 5) * 3) % 5; /* 0 3 1 4 2 */
        heartAnims[i].style.animationDelay = `${(ii) * 1200}ms`;

    }
}

