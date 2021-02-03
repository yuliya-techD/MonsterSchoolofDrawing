
const fileInput = document.getElementById('share-file');

//formInput.addEventListener('submit', getImg);


function getImg() {
  
  const fileInput = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();
  console.log(fileInput); 


  if (fileInput) {
    //
      encodeImageFileAsURL(fileInput);
  }
}

function encodeImageFileAsURL(element) {
  var file = element;
  var reader = new FileReader();
  reader.onloadend = function() {
    console.log('RESULT', reader.result);
    fetch("http://localhost:5000/tweet", {
      method: "POST", 
      body: "string" 
    })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  }
  reader.readAsDataURL(file);
}