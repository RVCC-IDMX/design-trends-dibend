const xhr = new XMLHttpRequest();

function printWorker(worker) {
  min = 1;
  max = 30;
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "smallText");
  const time = new Date(1970, 0, 1);
  time.setUTCSeconds(worker.lastShare - 18000);
  worker.lastShare = time.toLocaleString();
  newDiv.innerHTML = JSON.stringify(worker, null, 2).replaceAll("\n", "<br><br>")
    .replaceAll("{", "")
    .replaceAll("}", "")
    .replaceAll("\"", "");
  document.querySelector("main").appendChild(newDiv)
}

xhr.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    const response = JSON.parse(this.responseText);
    response.workers.forEach(printWorker);
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    const docHeight = Math.max(
      htmlElement.clientHeight, htmlElement.scrollHeight, htmlElement.offsetHeight,
      bodyElement.scrollHeight, bodyElement.offsetHeight
    );
    const main = document.querySelector("main");
    if(main.offsetHeight < docHeight) {
      main.style.height = docHeight;
    }
  } 
};

xhr.open("GET", "https://kaspa.herominers.com/api/stats_address?address=kaspa:qzs5dsvct5g3npgzhhzvax7w5shckhscszrx66g760dc7zwzmv8xvzhrs47kn", true);
xhr.send();