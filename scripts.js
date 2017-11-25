
    var timeline = document.querySelector('#timeline');
    var requestURL = 'events.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
      var superHeroes = request.response;
      showHeroes(superHeroes);
    }

    function showHeroes(jsonObj) {
      var heroes = jsonObj['events'];
      for(var i = 0; i < heroes.length; i++) {
        var eventListItem = document.createElement('li');
        var myPara1 = document.createElement('p');
        var myPara2 = document.createElement('p');

        eventListItem.textContent = heroes[i].data;

      //  var myDate = heroes[i].data.split(".");
      //  var newDate = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
      //  var timestamp = new Date(newDate).getTime();

      



        myPara1.textContent = heroes[i].nazwa;
        myPara2.textContent = heroes[i].ikona;

        eventListItem.appendChild(myPara1);
        eventListItem.appendChild(myPara2);
        timeline.appendChild(eventListItem);


      }
    }