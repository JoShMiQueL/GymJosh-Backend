const { default: axios } = require("axios");

const lastCommit = document.getElementById("LastCommit");

axios
  .get("https://api.github.com/repos/JoShMiQueL/GymJosh-Backend/commits/main")
  .then((data) => data.data)
  .then((data) => {
    lastCommit.innerText = data.sha.slice(0, 7);
    lastCommit.href = data.html_url;
  });
