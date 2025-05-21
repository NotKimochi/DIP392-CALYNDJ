document.addEventListener('DOMContentLoaded', function() {
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Compteur de caractères pour le message
        const messageTextarea = document.getElementById('message');
        const messageCounter = document.getElementById('messageCounter');
        const maxLength = 1000;
        const minLength = 10;
        
        if (messageTextarea && messageCounter) {
            messageCounter.textContent = `${maxLength} caractères restants`;
            
            messageTextarea.addEventListener('input', function() {
                const remaining = maxLength - this.value.length;
                messageCounter.textContent = `${remaining} caractères restants`;
                
                if (remaining < 0) {
                    messageCounter.style.color = 'red';
                } else {
                    messageCounter.style.color = 'inherit';
                }
            });
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const consent = document.getElementById('consent').checked;

            // Validation du nom (max 100 caractères)
            if (!name || name.length > 100) {
                alert('Le nom doit être renseigné et ne pas dépasser 100 caractères.');
                return;
            }
            
            // Validation de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Validation du message (min 10, max 1000 caractères)
            if (!message || message.length < minLength || message.length > maxLength) {
                alert(`Le message doit contenir entre ${minLength} et ${maxLength} caractères.`);
                return;
            }
            
            if (!consent) {
                alert('Veuillez accepter les conditions.');
                return;
            }

            // Envoi AJAX vers le script PHP
            fetch('send_email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    name: name,
                    email: email,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Message envoyé avec succès à franck.mapelli@outlook.com !');
                    contactForm.reset();
                    
                    // Réinitialiser le compteur
                    if (messageCounter) {
                        messageCounter.textContent = `${maxLength} caractères restants`;
                        messageCounter.style.color = 'inherit';
                    }
                } else {
                    alert('Erreur: ' + (data.error || "Échec de l'envoi."));
                }
            })
            .catch(error => {
                alert("Erreur réseau : " + error.message);
            });
        });
    }

    // Gestion des accordéons de projets
    const initProjectAccordions = () => {
        const projectItems = document.querySelectorAll('.project-item');
        
        if (projectItems.length === 0) return;
        
        projectItems.forEach(item => {
            const title = item.querySelector('.project-title');
            
            title.addEventListener('click', () => {
                item.classList.toggle('active');
                
                const arrow = title.querySelector('.arrow');
                if (arrow) {
                    arrow.style.transform = item.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
                }
            });
        });
    };

    // Navigation fluide
    const setupSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        location.hash = targetId;
                    }
                }
            });
        });
    };

    // Initialisation
    initProjectAccordions();
    animateServicesOnScroll();
    setupSmoothScrolling();
});
