const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1"),
  Server = clockContainer.querySelector("h2");

function getServerTime()
{
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        let link = tabs[0].url;
        Server.innerText = `${link}`;
        $.ajax({
            url: link,
            dataType: 'jsonp',
            type:"GET",
            success: function(data){
                Server.innerText =`${data}`;
                console.log('ajax', data);
            }
          });
     });
}

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
  getServerTime();
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();