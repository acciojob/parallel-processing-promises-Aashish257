//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");


const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error(`Failed to download image: ${url}`));
  });
}


function download() {

  output.innerHTML = "";
  errorDiv.textContent = "";

 
  loading.style.display = "block";


  const promises = images.map(image =>
    downloadImage(image.url)
  );


  Promise.all(promises)
    .then(downloadedImages => {
      downloadedImages.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(err => {
      errorDiv.textContent = err.message;
    })
    .finally(() => {
      // Hide loading spinner
      loading.style.display = "none";
    });
}


btn.addEventListener("click", download);