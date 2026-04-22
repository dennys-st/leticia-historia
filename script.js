// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW Reg Failed', err));
  });
}

// ------------------------------------
// DATABASE: FASE 1 (Base Lore)
// ------------------------------------
const level1Data = [
    { question: "O que fez os fazendeiros pularem fora do barco do Império?", shortQ: "Fazendeiros revoltados", answer: "A Abolição da Escravidão. Perderam a mão de obra de graça e abandonaram o Imperador.", fakeAnswer: "A Guerra do Paraguai, que deixou o Brasil falido e os fazendeiros sem grana nenhuma.", shortA: "Abolição da Escravidão" },
    { question: "O que a onda Republicana mais queria?", shortQ: "Objetivo da onda Republicana", answer: "Fim da monarquia e federalismo (mais liberdade para os estados cuidarem do seu pedaço).", fakeAnswer: "A volta da monarquia absoluta e o cancelamento de qualquer eleição no país.", shortA: "Fim da monarquia e federalismo" },
    { question: "Qual foi a treta da Questão Militar?", shortQ: "A treta da Questão Militar", answer: "O Exército voltou grandão da Guerra do Paraguai e queria cadeira cativa na política.", fakeAnswer: "O exército não queria lutar mais e exigiu o fim das Forças Armadas.", shortA: "Exército querendo mandar" },
    { question: "Como o Império foi pro buraco em 1889?", shortQ: "Fim do Império (1889)", answer: "Foi um golpe militar em 15/11/1889 pelo Marechal Deodoro. O povão nem participou, só olhou.", fakeAnswer: "O povo foi pras ruas com cartazes e derrubou o Rei na base do grito (Revolução Popular).", shortA: "Golpe militar sem a galera" },
    { question: "O que foi a chamada República da Espada?", shortQ: "República da Espada", answer: "Primeira fase (1889-1894), com os generais (Deodoro e Floriano) governando na marra e no autoritarismo.", fakeAnswer: "Uma fase pacífica onde o Brasil focou apenas em exportar espadas para a Europa.", shortA: "Fase dos generais mandando" },
    { question: "O que rolou no desastre do Encilhamento?", shortQ: "Desastre do Encilhamento", answer: "Rui Barbosa liberou geral o dinheiro no banco, gerando hiperinflação e uma crise absurda.", fakeAnswer: "Rui Barbosa proibiu o uso de dinheiro de papel e forçou todo mundo a usar apenas ouro.", shortA: "Hiperinflação e crise braba" },
    { question: "Qual a maior vergonha da Constituição de 1891?", shortQ: "Vergonha na Const. de 1891", answer: "Voto aberto (zero sigilo) e só pra homem alfabetizado. Mulheres e pobres ficaram de fora.", fakeAnswer: "O voto virou secreto e liberado para absolutamente todo mundo, incluindo mulheres e jovens.", shortA: "Voto aberto, só homens letrados" },
    { question: "Quem dominava tudo na República Oligárquica?", shortQ: "Donos da Rep. Oligárquica", answer: "A panelinha dos ricaços, principalmente os fazendeiros de café (os donos da grana da época).", fakeAnswer: "Os militares do Exército, que continuaram no poder absoluto até o ano de 1930.", shortA: "Panelinha dos barões do café" },
    { question: "O que era o famoso Voto de Cabresto?", shortQ: "Voto de Cabresto", answer: "Voto na base da ameaça. O coronel mandava, a galera obedecia por medo ou troca de favores.", fakeAnswer: "Voto feito exclusivamente montado a cavalo nas antigas fazendas do interior.", shortA: "Voto forçado e na ameaça" },
    { question: "O que era a Política dos Governadores?", shortQ: "Política dos Governadores", answer: "Um puro 'toma lá, dá cá'. O Presidente ajudava os Governadores e eles ajudavam de volta pra manter o esquema.", fakeAnswer: "Uma lei severa onde o Presidente podia demitir qualquer governador que ele não gostasse.", shortA: "Toma lá dá cá entre políticos" }
];

