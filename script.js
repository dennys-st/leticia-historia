// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW Reg Failed', err));
  });
}

const flashcardsData = [
    { question: "O que provocou a insatisfação dos fazendeiros com o Império?", shortQ: "Insatisfação dos fazendeiros", answer: "A Abolição da Escravidão. Perderam a mão de obra gratuita e retiraram o apoio à monarquia.", shortA: "Abolição da Escravidão" },
    { question: "O que o Movimento Republicano exigia?", shortQ: "Exigência Republicana", answer: "O fim da monarquia e a instauração do federalismo (mais autonomia para os estados).", shortA: "Fim da monarquia e federalismo" },
    { question: "O que foi a Questão Militar?", shortQ: "Questão Militar", answer: "Insatisfação do Exército, que após a Guerra do Paraguai, queria mais poder e participação política.", shortA: "Exército queria mais poder" },
    { question: "Como ocorreu a Proclamação da República?", shortQ: "Proclamação (1889)", answer: "Golpe militar de 15 de nov. de 1889 liderado por Deodoro da Fonseca, sem participação popular.", shortA: "Golpe militar sem povo" },
    { question: "O que foi a República da Espada?", shortQ: "República da Espada", answer: "Primeira fase (1889-1894), com governos militares autoritários (Deodoro e Floriano Peixoto).", shortA: "Governos militares autoritários" },
    { question: "O que foi o Encilhamento?", shortQ: "Encilhamento", answer: "Reforma econômica desastrosa de Rui Barbosa gerando muita emissão de dinheiro e hiperinflação.", shortA: "Hiperinflação e crise" },
    { question: "Problemas do voto na Const. de 1891?", shortQ: "Voto na Const. de 1891", answer: "Voto aberto e restrito a homens alfabetizados. Mulheres eram excluídas.", shortA: "Aberto e só alfabetizados" },
    { question: "Características da República Oligárquica?", shortQ: "República Oligárquica", answer: "Poder nas mãos de civis ricos, principalmente as oligarquias dos grandes fazendeiros de café.", shortA: "Poder dos fazendeiros ricos" },
    { question: "O que é Voto de Cabresto?", shortQ: "Voto de Cabresto", answer: "Controle dos votos da população pelos coronéis via ameaças ou troca de favores.", shortA: "Voto controlado por coronéis" },
    { question: "O que foi a Política dos Governadores?", shortQ: "Política dos Governadores", answer: "Acordo de troca de favores e apoio mútuo entre o Presidente e os Governadores.", shortA: "Aliança Presidente e Govs." }
];

// GLOBALS
let currentGameMode = null; // 'flashcards' | 'match'

// Navigation Logic
const navItems = document.querySelectorAll('.nav-item');
const tabContents = document.querySelectorAll('.tab-content');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(n => n.classList.remove('active'));
        tabContents.forEach(c => {
            c.classList.remove('active');
            c.style.display = 'none';
        });
        
        item.classList.add('active');
        const targetId = item.getAttribute('data-target');
        const target = document.getElementById(targetId);
        target.style.display = 'block';
        target.classList.add('active');

        // Init specific game modes
        if (targetId === 'flashcards-game') {
            currentGameMode = 'flashcards';
            initFlashcards();
        } else if (targetId === 'match-game') {
            currentGameMode = 'match';
            initMatchGame();
        }
    });
});


// ----- FLASHCARDS LOGIC -----
let flashIndex = 0;
let flashCorrect = 0;
let flashWrong = 0;

const card = document.getElementById('card');
const qEl = document.getElementById('card-question');
const aEl = document.getElementById('card-answer');
const counterEl = document.getElementById('card-counter');
const progressEl = document.getElementById('progress');
const btnWrong = document.getElementById('btn-wrong');
const btnCorrect = document.getElementById('btn-correct');

function initFlashcards() {
    flashIndex = 0;
    flashCorrect = 0;
    flashWrong = 0;
    updateCardUI();
}

function updateCardUI() {
    card.classList.remove('flipped');
    setTimeout(() => {
        if(flashIndex < flashcardsData.length) {
            const data = flashcardsData[flashIndex];
            qEl.textContent = data.question;
            aEl.textContent = data.answer;
            counterEl.textContent = `${flashIndex + 1}/${flashcardsData.length}`;
            progressEl.style.width = `${(flashIndex / flashcardsData.length) * 100}%`;
        } else {
            showResults(flashCorrect, flashcardsData.length, true);
        }
    }, 200);
}

card.addEventListener('click', (e) => {
    if(!e.target.closest('.eval-btn')) {
        card.classList.toggle('flipped');
        if('vibrate' in navigator) navigator.vibrate(20);
    }
});

btnWrong.addEventListener('click', (e) => { e.stopPropagation(); flashWrong++; nextCard(false); });
btnCorrect.addEventListener('click', (e) => { e.stopPropagation(); flashCorrect++; nextCard(true); });

function nextCard(isCorrect) {
    if('vibrate' in navigator) navigator.vibrate(isCorrect ? [30, 30] : 80);
    flashIndex++;
    updateCardUI();
}

// Swipe for Flashcards
let touchStartX = 0; let touchEndX = 0;
card.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
card.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if(!card.classList.contains('flipped')) return;
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) btnWrong.click();
    if (touchEndX > touchStartX + threshold) btnCorrect.click();
});


// ----- MATCH GAME LOGIC (Ligar os Pontos) -----
let matchRounds = [];
let currentMatchRound = 0;
let selectedQ = null;
let selectedA = null;
let matchesInRound = 0;

