
var $console = document.querySelector('section.outputNames')
function
var nameAndIds = obj.tracks.items.map (function(item, index) {
     return {name:item.track.name, id:item.track.id};
});

var idArray = nameAndIds.map(function(nameAndId, index) {
     return nameAndId.id;
});


var filteredIds = idArray.filter(function(id) {
    var index = otherPlaylist.indexOf(id);

    return index !== -1;
});
var filteredNamesandIds = nameAndIds.filter(function(nameAndId){
    var index = filteredIds.indexOf(nameAndId.id);
    return index !== -1;
});
var fullyFilteredNames = filteredNamesandIds.map(function(filteredNameandId, index){
    return filteredNameandId.name;
})
function appendNames(names) {
  for (var i = 0; i < names.length; i++) {
    var li = document.createElement("li");
    li.textContent = names[i];
    $console.appendChild(li);
  }

}

var tokenArrays = [];
var hashArray = [];
var fullyHashArray = [];
str = location.hash;
tokenArrays = str.split("&");
hashString = tokenArrays.join("=");
hashArray = hashString.split("=");
console.log(hashArray);

localStorage.setItem(hashArray[0], hashArray[1]);
localStorage.setItem(hashArray[2], hashArray[3]);

function removeLoginButton() {
  var button = document.getElementById('login');
    button.classList.add("hide");
}

if (localStorage.getItem("#access_token")) {
  removeLoginButton();
}

var form = document.querySelector("form");
var inputText1 = document.querySelector(".playlist1");
var inputText2 = document.querySelector(".playlist2");
var inputTextValueArr1 = [];
var inputTextValueArr2 = [];
var inputTextValueF1 = [];
var inputTextValueF2 = [];
var finalInputTextValue1 = [];
var finalInputTextValue2 = [];

form.addEventListener("submit", onSubmit)
function onSubmit(e){
    e.preventDefault();
    var inputTextValue1 = inputText1.value;
    var inputTextValue2 = inputText2.value;
    inputTextValueArr1 = inputTextValue1.split("https://open.spotify.com/user/");
    inputTextValueArr2 = inputTextValue2.split("https://open.spotify.com/user/");
    var inputTextValueStr1 =  inputTextValueArr1.join();
    var inputTextValueStr2 =  inputTextValueArr2.join();
    inputTextValueF1 = inputTextValueStr1.split("/playlist/");
    inputTextValueF2 = inputTextValueStr2.split("/playlist/");
    var finalInputTextValueStr1 = inputTextValueF1.join();
    var finalInputTextValueStr2 = inputTextValueF2.join();
    finalInputTextValue1 = finalInputTextValueStr1.split(",");
    finalInputTextValue2 = finalInputTextValueStr2.split(",");
    var request = new Request('https://api.spotify.com/v1/users/' + finalInputTextValue1[1] + '/playlists/' + finalInputTextValue1[2], {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("#access_token")
      },
      method: 'GET',
    });

    var request2 = new Request('https://api.spotify.com/v1/users/' + finalInputTextValue2[1] + '/playlists/' + finalInputTextValue2[2], {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("#access_token")
      },
      method: 'GET',
    });

    // curl -v https://api.spotify.com/v1/users/unneakyninja/playlists/6bildEfk21lbA8tEcW7EQ4 -H "Authorization: Bearer BQACX2Q09tCSvYnMOfc0ULj1pbEY2w4v6SMJnVbqIMj61uOOx6SDcCQfzfdCR6jaCLTqfGNu4gqncJTcyjxvKrrpTSiALpN-QBhJDufZPuhz69tfJqZAb_tNtvcsIUNxGDwizG3IRSRFx1v_EQ-Gn9c9dtKfJr4_KmeOJ8A"

var playlist1;
var playlist2;

    fetch(request).then(function(response) {
    	console.log(response);
      return response.json();
    }).then(function(json){
      playlist1 = json;
    }).catch(function(err) {
    	console.error(err);
    });

    fetch(request2).then(function(response) {
      console.log(response);
      return response.json();
    }).then(function(json){
      playlist2 = json;
    }).catch(function(err) {
      console.error(err);
    });
}
//https://api.spotify.com/v1/users/ + inputTextValueF1[0] + /playlists/ + inputTextValueF1[1];
//https://api.spotify.com/v1/users/ + inputTextValueF2[0] + /playlists/ + inputTextValueF2[1];
//What is above is just so you remember what it will look like

appendNames(fullyFilteredNames);
console.log(fullyFilteredNames);
