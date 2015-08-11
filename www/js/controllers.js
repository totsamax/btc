taxi.controller('History', ['$scope', '$localStorage', 'offerService', '$state', function($scope, $localStorage, offerService, $state) {
    $scope.history = $localStorage.history;
    $scope.clearHistory = function() {
        $localStorage.history = [];
        $scope.history = $localStorage.history;
    };
    $scope.recall = function(from, to) {
        $scope.orderResult = offerService.MakeOrder(from, to, $localStorage.phone);
        $scope.orderResult.$promise.then(function(data) {
            $localStorage.lastOrderId = data.Id;
            $state.go('home');
        });
    };
}]);
taxi.controller('Home', ['$scope', '$localStorage', '$pusher', 'offerService', '$http', '$ionicModal', '$ionicPopup', '$cordovaLocalNotification', '$cordovaVibration', '$cordovaGeolocation', '$ionicLoading', 'leafletData',
    function($scope, $localStorage, $pusher, offerService, $http, $ionicModal, $ionicPopup, $cordovaLocalNotification, $cordovaVibration, $cordovaGeolocation, $ionicLoading, leafletData) {
        angular.extend($scope, {
                Bishkek: {
                    lat: 42.882004,
                    lng: 74.582748,
                    zoom: 10
                }
        });   
        $ionicModal.fromTemplateUrl('pages/order.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.myModal = modal;
        });

        function countDown(second, endMinute, endHour, endDay, endMonth, endYear) {
            var now = new Date();
            second = second || now.getSeconds();
            second = second + now.getSeconds();
            endYear = endYear || now.getFullYear();
            endMonth = endMonth ? endMonth - 1 : now.getMonth(); //номер месяца начинается с 0
            endDay = endDay || now.getDate();
            endHour = endHour || now.getHours();
            endMinute = endMinute || now.getMinutes();
            //добавляем секунду к конечной дате (таймер показывает время уже спустя 1с.) 
            var endDate = new Date(endYear, endMonth, endDay, endHour, endMinute, second + 1);
            var interval = setInterval(function() { //запускаем таймер с интервалом 1 секунду
                var time = endDate.getTime() - now.getTime();
                if (time < 0) { //если конечная дата меньше текущей
                    clearInterval(interval);
                    //
                } else {
                    var days = Math.floor(time / 864e5);
                    var hours = Math.floor(time / 36e5) % 24;
                    var minutes = Math.floor(time / 6e4) % 60;
                    var seconds = Math.floor(time / 1e3) % 60;
                    var digit = '<div >' + '<div  >';
                    var text = '</div><div>'
                    var end = '</div></div><div style="float:left;font-size:45px;">:</div>'
                    document.getElementById('mytimer').innerHTML = seconds;
                    if (!seconds && !minutes && !days && !hours && $scope.stop!==true) {
                        clearInterval(interval);
                        $scope.cancelOrder();

                    }
                }
                now.setSeconds(now.getSeconds() + 1); //увеличиваем текущее время на 1 секунду
            }, 1000);
        }
        $scope.stop= false;
        $scope.currentDriverName = "";
        $scope.currentDriverPhonenumber = "";

         
       leafletData.getMap().then(function(map) {
        navigator.geolocation.getCurrentPosition(function(position) {
         $http.get('http://nominatim.openstreetmap.org/reverse',{params:{
            format:'json',
            lat:position.coords.latitude,
            lon:position.coords.longitude,
            zoom:'20',
            addressdetails:'1'
         }})
         .success(function(data){
            console.log(data);
            $scope.from = data.display_name;

            L.Routing.control({
              waypoints: [
                L.latLng(position.coords.latitude,position.coords.longitude),
                L.latLng(57.6792, 11.949)
              ],
              show:false
            }).addTo(map);
            return data.address.town });
     }); 
        });

        if ($localStorage.lastOrderId && $localStorage.lastOrderId !== '' && $localStorage.lastOrderId !== undefined) {
            offerService.GetTaxiOrderState($localStorage.lastOrderId).$promise.then(function(resp) {
                switch (resp.OrderState) {
                    case 0:
                        {
                            $scope.disForm = true;
                            $scope.srch = "Ведется поиск машин, ожидайте, пожалуйста";
                            $scope.orderResult.Id = $localStorage.lastOrderId;
                            $http({
                                method: 'GET',
                                url: 'http://api.bishkektaxi.org/GetDriverOfferList',
                                params: {
                                    order_id: $localStorage.lastOrderId
                                }
                            }).success(function(data) {
                                console.log(data.CarModel);
                                $scope.ordersList = data;
                                $scope.srch = null;
                                offerService.ordersList = data;
                            }).error(function(data) {
                                console.log('Ошибка получения списка заказов' + data);
                            });
                            if (!channel) {
                                var channel = pusher.subscribe('order_id' + $localStorage.lastOrderId);
                            } else {
                                channel = pusher.subscribe('order_id' + $localStorage.lastOrderId);
                            };
                            channel.bind('offer_list_change', function() {
                                $http({
                                    method: 'GET',
                                    url: 'http://api.bishkektaxi.org/GetDriverOfferList',
                                    params: {
                                        order_id: $localStorage.lastOrderId
                                    }
                                }).success(function(data) {
                                    console.log(data.CarModel);
                                    $scope.ordersList = data;
                                    $scope.srch = null;
                                    offerService.ordersList = data;
                                }).error(function(data) {
                                    console.log('Ошибка получения списка заказов' + data);
                                });
                            });
                            break;
                        }
                    case 1:
                        {
                            order_state_desc = 'Заказ принят, машина выехала';
                            $http({
                                method: 'GET',
                                url: 'http://api.bishkektaxi.org/GetDriverOfferList',
                                params: {
                                    order_id: $localStorage.lastOrderId
                                }
                            }).success(function(data) {
                                offerService.currentOffer = data[0];
                                offerService.orderId = $localStorage.lastOrderId;
                                $scope.myModal.show().
                                $scope.openModal(offerService.currentOffer, $localStorage.lastOrderId);
                                //$scope.continueOrder($localStorage.lastOrderId);
                            }).error(function(data) {
                                console.log('Ошибка получения списка заказов' + data);
                            });
                            break;
                        }
                    case 2:
                        {
                            order_state_desc = 'Заказ отменен пользователем, т.е. Вами';
                            break;
                        }
                    case 3:
                        {
                            order_state_desc = 'Водитель не сможет выполнить заказ';
                            break;
                        }
                    case 4:
                        {
                            order_state_desc = 'Заказ устарел';
                            break;
                        }
                    case 5:
                        {
                            order_state_desc = 'Ваша машина подана и ожидает Вас';
                            $scope.continueOrder($localStorage.lastOrderId);
                            break;
                        }
                    case 6:
                        {
                            order_state_desc = 'Ваш заказ завершен';
                            break;
                        }
                }
            });
        };
        
        $scope.openModal = function(offer, orderId) {
            $scope.status = "Машина выехала, ожидайте, пожалуйста";
            offerService.AssignToDriver(orderId, offer.DriverId).$promise.then(function(resp) {
                if (!channel) {
                    var channel = pusher.subscribe('order_id' + orderId);
                } else {
                    channel = pusher.subscribe('order_id' + orderId);
                };
                channel.bind('driver_has_arrived', function(data) {
                    $cordovaLocalNotification.add({
                        id: "1234",
                        message: "Ваша машина подана, выходите, пожалуйста",
                        title: "Изменение статуса заказа",
                        sound: 'file://car.mp3'
                    }).then(function() {
                        console.log("The notification has been set");
                        //$cordovaVibration.vibrate(1000);
                    });
                    $scope.status = "Ваша машина подана, выходите, пожалуйста";
                });
                channel.bind('order_is_completed', function(data) {
                    $cordovaLocalNotification.add({
                        id: "12345",
                        message: "Ваш заказ выполнен. Вы прибыли",
                        title: "Изменение статуса заказа",
                        sound: 'file://car.mp3'
                    }).then(function() {
                        console.log("The notification has been set");
                      //  $cordovaVibration.vibrate(1000);
                    });
                    $scope.status = "Ваш заказ выполнен. Вы прибыли";
                    var alertPopup = $ionicPopup.alert({
                        title: 'Ваш заказ завершен',
                        template: 'Вы прибыли! Спасибо за то, что воспользовались нашими услугами!'
                    });
                    alertPopup.then(function(res) {
                        $localStorage.lastOrderId = '';
                        $scope.closeModal();
                        //                                        $state.go('home');
                    });
                });
            });
        };
        $scope.closeModal = function() {
            $scope.cancelOrder();
            $scope.myModal.hide();
        };
        $scope.goToOffer = function(offer) {
            $scope.stop=true;
            offerService.currentOffer = offer;
            offerService.orderId = $scope.orderResult.Id;
            $scope.currentDriverName = offer.DriverName;
            $scope.currentDriverPhonenumber = offer.DriverPhonenumber;
            $ionicPopup.confirm({
                title: 'Подтверждение заказа',
                template: 'Вы уверены, что хотите вызвать эту машину?',
                cancelText: 'Нет', // String (default: 'Cancel'). The text of the Cancel button.
                cancelType: '', // String (default: 'button-default'). The type of the Cancel button.
                okText: '', // String (default: 'OK'). The text of the OK button.
                okType: 'Да' // String (default: 'button-positive'). The type of the OK button.
            }).then(function(res) {
                if (res) {
                    $scope.myModal.show();
                    $scope.openModal(offer, $scope.orderResult.Id);
                } else {
                    console.log('Вы не увернны ');
                }
            });
        };
        $scope.phone = $localStorage.phone;
        $scope.disForm = false;
        var pusher = $pusher(client);
        $scope.from = null;
        $scope.to = null;
        $scope.orderResult = '';
        $scope.ordersList = '';
        $scope.srch = '';
        $scope.makeOrder = function(from, to) {
            offerService.Logg();
            
            $ionicLoading.show({
                template: '<div><ion-spinner icon="ripple"></ion-spinner>Ведется поиск машин...</div><div id="mytimer"></div>',
                duration: 60000
            });
            countDown(59);
            $scope.disForm = true;
            //$scope.srch = "Ведется поиск машин, ожидайте...";
            $scope.orderResult = offerService.MakeOrder(from, to, $scope.phone);
            $scope.orderResult.$promise.then(function(data) {
                console.log(data.Id);
                $scope.orderResult.Id = data.Id;
                $scope.order = {
                    from: from,
                    to: to,
                    phone: $scope.phone
                };
                $localStorage.lastOrderId = data.Id;
                $scope.history = $localStorage.history;
                if (angular.isArray($scope.history)) {
                    $scope.history.unshift($scope.order);
                    if ($scope.history.length > 5) {
                        $scope.history.pop();
                    };
                    $localStorage.history = $scope.history;
                } else {
                    if ($scope.history === '' || $scope.history === undefined) {
                        $scope.history = [];
                        $scope.history.unshift($scope.order);
                        $localStorage.history = $scope.history;
                    } else {
                        console.log($scope.history);
                    };
                };
                if (!channel) {
                    var channel = pusher.subscribe('order_id' + $scope.orderResult.Id);
                } else {
                    channel = pusher.subscribe('order_id' + $scope.orderResult.Id);
                };
                channel.bind('offer_list_change', function() {
                    $http({
                        method: 'GET',
                        url: 'http://api.bishkektaxi.org/GetDriverOfferList',
                        params: {
                            order_id: $scope.orderResult.Id
                        }
                    }).success(function(data) {
                        $cordovaLocalNotification.add({
                            id: "342",
                            message: "Список доступных машин изменился",
                            title: "Изменение списка доступных машин",
                            sound: 'file://car.mp3'
                        }).then(function () {
                          
                        });
                        $cordovaVibration.vibrate(1000);
                        console.log(data.CarModel);
                        $scope.ordersList = data;
                        $scope.srch = null;
                        offerService.ordersList = data;
                        $ionicLoading.hide();
                        $scope.goToOffer(data[0]);
                    }).error(function(data) {
                        console.log('Ошибка получения списка заказов' + data);
                    });
                });
            });};
        $scope.hide = function() {};
        $scope.cancelOrder = function() {
            offerService.CancelByUser($localStorage.lastOrderId);
            $scope.ordersList = '';
            $scope.disForm = false;
            $scope.srch = '';
        };
    }
]);
taxi.controller('Check', ['$scope', '$localStorage', '$http', '$state', '$rootScope', function($scope, $localStorage, $http, $state, $rootScope) {
    $scope.tempPhone = "+996";
    $scope.codeStatus = '';
    $scope.disabled = '';
    $scope.hide = false;
    $scope.getRandomSpan = function() {
        return Math.floor((Math.random() * 10000) - 1);
    };
    $scope.sendSMS = function(tempPhone) {
        console.log(tempPhone);
        $scope.tempPhone = tempPhone;
        $scope.code = $scope.getRandomSpan();
        $http({
            method: 'GET',
            url: 'https://smsc.ru/sys/send.php',
            params: {
                login: "totsamax",
                psw: "955d427c32d5709e2574efffd5148985",
                phones: tempPhone,
                mes: $scope.code
            }
        }).success(function(data) {
            $scope.disabled = 'disabled';
            $scope.codeStatus = "На ваш номер отправлен код, для продолжения введите код в поле ниже";
        }).error(function(data) {
            $scope.disabled = 'disabled';
            $scope.codeStatus = "На ваш номер отправлен код, для продолжения введите код в поле ниже";
        });
    };
    $scope.chekCode = function(userCode) {
        if (userCode === $scope.code) {
            $scope.phone = $scope.tempPhone;
            $localStorage.phone = $scope.phone;
            $rootScope.hideTabs = false;
            $state.go('home');
        }
    };
}]);