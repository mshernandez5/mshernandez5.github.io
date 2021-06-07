// Background Script

let background = function()
{
    class Point
    {
        constructor(x, y)
        {
            this.x = x;
            this.y = y;
        }
    }

    // Canvas
    let canvas;
    let ctx;

    // Mouse Position
    let mouseX = 0;
    let mouseY = 0;

    // Fills
    let image;
    let lineColor = [0, 0, 0];

    // Line Ending Points
    let destinations;

    function loop()
    {
        render();
        window.requestAnimationFrame(loop);
    }

    function updateMouse(event)
    {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    function render()
    {
        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background Image
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Pick Color For Lines
        let imageColor = ctx.getImageData(mouseX, mouseY, 1, 1).data;
        lineColor[0] = (3 * lineColor[0] + imageColor[0]) / 4;
        lineColor[1] = (3 * lineColor[1] + imageColor[1]) / 4;
        lineColor[2] = (3 * lineColor[2] + imageColor[2]) / 4;

        // Create Dynamic Gradient
        let gdFill = ctx.createRadialGradient(mouseX, mouseY, canvas.width / 8, mouseX, mouseY, canvas.width / 4);
        gdFill.addColorStop(0, `rgba(${lineColor[0]}, ${lineColor[1]}, ${lineColor[2]}, 0.5)`);
        gdFill.addColorStop(1, "rgba(255, 255, 255, 0.3)");

        // Draw Lines
        ctx.strokeStyle = gdFill;
        ctx.beginPath();
        for (let point of destinations)
        {
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
    }

    function reset()
    {
        // Configure Canvas & Get 2D Context
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx = canvas.getContext("2d");

        // Initial State
        destinations = [];
        const lineSpacing = 50;
        for (let x = 0; x <= document.body.clientWidth; x += lineSpacing)
        {   
            destinations.push(new Point(x, 0));
            destinations.push(new Point(x, document.body.clientHeight));
        }
        for (let y = 0; y <= document.body.clientHeight; y += lineSpacing)
        {   
            destinations.push(new Point(0, y));
            destinations.push(new Point(document.body.clientWidth, y));
        }
    }

    function init()
    {
        // Get Background Image
        image = document.getElementById("background-img");

        // Create Background Canvas & Assign Attributes
        canvas = document.createElement("canvas");
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.zIndex = "-1";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        document.body.appendChild(canvas);

        reset();

        window.requestAnimationFrame(loop);
        window.addEventListener('mousemove', updateMouse);
        window.addEventListener('resize', reset);
    }

    window.addEventListener('load', init)
}();