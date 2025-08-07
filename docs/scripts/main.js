function toggle_section(name, toggle) {
    const element = document.getElementById(name)

    if (toggle == true) {
        element.removeAttribute("hidden")
    } else {
        element.setAttribute("hidden", "")
    }
}