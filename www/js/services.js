taxi.service('offerService', function ($resource) {
    this.orderId = undefined;
    this.currentOffer = undefined;
    this.Logg = function () {
        console.log("Работает");
    };
    this.MakeOrder = function (from, to, phone) {
        var makeOrderAPI = $resource("http://api.bishkektaxi.org/SetTaxiOrderState"
            //        ,{
            //            get: {
            //                method: "JSON"
            //            }
            //        }
        );

        return makeOrderResult = makeOrderAPI.get({
            method: "create",
            from: from,
            where: to,
            time: "",
            feed_asap: true,
            user_phonenumber: phone
        });
    };
    this.GetDriverOfferList = function (orderId) {
        var getListAPI = $resource("http://api.bishkektaxi.org/GetDriverOfferList");
        return getListResult = getListAPI.get({
            order_id: orderId
        });

    };
    this.CancelByUser = function (orderId) {
        var cancelAPI = $resource("http://api.bishkektaxi.org/SetTaxiOrderState");

        return cancelResult = cancelAPI.get({
            method: "cancel_by_user",
            order_id: orderId
        });
    };
    this.AssignToDriver = function (orderId, driverId) {
        var assignAPI = $resource("http://api.bishkektaxi.org/SetTaxiOrderState");

        return assignResult = assignAPI.get({
            method: "assign_to_driver",
            order_id: orderId,
            driver_id: driverId
        });
    };
    this.GetTaxiOrderState = function (orderId) {
        var getStateAPI = $resource("http://api.bishkektaxi.org/GetTaxiOrderState?");
        return getStateResult = getStateAPI.get({
            order_id: orderId
        });
    };
    this.GetDriverProfileEx = function (driverId) {
        var getStateAPI = $resource("http://api.bishkektaxi.org/GetDriverProfileEx");
        return getStateResult = getStateAPI.get({
            driver_id: driverId
        });
    };

});