
const filenames = [
    'img/monster1.png',
];

catchImg(filenames)
    .then(response => {
        console.log('got it');
    })
    .catch(error => {
        console.log('error!');
        console.error(error);
    });

async function catchImg(filenames) {
    for (let filename of filenames) {
        const response = await fetch(filename);
        const blob = await response.blob();
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
        img.alt = "monster";
        img.style.width = "100%";  
           
        const div1 = document.createElement('div');
        div1.classList.add("col-md-3");                       
        document.getElementById("galrow").appendChild(div1);

        const div2 = document.createElement('div');   
        div2.classList.add("tumbnail");                        
        div1.appendChild(div2);

        const a1 = document.createElement('a');
        a1.href=img.src;
        a1.target = "_blank";                       
        div2.appendChild(a1);

        a1.appendChild(img);
        const capt = document.createElement('p'); 
        capt.classList.add("caption");  
        const node = document.createTextNode("Click on the images to enlarge them"); 
        capt.appendChild(node);                       
        a1.appendChild(capt);
        // Append the img to the link
    }
}