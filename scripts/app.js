// ---------------------Header-------------------------------------------
// TODO - add disapearing header on pause

// ---------------------Sign-in alert---------------------------------

const alertModal = document.getElementById("alertModal");
const alertSpan = document.getElementsByClassName("close")[0];
let executed = false;
let signedIn = false;

function displayAlertModal() {
  return (alertModal.style.display = "block");
}

document.addEventListener("scroll", function() {
  if (document.documentElement.scrollTop > 500) {
    if (!executed && !signedIn) {
      executed = true;
      displayAlertModal();
    }
  }
});

// When the user clicks on <span> (x), close the modal
alertSpan.onclick = function() {
  alertModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == alertModal) {
    alertModal.style.display = "none";
  }
};

// ---------------------Modal-------------------------------------------

// Variables
const modal = document.getElementById("sign-in-modal");
const authButton = document.getElementById("sign-in-button");
const authLogOutButton = document.getElementById("log-out-button");
const span = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
authButton.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// ---------------------Mock Authentication-----------------------------
// TODO: rename variables to styleguide conventions

// Variables
const patron_checkbox = document.getElementById("patron-check");
const dj_checkbox = document.getElementById("dj-check");
const venue_manager_checkbox = document.getElementById("venue-manager-check");
let name_input_field = document.getElementById("name-input-field");
const sign_in_button = document.getElementById("name-input-button");
let sign_in_name;
let sign_in_id;

// Get sign-in name
sign_in_button.addEventListener("click", function() {
  sign_in_name = name_input_field.value;
});

// Get check-boxes value - https://www.javascripttutorial.net/javascript-dom/javascript-checkbox/
function getSignInID(check_name) {
  const sign_in_checkboxes = document.querySelectorAll(
    `input[name="${check_name}"]:checked`
  );
  let value = [];
  sign_in_checkboxes.forEach(checkbox => {
    value.push(checkbox.value);
  });
  sign_in_id = value.toString();
}

// return checkbox value on sign-in
sign_in_button.addEventListener("click", function() {
  getSignInID("log-in-id");
});

// Limit checkbox selection
// TODO: Refactor to radio buttons
let checks = document.querySelectorAll(".check");
let max = 1;
for (let i = 0; i < checks.length; i++) checks[i].onclick = selectiveCheck;
function selectiveCheck(event) {
  let checkedChecks = document.querySelectorAll(".check:checked");
  if (checkedChecks.length >= max + 1) return false;
}
// Remove default text value from input field on click
function removeText() {
  return (name_input_field.value = "");
}
name_input_field.addEventListener("click", function() {
  removeText();
});

// Submit sign in with enter key
name_input_field.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    sign_in_button.click();
  }
});

// Close modal and manipulate sign-in controls
sign_in_button.addEventListener("click", function() {
  if (sign_in_name && sign_in_id) {
    modal.style.display = "none";
    authButton.style.display = "none";
    authLogOutButton.classList.remove("hide");
    signedIn = true;
  }
});

// Mock sign-out - to be refactored with proper sign-out message, time permitting
authLogOutButton.addEventListener("click", function() {
  location.reload();
  alert("You are now signing out.");
});

//TODO: Add exception handling to mock authentication

// ---------------------Highlight Active Content -----------------------

//get variables
let sections = document.querySelectorAll(".highlight");
let bounding = article.getBoundingClientRect();

// check if element is in focus - reference: https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
let isInViewport = function(elem) {
  let bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight)
  );
};

// Change styling when in focus
// TODO: add .css classes to the relevant elements, then either add or remove them below)
window.onscroll = function() {
  sections.forEach(section => {
    if (isInViewport(section)) {
      section.classList.add("focushighlight");
    } else {
      section.classList.remove("focushighlight");
    }
  });
};

// ---------------------Scrolling Behaviour ----------------------------

// create variables
let links;
let anchors;

// Update variables on sign-in
sign_in_button.addEventListener("click", function() {
  links = document.getElementsByClassName("smooth-scroll-links");
  anchors = document.getElementsByClassName("smooth-scroll-anchors");

  // Convert htmlcollection
  setTimeout(function() {
    let arrayLinks = [...links];
    let arrayAnchors = [...anchors];

    // Prevent default behaviour and add smooth scroll
    if (signedIn) {
      for (let i = 0; i < arrayLinks.length; i++) {
        arrayLinks[i].addEventListener("click", function(event) {
          event.preventDefault();
          arrayAnchors[i].scrollIntoView({
            behavior: "smooth"
          });
        });
      }
    }
  }, 1);
});

// ---------------------Dynamic Content---------------------------------

// Add welcome message to nav
sign_in_button.addEventListener("click", function() {
  let sign_in_header = document.createElement("h1");
  let welcome_message = document.createTextNode(`Welcome, ${sign_in_name}`);
  if (sign_in_name && sign_in_id) {
    sign_in_header.appendChild(welcome_message);
    document
      .getElementById("welcome-message-container")
      .appendChild(sign_in_header);
  }
});

