// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  stick_header()
}

// Get the header
var header = document.getElementById('header')

// Get the offset position of the navbar
var sticky = header.offsetTop

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stick_header() {
  if (window.pageYOffset > sticky) {
    header.classList.add('sticky')
  } else {
    header.classList.remove('sticky')
  }
}
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const name_git = urlParams.get('github_login')
const links_social_media = {
  github: name_git
}

function get_GitHub_Profil_Info() {
  const url = `https://api.github.com/users/${links_social_media.github}`

  fetch(url)
    .then(response => response.json())
    .then(data => {
      user_name.textContent = data.name
      user_link.href = data.html_url
      user_avatar.src = data.avatar_url
      user_login.textContent = data.login
      user_company.textContent = data.company
      user_location.textContent = data.location
      usr_mail.value = data.login
      user_followers.textContent = data.followers
      user_follows.textContent = data.following
      user_bio.textContent = data.bio
      user_blog.textContent = data.blog
      user_blog.href = data.blog
    })

  document.forms['github_mail']['github_login'].value =
    user_login.textContent /* Evnvia login p input escondido p consulta do perfil na próxima página */
  const url_stars = `https://api.github-star-counter.workers.dev/user/${links_social_media.github}`
  fetch(url_stars)
    .then(response => response.json())
    .then(data => {
      user_stars.textContent = data.stars
    })

  const url_fav = `https://api.github.com/users/${links_social_media.github}/starred`
  fetch(url_fav)
    .then(response => response.json())
    .then(data => {
      user_fav.textContent = Object.keys(data).length
    })
}

get_GitHub_Profil_Info()
