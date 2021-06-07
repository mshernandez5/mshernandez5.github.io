// Element 3D Rotate Script

// Made with the help of this article:
// https://armandocanals.com/posts/CSS-transform-rotating-a-3D-object-perspective-based-on-mouse-position.html

let rotate = function()
{
    // Mouse Position
    let mouseX = 0;
    let mouseY = 0;

    // Rotation Constraint
    const constrain = 25;
    const perspective = 1000;

    function loop()
    {
        applyRotations();
        window.requestAnimationFrame(loop);
    }

    function applyRotations()
    {
        elements = document.getElementsByClassName("rotate");
        for (element of elements)
        {
            let box = element.getBoundingClientRect();
            let calcX = -(mouseY - box.y - (box.height / 2)) / constrain;
            let calcY = (mouseX - box.x - (box.width / 2)) / constrain;
            element.style.transform = `perspective(${perspective}px)`
                + ` rotateX(${calcX}deg)`
                + ` rotateY(${calcY}deg)`;
        }
    }

    function updateMouse(event)
    {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    function init()
    {
        window.addEventListener('mousemove', updateMouse);
        requestAnimationFrame(loop);
    }

    window.addEventListener('load', init)
}();