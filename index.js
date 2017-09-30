var $console = document.querySelector('section.outputNames');
var nonSongs = document.querySelector('section.outputNonNames');

function nameAndIds(playlist) {
  return playlist.map(function(item, index) {
    return {
      name: item.track.name,
      id: item.track.id
    };

  });
}

function idArray(nameAndIds) {
  return nameAndIds.map(function(nameAndId, index) {
    return nameAndId.id;
  });
}

function filteredIds(idArray, otherPlaylist) {
  return idArray.filter(function(id) {
    var index = otherPlaylist.indexOf(id);

    return index !== -1;
  });
}

 // function filteredNonSongIds(idArray, otherPlaylist) {
 //   return idArray.filter(function(id) {
 //     var index = otherPlaylist.indexOf(id);
 //
 //     return index == -1;
 //   });
 // }

function filteredNamesandIds(nameAndIds, filteredIds) {
  return nameAndIds.filter(function(nameAndId) {
    var index = filteredIds.indexOf(nameAndId.id);
    return index !== -1;
  });
}

// function filteredNonNamesandIds(nameAndIds, filteredIds) {
//   return nameAndIds.filter(function(nameAndId) {
//     var index = filteredIds.indexOf(nameAndId.id);
//     return index == -1;
//   });
// }

function fullyFilteredNames(filteredNamesandIds) {
  return filteredNamesandIds.map(function(filteredNameandId, index) {
    return filteredNameandId.name;
  });
}

// function fullyFilteredNonNames(filteredNamesandIds) {
//   return filteredNamesandIds.map(function(filteredNameandId, index) {
//     return filteredNameandId.name
//   });
// }

function processPlaylist(playlist, playlist2) {
  var fNameandIds = nameAndIds(playlist);
  var f2NameandIds = nameAndIds(playlist2);
  var fidArray = idArray(fNameandIds);
  var f2idArray = idArray(f2NameandIds);
  var ffilteredIds = filteredIds(fidArray, f2idArray);
  var ffilteredNamesAndIds = filteredNamesandIds(fNameandIds, ffilteredIds);
  var ffullyFilteredNames = fullyFilteredNames(ffilteredNamesAndIds);
  return ffullyFilteredNames;
}

  // function processNonSongPlaylist(playlist, playlist2) {
  //   var fNameandIds = nameAndIds(playlist);
  //   var f2NameandIds = nameAndIds(playlist2);
  //   var fidArray = idArray(fNameandIds);
  //   var f2idArray = idArray(f2NameandIds);
  //   var ffilteredNonSongIds = filteredNonSongIds(fidArray, f2idArray);
  //   var ffilteredNamesAndIds = filteredNamesandIds(fNameandIds, ffilteredNonSongIds);
  //   var ffullyFilteredNames = fullyFilteredNames(ffilteredNamesAndIds);
  //   return ffullyFilteredNames;
  // }

function appendNames(names) {
  for (var i = 0; i < names.length; i++) {
    var li = document.createElement("li");
    li.textContent = names[i];
    $console.appendChild(li);
  }
}
// function appendNonNames(names) {
//   for (var i = 0; i < names.length; i++) {
//     var li = document.createElement("li");
//     li.textContent = names[i];
//     nonSongs.appendChild(li);
//   }
// }



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

function onSubmit(e) {
  e.preventDefault();
  var inputTextValue1 = inputText1.value;
  var inputTextValue2 = inputText2.value;
  inputTextValueArr1 = inputTextValue1.split("https://open.spotify.com/user/");
  inputTextValueArr2 = inputTextValue2.split("https://open.spotify.com/user/");
  var inputTextValueStr1 = inputTextValueArr1.join();
  var inputTextValueStr2 = inputTextValueArr2.join();
  inputTextValueF1 = inputTextValueStr1.split("/playlist/");
  inputTextValueF2 = inputTextValueStr2.split("/playlist/");
  var finalInputTextValueStr1 = inputTextValueF1.join();
  var finalInputTextValueStr2 = inputTextValueF2.join();
  finalInputTextValue1 = finalInputTextValueStr1.split(",");
  finalInputTextValue2 = finalInputTextValueStr2.split(",");

  function requestPlaylist(user, playlistID, offset) {
    var request = new Request('https://api.spotify.com/v1/users/' + user + '/playlists/' + playlistID + '/tracks?offset=' + offset, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("#access_token")
      },
      method: 'GET',
    });
    return request;
  }
  var request = requestPlaylist(finalInputTextValue1[1], finalInputTextValue1[2], 0);
  var request2 = requestPlaylist(finalInputTextValue2[1], finalInputTextValue2[2], 0);
  // curl -v https://api.spotify.com/v1/users/unneakyninja/playlists/6bildEfk21lbA8tEcW7EQ4 -H "Authorization: Bearer BQACX2Q09tCSvYnMOfc0ULj1pbEY2w4v6SMJnVbqIMj61uOOx6SDcCQfzfdCR6jaCLTqfGNu4gqncJTcyjxvKrrpTSiALpN-QBhJDufZPuhz69tfJqZAb_tNtvcsIUNxGDwizG3IRSRFx1v_EQ-Gn9c9dtKfJr4_KmeOJ8A"

  var playlist1;
  var playlist2;
  var fetch1;
  var fetch2;
  var allTracks = [];
  var allForeignTracks = [];

  function playlistTracks(request, resolve, reject) {
    return fetch(request).then(function(response) {
      return response.json();
    }).then(function(json) {
      allTracks = allTracks.concat(json.items);
      if (json.total > (json.offset + json.limit)) {
        playlistTracks(
          requestPlaylist(finalInputTextValue1[1], finalInputTextValue1[2], (json.offset + json.limit)),
          resolve,
          reject
        )
      } else {
        console.log(allTracks);
        resolve(allTracks);
      }
    }).catch(function(err) {
      reject(err);
    });
  }
   function foreignPlaylist(request2, resolve, reject) {
     console.log(resolve, reject)
      return fetch(request2).then(function(response) {
         console.log(response);
         return response.json();
       }).then(function(json){
         allForeignTracks = allForeignTracks.concat(json.items);
         if (json.total > (json.offset + json.limit)) {
           foreignPlaylist(
             requestPlaylist(finalInputTextValue2[1], finalInputTextValue2[2], (json.offset + json.limit)),
             resolve,
             reject
           )
         } else {
           console.log(allForeignTracks);
            resolve(allForeignTracks);
         }

       }).catch(function(err) {
         reject(err);
       });
   }
  // playlistTracks(request);
  //  foreignPlaylist(request2);

   function fetchPlaylistTracks(request){
     return new Promise(function(resolve, reject){
        playlistTracks(request, resolve, reject);
     });
   }
   function fetchForeignPlaylist(request){
     return new Promise(function(resolve, reject){
       console.log(resolve, reject)
       foreignPlaylist(request, resolve, reject);
     });
   }

   Promise.all([
     fetchPlaylistTracks(request),
     fetchForeignPlaylist(request2)
   ]).then(function(values){
      console.log(values)
      appendNames(processPlaylist(values[0], values[1]));
    //  appendNonNames(processNonSongPlaylist(values[0], values[1]));
      console.log(processPlaylist);
   });

}


//https://api.spotify.com/v1/users/ + inputTextValueF1[0] + /playlists/ + inputTextValueF1[1];
//https://api.spotify.com/v1/users/ + inputTextValueF2[0] + /playlists/ + inputTextValueF2[1];
//What is above is just so you remember what it will look like
