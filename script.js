// Animações de Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Partículas no Hero
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = Math.random() * 3 + 2 + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Kart Runner Animation
function animateKart() {
    const kart = document.getElementById('kart-runner');
    const kartIcon = kart.querySelector('.kart-icon');
    let position = -120; // px inicial (fora da tela)
    let speed = 2; // px por frame (ajusta velocidade)
    let direction = 1; // 1 = indo para direita, -1 = indo para esquerda
    let lastTime = null;

    function step(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const delta = timestamp - lastTime;
        // mover proporcional ao delta, para velocidade consistente
        position += direction * speed * (delta / 16.67); // 60fps base
        // limites: quando sai à direita, volta para esquerda; e vice-versa
        if (position > (window.innerWidth + 50)) {
            direction = -1;
            // virar o ícone para a esquerda
            if (kartIcon) kartIcon.style.transform = 'scaleX(1)';
        } else if (position < -150) {
            direction = 1;
            // virar o ícone para a direita
            if (kartIcon) kartIcon.style.transform = 'scaleX(-1)';
        }
        // aplicar posição (em px)
        kart.style.left = position + 'px';

        lastTime = timestamp;
        requestAnimationFrame(step);
    }

    // definir orientação inicial do ícone
    if (kartIcon) kartIcon.style.transform = 'scaleX(-1)';
    requestAnimationFrame(step);
}

animateKart();

// Contador de Vagas
function updateVacancy() {
    const vacancyElement = document.getElementById('vacancy');
    let count = 10;
    setInterval(() => {
        count = Math.max(0, count - Math.floor(Math.random() * 2));
        vacancyElement.textContent = count;
        if (count === 0) {
            vacancyElement.parentElement.textContent = 'Esgotado!';
        }
    }, 30000); // Atualiza a cada 30 segundos
}

updateVacancy();

// Botões CTA com Efeitos e Redirecionamento WhatsApp
document.querySelectorAll('.cta-button, .card-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        // Criar efeito de partículas ao clicar
        for (let i = 0; i < 10; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            spark.style.left = e.clientX + 'px';
            spark.style.top = e.clientY + 'px';
            document.body.appendChild(spark);
            setTimeout(() => spark.remove(), 1000);
        }

        // Pega o nome do pacote se existir no botão
        const pacote = this.dataset.pacote ? `Olá! Quero reservar o ${this.dataset.pacote} 🚗🏁` : 'Olá! Quero fazer uma reserva! 🏎️';
        
        // Redireciona para o WhatsApp com mensagem automática
        const url = `https://wa.me/5561999018673?text=${encodeURIComponent(pacote)}`;
        window.open(url, '_blank');
    });
});

// Floating Card Animation
const floatingCard = document.getElementById('floating-card');
let floatingDirection = 1;

setInterval(() => {
    const currentTop = parseFloat(getComputedStyle(floatingCard).top);
    const newTop = currentTop + floatingDirection * 0.5;
    if (newTop > 30 || newTop < 10) {
        floatingDirection *= -1;
    }
    floatingCard.style.top = newTop + 'px';
}, 100);

// Smooth Scroll para Links de Navegação
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Efeito de adicionar classe 'scrolled' no header quando rolar
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// === BANDEIRAS ANIMADAS NA SEÇÃO PACOTES ===
const flagsContainer = document.querySelector('.flags-container');
if (flagsContainer) {
    const leftFlag = flagsContainer.querySelector('.flag-left');
    const rightFlag = flagsContainer.querySelector('.flag-right');

    window.addEventListener('scroll', () => {
        const rect = flagsContainer.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

        if (inView) {
            flagsContainer.classList.add('active');

            // Porcentagem do scroll dentro da seção
            const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            const move = Math.min(25, Math.max(-25, (scrollPercent - 0.5) * 50));

            // Movimentos suaves e cruzamento gradual
            if (leftFlag && rightFlag) {
                leftFlag.style.transform = `translateX(${move}px) rotate(${move * -0.5}deg)`;
                rightFlag.style.transform = `translateX(${-move}px) rotate(${move * 0.5}deg) scaleX(-1)`;
            }
        } else {
            flagsContainer.classList.remove('active');
        }
    });
}

// Número do WhatsApp 
const numeroWhatsApp = "5561999018673";

// Seleciona todos os botões de reserva
const botoesReserva = document.querySelectorAll(".btn-reservar");

botoesReserva.forEach(botao => {
  botao.addEventListener("click", () => {
    // Se o botão tiver o nome do pacote no atributo data-pacote
    const pacote = botao.getAttribute("data-pacote") || "reserva geral";
    
    // Mensagem automática
    const mensagem = `Olá! Gostaria de fazer uma reserva para o ${pacote}.`;
    
    // Cria o link do WhatsApp
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    // Abre no navegador
    window.open(linkWhatsApp, "_blank");
  });
});

// CSS para Animações Adicionais
const style = document.createElement('style');
style.textContent = `
    .animate {
        animation: fadeInUp 1s ease-out;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: #ff0000;
        border-radius: 50%;
        animation: float 3s infinite ease-in-out;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }

    .spark {
        position: absolute;
        width: 4px;
        height: 4px;
        background: #ffff00;
        border-radius: 50%;
        animation: explode 1s ease-out;
        pointer-events: none;
    }

    @keyframes explode {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(10); opacity: 0; }
    }
`;
document.head.appendChild(style);