function initMatchGame() {
    let shuffled = [...flashcardsData].sort(() => Math.random() - 0.5);
    matchRounds = [];
    // Group in chunks of 3
    for(let i=0; i<shuffled.length; i+=3) {
        let chunk = shuffled.slice(i, i+3);
        if(chunk.length === 3) {
            matchRounds.push(chunk);
        } else if (matchRounds.length > 0) {
            matchRounds[matchRounds.length-1].push(...chunk);
        }
    }
    
    currentMatchRound = 0;
    loadMatchRound();
}

function loadMatchRound() {
    matchesInRound = 0;
    selectedQ = null;
    selectedA = null;
    document.getElementById('btn-next-match').style.display = 'none';
    
    let maxRounds = matchRounds.length;
    document.getElementById('match-progress').style.width = `${(currentMatchRound / maxRounds) * 100}%`;
    
    let roundData = matchRounds[currentMatchRound];
    let colQ = document.getElementById('match-col-q');
    let colA = document.getElementById('match-col-a');
    colQ.innerHTML = '';
    colA.innerHTML = '';
    
    let qArray = [...roundData].sort(() => Math.random() - 0.5);
    let aArray = [...roundData].sort(() => Math.random() - 0.5);
    
    qArray.forEach((item) => {
        let div = document.createElement('div');
        div.className = 'match-item q-item';
        div.textContent = item.shortQ;
        div.dataset.id = item.shortQ;
        div.onclick = () => selectMatchItem(div, 'q');
        colQ.appendChild(div);
    });
    
    aArray.forEach((item) => {
        let div = document.createElement('div');
        div.className = 'match-item a-item';
        div.textContent = item.shortA;
        div.dataset.id = item.shortQ; // Same ID for matching
        div.onclick = () => selectMatchItem(div, 'a');
        colA.appendChild(div);
    });
}

function selectMatchItem(element, type) {
    if(element.classList.contains('matched')) return;
    if('vibrate' in navigator) navigator.vibrate(10);
    
    if(type === 'q') {
        if(selectedQ) selectedQ.classList.remove('selected');
        // toggle if clicking same
        if(selectedQ === element) { selectedQ = null; return; }
        selectedQ = element;
        selectedQ.classList.add('selected');
    } else {
        if(selectedA) selectedA.classList.remove('selected');
        // toggle if clicking same
        if(selectedA === element) { selectedA = null; return; }
        selectedA = element;
        selectedA.classList.add('selected');
    }
    checkMatch();
}

function checkMatch() {
    if(selectedQ && selectedA) {
        if(selectedQ.dataset.id === selectedA.dataset.id) {
            // Match!
            if('vibrate' in navigator) navigator.vibrate([30, 30]);
            selectedQ.classList.remove('selected');
            selectedA.classList.remove('selected');
            selectedQ.classList.add('matched');
            selectedA.classList.add('matched');
            
            matchesInRound++;
            selectedQ = null;
            selectedA = null;
            
            if(matchesInRound === matchRounds[currentMatchRound].length) {
                if(currentMatchRound < matchRounds.length - 1) {
                    document.getElementById('btn-next-match').style.display = 'block';
                } else {
                    setTimeout(() => showResults(10, 10, false), 600);
                }
            }
        } else {
            // Wrong!
            if('vibrate' in navigator) navigator.vibrate(80);
            selectedQ.classList.add('error');
            selectedA.classList.add('error');
            let q = selectedQ, a = selectedA;
            setTimeout(() => {
                q.classList.remove('error', 'selected');
                a.classList.remove('error', 'selected');
            }, 400);
            selectedQ = null;
            selectedA = null;
        }
    }
}

document.getElementById('btn-next-match').onclick = () => {
    currentMatchRound++;
    loadMatchRound();
};

// ----- RESULTS SCREEN -----
function showResults(correct, total, showErrors) {
    document.getElementById('flashcards-game').style.display = 'none';
    document.getElementById('match-game').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
    document.getElementById('score-text').textContent = `${correct}/${total}`;
    
    const percentage = (correct / total) * 100;
    const circle = document.querySelector('.score-circle');
    circle.style.background = `conic-gradient(var(--success) ${percentage}%, var(--surface) ${percentage}%)`;
    
    const msg = document.getElementById('score-message');
    if(percentage === 100) msg.textContent = "Perfeito! Você dominou o conteúdo! 🏆";
    else if(percentage >= 70) msg.textContent = "Muito bem! Quase lá! 🌟";
    else msg.textContent = "Continue treinando! Você consegue! 💪";

    if(showErrors) {
        document.getElementById('stats-row').style.display = 'flex';
        document.getElementById('stat-correct').textContent = correct;
        document.getElementById('stat-wrong').textContent = total - correct;
    } else {
        document.getElementById('stats-row').style.display = 'none';
    }

    if(percentage >= 50) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#3b82f6', '#10b981', '#f59e0b'] });
    }
}

document.getElementById('btn-restart').addEventListener('click', () => {
    document.getElementById('results').style.display = 'none';
    if(currentGameMode === 'flashcards') {
        document.getElementById('flashcards-game').style.display = 'block';
        initFlashcards();
    } else {
        document.getElementById('match-game').style.display = 'block';
        initMatchGame();
    }
});

document.getElementById('btn-back-study').addEventListener('click', () => {
    document.getElementById('results').style.display = 'none';
    navItems[0].click(); // Go back to Resumo
});
