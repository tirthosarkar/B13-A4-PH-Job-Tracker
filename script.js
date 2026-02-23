// Step-1 {make empty arrays}
let interviewList = [];
let rejectedList = [];
let currentStatus = "all-btn";

// Step-1.2 {get all the ids}
const total = document.getElementById("totalcount");
const interviewCount = document.getElementById("interviewcount");
const rejectedCount = document.getElementById("rejectedcount");
const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");
const jobsCard = document.getElementById("jobs-card");
const filterSection = document.getElementById("filter-section");
const jobsCountLabel = document.getElementById("jobs-count");

// Step-2 {Calculate function}
function calculateCount() {
  total.innerText = jobsCard.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;

   // Calculation Updated
  const totalJobs = jobsCard.children.length;
  if (currentStatus === "all-btn") {
    jobsCountLabel.innerText = totalJobs + " jobs";
  } else if (currentStatus === "interview-btn") {
    jobsCountLabel.innerText = interviewList.length + " of " + totalJobs + " jobs";
  } else if (currentStatus === "rejected-btn") {
    jobsCountLabel.innerText = rejectedList.length + " of " + totalJobs + " jobs";
  }
}
calculateCount();

// Step-3 {Buttons  Toggle method}
function toggleStyle(id) {
  // Reset all Background Colors
  allBtn.className = "text-md px-4 py-2 rounded-sm bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 active:bg-gray-50 hover:border-gray-400 active:border-gray-400 hover:text-gray-700 active:text-gray-700 transition-colors";
  interviewBtn.className = "text-md px-4 py-2 rounded-sm bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 active:bg-gray-50 hover:border-gray-400 active:border-gray-400 hover:text-gray-700 active:text-gray-700 transition-colors";
  rejectedBtn.className = "text-md px-4 py-2 rounded-sm bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 active:bg-gray-50 hover:border-gray-400 active:border-gray-400 hover:text-gray-700 active:text-gray-700 transition-colors";

  // Set clicked button Background Colors 
  const selected = document.getElementById(id);
  selected.className = "text-md px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 active:bg-blue-700 text-white transition-colors";
  currentStatus = id;

  // Step-4 {filtering cards (show/hide)}
  if (id === "interview-btn") {
    jobsCard.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderList(interviewList);
  } else if (id === "all-btn") {
    filterSection.classList.add("hidden");
    jobsCard.classList.remove("hidden");
  } else if (id === "rejected-btn") {
    jobsCard.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderList(rejectedList);
  }

  calculateCount();
}

// Step-5 {Event-Delegation for job-cards}
jobsCard.addEventListener("click", function (event) {
  const card = event.target.closest(".card");
  if (!card) return;

  const companyName = card.querySelector(".company-name").innerText;
  const position = card.querySelector(".position").innerText;
  const location = card.querySelector(".location").innerText;
  const description = card.querySelector(".description").innerText;

  // Step-6 {Interview button logic}
  if (event.target.classList.contains("interview-btn")) {
    const cardInfo = { companyName, position, location, description, status: "INTERVIEW" };

    const jobExist = interviewList.find(item => item.companyName === companyName);
    if (!jobExist) interviewList.push(cardInfo);

    // Remove rejected button if (Toggle)
    rejectedList = rejectedList.filter(item => item.companyName !== companyName);

    card.querySelector(".status").innerText = "INTERVIEW";
    card.querySelector(".status").className = "status inline-block mb-3 px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-md";

    if (currentStatus === "interview-btn") renderList(interviewList);
    if (currentStatus === "rejected-btn") renderList(rejectedList);
    calculateCount();
  }

  // Step-7 {Rejected button logic}
  else if (event.target.classList.contains("rejected-btn")) {
    const cardInfo = { companyName, position, location, description, status: "REJECTED" };

    const jobExist = rejectedList.find(item => item.companyName === companyName);
    if (!jobExist) rejectedList.push(cardInfo);

    // Remove  Interview  button if  (Toggle)
    interviewList = interviewList.filter(item => item.companyName !== companyName);

    card.querySelector(".status").innerText = "REJECTED";
    card.querySelector(".status").className = "status inline-block mb-3 px-3 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-md";

    if (currentStatus === "interview-btn") renderList(interviewList);
    if (currentStatus === "rejected-btn") renderList(rejectedList);
    calculateCount();
  }

  // Step-8 {Delete button logic}
  else if (event.target.classList.contains("delete-btn")) {
    interviewList = interviewList.filter(item => item.companyName !== companyName);
    rejectedList = rejectedList.filter(item => item.companyName !== companyName);
    card.remove();
    if (currentStatus === "interview-btn") renderList(interviewList);
    if (currentStatus === "rejected-btn") renderList(rejectedList);
    calculateCount();
  }
});

