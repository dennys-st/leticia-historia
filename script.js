// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW Reg Failed', err));
  });
}

// ------------------------------------
// DATABASE: NÍVEL 1 (Base Lore)
// ------------------------------------
const level1Data = [
    { question: "O que fez a elite rural (os fazendeiros) retirar o apoio ao Império?", shortQ: "Elite rural contra o Império", answer: "A Abolição da Escravidão. Perderam a mão de obra não remunerada e passaram a ser oposição.", fakeAnswer: "A Guerra do Paraguai, que deixou as fazendas de café endividadas e falidas.", shortA: "Abolição da Escravidão" },
    { question: "Qual era o principal objetivo do movimento Republicano?", shortQ: "Objetivo dos Republicanos", answer: "O fim da monarquia e o federalismo (sistema com mais autonomia para os estados).", fakeAnswer: "O retorno ao regime de monarquia absoluta e o fim imediato das eleições.", shortA: "Fim da monarquia e federalismo" },
    { question: "O que representou a chamada Questão Militar?", shortQ: "A Questão Militar", answer: "O Exército voltou vitorioso da Guerra do Paraguai e passou a exigir maior poder e participação política.", fakeAnswer: "O exército se recusou a lutar guerras no exterior e propôs o encerramento das Forças Armadas.", shortA: "Exército querendo poder" },
    { question: "Como ocorreu a transição do Império para a República em 1889?", shortQ: "Fim do Império (1889)", answer: "Através de um golpe militar liderado pelo Marechal Deodoro. A população em geral não participou ativamente.", fakeAnswer: "A população organizou fortes protestos armados até a destituição do Imperador (Revolução Popular).", shortA: "Golpe militar sem o povo" },
    { question: "Qual foi a principal característica da República da Espada?", shortQ: "A República da Espada", answer: "O período (1889-1894) governado por militares, marcado por forte controle e autoritarismo.", fakeAnswer: "Um período de paz onde o Brasil enriqueceu focando apenas na exportação de armamentos.", shortA: "Fase dos governos militares" },
    { question: "O que causou a crise financeira conhecida como Encilhamento?", shortQ: "O Encilhamento", answer: "A política de emissão de moeda sem lastro liderada por Rui Barbosa, que resultou em hiperinflação.", fakeAnswer: "A proibição federal do uso de moedas de papel, forçando o comércio a operar somente em ouro.", shortA: "Hiperinflação por emissão livre" },
    { question: "Qual era a maior restrição presente na Constituição de 1891?", shortQ: "Restrição na Const. de 1891", answer: "O voto aberto destinado exclusivamente a homens alfabetizados, excluindo mulheres e as camadas mais pobres.", fakeAnswer: "A imposição do voto secreto irrestrito, garantindo a participação de toda a população nas urnas.", shortA: "Voto aberto e apenas para poucos" },
    { question: "Qual grupo dominou a política durante o período da República Oligárquica?", shortQ: "Domínio da Rep. Oligárquica", answer: "A forte elite agroexportadora, liderada pelos poderosos fazendeiros e barões do café.", fakeAnswer: "As forças armadas do Exército, que continuaram no comando contínuo até a Revolução de 1930.", shortA: "Elite dos grandes fazendeiros" },
    { question: "Como funcionava o mecanismo conhecido como Voto de Cabresto?", shortQ: "Voto de Cabresto", answer: "O controle direto do voto do eleitorado local pelos coronéis, feito sob ameaça ou em troca de pequenos favores.", fakeAnswer: "Uma regra de votação onde os cidadãos só poderiam votar se viajassem até a capital federal.", shortA: "Voto manipulado sob pressão" },
    { question: "O que foi o pacto denominado Política dos Governadores?", shortQ: "Política dos Governadores", answer: "Um acordo de ajuda mútua entre o Presidente e os governadores para garantir que os aliados se mantivessem sempre no poder.", fakeAnswer: "Uma rigorosa lei constitucional onde o Presidente poderia dissolver estados e destituir governadores livremente.", shortA: "Acordo mútuo para manter o poder" }
];

