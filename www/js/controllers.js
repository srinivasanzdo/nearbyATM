angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {


  })

  .controller('HomeCtrl', function ($scope, $ionicModal, $state, $rootScope, $http) {
    var map;
    var infowindow;
    $scope.playlists = [];
    $scope.playlists1 = [];
    $scope.banklist = [];

    $scope.userSearch = 0;

    document.getElementById('mapcontainer').style.width = "" + window.outerWidth + "px";
    document.getElementById('mapcontainer').style.height = "" + window.outerHeight + "px";

    $scope.currentLoc = { lat: 11.932314, lng: 79.807707 };

    function initMap(maplocation) {
      //console.log("initmap call....s");
      var loc = maplocation;

      map = new google.maps.Map(document.getElementById('map'), {
        center: loc,
        zoom: 15
      });

      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: loc,
        radius: 500,
        type: ['atm']
      }, callback);

      google.maps.event.addListenerOnce(map, 'idle', function () {
        document.getElementById('loading').style.display = "none";
      });

    }

    function getRandom() {
      var myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      var rand = myArray[Math.floor(Math.random() * myArray.length)];
      return (rand * 4);
    }

    function callback(results, status) {
      $scope.playlists = [];
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          $scope.single = {
            name: "",
            address: "",
            id: "",
            balance: "",
            esttime: ""
          }

          if (results[i].name.indexOf("HDFC") > -1 || results[i].name.indexOf("hdfc") > -1) {
            $scope.single.name = results[i].name;
            $scope.single.address = results[i].vicinity;
            $scope.single.id = $scope.banklist[1].bankid;
            $scope.single.balance = $scope.banklist[1].amount;
            $scope.single.esttime = getRandom();
            $scope.playlists.push($scope.single);
          }

          if (results[i].name.indexOf("axis") > -1 || results[i].name.indexOf("AXIS") > -1 || results[i].name.indexOf("Axis") > -1) {
            $scope.single.name = results[i].name;
            $scope.single.address = results[i].vicinity;
            $scope.single.id = $scope.banklist[0].bankid;
            $scope.single.balance = $scope.banklist[0].amount;
            $scope.single.esttime = getRandom();
            $scope.playlists.push($scope.single);
          }

          if (results[i].name.indexOf("ICICI") > -1 || results[i].name.indexOf("icici") > -1 || results[i].name.indexOf("Icici") > -1) {
            $scope.single.name = results[i].name;
            $scope.single.address = results[i].vicinity;
            $scope.single.id = $scope.banklist[2].bankid;
            $scope.single.balance = $scope.banklist[2].amount;
            $scope.single.esttime = getRandom();
            $scope.playlists.push($scope.single);
          }

          if (results[i].name.indexOf("SBI") > -1 || results[i].name.indexOf("Sbi") > -1 || results[i].name.indexOf("sbi") > -1) {
            $scope.single.name = results[i].name;
            $scope.single.address = results[i].vicinity;
            $scope.single.id = $scope.banklist[3].bankid;
            $scope.single.balance = $scope.banklist[3].amount;
            $scope.single.esttime = getRandom();
            $scope.playlists.push($scope.single);
          }

          if (results[i].name.indexOf("Indian Bank") > -1 || results[i].name.indexOf("INDIAN BANK") > -1) {
            $scope.single.name = results[i].name;
            $scope.single.address = results[i].vicinity;
            $scope.single.id = $scope.banklist[4].bankid;
            $scope.single.balance = $scope.banklist[4].amount;
            $scope.single.esttime = getRandom();
            $scope.playlists.push($scope.single);
          }

          if (results[i].name.indexOf("City Union") > -1 || results[i].name.indexOf("CITY UNION") > -1 || results[i].name.indexOf("CITY Union") > -1) {
            $scope.single.name = results[i].name;
            $scope.single.address = results[i].vicinity;
            $scope.single.id = $scope.banklist[5].bankid;
            $scope.single.balance = $scope.banklist[5].amount;
            $scope.single.esttime = getRandom();
            $scope.playlists.push($scope.single);
          }

          if (results[i].name.indexOf("CITI Bank") > -1 || results[i].name.indexOf("Citi Bank") > -1) {
            $scope.single.name = results[i].name;
            $scope.single.address = results[i].vicinity;
            $scope.single.id = $scope.banklist[6].bankid;
            $scope.single.balance = $scope.banklist[6].amount;
            $scope.single.esttime = getRandom();
            $scope.playlists.push($scope.single);
          }

          createMarker(results[i]);
        }
      }
    }

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }

    // document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          $scope.currentLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
          loadbanklist($scope.currentLoc);
        },
        function errorCallback(error) {
          loadbanklist($scope.currentLoc);
        },
        {
          maximumAge: Infinity,
          timeout: 5000
        }
      );
    }

    onDeviceReady();

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/listmodal.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Open the login modal
    $scope.showmodal = function () {
      $scope.playlists1 = $scope.playlists;
      $scope.modal.show();
    };

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    $scope.showsearchaddress = function () {
      $state.go('app.searchaddress');
    };

    function loadbanklist(loca) {
      var req = {
        method: 'GET',
        url: 'http://atm.jairamantransport.com/api/bank/getbanklist',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {}
      }

      $http(req).then(function (res) {
        $scope.banklist = res.data;
        initMap(loca);
      }, function (err) {
        console.log(err);
        initMap(loca);
      });
    }


    $scope.gotoCurrent = function () {

      navigator.geolocation.getCurrentPosition(
        function (position) {
          $scope.currentLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
          loadbanklist($scope.currentLoc);
        },
        function errorCallback(error) {
          loadbanklist($scope.currentLoc);
        },
        {
          maximumAge: Infinity,
          timeout: 5000
        }
      );

    }



    $scope.greaterThan = function (prop, val) {
      return function (item) {
        if (item[prop] >= val) return true;
      }
    }

    $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
      if (toState.url == "/home" && fromState.url == "/searchaddress") {
        if (typeof $rootScope.searchLoc != 'undefined' || $rootScope.searchLoc != null) {
          console.log("works....");
          loadbanklist($rootScope.searchLoc);
        }
      }
    });

  })
  .controller('SearchaddressCtrl', function ($scope, $ionicModal, $timeout, $rootScope, $state) {

    document.getElementById('loading').style.display = "none";

    document.getElementById('autocomplete').value = "";

    var input = document.getElementById('autocomplete');
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      $rootScope.searchLoc = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
      $state.go('app.home');
    });

  });
