var VK = require("VK-Promise"), a = false,  b = false,
vk = new VK("ТОКЕН");
var sts = Array(1, 2, 3); // Айди стикеров
var name = ('олег'); //Имя
var id = ('@jsonic'); //Пуш
var vkl = ('твкл'); //Включить скрипт
var vykl = ('твыкл') //Выключить скрипт
vk.longpoll.start();
vk.on('message', function onMessage(event, msg) {
    if(msg.body.toLowerCase() == vkl) {
      a = false;
    }
    if(msg.body.toLowerCase() == vykl) {
      a = true;
    }
    if((msg.body.toLowerCase().includes(name) || msg.body.toLowerCase().includes(id)) && !a) {
      var st = sts[Math.floor(Math.random()*sts.length)];
        vk.messages.send({
          peer_id: msg.peer_id,
          sticker_id: st
         });
          a = true; 
setTimeout(() => {a = false;}, 30000); //Задержка в милисекундах
}
    })

