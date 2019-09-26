var VK = require("VK-Promise"), a = false,
vk = new VK("ТОКЕН");
var sts = Array(АЙДИ СТИКЕРОВ);
var name = ('олег'); //Имя
var id = ('@jsonic') //Айди
vk.longpoll.start();
vk.on('message', function onMessage(event, msg) {
if((msg.body.toLowerCase().includes(name) || msg.body.toLowerCase().includes(id)) && !a) {
    var st = sts[Math.floor(Math.random()*sts.length)];
    vk.messages.send({
        peer_id: msg.peer_id,
        sticker_id: st
        });
a = true; 
setTimeout(() => {a = false;}, 300000);
}
    });
