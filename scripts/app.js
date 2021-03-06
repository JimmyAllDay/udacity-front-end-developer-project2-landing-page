//----------------------Modal----------------------

// Variables
let modal = document.getElementById("sign-in-modal");
let authButton = document.getElementById("sign-in-button");
let authLogOutButton = document.getElementById("log-out-button");
let span = document.getElementsByClassName("close")[0];

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

// ---------------------Mock Authentication--------

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

// Limit checkbox selection - needs a reference
let checks = document.querySelectorAll(".check");
let max = 1;
for (let i = 0; i < checks.length; i++) checks[i].onclick = selectiveCheck;
function selectiveCheck(event) {
  let checkedChecks = document.querySelectorAll(".check:checked");
  if (checkedChecks.length >= max + 1) return false;
}

// Close modal and manipulate sign-in controls
sign_in_button.addEventListener("click", function() {
  if (sign_in_name && sign_in_id) {
    modal.style.display = "none";
    authButton.style.display = "none";
    authLogOutButton.classList.remove("hide");
  }
});

// Mock sign-out - to be refactored with proper sign-out message, time permitting
authLogOutButton.addEventListener("click", function() {
  location.reload();
  alert("You are now signing out.");
});

// Add exception handling to authentication, time permitting

// ---------------------Highlight Active Content --------

//get element coordinates
let article = document.querySelector("article");
let main = document.querySelector("main");
let section = document.querySelector("section");
let bounding = article.getBoundingClientRect();
console.log(bounding);

// check if element is in focus
let isInViewport = function(elem) {
  let bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};
// Change styling when in focus

// article section
window.onscroll = function() {
  console.log(isInViewport(article));
  if (isInViewport(article)) {
    article.style.background = "blue";
  } else {
    article.style.background = "cornflowerblue";
  }
  if (isInViewport(main)) {
    main.style.background = "blue";
  } else {
    main.style.background = "cornflowerblue";
  }
  if (isInViewport(section)) {
    section.style.background = "blue";
  } else {
    section.style.background = "cornflowerblue";
  }
};

// ---------------------Scrolling Behaviour --------

// You will need to use the onscroll event handler for this: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onscroll

// Scrolling behaviour
// You will probably want to use the scrollIntoView() method
// https://webdesign.tutsplus.com/tutorials/smooth-scrolling-vanilla-javascript--cms-35165

// ---------------------Dynamic Content--------

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

// Add additional dynamic welcome message features, time permitting

