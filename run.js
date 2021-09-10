var http = require('http');
var url = require('url');

const {loadTypeRoom,ShowRoomDetail, create_room} = require('./typeroom');
const {loadGust,GustDetail, create_guest} = require('./guest');
const {loadBooking,create_booking,booking_status} = require('./booking');

loadBooking();
loadGust();
loadTypeRoom();

http.createServer(function (req, res) {

    var request_path = url.parse(req.url, true);
    var message = '';
    var data;
    var status = 200;


    switch(request_path.pathname) {
        case '/ShowRoomDetail':
            try {
                data = ShowRoomDetail(request_path.query.room_id);
            } catch(err) {
                message += err;
                console.log(err);
            }
            break;

        case '/GustDetail':
            try {
                data = GustDetail(request_path.query.guest_id);
            } catch(err) {
                message += err;
                console.log(err);
            }
            break;

        case '/create_room':
            try {
                data = create_room(request_path.query.room_id, request_path.query.type, request_path.query.price);
                message += 'Created!!'
            } catch(err) {
                message += err;
                console.log(err);
            }
            break;

        case '/create_guest':
            try {
                data = create_guest(request_path.query.guest_id, request_path.query.first_name, request_path.query.last_name, request_path.query.phone);
                message += 'Created!!'
            } catch(err) {
                message += err;
                console.log(err);
            }
            break;

        case '/create_booking':
            try {
                data = create_booking(request_path.query.room_id, request_path.query.guest_id, request_path.query.checkin_date, request_path.query.checkout_date);
                message += 'Created!!'
            } catch(err) {
                message += err;
                console.log(err);
            }
            break;

        case '/booking_status':
            try {
                data = booking_status(request_path.query.status);
            } catch(err) {
                message += err;
                console.log(err);
            }
            break;
    }

    let response_object = {
        statusCode: status,
        message: message,
        data: data
    };

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(response_object));

}).listen(8080);
console.log('Hotel application is running on port 8080.');