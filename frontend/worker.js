self.addEventListener('push', event => {
  const data = event.data.json();

  console.log('nova notificação', data);

  self.registration.showNotification(data.title, {
    body: data.message,
    icon: data.urlImage,
    data,
    badge: data.urlImage,
    tag: 'tag 123',
    vibrate: [300, 100, 400],
    actions: [
      {
        action: 'confirmar',
        title: 'Confirmar',
        icon: 'http://localhost:5500/assets/check.png',
      },
      {
        action: 'cancelar',
        title: 'Cancelar',
        icon: 'http://localhost:5500/assets/close.png',
      },
    ]
  });

});

self.addEventListener('notificationclick', function (event) {
  console.log(`você clicou em ${event.action}`);
  console.log(`notificação`, event.notification);
  
  event.notification.close();

  event.waitUntil(
    ()=>{
    }
  );
})