// Add dynamic navigation links to nav and dynamic content to page
function dynamicContent() {
  if (sign_in_id == "patron" && sign_in_name) {
    console.log("patronlog");

    // Dynamic links - patron
    let patron_links = document.createElement("patron_links");
    patron_links.innerHTML = `
        <div id="dynamic-links">
        <a href="#main">Discount Entry</a><br />
        <a href="#article">Protocol Blog</a><br />
        <a href="#section">Protocol Mixes</a><br />
        </div>
    `;
    document
      .getElementById("dynamic-links-container")
      .appendChild(patron_links);

    // Dynamic content - patron 1
    let patron_content1 = document.createElement("patron_content1");
    patron_content1.innerHTML = `
    <h1>Discount Entry</h1>
    <p>
    I cannot sleep, so I make this entry. But I must try to get a few hours'
    sleep, as Van Helsing is to call for me at noon. He insists that I shall
    go with him on another expedition. 27 September.--It was two o'clock
    before we found a suitable opportunity for our attempt. The funeral held
    at noon was all completed, and the last stragglers of the mourners had
    taken themselves lazily away, when, looking carefully from behind a
    clump of alder-trees, we saw the sexton lock the gate after him. We knew
    then that we were safe till morning did we desire it; but the Professor
    told me that we should not want more than an hour at most. 
    </p>
      `;
    document.getElementById("main").appendChild(patron_content1);

    // Dynamic content - patron 2
    let patron_content2 = document.createElement("patron_content2");
    patron_content2.innerHTML = `
    <h1>Protocol Blog</h1>
    <p>
    I cannot sleep, so I make this entry. But I must try to get a few hours'
    sleep, as Van Helsing is to call for me at noon. He insists that I shall
    go with him on another expedition. 27 September.--It was two o'clock
    before we found a suitable opportunity for our attempt. The funeral held
    at noon was all completed, and the last stragglers of the mourners had
    taken themselves lazily away, when, looking carefully from behind a
    clump of alder-trees, we saw the sexton lock the gate after him. We knew
    then that we were safe till morning did we desire it; but the Professor
    told me that we should not want more than an hour at most. 
    </p>
    `;
    document.getElementById("article").appendChild(patron_content2);

    // dynamic content - patron 3
    let patron_content3 = document.createElement("patron_content3");
    patron_content3.innerHTML = `
    <h1>Protocol Mixes</h1>
    <p>
    I cannot sleep, so I make this entry. But I must try to get a few hours'
    sleep, as Van Helsing is to call for me at noon. He insists that I shall
    go with him on another expedition. 27 September.--It was two o'clock
    before we found a suitable opportunity for our attempt. The funeral held
    at noon was all completed, and the last stragglers of the mourners had
    taken themselves lazily away, when, looking carefully from behind a
    clump of alder-trees, we saw the sexton lock the gate after him. We knew
    then that we were safe till morning did we desire it; but the Professor
    told me that we should not want more than an hour at most. 
    </p>
    `;
    document.getElementById("section").appendChild(patron_content3);
  } else if (sign_in_id == "dj" && sign_in_name) {
    console.log("djlog");
    let dj_links = document.createElement("dj_links");
    dj_links.innerHTML = `
        <div id="dynamic-links">
        <a href="#main">Upload Demo Mix</a><br />
        <a href="#article">Submit Your Availability</a><br />
        <a href="#section">Protocol Blog</a><br />
        </div>
    `;
    document.getElementById("dynamic-links-container").appendChild(dj_links);

    // Dynamic content - DJ 1
    let dj_content1 = document.createElement("dj_content1");
    dj_content1.innerHTML = `
    <h1>Upload Demo Mix</h1>
    <p>
    I cannot sleep, so I make this entry. But I must try to get a few hours'
    sleep, as Van Helsing is to call for me at noon. He insists that I shall
    go with him on another expedition. 27 September.--It was two o'clock
    before we found a suitable opportunity for our attempt. The funeral held
    at noon was all completed, and the last stragglers of the mourners had
    taken themselves lazily away, when, looking carefully from behind a
    clump of alder-trees, we saw the sexton lock the gate after him. We knew
    then that we were safe till morning did we desire it; but the Professor
    told me that we should not want more than an hour at most. 
    </p>
    `;
    document.getElementById("main").appendChild(dj_content1);

    // Dynamic content - DJ 2
    let dj_content2 = document.createElement("dj_content2");
    dj_content2.innerHTML = `
    <h1>Submit Your Availability</h1>
    <p>
    I cannot sleep, so I make this entry. But I must try to get a few hours'
    sleep, as Van Helsing is to call for me at noon. He insists that I shall
    go with him on another expedition. 27 September.--It was two o'clock
    before we found a suitable opportunity for our attempt. The funeral held
    at noon was all completed, and the last stragglers of the mourners had
    taken themselves lazily away, when, looking carefully from behind a
    clump of alder-trees, we saw the sexton lock the gate after him. We knew
    then that we were safe till morning did we desire it; but the Professor
    told me that we should not want more than an hour at most. 
    </p>
    `;
    document.getElementById("article").appendChild(dj_content2);

    // dynamic content - DJ 3
    let dj_content3 = document.createElement("dj_content3");
    dj_content3.innerHTML = `
    <h1>Protocol Blog</h1>
    <p>
    I cannot sleep, so I make this entry. But I must try to get a few hours'
    sleep, as Van Helsing is to call for me at noon. He insists that I shall
    go with him on another expedition. 27 September.--It was two o'clock
    before we found a suitable opportunity for our attempt. The funeral held
    at noon was all completed, and the last stragglers of the mourners had
    taken themselves lazily away, when, looking carefully from behind a
    clump of alder-trees, we saw the sexton lock the gate after him. We knew
    then that we were safe till morning did we desire it; but the Professor
    told me that we should not want more than an hour at most. 
    </p>
    `;
    document.getElementById("section").appendChild(dj_content3);
  } else if (sign_in_id == "venue" && sign_in_name) {
    console.log("venuelog");
    let venue_links = document.createElement("venue_links");
    venue_links.innerHTML = `
        <div id="dynamic-links">
        <a href="#main">Work with Protocol</a><br />
        <a href="#article">Protocol Mixes</a><br />
        <a href="#section">Our Strategy</a><br />
        </div>
    `;
    document.getElementById("dynamic-links-container").appendChild(venue_links);

    // Dynamic content - venue 1
    let venue_content1 = document.createElement("venue_content1");
    venue_content1.innerHTML = `
    <h1>Work with Protocol</h1>
    <p>
    I cannot sleep, so I make this entry. But I must try to get a few hours'
    sleep, as Van Helsing is to call for me at noon. He insists that I shall
    go with him on another expedition. 27 September.--It was two o'clock
    before we found a suitable opportunity for our attempt. The funeral held
    at noon was all completed, and the last stragglers of the mourners had
    taken themselves lazily away, when, looking carefully from behind a
    clump of alder-trees, we saw the sexton lock the gate after him. We knew
    then that we were safe till morning did we desire it; but the Professor
    told me that we should not want more than an hour at most. 
    </p>
    `;
    document.getElementById("main").appendChild(venue_content1);

    // Dynamic content - venue 2
    let venue_content2 = document.createElement("venue_content2");
    venue_content2.innerHTML = `
    <h1>Protocol Mixes</h1>
    <p>
    I cannot sleep, so I make this entry. But I must try to get a few hours'
    sleep, as Van Helsing is to call for me at noon. He insists that I shall
    go with him on another expedition. 27 September.--It was two o'clock
    before we found a suitable opportunity for our attempt. The funeral held
    at noon was all completed, and the last stragglers of the mourners had
    taken themselves lazily away, when, looking carefully from behind a
    clump of alder-trees, we saw the sexton lock the gate after him. We knew
    then that we were safe till morning did we desire it; but the Professor
    told me that we should not want more than an hour at most. 
    </p>
    `;
    document.getElementById("article").appendChild(venue_content2);

    // dynamic content - venue 3
    let venue_content3 = document.createElement("venue_content3");
    venue_content3.innerHTML = `
    <h1>Our Strategy</h1>
    <p>
    I cannot sleep, so I make this entry. But I must try to get a few hours'
    sleep, as Van Helsing is to call for me at noon. He insists that I shall
    go with him on another expedition. 27 September.--It was two o'clock
    before we found a suitable opportunity for our attempt. The funeral held
    at noon was all completed, and the last stragglers of the mourners had
    taken themselves lazily away, when, looking carefully from behind a
    clump of alder-trees, we saw the sexton lock the gate after him. We knew
    then that we were safe till morning did we desire it; but the Professor
    told me that we should not want more than an hour at most. 
    </p>
    `;
    document.getElementById("section").appendChild(venue_content3);
  }
}

// Attach variable content function to sign in button

sign_in_button.addEventListener("click", function() {
  dynamicContent();
});
