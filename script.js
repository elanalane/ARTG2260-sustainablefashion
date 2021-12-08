/* global d3 */

/* LANDING PAGE ANIMATION 
 INSPIRATION FROM: https://www.sliderrevolution.com/resources/css-text-animation/ */

window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", handleWindowResize);

const spansSlow = document.querySelectorAll(".spanSlow");
const spansMed = document.querySelectorAll(".spanMed");
const spansFast = document.querySelectorAll(".spanFast");

let width = window.innerWidth;

function handleMouseMove(e) {
  let normalizedPosition = e.pageX / (width / 2) - 1;
  let speedSlow = 100 * normalizedPosition;
  let speedMed = 125 * normalizedPosition;
  let speedFast = 150 * normalizedPosition;
  spansSlow.forEach(span => {
    span.style.transform = `translate(${speedSlow}px)`;
  });
  spansMed.forEach(span => {
    span.style.transform = `translate(${speedMed}px)`;
  });
  spansFast.forEach(span => {
    span.style.transform = `translate(${speedFast}px)`;
  });

  // console.log(spansSlow);
}

// recalculate width when window is resized
function handleWindowResize() {
  width = window.innerWidth;
}


/* ADDING AND SORTING IMAGES */

// import csv
const fetchCSV = async filePath => {
  try {
    const response = await fetch(filePath);
    const text = await response.text();
    return text;
  } catch (error) {
    console.error(error);
  }
};

// create containers to put information into
const container = document.querySelector("#images");
const text = document.createElement("p");
const jsonData = document.createElement("pre");

container.append(text, jsonData);

fetchCSV("ARTG2260_SBImagesBrands - Sheet2.csv").then(function(str) {

  brands = d3.csvParse(str);

  showInside('');

});

// allow search filtering for search bar
const searchBar = document.getElementById("searchBar");
  searchBar.onchange = searchFilter;

function searchFilter(event) {
document.getElementById("images").innerHTML = " ";
    showInside(event.target.value);
}

// create an empty array
let brands = [];

function showInside(SearchBar) {
  brands.forEach(function(brand) {
    const classes = brand.Class;
    
    if (classes.indexOf(SearchBar) !== -1) {
      
      // define popup for images
      const popup = document.getElementById("highlightPopup");
      const close = document.querySelector(".close");
      
      // define and add images
      const img = document.createElement("img");
      img.src = brand.ImgLink;
      img.onclick = function() {
        popup.style.display = "block";
        // add elements to popup
        document.getElementById("highlightPopup").appendChild(img);
        document.getElementById("highlightPopup").appendChild(a);
        document.getElementById("highlightPopup").appendChild(p);
        //window.location.href = brand.brandLink;
          close.onclick = function() {
            popup.style.display = "none";
          }
          window.onclick = function(event) {
            if (event.target == popup) {
              popup.style.display = "none";
            }
          }
      }
      
      // define and add links to each brand's website
      const a = document.createElement("a");
      a.href = brand.brandLink;
      a.className = "imgTitle";
      a.innerText = brand.Brand;
      a.target = "_blank";

      // define and add blurbs we wrote
      const p = document.createElement("p");
      p.innerText = brand.imgText;

      // add elements to page
      document.getElementById("images").appendChild(img);
      document.getElementById("images").appendChild(a);
      document.getElementById("images").appendChild(p);
    }
  });
}