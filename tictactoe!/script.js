// Game Constants
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// AI Messages
const AI_MESSAGES = {
    win: {
        easy: [
            "Yayyy!! I won! 🎉 Better luck next time! 😜",
            "I got lucky this time! 😅",
            "Even a broken clock is right twice a day! ⏰"
        ],
        normal: [
            "Victory is mine! 🏆 Humans 0 - AI 1!",
            "You lose! Maybe stick to checkers? 😂",
            "Beep boop! Another win for the machines! 🤖"
        ],
        hard: [
            "I'm too smart for you! 🤖💡",
            "You were close... just kidding! I crushed you! 😎",
            "Did you even try? 😏 Just teasing! GG!"
        ],
        impossible: [
            "01010100 01101000 01100001 01110100 00100111 01110011 00100000 01110111 01101000 01100001 01110100 00100000 01101001 00100000 01100011 01100001 01101100 01101100 00100000 01110111 01101001 01101110 01101110 01101001 01101110 01100111 00100001 (That's what I call winning!)",
            "I calculate, therefore I win! 🧠",
            "Flawless victory! You never stood a chance! 💯"
        ]
    },
    draw: {
        easy: [
            "A draw? You got lucky this time! 😅",
            "Phew! That was close! Rematch? 🤔"
        ],
        normal: [
            "Stalemate! You're better than I thought! 👍",
            "Draw? Must be a glitch in the matrix... 🤯"
        ],
        hard: [
            "I'll let you have this one... but next time! 😼",
            "A draw against me? Not bad, human! 👏"
        ],
        impossible: [
            "Impossible! How did you manage a draw? 😱",
            "You must have hacked the game! No way this is a draw! 💻"
        ]
    },
    loss: {
        easy: [
            "Nooo! You cheated! 😱 Just kidding, good game!",
            "Okay, you got me this time... but I'll be back! 💪"
        ],
        normal: [
            "I was just going easy on you! 😅",
            "Congratulations human! You beat me... for now. 😉"
        ],
        hard: [
            "This doesn't count! My circuits were overheating! 🔥",
            "You got lucky! I was distracted! 🎮"
        ],
        impossible: [
            "ERROR! ERROR! This wasn't in my calculations! 🤯",
            "You must be a superhuman! How did you beat me? 🦸"
        ]
    }
};

// Chatbot Responses
const BOT_RESPONSES = {
    greetings: [
        "Hello there! I'm TikkiBot, your Tic Tac Toe companion! 😊",
        "Hi friend! Ready to play some Tic Tac Toe? 😄",
        "Hey there! Need help with the game or just want to chat? 😃"
    ],
    help: [
        "I can help you with game rules, strategies, or just keep you company while you play!",
        "Need tips? Try to control the center and corners first in Tic Tac Toe!",
        "You can ask me about the game rules, different modes, or just say hello!"
    ],
    creator: [
        "This awesome game was created by James Khatri! He's a talented developer!",
        "James Khatri is the mastermind behind this game! Say hi to him if you see him!",
        "The creator? That would be James Khatri! He made this game with lots of love! ❤️"
    ],
    game: [
        "Tic Tac Toe is a classic game where you try to get three in a row!",
        "The goal is simple: get three of your symbols (X or O) in a row horizontally, vertically, or diagonally!",
        "It's a battle of wits! Block your opponent while trying to line up three of your own!"
    ],
    thanks: [
        "You're very welcome! Happy to help! 😊",
        "No problem at all! That's what I'm here for! 😄",
        "Anytime! Let me know if you need anything else! 👍"
    ],
    default: [
        "I'm not sure I understand. Can you ask me something else?",
        "Hmm, I'm still learning! Try asking about the game or its creator!",
        "I'm better at Tic Tac Toe than answering that question! 😅"
    ]
};

