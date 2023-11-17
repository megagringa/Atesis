document.addEventListener("DOMContentLoaded", function() {
    const notificationList = document.getElementById("notification-list");

    // Función para mostrar una notificación en la lista y eliminarla después de 5 segundos
    function showNotification(message, type) {
        const li = document.createElement("li");
        li.textContent = message;
        li.className = type; // Asigna la clase CSS correspondiente
        notificationList.appendChild(li);

        // Eliminar la notificación después de 5 segundos
        setTimeout(() => {
            notificationList.removeChild(li);
        }, 5000);
    }

    // Función para generar notificaciones basadas en la tecla presionada
    function generateNotificationByKey(keyCode) {
        switch (keyCode) {
            case 37: // Izquierda
                showNotification("¡Pedido cancelado por el cliente!", "order-canceled");
                break;
            case 38: // Arriba
                showNotification("¡Llamado de cliente para el mesero!", "call-waiter");
                break;
            case 39: // Derecha
                showNotification("¡Pedido de bebida artesanal solicitado!", "order-request");
                break;
            case 40: // Abajo
                showNotification("¡Solicitud de la cuenta realizada!", "bill-request");
                break;
            default:
                break;
        }
    }

    // Manejador de eventos para detectar las teclas presionadas
    document.addEventListener("keydown", function(event) {
        generateNotificationByKey(event.keyCode);
    });
});
