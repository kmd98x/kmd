export default function split(text) {
    // const titleArray = text.textContent.split('').map((char, key)=> {
    //     return `<span class="char relative">${char}</span>`;
    // }).join('');

    // text.innerHTML = titleArray;
    // return text;

    // Split text into individual characters
    const chars = text.textContent.split("");
    
    // Clear original text and wrap each character in a span
    text.textContent = "";
    chars.forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add('char');
        text.appendChild(span);
    });

    return Array.from(text.children);
}