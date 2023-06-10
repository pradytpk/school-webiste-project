function login(event) {
  event.preventDefault(); // Prevent default form submission behavior

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  fetch('/js/users.json')
    .then((response) => response.json())
    .then((data) => {
      var users = data.users;

      // Find the user with matching credentials
      var user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        // Store the username and grade in session storage
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('studentName', username); // Set the actual student name
        window.location.href = 'index.html'; // Redirect to the welcome page

        localStorage.setItem('fullName', user.profile.name);
        localStorage.setItem('email', user.profile.email);
        localStorage.setItem('phone', user.profile.phone);
        localStorage.setItem('mobile', user.profile.mobile);
        localStorage.setItem('address', user.profile.address);
        localStorage.setItem('fatherFullName', user.profile.fatherFullName);
        localStorage.setItem('fatherEmail', user.profile.fatherEmail);
        localStorage.setItem('fatherPhone', user.profile.fatherPhone);
        localStorage.setItem('fatherMobile', user.profile.fatherMobile);
        localStorage.setItem('fatherAddress', user.profile.fatherAddress);
      } else {
        // Display an error message
        return alert('Invalid username or password');
      }
    });
}

function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('studentName');

  window.location.href = 'login.html'; // Redirect to the login page

  localStorage.removeItem('activities');
}

function checkLoginStatus() {
  if (localStorage.getItem('loggedIn') === 'true') {
    var studentName = localStorage.getItem('studentName');
    var button = document.getElementById('dropdownMenuButton1');
    button.innerHTML = studentName;
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
        return (window.location.href = 'login.html'); // Redirect to the login page if not logged in
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
  var element = document.getElementById('activityForm');
  if (element) {
    element.addEventListener('submit', function (event) {
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
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var activitiesTable = document.getElementById('activitiesTable');

  if (activitiesTable) {
    var tableBody = activitiesTable.getElementsByTagName('tbody')[0];
    // Perform operations on the table body if it exists
  }

  var storedActivities = JSON.parse(localStorage.getItem('activities')) || [];
  if (storedActivities.length > 0) {
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
      tableBody.appendChild(row);
    });
  } else {
    var element = document.getElementById('extraActivity');
    if (element) {
      element.style.display = 'none';
    }
  }
});
