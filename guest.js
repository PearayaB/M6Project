var fs = require('fs');
var guest = new Map();

loadGust = async() =>{
fs.readFile('guest.txt',await function (err, filedata) {
    if (err) throw err;

    let guest_data = filedata.toString();
    let guest_lines = guest_data.split('\n');

    guest_lines.forEach((line) => {
        let dat = line.split(',');
        guest.set(dat[0], [dat[1], dat[2], dat[3]])
        
    })

    
    guest.forEach((value, key) => {
        console.log('guest: ' + key + ' First name: ' + value[0] + ' Last name: ' + value[1] + ' Phone: ' + value[2])
    })


});

}

ShowGuest = () => {
    let buffer = '';
    guest.forEach((value, key) => {
        if(key)
            buffer += key + " " + value + '\n';
    });
    fs.writeFile('guest.txt', buffer, function(err) {
        if(err) throw err;
    });
}

GustDetail = (guest_id) => {
    if(guest.has(guest_id)) {
        return guest.get(guest_id);
    } else {
        throw '-';
        return undefined
    }
}

create_guest = (guest_id, first_name, last_name, phone) => {
    guest.set(guest.size+1, [guest_id, first_name, last_name, phone])
    ShowGuest()
    return `[${guest_id} ${first_name} ${last_name} ${phone}]`
}


module.exports = {
    loadGust:loadGust,
    GustDetail: GustDetail,
    create_guest: create_guest
};