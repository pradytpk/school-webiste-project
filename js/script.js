function login(event) {
  event.preventDefault(); // Prevent default form submission behavior

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Validate the username and password (example validation)
  if (username === 'student' && password === 'password') {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('studentName', 'Pradeep'); // Set the actual student name
    window.location.href = 'index.html'; // Redirect to the welcome page
  } else {
    alert('Invalid username or password');
  }
}

function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('studentName');
  window.location.href = 'login.html'; // Redirect to the login page
}

function checkLoginStatus() {
  if (localStorage.getItem('loggedIn') === 'true') {
    var studentName = localStorage.getItem('studentName');
    var button = document.getElementById('dropdownMenuButton1');
    button.innerHTML = studentName;
    console.log(button.innerHTML);
    return studentName;
  } else {
    return (window.location.href = 'login.html'); // Redirect to the login page if not logged in
  }
}

function checkPermission() {
  var currentPage = window.location.pathname;
  var allowedPages = [
    '/timetable.html',
    '/exam_result.html',
    '/extra_activity.html',
    '/student_profile.html',
  ];

  if (allowedPages.includes(currentPage)) {
    if (
      localStorage.getItem('loggedIn') !== 'true' &&
      localStorage.getItem('loggedIn') == null
    ) {
      if (currentPage !== '/login.html') {
        window.location.href = 'login.html'; // Redirect to the login page if not logged in
      }
    }
  }
}

window.onload = function () {
  if (window.location.pathname !== '/login.html') {
    checkLoginStatus();
  }
  checkPermission();
};

document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('activityForm')
    .addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission behavior

      // Retrieve form values
      var activityName = document.getElementById('activityName').value;
      var activityDescription = document.getElementById(
        'activityDescription'
      ).value;
      var activityDate = document.getElementById('activityDate').value;

      // Create activity object
      var activity = {
        name: activityName,
        description: activityDescription,
        date: activityDate,
      };

      // Get stored activities from local storage (if any)
      var storedActivities =
        JSON.parse(localStorage.getItem('activities')) || [];

      // Add the new activity to the stored activities array
      storedActivities.push(activity);

      // Update local storage with the updated activities array
      localStorage.setItem('activities', JSON.stringify(storedActivities));

      // Redirect back to the welcome page
      window.location.href = 'index.html';
    });
});

document.addEventListener('DOMContentLoaded', function () {
  var activitiesTableBody = document
    .getElementById('activitiesTable')
    .getElementsByTagName('tbody')[0];

  var storedActivities = JSON.parse(localStorage.getItem('activities')) || [];

  storedActivities.forEach(function (activity) {
    var row = document.createElement('tr');
    row.innerHTML =
      '<td>' +
      activity.name +
      '</td><td>' +
      activity.description +
      '</td><td>' +
      activity.date +
      '</td>';
    activitiesTableBody.appendChild(row);
  });
});