// ------------------------------------
// DATABASE: NÍVEL 2 (Formal & Aprofundado)
// ------------------------------------
const level2Data = [
    { question: "Qual evento histórico provocou a ruptura entre a elite latifundiária e Dom Pedro II?", shortQ: "Ruptura da elite com D. Pedro II", answer: "A sanção da Lei Áurea. Sem o direito à escravidão, os produtores retiraram sua base de apoio monárquica.", fakeAnswer: "As enormes dívidas externas acumuladas durante a crise econômica junto ao império Britânico.", shortA: "O fim da escravidão (Lei Áurea)" },
    { question: "Qual pauta ideológica motivou os principais defensores do novo regime republicano?", shortQ: "Pauta dos Republicanos", answer: "A descentralização do poder real em prol de um arranjo federalista, dando autonomia às províncias.", fakeAnswer: "A manutenção do poder extremamente centralizado na capital federal, comandada por uma autoridade civil.", shortA: "Autonomia regional e federalismo" },
    { question: "Por quais razões as Forças Armadas entraram em choque de interesses com o governo imperial?", shortQ: "Choque com as Forças Armadas", answer: "Pois, ao retornarem do conflito no Paraguai com nova consciência corporativa, tiveram sua ascensão política freada.", fakeAnswer: "Porque o Império estipulou uma brusca redução salarial das patentes militares para sanar a dívida pública.", shortA: "Negaram ascensão política aos militares" },
    { question: "A transição institucional para a República contou com expressivo respaldo popular?", shortQ: "Respaldo popular na transição?", answer: "De maneira alguma. A mudança tratou-se de um levante militar cujos desdobramentos a população assistiu alheia.", fakeAnswer: "Sem dúvida, o movimento foi impulsionado por manifestações de cunho popular em prol de garantias republicanas.", shortA: "Foi um levante essencialmente militar" },
    { question: "Sob qual terminologia ficou conhecido o primeiro lustro republicano marcado pelo autoritarismo?", shortQ: "Primeiros anos da República", answer: "República da Espada, marcada pela forte repressão e pela consolidação institucional via governos militares.", fakeAnswer: "República Democrática, assim chamada devido à veloz e estável transferência do poder às mãos dos civis.", shortA: "A República da Espada" },
    { question: "Qual política monetária foi o estopim da primeira crise especulativa do Brasil republicano?", shortQ: "Estopim da primeira crise", answer: "O Encilhamento, uma audaciosa política de emissão monetária que culminou em forte inflação descontrolada.", fakeAnswer: "O vertiginoso aumento da tributação sobre os excedentes das safras de café do sudeste do país.", shortA: "Emissão monetária sem lastro" },
    { question: "Sob a Constituição de 1891, quais grupos foram marginalizados do exercício da cidadania plena?", shortQ: "Excluídos pela Const. de 1891", answer: "Os analfabetos, as mulheres, as praças de pré (soldados) e os mendigos não tinham o direito ao sufrágio.", fakeAnswer: "Excluíram-se estritamente os estrangeiros e nobres, franqueando as urnas a todos os cidadãos brasileiros natos.", shortA: "Mulheres, analfabetos e soldados" },
    { question: "Qual extrato econômico exerceu a hegemonia no comando do Executivo Federal na Primeira República?", shortQ: "Hegemonia no Executivo", answer: "A ascendente oligarquia cafeeira, constituída pelos grandes latifundiários produtores rurais.", fakeAnswer: "O incipiente operariado dos centros urbanos aliado à burguesia industrial recém-formada no Rio de Janeiro.", shortA: "A oligarquia agroexportadora" },
    { question: "Qual prática representava a submissão coercitiva do eleitorado aos interesses dos líderes locais?", shortQ: "Submissão coercitiva local", answer: "O Coronelismo e seu correspondente Voto de Cabresto, fundamentados no uso da força ou no clientelismo.", fakeAnswer: "O massivo emprego de urnas e cédulas falsificadas que eram sistematicamente despachadas pelo governo central.", shortA: "Coação e controle (Voto de Cabresto)" },
    { question: "Qual pacto institucional garantiu a estabilidade do poder entre a União e as oligarquias estaduais?", shortQ: "Pacto de estabilidade do poder", answer: "A Política dos Governadores, arquitetura que barrava a representação oposicionista no âmbito político.", fakeAnswer: "O dispositivo legal que proibia formalmente toda articulação partidária ou acordos inter-estaduais na câmara.", shortA: "A Política dos Governadores" }
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
        } else if (targetId === 'enem-game') {
            currentGameMode = 'enem';
            initEnemGame();
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
    document.getElementById('flash-level-text').textContent = currentLevel === 1 ? 'Nível 1' : 'Nível 2 (Desafio)';
    
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
            aEl.textContent = "A resposta estava CORRETA! Você avaliou equivocadamente como falso.";
        } else {
            aEl.textContent = "FALSO! ❌ O fato correto é: " + currentData[flashIndex].answer;
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
    document.getElementById('match-level-text').textContent = currentLevel === 1 ? 'Nível 1' : 'Nível 2 (Desafio)';
    
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
    document.getElementById('enem-game').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
    document.getElementById('score-text').textContent = `${correct}/${total}`;
    
    const percentage = (correct / total) * 100;
    const circle = document.querySelector('.score-circle');
    circle.style.background = `conic-gradient(var(--success) ${percentage}%, var(--surface) ${percentage}%)`;
    
    const msg = document.getElementById('score-message');
    const title = document.getElementById('result-title');
    
    if(percentage === 100) { title.textContent = "Nível Concluído! 🏆"; msg.textContent = "Excelente desempenho. Você gabaritou!"; }
    else if(percentage >= 70) { title.textContent = "Bom trabalho! 🌟"; msg.textContent = "Foi muito bem! Está quase lá."; }
    else { title.textContent = "Revisão Necessária 📚"; msg.textContent = "Ainda pode melhorar. Vamos tentar de novo!"; }

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
    } else if(currentGameMode === 'match') {
        document.getElementById('match-game').style.display = 'block';
        initMatchGame();
    } else if(currentGameMode === 'enem') {
        document.getElementById('enem-game').style.display = 'block';
        initEnemGame();
    }
});

