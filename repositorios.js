// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  stick_header()
}

var blocos = document.getElementById('repos_section')
// Get the header
var header = document.getElementById('header')

// Get the offset position of the navbar
var sticky = header.offsetTop

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
      user_followers.textContent = data.followers
      user_follows.textContent = data.following
      user_bio.textContent = data.bio
      user_blog.textContent = data.blog
      user_blog.href = data.blog
    })

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

async function get_contributors(url, contribs) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      return Object.keys(data).length
    })
}

function show_blocks() {
  const repos = `https://api.github.com/users/${links_social_media.github}/repos`

  fetch(repos)
    .then(async res => {
      if (!res.ok) {
        throw new Error(res.status)
      }

      var data = await res.json()
      var contribs = 5
      data.map(item => {
        let block = document.createElement('div')
        const contribs_url = item.contributors_url
        get_contributors(contribs_url, contribs)

        console.log('depois ' + get_contributors(contribs_url, contribs))
        block.innerHTML = `
      <div class="repos_block">
        <div class="repos_container">
          <h1>${item.name}</h1>
          <form method="get" action="./repositorios.html">
            <input id="repos_name"
                type="text"
                name="repos_name_srch" style="display: none;"></input>
            <button
              type="submit"
              class="repos_view_btn"
            >
              keyboard_arrow_right
            </button>
            
          </form>
        </div>
        <div class="repos_descr">${item.description}</div>
        <div class="tags">#TESTE</div>
        <div class="tags">#TESte</div>
        <div class="tags">#Teste</div>
        <div class="add_tags_btn">Editar tags
          <i class="material-icons md-10">edit</i>
        </div>
        <div class="star_btn">
          <i class="material-icons md-24" >star</i>
        </div>
        <div class="company_location_star">
          <i class="material-icons md-16">language</i>
          <p id="asda">
          ${item.language}
          </p>
          <i class="material-icons md-16">access_time</i>
          <p id="user_locatiown">Atualizado ${Intl.DateTimeFormat(
            'pt-Br'
          ).format(new Date(item.updated_at))}</p>
          <i class="material-icons md-16">star</i>
          <p id="user_stars">${item.stargazers_count}</p>
          <i class="material-icons md-16">supervisor_account</i>
          <p id="user_stars">${contribs}</p>
        </div>
      </div>
        `

        blocos.appendChild(block)
      })
    })
    .catch(e => console.log(e))

  /* fetch(repos)
    .then(response => response.json())
    .then(data => {
      var strHTML = ''
      data.forEach(function (data) {
        strHTML += `<div class="repos_block">
              <h4 class="Results-itemName">${data.name}</h4>
              </div>`
      })
      document
        .getElementById('container')
        .insertAdjacentHTML('beforeend', strHTML)
    })

  for (var i = 0; i < data.length; i++) {
    var div = document.createElement('div')
    div.className = 'repos_block'
    div.innerHTML = appStatus[i].app
    document.getElementsById('repos_block_id')[0].appendChild(div)
  } */
}
get_GitHub_Profil_Info()
show_blocks()
