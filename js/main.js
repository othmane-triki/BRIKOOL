//check if there is local storage color option
let mainColor = localStorage.getItem('color_option');

if (mainColor !== null) {

    document.documentElement.style.setProperty('--main-color', mainColor);

}

// select landing page elements
let landingPage = document.querySelector(".landing-page");

// get array of images 
let imgsArray = ["bg1.jpg", "bg2.jpg", "bg3.jpg"];

//Change background image url
landingPage.style.backgroundImage = 'url("imgs/bg3.jpg")';



//settings box
let settingsIcon = document.querySelector(".toggle-settings");
let settingsBox = document.querySelector(".settings-box");
settingsIcon.onclick = function (e) {
    settingsBox.classList.toggle("active");
    this.classList.toggle("active");
}

document.addEventListener("click", function(e) {
    if(!settingsBox.contains(e.target) && settingsBox.classList.contains("active")) {
        settingsBox.classList.remove("active");
        settingsIcon.classList.remove("active");
    }
})

//random background option

let backgroundOption = true;
let randBg = setInterval(() => {
        //get random number
        let randomNumber = Math.floor(Math.random() * imgsArray.length);
        //change background image url
        landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
}, 10000);


document.querySelectorAll(".settings-container .random-backgrounds span").forEach(span => {
    span.addEventListener("click", (e) => {

        //remove active class from all spans
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        })

        //add active class on self
        e.target.classList.add("active");

        //handle background option
        if (e.target.dataset.background === 'no' ) {

            backgroundOption = false;
            clearInterval(randBg);  

            //add local storage
            localStorage.setItem('background_option', false);

        } 
        
        else {

            backgroundOption = true;
            randBg = setInterval(() => {

                //get random number
                let randomNumber = Math.floor(Math.random() * imgsArray.length);

                //change background image url
                landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
            }, 10000);   
            
            //add local storage
            localStorage.setItem('background_option', true);

        }
    })
})

//check if there is local storage option for background
let backgroundLocalItem = localStorage.getItem('background_option');

if (backgroundLocalItem !== null ) {

    if (backgroundLocalItem === 'true') {
        document.querySelectorAll(".settings-container .random-backgrounds span").forEach(element => {
            element.classList.remove("active");
        })
        document.querySelector(".settings-container .random-backgrounds .yes").classList.add("active");
    } else {
        backgroundOption = false;
        document.querySelectorAll(".settings-container .random-backgrounds span").forEach(element => {
            element.classList.remove("active");
        })
        document.querySelector(".settings-container .random-backgrounds .no").classList.add("active");
        clearInterval(randBg);  
    }    
}

// create bullets list
let bulletsList = document.createElement('div');
bulletsList.className = "bullets-list";

const sections = [
  { id: "about", label: "About" },
  { id: "professions", label: "Professions" },
  { id: "gallery", label: "Gallery" },
  { id: "timeline", label: "Timeline" },
  { id: "features", label: "Features" },
  { id: "testimonials", label: "Testimonials" }
];

sections.forEach(section => {
    let link = document.createElement('a');
    link.href = `#${section.id}`;
    link.title = section.label;

    // style the bullet directly on <a>
    link.style.cssText = `
        display: block;
        width: 20px;
        height: 20px;
        background-color: transparent;
        border-radius: 50%;
        border: var(--main-color) 3px solid;
        cursor: pointer;
        transition: .3s;
        position: relative;
        z-index: 10003;
    `;
    
    let label = document.createElement('span');
    label.innerHTML = section.label;
    label.style.color = "white";
    label.style.backgroundColor = "var(--main-color)";
    label.style.position = "absolute";
    label.style.right = "25px";
    label.style.top = "-5px";
    label.style.padding = "5px";
    label.style.borderRadius = "5px";
    label.style.transition = ".3s";
    label.style.fontSize = "13px";
    label.style.opacity = 0;
    link.appendChild(label);
    bulletsList.appendChild(link);
});

bulletsList.style.display = "flex";
bulletsList.style.gap = "10px";
bulletsList.style.flexDirection = "column";
bulletsList.style.position = "fixed";
bulletsList.style.right = "10px";
bulletsList.style.top = "50%";
bulletsList.style.transform = "translateY(-50%)";
bulletsList.style.zIndex = "1003";

// append bulletsList to body
document.body.appendChild(bulletsList);

// display the label when the mouse enter 
let links = document.querySelectorAll(".bullets-list a");

links.forEach((link) => {

    let label = link.querySelector("span");

    link.addEventListener("mouseover", () => {
        label.style.opacity = 1;
    });

    link.addEventListener("mouseout", () => {
        label.style.opacity = 0;
    });
});

//handle bullets option

document.querySelectorAll(".settings-container .bullets-options span").forEach(span => {
    span.addEventListener("click", (e) => {

        //remove active class from all spans
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        })
        console.log(e.target);
        //add active class on self
        e.target.classList.add("active");

        if (e.target.dataset.op === 'yes') {
            
            //display the bulletslist
            bulletsList.style.display = "flex";

        } if (e.target.dataset.op === 'no') {

            bulletsList.style.display = "none";
        }
        //set option in local storage
        localStorage.setItem('bullets_option', e.target.dataset.op);

    })
})

//check if there is local storage option for bullets
let bulletsLocalItem = localStorage.getItem('bullets_option');

if (bulletsLocalItem !== null ) {

    if (bulletsLocalItem === 'true') {
        document.querySelectorAll(".settings-container .bullets-options span").forEach(element => {
            element.classList.remove("active");
        })
        document.querySelector(".settings-container .bullets-options .yes").classList.add("active");

    } 
    else {
        document.querySelectorAll(".settings-container .bullets-options span").forEach(element => {
            element.classList.remove("active");
        })
        document.querySelector(".settings-container .bullets-options .no").classList.add("active");

    }    
}

