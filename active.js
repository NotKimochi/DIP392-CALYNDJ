document.addEventListener('DOMContentLoaded', function() {
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Compteur de caractères pour le message
        const messageTextarea = document.getElementById('message');
        const messageCounter = document.getElementById('messageCounter');
        const maxLength = 1000;
        
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
            
            // Validation des champs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const consent = document.getElementById('consent').checked;
            
            if (!name || !email || !message || !consent) {
                alert('Veuillez remplir tous les champs obligatoires et accepter les conditions.');
                return;
            }
            
            // Vérification de la longueur du message
            if (message.length > maxLength) {
                alert(`Le message ne doit pas dépasser ${maxLength} caractères.`);
                return;
            }
            
            // Ici, vous pourriez ajouter une requête AJAX pour envoyer les données
            console.log('Formulaire soumis:', { name, email, message });
            
            // Feedback utilisateur
            alert('Merci pour votre message ! Nous vous contacterons sous peu.');
            contactForm.reset();
            
            // Réinitialiser le compteur après envoi
            if (messageCounter) {
                messageCounter.textContent = `${maxLength} caractères restants`;
                messageCounter.style.color = 'inherit';
            }
        });
    }

    // Gestion des accordéons de projets (version modifiée pour multi-ouverture)
    const initProjectAccordions = () => {
        const projectItems = document.querySelectorAll('.project-item');
        
        if (projectItems.length === 0) return;
        
        // Gestion du clic sur les titres
        projectItems.forEach(item => {
            const title = item.querySelector('.project-title');
            
            title.addEventListener('click', () => {
                // Basculer l'état actif de cet élément seulement
                item.classList.toggle('active');
                
                // Mettre à jour la flèche
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
                    
                    // Mise à jour de l'URL sans rechargement
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        location.hash = targetId;
                    }
                }
            });
        });
    };

    // Initialisation des fonctions
    initProjectAccordions();
    animateServicesOnScroll();
    setupSmoothScrolling();
});
