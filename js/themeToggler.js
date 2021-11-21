const themes = document.getElementsByName('radiobtn');
const container = document.body;
themes.forEach(theme => {
    theme.addEventListener('change', changeTheme)
});

function changeTheme(e) {
    const clicked = e.target.value;
    if (clicked == "btn-1") {
        container.classList.remove("theme-two", "theme-three");
    } else if (clicked == "btn-2") {
        container.classList.remove("theme-three");
        container.classList.add("theme-two")
    } else if (clicked == "btn-3") {
        container.classList.remove("theme-two");
        container.classList.add("theme-three")
    }
}