//swithc colors
const colorsLi = document.querySelectorAll(".settings-container ul li");
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        //set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);        


        //set color on local storage
        localStorage.setItem('color_option', e.target.dataset.color);


        //remove active class from all li
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        })
        //add active class on self
        e.target.classList.add("active");
    })
})


//reset option
document.querySelector(".settings-container .reset").onclick = function () {
    localStorage.setItem('color_option', '#FF9800');
    localStorage.setItem('background_option', true);
    localStorage.setItem('bullets_option', true);

    window.location.reload();
}

// Method 1: Set CSS custom properties on page load
const spans = document.querySelectorAll('.profession-bar .inside-bar span[data-progress]');



window.onscroll = function() {

    //skills offset top
    let skillsOffsetTop = document.querySelector(".professions").offsetTop;

    //skills outer height
    let skillsOuterHeight = document.querySelector(".professions").offsetHeight;

    //window height
    let windowHeight = this.innerHeight;

    //window scroll top
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        spans.forEach(span => {
            const progress = span.getAttribute('data-progress');
            span.style.setProperty('--progress', progress);
        });
    }

}

//create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {

        //create overlay element
        let overlay = document.createElement("div");

        //add a classname the 
        overlay.className = "overlay";

        //style the overlay element
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
        overlay.style.zIndex = 1000;
        overlay.style.transition = ".3s";

        //append the overlay to the body
        document.body.appendChild(overlay);

        //create a popup box 
        let popupBox = document.createElement("div");

        //add class to the popup box
        popupBox.className = "popup-box";

        //style the popupBox
        popupBox.style.cssText = `
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background-color: #FFF;
                border: 1px solid #CCC;
                padding: 20px;
                z-index: 1001;
                border-radius: 6px;
                transition: .3s;
        `;
        
        //creat the closing button
        let buttonX = document.createElement('span');
        buttonX.innerHTML = "X";

        buttonX.style.cssText = `
            position: absolute;
            width: 30px;
            height: 30px;
            padding: 5px;
            background-color: var(--main-color);
            border-radius: 50%;
            color: white;
            font-weight: bold;
            right: -15px;
            top: -15px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
            cursor: pointer;
        `;

        //append the closing span
        popupBox.appendChild(buttonX);

        //create h3 for the popupBox
        let popupH3 = document.createElement("h3");

        //fill the h3
        popupH3.innerHTML = "Image";
        
        //style the h3 popupBox
        popupH3.style.color = "var(--main-color)";
        popupH3.style.marginBottom = "20px";
        popupH3.style.fontSize = "20px";
        popupBox.style.textAlign = "center";
        
        //append the h3 to the popupBox 
        popupBox.appendChild(popupH3);
        
        //create an img element
        let popupImg = document.createElement('img');
        
        //style the img
        popupImg.style.width = "100%"
        
        //append the img
        popupBox.appendChild(popupImg)
        
        //assign the src attribute to the popupImg
        popupImg.src = img.src;
        
        
        //append the popupBox to the body
        document.body.appendChild(popupBox)

        //close the popup
        buttonX.addEventListener("click", () => {
            popupBox.remove();
            overlay.remove();
        });
        
        overlay.addEventListener("click", () => {
            popupBox.remove();
            overlay.remove();
        });
    })
});

// create contact section with js
let contactSection = document.createElement("div");
contactSection.className = "contact";
contactSection.id = "contact";
contactSection.classList.add("section");
contactSection.innerHTML = `
    <div class="container">
        <h2 class="section-title">Contact Us</h2>
        <div class="contact-box">
            <form action="#" method="GET">
                <div class="left-column">
                    <input type="text" placeholder="Your Name">
                    <input type="text" placeholder="Your Phone">
                    <input type="email" placeholder="Your Email">
                    <input type="text" placeholder="Subject">
                </div>
                <div class="right-column">
                    <textarea placeholder="Your Message"></textarea>
                    <button type="submit" class="send-button">Send</button>
                </div>
            </form>
        </div>
    </div>
`;
contactSection.style.padding = "50px 0";
contactSection.style.backgroundImage = "url('imgs/contactBg.png')";
contactSection.style.backgroundSize = "cover";
contactSection.style.backgroundPosition = "center";
document.body.appendChild(contactSection);

//handle form submission
let contactForm = document.querySelector(".contact form");
let nameInput = contactForm.querySelector('input[type="text"][placeholder="Your Name"]');
let phoneInput = contactForm.querySelector('input[type="Your Phone"][placeholder="Your Phone"]');
let emailInput = contactForm.querySelector('input[type="email"][placeholder="Your Email"]');
let subjectInput = contactForm.querySelector('input[type="text"][placeholder="Subject"]');
let messageInput = contactForm.querySelector('textarea[placeholder="Your Message"]');

contactForm.addEventListener("submit", (e) => {
    
    // Simple validation
    if (nameInput.value === "" || phoneInput.value === "" || emailInput.value === "" || subjectInput.value === "" || messageInput.value === "") {
        e.preventDefault();
        alert("Please fill in all fields.");
    }
});

//createing the footer of the website
let currentYear = new Date().getFullYear();
let footer = document.createElement("footer");
footer.innerHTML = `
    <p>Copyright &copy; ${currentYear} Brikool. All Rights Reserved.</p>
`;
footer.style.cssText = `
    text-align: center;
    background-color: #333;
    color: white;
    padding: 20px 0;
    margin-top: 20px;
`;
document.body.appendChild(footer);