document.getElementById('btn-restart').addEventListener('click', () => {
    document.getElementById('results').style.display = 'none';
    if(currentGameMode === 'flashcards') {
        document.getElementById('flashcards-game').style.display = 'block';
        initFlashcards();
    } else if(currentGameMode === 'match') {
        document.getElementById('match-game').style.display = 'block';
        initMatchGame();
    } else if(currentGameMode === 'enem') {
        document.getElementById('enem-game').style.display = 'block';
        initEnemGame();
    }
});

document.getElementById('btn-back-study').addEventListener('click', () => {
    document.getElementById('results').style.display = 'none';
    navItems[0].click(); // Go back to Resumo
});

// ----- ENEM GAME LOGIC -----
const enemData = [
    {
        question: "No Brasil da Primeira República, a estrutura política baseava-se na articulação entre o governo federal e as oligarquias estaduais. Essa articulação, conhecida como Política dos Governadores, dependia do controle do eleitorado, que era garantido por meio:",
        options: [
            "do voto secreto.",
            "da justiça eleitoral independente.",
            "do coronelismo e voto de cabresto.",
            "da participação ativa das mulheres.",
            "do controle estrito dos sindicatos urbanos."
        ],
        correct: 2 // Index of "do coronelismo..."
    },
    {
        question: "A abolição da escravidão em 1888 teve forte impacto político no Brasil Império, pois:",
        options: [
            "fortaleceu o apoio da Igreja Católica ao imperador.",
            "afastou a elite latifundiária escravocrata do governo monárquico.",
            "resultou em uma imediata reforma agrária para os ex-escravos.",
            "pacificou os conflitos com o exército.",
            "consolidou o modelo industrial no país."
        ],
        correct: 1 // Index of "afastou a elite..."
    },
    {
        question: "A política econômica do Encilhamento, implementada no início da República pelo ministro Rui Barbosa, tinha o objetivo de estimular a industrialização, mas resultou em:",
        options: [
            "crescimento sustentável da indústria nacional.",
            "distribuição igualitária de renda entre os civis.",
            "hiperinflação e criação de empresas fantasmas.",
            "fim da dependência do café na economia brasileira.",
            "valorização da moeda nacional no mercado externo."
        ],
        correct: 2 // Index of "hiperinflação..."
    },
    {
        question: "A primeira Constituição Republicana do Brasil, promulgada em 1891, estabeleceu o sufrágio direto, porém excludente. Dentre os grupos que não possuíam o direito ao voto, destacavam-se:",
        options: [
            "os grandes fazendeiros de café e industriais.",
            "os militares de alta patente e juízes.",
            "as mulheres, os mendigos e os analfabetos.",
            "os imigrantes europeus alfabetizados.",
            "os proprietários de terras e comerciantes."
        ],
        correct: 2 // Index of "as mulheres..."
    },
    {
        question: "Sobre o movimento que culminou na Proclamação da República em 15 de novembro de 1889, é correto afirmar que:",
        options: [
            "foi uma grande revolução com forte participação das camadas populares.",
            "resultou de um longo processo de plebiscito nacional.",
            "foi um golpe liderado por militares, com escassa ou nula participação popular.",
            "ocorreu devido à intervenção direta de países europeus na política brasileira.",
            "consolidou-se unicamente pela vontade exclusiva do clero católico."
        ],
        correct: 2 // Index of "foi um golpe..."
    }
];

