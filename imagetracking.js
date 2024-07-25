const track = document.getElementById("image-tracking");

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
}