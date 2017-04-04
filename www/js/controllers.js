angular.module('starter.controllers', [])

        .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //$scope.$on('$ionicView.enter', function(e) {
            //});

            // Form data for the login modal
            $scope.loginData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            // Triggered in the login modal to close it
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };

            // Open the login modal
            $scope.login = function () {
                $scope.modal.show();
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                console.log('Doing login', $scope.loginData);

                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function () {
                    $scope.closeLogin();
                }, 1000);
            };
        })

        .controller('PlaylistsCtrl', function ($scope) {
            $scope.playlists = [
                {title: 'Reggae', id: 1},
                {title: 'Chill', id: 2},
                {title: 'Dubstep', id: 3},
                {title: 'Indie', id: 4},
                {title: 'Rap', id: 5},
                {title: 'Cowbell', id: 6}
            ];
        })

        .controller('PlaylistCtrl', function ($scope, $stateParams) {
        })

        .controller('MapCtrl', function ($scope, $cordovaGeolocation) {
//            var mapOptions = {
//                center: new google.maps.LatLng(4.624335, -74.063644),
//                zoom: 15,
//                mapTypeId: google.maps.MapTypeId.ROADMAP
//            };
//
//            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

            var options = {timeout: 10000, enableHighAccuracy: true};

            $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                var mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById("map"), mapOptions);

                var marker = new google.maps.Marker({position: latLng, map: map});

                $scope.map = map;

            }, function (error) {
                console.log("Could not get location");
            });
        })

        .controller('PictureCtrl', function ($scope, $cordovaCamera) {
            $scope.takePhoto = function () {
                var pickImage = function () {
                    var options = {
                        quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        allowEdit: false,
                        encodingType: Camera.EncodingType.JPEG,
                        targetWidth: 100,
                        targetHeight: 100,
                        popoverOptions: CameraPopoverOptions,
                        saveToPhotoAlbum: false,
                        correctOrientation: true
                    };

                    $cordovaCamera.getPicture(options).then(function (imageData) {
//                        var image = document.getElementById('picture');
//                        image.src = "data:image/jpeg;base64," + imageData;
                        $scope.pictureData = imageData;
                    }, function (err) {
                        console.log(err);
                    });
                };

                // Source: https://forum.ionicframework.com/t/camera-imagepicker-permission-to-access-media/57854/7
                var cpd = cordova.plugins.diagnostic;
                function success(status) {
                    if (cpd.permissionStatus.GRANTED === status) {
                        pickImage();
                    } else {
                        alert('Allow the requested permission');
                    }
                }
                function failure(error) {
                    console.log('handle error');
                }
                cpd.requestRuntimePermission(success, failure, cpd.runtimePermission.WRITE_EXTERNAL_STORAGE);
            };
        });
