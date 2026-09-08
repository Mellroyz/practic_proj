        document.addEventListener('DOMContentLoaded', function() {
            const closeBtn = document.getElementById('notificationClose');
            const notification = document.getElementById('notification');
            
            if (closeBtn && notification) {
                closeBtn.addEventListener('click', function() {
                    notification.style.display = 'none';
                });
            }
        });