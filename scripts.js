
    var eventList = document.querySelector('#eventList');
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
      var heroes = jsonObj['members'];
      for(var i = 0; i < heroes.length; i++) {
        var eventListItem = document.createElement('li');
        var myH2 = document.createElement('h2');
        var myPara2 = document.createElement('p');
        myH2.textContent = heroes[i].data;
        myPara2.textContent = 'Wydarzenie: ' + heroes[i].nazwa;

        eventListItem.appendChild(myH2);
        eventListItem.appendChild(myPara2);
        eventList.appendChild(eventListItem);
      }
    }