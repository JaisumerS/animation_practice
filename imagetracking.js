/*const track = document.getElementById("image-tracking");

window.onmousedown = e => {
    track.dataset.mousedownat = e.clientX;
}

window.onmouseup = () => {
    track.dataset.mousedownat = "0";
    track.dataset.mouseupat = track.dataset.percentage;
}

window.onmousemove = e => {
    if(track.dataset.mousedownat === "0") return;
    const mouseCurrent = parseFloat(track.dataset.mousedownat) - e.clientX,
        maxMouse = window.innerWidth / 2;
    const percentage = (mouseCurrent/maxMouse) * -100;
    let newpercentage = parseFloat(track.dataset.mouseupat) + percentage;
    newpercentage = Math.max(Math.min(newpercentage, 0), -100);
    track.dataset.percentage = newpercentage;
    track.animate({transform: `translate(${newpercentage}%, -50%)`}, {duration: 1200, fill: "forwards"});

    for(const image of track.getElementsByClassName("image")){
        image.animate({objectPosition: `${100 + newpercentage}% center`}, {duration: 1200, fill: "forwards"});
    }
}*/

const track = document.getElementById("image-tracking");
let percentage = 0;

window.onkeydown = e => {
    if (e.key === 'ArrowLeft') {
        moveImages(10);
    } else if (e.key === 'ArrowRight') {
        moveImages(-10);
    }
};

function moveImages(delta) {
    percentage = Math.max(Math.min(percentage + delta, 0), -100);
    track.animate(
        { transform: `translate(${percentage}%, -50%)` },
        { duration: 1200, fill: "forwards", easing: "ease-in-out" }
    );
    for (const image of track.getElementsByClassName("image")) {
        image.animate(
            { objectPosition: `${100 + percentage}% center` },
            { duration: 1200, fill: "forwards", easing: "ease-in-out" }
        );
    }
}


track.addEventListener('click', e => {
    if (e.target.classList.contains('image')) {
        if (clicked) {
            resetImages();
        } else {
            expandImage(e.target);
        }
    }
});

function expandImage(image) {
    clicked = true;
    track.classList.add('shrunken');
    image.classList.add('clicked-image');
}

function resetImages() {
    clicked = false;
    track.classList.remove('shrunken');
    const clickedImage = document.querySelector('.clicked-image');
    if (clickedImage) {
        clickedImage.classList.remove('clicked-image');
    }
}