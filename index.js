var VK = require("VK-Promise"), a = false,  b = false,
vk = new VK("ТОКЕН");
var sts = Array(1, 2, 3); //Айди стикеров
var name = ('олег'); //Имя
var id = ('@jsonic'); //Пуш
var vkl = ('твкл'); //Включить скрипт
var vykl = ('твыкл'); //Выключить скрипт
var time = 10000 //Задержка в милисекундах, 1 секунда = 1000 милисекунд
vk.longpoll.start();
vk.on('message', function onMessage(event, msg) {
    if((msg.body.toLowerCase().includes(name) || msg.body.toLowerCase().includes(id)) && !b && !a) {
      var st = sts[Math.floor(Math.random()*sts.length)];
        vk.messages.send({
          peer_id: msg.peer_id,
          sticker_id: st
          });
          a = true; 
setTimeout(() => {a = false;}, time); 
}
 if(!msg.out) return
   if(msg.body.toLowerCase() == vkl) {
    b = false;
    vk.messages.delete({
      delete_for_all: 1,
      message_ids: msg.id.toString()
    })
      msg.send('Триггеры включены!');
}
   if(msg.body.toLowerCase() == vykl) {
    b = true;
    vk.messages.delete({
      delete_for_all: 1,
      message_ids: msg.id.toString()
    })
      msg.send('Триггеры выключены!');
}
    })
    
