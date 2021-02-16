const PUBLIC_VAPIDKEY = "BAns8NPr33I84ZezmmTM9WO7R-XfDRwndsuRcqq4kZJfgAcqvJaEWzdz5q4dnXEAM0Ov2ggvXTJ0eM5_IDmnlxs";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Check for service worker
if ("serviceWorker" in navigator) {


  Notification.requestPermission()
    .then(result => {
      if (result === 'granted') {
        register().catch(err => console.error(err));
      } else {
      }
    });
}

// Register SW, Register Push, Send Push
async function register() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });

  console.log("Service Worker Registered...");

  // Register Push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPIDKEY),
  });

  console.log("Push Registered...");

  // Send Push Notification every 6 seconds
  setInterval(async () => {
    console.log("Sending Push...");

    const apiUrl = "http://localhost:3000"
    await fetch(`${apiUrl}/subscribe`, {
      method: "POST",
      body: JSON.stringify({ subscription }),
      headers: {
        "content-type": "application/json"
      }
    });

    console.log("Push Sent...");
  }, 6000)

}

