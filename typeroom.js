var fs = require('fs');
var rooms = new Map();

loadTypeRoom = async() =>{
fs.readFile('typeroom.txt',await function (err, filedata) {
    if (err) throw err;

    let typeroom_data = filedata.toString();
    let typeroom_lines = typeroom_data.split('\n');

    typeroom_lines.forEach((line) => {
        let dat = line.split(',');
       rooms.set(dat[0], [dat[1], dat[2]])
        
    })

    
    rooms.forEach((value, key) => {
        console.log('Room: ' + key + ' type: ' + value[0] + ' price: ' + value[1])
    })


});

}

StatusRoom = () => {
    let buffer = '';
    rooms.forEach((value, key) => {
        if(key)
            buffer += key + " " + value + '\n';
    });
    fs.writeFile('typeroom.txt', buffer, function(err) {
        if(err) throw err;
    });
}

ShowRoomDetail = (room_id) => {
    if(rooms.has(room_id)) {
        return rooms.get(room_id);
    } else {
        throw 'Has no room';
        return undefined
    }
}

create_room = (room_id, type, price) => {
    rooms.set(rooms.size+1, [room_id, type, price])
    saveRoom()
    return `[${room_id} ${type} ${price}]`
}


module.exports = {
   loadTypeRoom:loadTypeRoom,
    ShowRoomDetail: ShowRoomDetail,
    create_room: create_room
};