// Step-9 {Event-Delegation on filter-section}
filterSection.addEventListener("click", function (event) {
  const card = event.target.closest(".card");
  if (!card) return;

  const companyName = card.querySelector(".company-name").innerText;
  const position = card.querySelector(".position").innerText;
  const location = card.querySelector(".location").innerText;
  const description = card.querySelector(".description").innerText;

  // APPlY Conditions

  if (event.target.classList.contains("interview-btn")) {
    const jobExist = interviewList.find(item => item.companyName === companyName);
    if (!jobExist) interviewList.push({ companyName, position, location, description, status: "INTERVIEW" });

    rejectedList = rejectedList.filter(item => item.companyName !== companyName);

    if (currentStatus === "interview-btn") renderList(interviewList);
    if (currentStatus === "rejected-btn") renderList(rejectedList);
    calculateCount();
  }

  else if (event.target.classList.contains("rejected-btn")) {
    const jobExist = rejectedList.find(item => item.companyName === companyName);
    if (!jobExist) rejectedList.push({ companyName, position, location, description, status: "REJECTED" });

    interviewList = interviewList.filter(item => item.companyName !== companyName);

    if (currentStatus === "interview-btn") renderList(interviewList);
    if (currentStatus === "rejected-btn") renderList(rejectedList);
    calculateCount();
  }

  else if (event.target.classList.contains("delete-btn")) {
    interviewList = interviewList.filter(item => item.companyName !== companyName);
    rejectedList = rejectedList.filter(item => item.companyName !== companyName);
    card.remove();
    if (currentStatus === "interview-btn") renderList(interviewList);
    if (currentStatus === "rejected-btn") renderList(rejectedList);
    calculateCount();
  }
});

// Step-10 {Render List}
function renderList(list) {
  filterSection.innerHTML = "";

  if (list.length === 0) {
    filterSection.innerHTML = `
      <div class="bg-white rounded-xl border border-gray-200 py-20 flex flex-col items-center justify-center text-center">
        <img src="./image/jobs.png" alt="No jobs" class="w-16 h-16 mb-4 opacity-60"/>
        <p class="text-slate-700 text-lg font-semibold">No jobs available</p>
        <p class="text-gray-400 text-sm mt-1">Check back soon for new job opportunities</p>
      </div>`;
    return;
  }

  for (let job of list) {
    let div = document.createElement("div");
    div.className = "card p-4 sm:p-5 relative bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-green-300 active:shadow-md active:border-green-300 transition-all duration-200 cursor-pointer";
    div.innerHTML = `
      <button class="delete-btn absolute top-3 right-3 w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 active:bg-red-100 text-gray-400 hover:text-red-400 active:text-red-400 transition-all duration-200 flex items-center justify-center border-none">
        <i class="fa-solid fa-trash-can pointer-events-none text-md"></i>
      </button>
      <h3 class="company-name font-semibold text-black text-lg sm:text-xl mb-0.5 pr-10">${job.companyName}</h3>
      <p class="position text-base text-gray-500 mb-2">${job.position}</p>
      <p class="text-base text-gray-400 mb-2"><span class="location">${job.location}</span></p>
      <span class="status inline-block mb-3 px-3 py-1 ${job.status === "INTERVIEW" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"} text-sm font-semibold rounded-md">${job.status}</span>
      <p class="description text-base text-gray-700 mb-4">${job.description}</p>
      <div class="flex gap-2 flex-wrap">
        <button class="interview-btn text-base px-4 py-2 rounded-sm border border-green-500 text-green-600 font-semibold hover:bg-green-300 active:bg-green-200 transition-colors sm:flex-none flex-1 text-center">INTERVIEW</button>
        <button class="rejected-btn text-base px-4 py-2 rounded-sm border border-red-500 text-red-600 font-semibold hover:bg-red-300 active:bg-red-200 transition-colors sm:flex-none flex-1 text-center">REJECTED</button>
      </div>`;
    filterSection.appendChild(div);
  }
}