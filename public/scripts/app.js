console.log("Hello world");
const input = document.querySelector('#searchText');
console.log(input);
const button = document.querySelector('#searchSubmit');
console.log(button);
const link = document.querySelector('#link');
console.log(link);

button.addEventListener('mouseover', () => {
    link.href = `/books?search=${input.value}`
    console.log(link);
})

document.querySelector('body').addEventListener('keydown', (e) => {
    console.log(e);
    if(e.key === "Enter") {
        link.href = `/books?search=${input.value}`;
        location.replace(link.href);
    }
})