function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.style.display = (sidebar.style.display === "block") ? "none" : "block";
}

// Close the sidebar if the user clicks outside of it
window.onclick = function(event) {
    var sidebar = document.getElementById("sidebar");
    if (event.target !== sidebar && !sidebar.contains(event.target)) {
        sidebar.style.display = "none";
    }
};
