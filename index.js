var VK = require("VK-Promise"), a = false,  b = false,
vk = new VK("ТОКЕН");
var name = ('олег'); //Имя
var id = ('@jsonic'); //Айди
var time = 40000; //Задержка в милисекундах, 1 секунда = 1000 милисекунд
var add = ('!стикер');
var del = ('!убрать');
var sts = [1, 2, 3];
var chats = []
vk.longpoll.start();
 vk.on('message', function onMessage(event, msg) {
    if((msg.body.toLowerCase().includes(name) || msg.body.toLowerCase().includes(id)) && chats.includes(msg.chat_id) && !b && !a) {
        var st = sts[Math.floor(Math.random()*sts.length)];
         vk.messages.send({
            peer_id: msg.peer_id,
            sticker_id: st
            });
            a = true; 
            setTimeout(() => {a = false;}, time); 
           }
 if(!msg.out) return
      if(msg.body.toLowerCase() == 'твкл') {
        b = false;
         vk.messages.edit({
            peer_id: msg.peer_id,
            message: 'Триггеры включены!',
            message_id: msg.id.toString()
            })
           }
      if(msg.body.toLowerCase() == 'твыкл') {
        b = true;
         vk.messages.edit({
            peer_id: msg.peer_id,
            message: 'Триггеры выключены!',
            message_id: msg.id.toString()
            })
           }
      if((msg.body.toLowerCase() == '!вайт') && (chats.indexOf(msg.chat_id) == -1)) {
        chats.push(msg.chat_id);
         vk.messages.edit({
            peer_id: msg.peer_id,
            message: 'Чат добавлен в вайт лист',
            message_id: msg.id.toString()
            })
           }
      if((msg.body.toLowerCase() == '!двайт') && (chats.indexOf(msg.chat_id) != -1)) {
        delete chats[chats.indexOf(msg.chat_id)];
         vk.messages.edit({
            peer_id: msg.peer_id,
            message: 'Чат убран из вайт листа',
            message_id: msg.id.toString()
            })
           }
      if(msg.body.toLowerCase().startsWith(add)) {
        let num = msg.body.toLowerCase().replace(add, '').trim();
         if (sts.indexOf(num) == -1) {
         sts.push(num);
          vk.messages.edit({
             peer_id: msg.peer_id,
             message: 'Стикер добавлен',
             message_id: msg.id.toString()
             })
            }
           }
      if(msg.body.toLowerCase().startsWith(del)) {
        let num = msg.body.toLowerCase().replace(del, '').trim();
         if (sts.indexOf(num) != -1) {
         delete sts[sts.indexOf(num)];
          vk.messages.edit({
             peer_id: msg.peer_id,
             message: 'Стикер удален',
             message_id: msg.id.toString()
             })
            }
           }
    })
