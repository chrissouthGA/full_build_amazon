console.log("This is only my books index route");
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

document.querySelector('body').addEventListener('keydown', (event) => {
    console.log(event);
    if(event.key === "Enter") {
        location.replace(`/books?search=${input.value}`);
    }
})