// TODO: Add additional dynamic welcome message features, time permitting

// Add dynamic navigation links to nav and dynamic content to page
function dynamicContent() {
  if (sign_in_id == "patron" && sign_in_name) {
    console.log("patronlog");

    // Dynamic links - patron
    let patron_links = document.createElement("patron_links");
    patron_links.innerHTML = `
        <div id="dynamic-links">
        <a href="#main" class="smooth-scroll-links">Discount Entry</a>
        <a href="#article" class="smooth-scroll-links">Protocol Blog</a>
        <a href="#section" class="smooth-scroll-links">Protocol Mixes</a>
        </div>
    `;
    document
      .getElementById("dynamic-links-container")
      .appendChild(patron_links);

    // Dynamic content - patron 1
    let patron_content1 = document.createElement("patron_content1");
    patron_content1.innerHTML = `
    <h1 class="smooth-scroll-anchors">Discount Entry</h1><br><br>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              ullamcorper, orci et tincidunt ultricies, dui lorem mollis ligula,
              sed ornare urna ex a lacus. Aliquam erat volutpat. Curabitur
              volutpat leo sed ante rhoncus dictum. Vivamus consectetur quis
              purus a ornare. Morbi convallis lorem sed nisl tristique, et
              placerat dui tempor. Quisque dictum massa ac aliquam ultricies. In
              malesuada nibh ut velit porta cursus. Aenean eu faucibus urna. In
              ornare leo vitae accumsan egestas. Aliquam ut varius nulla. <br />
              <br />
              Sed egestas ligula id libero rhoncus tempus. Pellentesque aliquet
              urna ac velit cursus consequat. Nam a maximus neque. Quisque
              eleifend diam sit amet molestie porta. Mauris molestie tellus id
              mattis aliquet. Etiam auctor id metus in varius. Aliquam rhoncus
              lobortis justo in congue. Duis ut iaculis mi. Vivamus et risus
              nisi. Suspendisse et sem justo.
            </p><br><br>
      `;
    document.getElementById("main").appendChild(patron_content1);

    // Dynamic content - patron 2
    let patron_content2 = document.createElement("patron_content2");
    patron_content2.innerHTML = `
    <h1 class="smooth-scroll-anchors">Protocol Blog</h1><br><br>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              ullamcorper, orci et tincidunt ultricies, dui lorem mollis ligula,
              sed ornare urna ex a lacus. Aliquam erat volutpat. Curabitur
              volutpat leo sed ante rhoncus dictum. Vivamus consectetur quis
              purus a ornare. Morbi convallis lorem sed nisl tristique, et
              placerat dui tempor. Quisque dictum massa ac aliquam ultricies. In
              malesuada nibh ut velit porta cursus. Aenean eu faucibus urna. In
              ornare leo vitae accumsan egestas. Aliquam ut varius nulla. <br />
              <br />
              Sed egestas ligula id libero rhoncus tempus. Pellentesque aliquet
              urna ac velit cursus consequat. Nam a maximus neque. Quisque
              eleifend diam sit amet molestie porta. Mauris molestie tellus id
              mattis aliquet. Etiam auctor id metus in varius. Aliquam rhoncus
              lobortis justo in congue. Duis ut iaculis mi. Vivamus et risus
              nisi. Suspendisse et sem justo.
            </p><br><br>
    `;
    document.getElementById("article").appendChild(patron_content2);

    // dynamic content - patron 3
    let patron_content3 = document.createElement("patron_content3");
    patron_content3.innerHTML = `
    <h1 class="smooth-scroll-anchors">Protocol Mixes</h1><br><br>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              ullamcorper, orci et tincidunt ultricies, dui lorem mollis ligula,
              sed ornare urna ex a lacus. Aliquam erat volutpat. Curabitur
              volutpat leo sed ante rhoncus dictum. Vivamus consectetur quis
              purus a ornare. Morbi convallis lorem sed nisl tristique, et
              placerat dui tempor. Quisque dictum massa ac aliquam ultricies. In
              malesuada nibh ut velit porta cursus. Aenean eu faucibus urna. In
              ornare leo vitae accumsan egestas. Aliquam ut varius nulla. <br />
              <br />
              Sed egestas ligula id libero rhoncus tempus. Pellentesque aliquet
              urna ac velit cursus consequat. Nam a maximus neque. Quisque
              eleifend diam sit amet molestie porta. Mauris molestie tellus id
              mattis aliquet. Etiam auctor id metus in varius. Aliquam rhoncus
              lobortis justo in congue. Duis ut iaculis mi. Vivamus et risus
              nisi. Suspendisse et sem justo.
            </p><br><br>
    `;
    document.getElementById("section").appendChild(patron_content3);
  } else if (sign_in_id == "dj" && sign_in_name) {
    console.log("djlog");
    let dj_links = document.createElement("dj_links");
    dj_links.innerHTML = `
        <div id="dynamic-links">
        <a href="#main" class="smooth-scroll-links">Upload Demo Mix</a>
        <a href="#article" class="smooth-scroll-links">Submit Your Availability</a>
        <a href="#section" class="smooth-scroll-links">Protocol Blog</a>
        </div>
    `;
    document.getElementById("dynamic-links-container").appendChild(dj_links);

    // Dynamic content - DJ 1
    let dj_content1 = document.createElement("dj_content1");
    dj_content1.innerHTML = `
    <h1 class="smooth-scroll-anchors">Upload Demo Mix</h1><br><br>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              ullamcorper, orci et tincidunt ultricies, dui lorem mollis ligula,
              sed ornare urna ex a lacus. Aliquam erat volutpat. Curabitur
              volutpat leo sed ante rhoncus dictum. Vivamus consectetur quis
              purus a ornare. Morbi convallis lorem sed nisl tristique, et
              placerat dui tempor. Quisque dictum massa ac aliquam ultricies. In
              malesuada nibh ut velit porta cursus. Aenean eu faucibus urna. In
              ornare leo vitae accumsan egestas. Aliquam ut varius nulla. <br />
              <br />
              Sed egestas ligula id libero rhoncus tempus. Pellentesque aliquet
              urna ac velit cursus consequat. Nam a maximus neque. Quisque
              eleifend diam sit amet molestie porta. Mauris molestie tellus id
              mattis aliquet. Etiam auctor id metus in varius. Aliquam rhoncus
              lobortis justo in congue. Duis ut iaculis mi. Vivamus et risus
              nisi. Suspendisse et sem justo.
            </p><br><br>
    `;
    document.getElementById("main").appendChild(dj_content1);

    // Dynamic content - DJ 2
    let dj_content2 = document.createElement("dj_content2");
    dj_content2.innerHTML = `
    <h1 class="smooth-scroll-anchors">Submit Your Availability</h1><br><br>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              ullamcorper, orci et tincidunt ultricies, dui lorem mollis ligula,
              sed ornare urna ex a lacus. Aliquam erat volutpat. Curabitur
              volutpat leo sed ante rhoncus dictum. Vivamus consectetur quis
              purus a ornare. Morbi convallis lorem sed nisl tristique, et
              placerat dui tempor. Quisque dictum massa ac aliquam ultricies. In
              malesuada nibh ut velit porta cursus. Aenean eu faucibus urna. In
              ornare leo vitae accumsan egestas. Aliquam ut varius nulla. <br />
              <br />
              Sed egestas ligula id libero rhoncus tempus. Pellentesque aliquet
              urna ac velit cursus consequat. Nam a maximus neque. Quisque
              eleifend diam sit amet molestie porta. Mauris molestie tellus id
              mattis aliquet. Etiam auctor id metus in varius. Aliquam rhoncus
              lobortis justo in congue. Duis ut iaculis mi. Vivamus et risus
              nisi. Suspendisse et sem justo.
            </p><br><br>
    `;
    document.getElementById("article").appendChild(dj_content2);

    // dynamic content - DJ 3
    let dj_content3 = document.createElement("dj_content3");
    dj_content3.innerHTML = `
    <h1 class="smooth-scroll-anchors">Protocol Blog</h1><br><br>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              ullamcorper, orci et tincidunt ultricies, dui lorem mollis ligula,
              sed ornare urna ex a lacus. Aliquam erat volutpat. Curabitur
              volutpat leo sed ante rhoncus dictum. Vivamus consectetur quis
              purus a ornare. Morbi convallis lorem sed nisl tristique, et
              placerat dui tempor. Quisque dictum massa ac aliquam ultricies. In
              malesuada nibh ut velit porta cursus. Aenean eu faucibus urna. In
              ornare leo vitae accumsan egestas. Aliquam ut varius nulla. <br />
              <br />
              Sed egestas ligula id libero rhoncus tempus. Pellentesque aliquet
              urna ac velit cursus consequat. Nam a maximus neque. Quisque
              eleifend diam sit amet molestie porta. Mauris molestie tellus id
              mattis aliquet. Etiam auctor id metus in varius. Aliquam rhoncus
              lobortis justo in congue. Duis ut iaculis mi. Vivamus et risus
              nisi. Suspendisse et sem justo.
            </p><br><br>
    `;
    document.getElementById("section").appendChild(dj_content3);
  } else if (sign_in_id == "venue" && sign_in_name) {
    console.log("venuelog");
    let venue_links = document.createElement("venue_links");
    venue_links.innerHTML = `
        <div id="dynamic-links">
        <a href="#main" class="smooth-scroll-links">Work with Protocol</a>
        <a href="#article" class="smooth-scroll-links">Protocol Mixes</a>
        <a href="#section" class="smooth-scroll-links">Our Strategy</a>
        </div>
    `;
    document.getElementById("dynamic-links-container").appendChild(venue_links);

    // Dynamic content - venue 1
    let venue_content1 = document.createElement("venue_content1");
    venue_content1.innerHTML = `
    <h1 class="smooth-scroll-anchors">Work with Protocol</h1><br><br>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              ullamcorper, orci et tincidunt ultricies, dui lorem mollis ligula,
              sed ornare urna ex a lacus. Aliquam erat volutpat. Curabitur
              volutpat leo sed ante rhoncus dictum. Vivamus consectetur quis
              purus a ornare. Morbi convallis lorem sed nisl tristique, et
              placerat dui tempor. Quisque dictum massa ac aliquam ultricies. In
              malesuada nibh ut velit porta cursus. Aenean eu faucibus urna. In
              ornare leo vitae accumsan egestas. Aliquam ut varius nulla. <br />
              <br />
              Sed egestas ligula id libero rhoncus tempus. Pellentesque aliquet
              urna ac velit cursus consequat. Nam a maximus neque. Quisque
              eleifend diam sit amet molestie porta. Mauris molestie tellus id
              mattis aliquet. Etiam auctor id metus in varius. Aliquam rhoncus
              lobortis justo in congue. Duis ut iaculis mi. Vivamus et risus
              nisi. Suspendisse et sem justo.
            </p><br><br>
    `;
    document.getElementById("main").appendChild(venue_content1);

    // Dynamic content - venue 2
    let venue_content2 = document.createElement("venue_content2");
    venue_content2.innerHTML = `
    <h1 class="smooth-scroll-anchors">Protocol Mixes</h1><br><br>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              ullamcorper, orci et tincidunt ultricies, dui lorem mollis ligula,
              sed ornare urna ex a lacus. Aliquam erat volutpat. Curabitur
              volutpat leo sed ante rhoncus dictum. Vivamus consectetur quis
              purus a ornare. Morbi convallis lorem sed nisl tristique, et
              placerat dui tempor. Quisque dictum massa ac aliquam ultricies. In
              malesuada nibh ut velit porta cursus. Aenean eu faucibus urna. In
              ornare leo vitae accumsan egestas. Aliquam ut varius nulla. <br />
              <br />
              Sed egestas ligula id libero rhoncus tempus. Pellentesque aliquet
              urna ac velit cursus consequat. Nam a maximus neque. Quisque
              eleifend diam sit amet molestie porta. Mauris molestie tellus id
              mattis aliquet. Etiam auctor id metus in varius. Aliquam rhoncus
              lobortis justo in congue. Duis ut iaculis mi. Vivamus et risus
              nisi. Suspendisse et sem justo.
            </p><br><br>
    `;
    document.getElementById("article").appendChild(venue_content2);

    // dynamic content - venue 3
    let venue_content3 = document.createElement("venue_content3");
    venue_content3.innerHTML = `
    <h1 class="smooth-scroll-anchors">Our Strategy</h1><br><br>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              ullamcorper, orci et tincidunt ultricies, dui lorem mollis ligula,
              sed ornare urna ex a lacus. Aliquam erat volutpat. Curabitur
              volutpat leo sed ante rhoncus dictum. Vivamus consectetur quis
              purus a ornare. Morbi convallis lorem sed nisl tristique, et
              placerat dui tempor. Quisque dictum massa ac aliquam ultricies. In
              malesuada nibh ut velit porta cursus. Aenean eu faucibus urna. In
              ornare leo vitae accumsan egestas. Aliquam ut varius nulla. <br />
              <br />
              Sed egestas ligula id libero rhoncus tempus. Pellentesque aliquet
              urna ac velit cursus consequat. Nam a maximus neque. Quisque
              eleifend diam sit amet molestie porta. Mauris molestie tellus id
              mattis aliquet. Etiam auctor id metus in varius. Aliquam rhoncus
              lobortis justo in congue. Duis ut iaculis mi. Vivamus et risus
              nisi. Suspendisse et sem justo.
            </p><br><br>
    `;
    document.getElementById("section").appendChild(venue_content3);
  }
}

// Attach variable content function to sign in button
sign_in_button.addEventListener("click", function() {
  dynamicContent();
});

// -------------------------Styling-------------------------------------

const navContainers = document.getElementsByClassName("nav-containers");

function navYMargins() {
  if (signedIn == true) {
    for (let i = 0; i < navContainers.length; i++) {
      navContainers[i].classList.add("nav-margins");
    }
  }
}
sign_in_button.addEventListener("click", function() {
  navYMargins();
});
