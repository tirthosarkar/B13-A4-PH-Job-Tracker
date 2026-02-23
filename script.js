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
