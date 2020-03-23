let VK = require("VK-Promise"),
    vk = new VK(""); //Токен

var name = ('олег'),  //Имя
    id = ('@jsonic'); //Айди

var time = 10; //Задержка в секундах

let add = ('!стикер'),
    del = ('!убрать'),
    kd = ('!кд');

var sts = [], chats = [],
    a = false;

vk.longpoll.start();

vk.on('message', function onMessage(event, msg) {

  if((msg.body.toLowerCase().includes(name) || msg.body.toLowerCase().includes(id)) && !chats.includes(msg.chat_id) && !a) {
      var st = sts[Math.floor(Math.random()*sts.length)];

      vk.messages.send({ peer_id: msg.peer_id, sticker_id: st });

      a = true;
      setTimeout(() => { a = false; }, time * 1000);
  }

  if(!msg.out) return
    if((msg.body.toLowerCase() == '!игнор') && (!chats.includes(msg.chat_id))) {
      chats.push(msg.chat_id);

      vk.messages.edit({ peer_id: msg.peer_id, message: 'Чат добавлен в игнор лист!', message_id: msg.id.toString() });
  } else if((msg.body.toLowerCase() == '!вайт') && (chats.includes(msg.chat_id))) {
      delete chats[chats.indexOf(msg.chat_id)];

      vk.messages.edit({ peer_id: msg.peer_id, message: 'Чат убран из игнор листа!', message_id: msg.id.toString() });
  } else if(msg.body.toLowerCase().startsWith(add)) {
      let num = parseInt(msg.body.toLowerCase().replace(add, '').trim());

      if (!sts.includes(num) && num.match(/[0-9]+/)) {
          sts.push(num);

          vk.messages.edit({ peer_id: msg.peer_id, message: 'Стикер добавлен!', message_id: msg.id.toString() });
      }
  } else if(msg.body.toLowerCase().startsWith(del)) {
      let num = msg.body.toLowerCase().replace(del, '').trim();

      if (!sts.includes(num)) {
          delete sts[sts.indexOf(num)];

          vk.messages.edit({ peer_id: msg.peer_id, message: 'Стикер удален!', message_id: msg.id.toString() });
      }
  } else if(msg.body.toLowerCase().startsWith(kd)) {
      time = parseInt(msg.body.toLowerCase().replace(kd, '').trim());

      vk.messages.edit({ peer_id: msg.peer_id, message: ('Кд изменено на ' + time + ' секунд'), message_id: msg.id.toString() });
  }
})
