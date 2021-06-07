// Page Navigation
let page = function()
{
    let initialContentSource = "content/home.html";

    function selectSidebarOption(event)
    {
        let selectedOption;
        sidebarOptions = document.getElementsByClassName("sidebar-option");
        for (let option of sidebarOptions)
        {
            if (option.classList.contains("selected"))
            {
                selectedOption = option;
                break;
            }
        }
        selectedOption.classList.remove("selected");
        selectedOption = event.currentTarget;
        selectedOption.classList.add("selected");
        switchContent(selectedOption.getAttribute("content"));
    }

    function init()
    {
        // Create Shared Navbar
        createNavbar();
        // Set Initial Content
        switchContent(initialContentSource);
    }

    function switchContent(contentSource)
    {
        xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function()
        {
            loadContent(xhr.responseXML);
        })
        xhr.open("GET", contentSource);
        xhr.responseType = "document";
        xhr.send();
    }

    function loadContent(contentHtml)
    {
        grid = document.getElementById("layout-grid");
        existingContent = document.getElementById("content");
        if (existingContent)
        {
            grid.removeChild(existingContent);
        }
        newContent = contentHtml.getElementById("content");
        grid.insertBefore(newContent, grid.firstChild);
    }

    function createNavbar()
    {
        // Set Click Listeners On Links
        sidebarOptions = document.getElementsByClassName("sidebar-option");
        for (let option of sidebarOptions)
        {
            if (option.getAttribute("content") == initialContentSource)
            {
                option.classList.add("selected");
            }
            option.addEventListener("click", selectSidebarOption)
        }
    }

    window.addEventListener('load', init)
}();