// ------------------------------------
// DATABASE: FASE 2 (Paraphrased & Harder)
// ------------------------------------
const level2Data = [
    { question: "Qual evento fez a elite latifundiária virar a casaca contra Dom Pedro II?", shortQ: "Elite virando a casaca", answer: "A Lei Áurea. Sem escravos, os produtores rurais retiraram a base de apoio monárquica.", fakeAnswer: "As enormes dívidas externas acumuladas durante a crise econômica com a Inglaterra.", shortA: "Fim da escravidão (Lei Áurea)" },
    { question: "Qual era a bandeira principal dos defensores do novo regime republicano?", shortQ: "Bandeira dos Republicanos", answer: "Extinguir o poder centralizado do monarca e dar autonomia regional às províncias.", fakeAnswer: "Manter o poder centralizado na capital, mas substituindo o rei por um ditador.", shortA: "Autonomia regional e federalismo" },
    { question: "Por que as Forças Armadas se sentiram desvalorizadas pelo governo imperial?", shortQ: "Forças Armadas desvalorizadas", answer: "Porque após a vitória no Paraguai, o império negou a eles influência e prestígio político.", fakeAnswer: "Porque o Império reduziu drasticamente o salário dos generais para pagar dívidas.", shortA: "Negaram influência política" },
    { question: "A transição para a República foi um movimento com apoio popular maciço?", shortQ: "Apoio popular na transição?", answer: "Não! Foi um levante exclusivo do exército. A população 'bestializada' apenas observou.", fakeAnswer: "Sim, foi uma grande revolução popular fortemente inspirada na Revolução Francesa.", shortA: "Levante exclusivo do exército" },
    { question: "Qual nome é dado ao primeiro período da República, comandado por marechais?", shortQ: "Primeiros 5 anos de República", answer: "República da Espada, marcada pela forte repressão e governos militares autoritários.", fakeAnswer: "República Democrática, devido à rápida devolução do poder aos líderes civis.", shortA: "República da Espada" },
    { question: "Qual foi o estopim da primeira grande crise financeira e especulativa do Brasil república?", shortQ: "Estopim da primeira crise", answer: "A política de emissão descontrolada de dinheiro sem lastro (conhecida como Encilhamento).", fakeAnswer: "O aumento massivo dos impostos de exportação sobre a produção do café paulista.", shortA: "Emissão descontrolada de moeda" },
    { question: "Quais grupos sociais foram constitucionalmente excluídos das urnas em 1891?", shortQ: "Excluídos das urnas em 1891", answer: "Analfabetos, mendigos, soldados e mulheres não tinham o direito ao sufrágio (voto).", fakeAnswer: "Apenas os estrangeiros foram excluídos; todos os brasileiros natos podiam votar livremente.", shortA: "Mulheres, analfabetos e soldados" },
    { question: "Qual classe econômica monopolizou o poder federal durante quase toda a Primeira República?", shortQ: "Classe no poder federal", answer: "A oligarquia cafeeira, os grandes latifundiários produtores de café.", fakeAnswer: "A emergente classe operária urbana e os comerciantes dos grandes centros de São Paulo.", shortA: "Oligarquia cafeeira" },
    { question: "Qual era o principal mecanismo de coerção eleitoral usado pelos líderes locais (coronéis)?", shortQ: "Coerção eleitoral local", answer: "A pressão física ou moral sobre os eleitores para controlar o voto, conhecida como Voto de Cabresto.", fakeAnswer: "O uso de cédulas falsas impressas e distribuídas pelo próprio presidente nas capitais.", shortA: "Pressão sobre eleitores (Cabresto)" },
    { question: "Como se chamava a aliança de favores que sustentava o poder federal e estadual sem concorrência?", shortQ: "Aliança de favores mútua", answer: "A Política dos Governadores, um acordo que impedia a oposição de ganhar espaço político.", fakeAnswer: "A lei de proibição de alianças políticas entre governadores de províncias diferentes.", shortA: "Política dos Governadores" }
];


// GLOBALS
let currentGameMode = null; // 'flashcards' | 'match'
let currentLevel = 1;
let currentData = [...level1Data];
let currentCardIsTrue = true; // Tracks if the currently shown answer is the real one

const screenFlash = document.getElementById('screen-flash');

// Audio Context for beeps
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function playFeedback(type) {
    screenFlash.className = 'screen-flash'; // reset
    void screenFlash.offsetWidth; // trigger reflow
    if (type === 'success') {
        screenFlash.classList.add('flash-green');
        if('vibrate' in navigator) navigator.vibrate([30, 30]); // Happy vibes
    } else {
        screenFlash.classList.add('flash-red');
        if('vibrate' in navigator) navigator.vibrate([100, 50, 100]); // Angry vibes
    }

    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
    } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
    }
}

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

        // Reset level to 1 when re-entering games from menu
        currentLevel = 1;
        currentData = [...level1Data];

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
const aTitleEl = document.getElementById('card-answer-title');
const counterEl = document.getElementById('card-counter');
const progressEl = document.getElementById('progress');
const btnWrong = document.getElementById('btn-wrong');
const btnCorrect = document.getElementById('btn-correct');

function initFlashcards() {
    flashIndex = 0;
    flashCorrect = 0;
    flashWrong = 0;
    document.getElementById('flash-level-text').textContent = currentLevel === 1 ? '🔥 FASE 1' : '🌶️ FASE 2 (PEDREIRA)';
    
    // Shuffle the current data
    currentData = currentData.sort(() => Math.random() - 0.5);
    updateCardUI();
}

