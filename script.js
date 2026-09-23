// ==========================================
// KAIJU INTERACTIVE
// WEBSITE JAVASCRIPT
// ==========================================


// COPYRIGHT YEAR

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuToggle =
    document.getElementById("menu-toggle");

const navigation =
    document.getElementById("navigation");


if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    // CLOSE MOBILE MENU AFTER CLICKING LINK

    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


// ==========================================
// ANIMATED STARFIELD
// ==========================================

const canvas =
    document.getElementById("starfield");


if (canvas) {

    const ctx =
        canvas.getContext("2d");

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    let stars = [];

    let animationId = null;


    // CREATE STARS

    function createStars() {

        const count = Math.min(
            150,
            Math.floor(
                window.innerWidth *
                window.innerHeight /
                9000
            )
        );

        stars = [];

        for (let i = 0; i < count; i++) {

            stars.push({

                x: Math.random() * canvas.width,

                y: Math.random() * canvas.height,

                radius: Math.random() * 1.5 + 0.3,

                speed: Math.random() * 0.25 + 0.05,

                opacity: Math.random() * 0.6 + 0.2

            });

        }

    }


    // RESIZE CANVAS

    function resizeCanvas() {

        const dpr = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvas.width =
            window.innerWidth * dpr;

        canvas.height =
            window.innerHeight * dpr;

        canvas.style.width =
            window.innerWidth + "px";

        canvas.style.height =
            window.innerHeight + "px";

        createStars();

        if (reducedMotion.matches) {

            drawStars(false);

        }

    }


    // DRAW STARS

    function drawStars(move = true) {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        for (const star of stars) {

            ctx.beginPath();

            ctx.arc(
                star.x,
                star.y,
                star.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(180, 255, 245, ${star.opacity})`;

            ctx.fill();

            if (move) {

                star.y += star.speed;

                if (star.y > canvas.height) {

                    star.y = 0;

                    star.x =
                        Math.random() * canvas.width;

                }

            }

        }

    }


    // ANIMATION LOOP

    function animate() {

        drawStars();

        animationId =
            requestAnimationFrame(animate);

    }


    // START STARFIELD

    function startStarfield() {

        if (animationId !== null) {

            cancelAnimationFrame(animationId);

            animationId = null;

        }

        resizeCanvas();

        if (!reducedMotion.matches) {

            animate();

        }

    }


    // HANDLE WINDOW RESIZE

    window.addEventListener(
        "resize",
        resizeCanvas
    );


    // HANDLE REDUCED MOTION CHANGES

    reducedMotion.addEventListener(
        "change",
        startStarfield
    );


    // INITIALIZE

    startStarfield();

}