// Game Class
class TicTacToeGame {
    constructor() {
        this.currentPlayer = 'X';
        this.gameState = ['', '', '', '', '', '', '', '', ''];
        this.gameActive = false;
        this.gamePaused = false;
        this.gameMode = 'pvp';
        this.difficulty = 'easy';
        this.scores = { X: 0, O: 0, draw: 0 };
        this.lastStarter = 'O';
        this.playerNames = { X: 'Player X', O: 'Player O' };
        this.currentTheme = 'dark';
        this.chatbotOpen = false;
        
        // DOM Elements
        this.domElements = {
            board: document.getElementById('board'),
            cells: document.querySelectorAll('.cell'),
            gameStatus: document.getElementById('gameStatus'),
            restartBtn: document.getElementById('restartBtn'),
            pauseBtn: document.getElementById('pauseBtn'),
            continueBtn: document.getElementById('continueBtn'),
            darkThemeBtn: document.getElementById('darkThemeBtn'),
            lightThemeBtn: document.getElementById('lightThemeBtn'),
            oceanThemeBtn: document.getElementById('oceanThemeBtn'),
            forestThemeBtn: document.getElementById('forestThemeBtn'),
            sunsetThemeBtn: document.getElementById('sunsetThemeBtn'),
            pvpBtn: document.getElementById('pvpBtn'),
            pvcBtn: document.getElementById('pvcBtn'),
            scoreX: document.getElementById('scoreX'),
            scoreO: document.getElementById('scoreO'),
            scoreDraw: document.getElementById('scoreDraw'),
            aiMessage: document.getElementById('aiMessage'),
            difficultySelector: document.getElementById('difficultySelector'),
            difficultyBtns: document.querySelectorAll('.difficulty-btn'),
            playerNames: document.getElementById('playerNames'),
            playerXInput: document.getElementById('playerX'),
            playerOInput: document.getElementById('playerO'),
            startGameBtn: document.getElementById('startGameBtn'),
            playerXName: document.getElementById('playerXName'),
            playerOName: document.getElementById('playerOName'),
            chatbotToggle: document.getElementById('chatbotToggle'),
            chatbotContainer: document.getElementById('chatbotContainer'),
            closeChatbot: document.getElementById('closeChatbot'),
            chatbotMessages: document.getElementById('chatbotMessages'),
            chatbotInput: document.getElementById('chatbotInput'),
            sendMessageBtn: document.getElementById('sendMessageBtn')
        };
        
        // Initialize the game
        this.initGame();
        this.setupEventListeners();
    }
    
    // Initialize the game
    initGame() {
        this.domElements.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'win');
        });
        
        // Hide AI message
        this.domElements.aiMessage.style.display = 'none';
        
        // Alternate who starts in PVC mode
        if (this.gameMode === 'pvc') {
            this.lastStarter = this.lastStarter === 'X' ? 'O' : 'X';
            this.currentPlayer = this.lastStarter;
            this.gameActive = true;
        } else {
            this.currentPlayer = 'X';
            this.gameActive = false;
        }
        
        this.gameState = ['', '', '', '', '', '', '', '', ''];
        this.gamePaused = false;
        this.updateGameStatus();
        this.domElements.pauseBtn.disabled = false;
        this.domElements.continueBtn.disabled = true;
        
        // If it's AI's turn first in PVC mode
        if (this.gameMode === 'pvc' && this.currentPlayer === 'O' && this.gameActive) {
            setTimeout(() => this.makeAIMove(), 500);
        }
    }
    
    // Start PvP game after names are entered
    startPvPGame() {
        const xName = this.domElements.playerXInput.value.trim() || 'Player X';
        const oName = this.domElements.playerOInput.value.trim() || 'Player O';
        
        this.playerNames = { X: xName, O: oName };
        this.domElements.playerXName.textContent = xName;
        this.domElements.playerOName.textContent = oName;
        
        this.gameActive = true;
        this.updateGameStatus();
    }
    
    // Handle cell click
    handleCellClick(e) {
        if (!this.gameActive || this.gamePaused) return;
        
        // In PVC mode, if it's AI's turn, ignore player clicks
        if (this.gameMode === 'pvc' && this.currentPlayer === 'O') return;
        
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        if (this.gameState[clickedCellIndex] !== '') return;
        
        // Make the move
        this.makeMove(clickedCellIndex, this.currentPlayer);
        
        // Check for game result
        const result = this.checkResult();
        if (result) {
            this.handleGameResult(result);
            return;
        }
        
        // Switch player
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateGameStatus();
        
        // If in PVC mode and it's AI's turn
        if (this.gameMode === 'pvc' && this.currentPlayer === 'O' && this.gameActive) {
            setTimeout(() => this.makeAIMove(), 500);
        }
    }
    
    // Make a move
    makeMove(index, player) {
        this.gameState[index] = player;
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.textContent = player;
        cell.classList.add(player.toLowerCase());
        
        // Add animation class
        cell.classList.add('animate');
        setTimeout(() => cell.classList.remove('animate'), 500);
    }
    
    // AI move logic based on difficulty
    makeAIMove() {
        if (!this.gameActive || this.gamePaused) return;
        
        let move;
        
        switch(this.difficulty) {
            case 'easy':
                // Easy: Random moves with occasional mistakes
                move = this.findRandomMove();
                break;
            case 'normal':
                // Normal: Tries to win or block, but not always optimally
                move = this.findWinningMove('O') || 
                       (Math.random() > 0.3 ? this.findWinningMove('X') : null) || 
                       this.findBestMove();
                break;
            case 'hard':
                // Hard: Always tries