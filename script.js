// -------------------- Line Numbers --------------------
const content = document.getElementById('editorContent');
const numbers = document.getElementById('lineNumbers');

function updateLines() {
    const lineHeight = 24; // must match CSS
    const totalLines = Math.ceil(content.scrollHeight / lineHeight);
    numbers.innerHTML = '';
    for (let i = 1; i <= totalLines; i++) {
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

const observer = new MutationObserver(updateLines);
observer.observe(content, { childList: true, subtree: true, characterData: true });

// -------------------- Matrix Background --------------------
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>/'.split('');
let fontSize = 16;
const drops = [];

function initMatrix() {
    fontSize = window.innerWidth < 600 ? 12 : 16;
    const columns = Math.floor(width / fontSize);
    drops.length = 0;
    for (let i = 0; i < columns; i++) drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(30, 30, 30, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#7ecbff';
    ctx.font = fontSize + 'px Fira Code';

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initMatrix();
});

initMatrix();