let enemIndex = 0;
let enemCorrect = 0;
let enemWrong = 0;

function initEnemGame() {
    enemIndex = 0;
    enemCorrect = 0;
    enemWrong = 0;
    loadEnemQuestion();
}

function loadEnemQuestion() {
    if(enemIndex >= enemData.length) {
        showResults(enemCorrect, enemData.length, true);
        return;
    }

    const data = enemData[enemIndex];
    document.getElementById('enem-counter').textContent = `${enemIndex + 1}/${enemData.length}`;
    document.getElementById('enem-progress').style.width = `${(enemIndex / enemData.length) * 100}%`;
    document.getElementById('enem-question').textContent = data.question;
    
    const optionsContainer = document.getElementById('enem-options');
    optionsContainer.innerHTML = '';
    document.getElementById('enem-continue-area').style.display = 'none';

    const letters = ['A', 'B', 'C', 'D', 'E'];
    
    data.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'enem-option';
        btn.innerHTML = `<span class="letter">${letters[idx]})</span> <span class="text">${opt}</span>`;
        btn.onclick = () => checkEnemAnswer(idx, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkEnemAnswer(selectedIndex, btnElement) {
    const data = enemData[enemIndex];
    const optionsContainer = document.getElementById('enem-options');
    const buttons = optionsContainer.querySelectorAll('.enem-option');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    if(selectedIndex === data.correct) {
        enemCorrect++;
        playFeedback('success');
        btnElement.classList.add('correct');
        setTimeout(() => {
            enemIndex++;
            loadEnemQuestion();
        }, 1200); // Short delay to show success before moving on
    } else {
        enemWrong++;
        playFeedback('error');
        btnElement.classList.add('wrong');
        
        // Highlight the correct one
        buttons[data.correct].classList.add('correct');
        
        // Show continue button
        const continueArea = document.getElementById('enem-continue-area');
        continueArea.style.display = 'block';
    }
}

document.getElementById('btn-enem-continue').addEventListener('click', () => {
    enemIndex++;
    loadEnemQuestion();
});
