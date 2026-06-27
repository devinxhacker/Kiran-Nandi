const cursor = document.querySelector('.my-cursor');
const outerCircle = document.querySelector('.outer-circle');

document.addEventListener('mousemove', (event) => {
    // Move the small dot directly with the mouse
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;

    // Calculate the position for the outer circle to follow the small dot slowly
    const circleX = event.clientX - (outerCircle.offsetWidth / 2);
    const circleY = event.clientY - (outerCircle.offsetHeight / 2);
    outerCircle.style.transition = 'transform 0.2s ease-out';
    outerCircle.style.transform = `translate(${circleX}px, ${circleY}px)`;
});

function showCursor() {
    cursor.classList.add('show');
    outerCircle.classList.add('show');
}
function hideCursor() {
    cursor.classList.remove('show');
    outerCircle.classList.remove('show');
}

document.addEventListener('mouseleave', hideCursor);
document.addEventListener('mouseenter', showCursor);