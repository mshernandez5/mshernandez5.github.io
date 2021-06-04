// Flowing Gradient Background

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

    class Stop
    {
        constructor(percent, color)
        {
            this.percent = percent;
            this.color = color;
        }
    }

    // Create Background Canvas & Assign Attributes
    let canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "-1";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    document.body.appendChild(canvas);

    // Configure Canvas & Get 2D Context
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let ctx = canvas.getContext("2d");

    // Fills
    const bgFill = "lightslategray";
    let gdFill = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.width / 4, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gdFill.addColorStop(0, "white");
    gdFill.addColorStop(1, "lightblue");

    // Initialize Points
    let stops = [];
    for (let p = 0; p <= 100; p += 10)
    {   
        y = 100;
        stops.push(new Stop(p / 100, y));
    }

    function loop(timeStamp)
    {
        render();
        window.requestAnimationFrame(loop);
    }

    function render()
    {
        ctx.fillStyle = bgFill;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    window.requestAnimationFrame(loop);
}();