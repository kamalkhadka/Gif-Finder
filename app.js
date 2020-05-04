// console.log("Let's get this party started!");

const form = document.querySelector("#searchForm");

form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const query = document.querySelector("#query");
  searchGif(query.value);
  query.value = "";
});

async function searchGif(query) {
  try {
    const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        q: query,
        api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
        limit: 1,
      },
    });
    const [gifInfo] = res.data.data;
    console.log(gifInfo);
    appendGif(gifInfo.images.original.url);
  } catch (err) {
    alert(`Can't find gif for ${query}`);
  }
}

function appendGif(gif) {
  const row = document.querySelector("#gifRow");
  const img = createGif(gif);
  const col = createColumnAndAppendGif(img);
  $(row).prepend(col);
  showRemoveButton();
}

function createColumnAndAppendGif(img) {
  const col = document.createElement("div");
  $(col).addClass("col-md-4 mb-5").append(img);
  return col;
}

function createGif(gif) {
  const img = document.createElement("img");
  img.src = gif;

  $(img).addClass("img-fluid rounded shadow-lg border border-white");

  return img;
}

function showRemoveButton() {
  const removeBtn = $("#removeBtn").removeClass("d-none");
  $(removeBtn).on("click", function () {
    $("#gifRow").empty();
    $("#removeBtn").addClass("d-none");
  });
}
