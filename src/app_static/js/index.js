console.log('index.js for client');

changeImage = (input, img) => img.src = URL.createObjectURL(input.files[0]);