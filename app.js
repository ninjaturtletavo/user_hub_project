const BASE_URL = "https://jsonplace-univclone.herokuapp.com";

function fetchUsers() {
  return fetch(BASE_URL)
    .then(function (response) {
      // call json on the response, and return the result
      console.log(response);
      return response.json();
    })
    .catch(function (error) {
      // use console.error to log out any error
      console.log(error);
    });
}

function renderUser(user) {
  return `
    <div class="user-card">
      <header>
        <h2>${user.name}</h2>
      </header>
      <section class="company-info">
        <p>
          <b>Contact:</b> ${user.email}
        </p>
        <p>
          <b>Works for:</b> Romaguera-Crona
        </p>
        <p>
          <b>Company creed:</b> "Multi-layered client-server neural-net, which
          will harness real-time e-markets!"
        </p>
      </section>
      <footer>
        <button class="load-posts">POSTS BY Bret</button>
        <button class="load-albums">ALBUMS BY Bret</button>
      </footer>
    </div>
  `;
}

function renderUserList(userList) {
  $("#user-list").empty();

  userList.forEach(function (user) {
    const userElement = renderUser(user);
    $("#user-list").append(userElement);
  });
}

function bootstrap() {
  // move the line about fetchUsers into here
  fetchUsers().then(renderUserList);
}

bootstrap();
