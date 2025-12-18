// -------------------- Line Numbers --------------------
const content = document.getElementById('editorContent');
const numbers = document.getElementById('lineNumbers');

function updateLines() {
    numbers.innerHTML = '';
    const lineHeight = 24; 
    const total = Math.ceil(content.scrollHeight / lineHeight);
    for (let i = 1; i <= total; i++) {
        const span = document.createElement('span');
        span.textContent = i;
        numbers.appendChild(span);
    }
}

content.addEventListener('scroll', () => {
    numbers.scrollTop = content.scrollTop;
});

window.addEventListener('load', updateLines);
window.addEventListener('resize', updateLines);

// -------------------- Matrix Background --------------------
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>/'.split('');
const fontSize = 16;
const columns = Math.floor(width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(30, 30, 30, 0.1)'; // fade effect
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#7ecbff'; // code color
    ctx.font = fontSize + 'px Fira Code';

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});
