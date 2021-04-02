const BASE_URL = "https://jsonplace-univclone.herokuapp.com";

const users_URL = `${BASE_URL}/users`;

// const album_URL = `${BASE_URL}/users/${userId}/albums`;

// Functions
function fetchUsers() {
  return fetchData(users_URL);
}

function renderUser(user) {
  return $(`<div class="user-card">
      <header>
        <h2>${user.name}</h2>
      </header>
      <section class="company-info">
        <p>
          <b>Contact:</b> ${user.email}
        </p>
        <p>
          <b>Works for:</b> ${user.company.name}
        </p>
        <p>
          <b>Company creed:</b> "${user.company.catchPhrase}"
        </p>
      </section>
      <footer>
        <button class="load-posts">POSTS BY ${user.username}</button>
        <button class="load-albums">ALBUMS BY ${user.username}</button>
      </footer>
    </div>
  `).data("user", user);
}

function renderUserList(userList) {
  $("#user-list").empty();

  userList.forEach(function (user) {
    const userElement = renderUser(user);
    $("#user-list").append(userElement);
  });
}

/* get an album list, or an array of albums */
function fetchUserAlbumList(userId) {
  return fetchData(
    `${BASE_URL}/users/${userId}/albums?_expand=user&_embed=photos`
  );
}

/* render a single album */
function renderAlbum(album) {
  const albumElement = $(`<div class="album-card">
  <header>
    <h3>${album.title}, by ${album.username} </h3>
  </header>
  <section class="photo-list">
    <div class="photo-card"></div>
    <div class="photo-card"></div>
    <div class="photo-card"></div>
    <!-- ... -->
  </section>
</div>`).find(".photo-list");
  // find() looks for photo-list

  album.photos.forEach(function (photo) {
    const photoElement = renderPhoto(photo);
    albumElement.append(photoElement);
  });

  return albumElement;
}

/* render a single photo */
function renderPhoto(photo) {
  return $(`<div class="photo-card">
  <a href="${photo.url}" target="_blank">
    <img src="${photo.thumbnailURL}">
    <figure>${photo.title}</figure>
  </a>
</div>`);
}

/* render an array of albums */
function renderAlbumList(albumList) {
  $("#app section.active").removeClass("active");

  $("#album-list").empty().addClass("active");

  albumList.forEach(function (album) {
    const albumElement = renderAlbum(album);
    $("#album-list").append(albumElement);
  });
}

function fetchData(url) {
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function bootstrap() {
  // move the line about fetchUsers into here
  fetchUsers().then(function (data) {
    renderUserList(data);
  });
}

// Listeners
$("#user-list").on("click", ".user-card .load-posts", function () {
  // load posts for this user
  let element = $(this).closest(".user-card").data("user");
  console.log(element);
  // render posts for this user
});

$("#user-list").on("click", ".user-card .load-albums", function () {
  // load albums for this user
  let element = $(this).closest(".user-card").data("user");
  fetchUserAlbumList(element.id).then(function (albumList) {
    renderAlbumList(albumList);
  });
  // render albums for this user
});

bootstrap();

fetchUserAlbumList(5).then(function (albumList) {
  console.log(albumList);
});

fetchUserAlbumList(3).then(renderAlbumList);