function updateCardUI() {
    card.classList.remove('flipped');
    
    // reset visual hints if any
    aEl.style.color = 'var(--text-main)';
    aEl.style.fontWeight = 'normal';
    document.getElementById('eval-btns').style.display = 'flex';
    document.getElementById('continue-area').style.display = 'none';

    setTimeout(() => {
        if(flashIndex < currentData.length) {
            const data = currentData[flashIndex];
            
            // Randomly decide if we show the TRUE answer or the FAKE answer
            currentCardIsTrue = Math.random() > 0.5;
            
            qEl.textContent = data.question;
            aEl.textContent = currentCardIsTrue ? data.answer : data.fakeAnswer;
            
            counterEl.textContent = `${flashIndex + 1}/${currentData.length}`;
            progressEl.style.width = `${(flashIndex / currentData.length) * 100}%`;
        } else {
            showResults(flashCorrect, currentData.length, true);
        }
    }, 200);
}

card.addEventListener('click', (e) => {
    if(!e.target.closest('.eval-btn') && !e.target.closest('#btn-continue')) {
        card.classList.toggle('flipped');
        if('vibrate' in navigator) navigator.vibrate(15);
    }
});

btnWrong.addEventListener('click', (e) => { 
    e.stopPropagation(); 
    handleFlashcardAnswer(currentCardIsTrue === false);
});
btnCorrect.addEventListener('click', (e) => { 
    e.stopPropagation(); 
    handleFlashcardAnswer(currentCardIsTrue === true);
});

function handleFlashcardAnswer(isUserCorrect) {
    if (isUserCorrect) {
        flashCorrect++;
        playFeedback('success');
        flashIndex++;
        updateCardUI();
    } else {
        flashWrong++;
        playFeedback('error');
        
        // Hide normal buttons and show continue button
        document.getElementById('eval-btns').style.display = 'none';
        const continueArea = document.getElementById('continue-area');
        const btnContinue = document.getElementById('btn-continue');
        
        continueArea.style.display = 'block';
        btnContinue.style.opacity = '0.5';
        btnContinue.style.pointerEvents = 'none';
        btnContinue.innerHTML = 'Aguarde... ⏱️';
        
        if (currentCardIsTrue) {
            aEl.textContent = "Na verdade era ISSO MESMO! Você errou ao julgar que era mentira.";
        } else {
            aEl.textContent = "CAÔ! ❌ A verdade é: " + currentData[flashIndex].answer;
        }
        aEl.style.color = '#f87171'; // light red
        aEl.style.fontWeight = 'bold';
        
        setTimeout(() => {
            btnContinue.style.opacity = '1';
            btnContinue.style.pointerEvents = 'auto';
            btnContinue.innerHTML = 'Continuar ➡️';
        }, 3000);
    }
}

document.getElementById('btn-continue').addEventListener('click', (e) => {
    e.stopPropagation();
    flashIndex++;
    updateCardUI();
});

// Swipe for Flashcards
let touchStartX = 0; let touchEndX = 0;
card.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
card.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if(!card.classList.contains('flipped')) return;
    
    // Prevent swiping if we are waiting for user to click continue
    if(document.getElementById('eval-btns').style.display === 'none') return;

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
    document.getElementById('match-level-text').textContent = currentLevel === 1 ? '🔥 FASE 1' : '🌶️ FASE 2 (PEDREIRA)';
    
    let shuffled = [...currentData].sort(() => Math.random() - 0.5);
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
        if(selectedQ === element) { selectedQ = null; return; }
        selectedQ = element;
        selectedQ.classList.add('selected');
    } else {
        if(selectedA) selectedA.classList.remove('selected');
        if(selectedA === element) { selectedA = null; return; }
        selectedA = element;
        selectedA.classList.add('selected');
    }
    checkMatch();
}

function checkMatch() {
    if(selectedQ && selectedA) {
        if(selectedQ.dataset.id === selectedA.dataset.id) {
            playFeedback('success');
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
            playFeedback('error');
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
    const title = document.getElementById('result-title');
    
    if(percentage === 100) { title.textContent = "Amassou! 🏆"; msg.textContent = "O puro suco do conhecimento. Gabaritou!"; }
    else if(percentage >= 70) { title.textContent = "Mandou bem! 🌟"; msg.textContent = "Tá pegando a visão. Quase perfeito!"; }
    else { title.textContent = "Rodou 💀"; msg.textContent = "Deu ruim, mas a gente tenta de novo!"; }

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

    // Level Management
    const nextLevelArea = document.getElementById('next-level-area');
    const restartArea = document.getElementById('restart-area');
    
    // If they did decently well on level 1, show level 2 button
    if(currentLevel === 1 && percentage >= 50) {
        nextLevelArea.style.display = 'block';
        restartArea.style.display = 'none';
    } else {
        nextLevelArea.style.display = 'none';
        restartArea.style.display = 'block';
    }
}

document.getElementById('btn-next-level').addEventListener('click', () => {
    currentLevel = 2;
    currentData = [...level2Data];
    document.getElementById('results').style.display = 'none';
    
    if(currentGameMode === 'flashcards') {
        document.getElementById('flashcards-game').style.display = 'block';
        initFlashcards();
    } else {
        document.getElementById('match-game').style.display = 'block';
        initMatchGame();
    }
});

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
