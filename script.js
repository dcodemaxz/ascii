/*
------------------------------------------------
  ❏ [🧬] SOURCE CODE
------------------------------------------------
  • Developer : dcodemaxz | Maxz
  • Contact   : https://linktr.ee/dcodemaxz
  
*/


class EncryptedMessage {
    constructor() {
        this.charTable = [
            "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", "~",
            ".", "/", ":", ";", "<", "=", ">", "?", "[", "\\", "]", "_", "{", "}",
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
            "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
            "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
            "Ç", "ü", "é", "â", "ä", "à", "å", "ç", "ê", "ë", "è", "ï",
            "î", "ì", "Ä", "Å", "É", "æ", "Æ", "ô", "ö", "ò", "û", "ù",
            "ÿ", "Ö", "Ü", "¢", "£", "¥", "ƒ", "á", "í", "ó", "ú", "ñ",
            "Ñ", "ª", "º", "¿", "¬", "½", "¼", "¡", "«", "»", "α", "ß",
            "Γ", "π", "Σ", "σ", "µ", "τ", "Φ", "Θ", "Ω", "δ", "φ", "ε",
            "±", "÷", "°", "·", "²", "¶", "⌐", "₧", "▒", "▓",
            "│", "┤", "╡", "╢", "╖", "╕", "╣", "║", "╗", "╝", "╜", "╛",
            "┐", "└", "┴", "┬", "├", "─", "┼", "╞", "╟", "╚", "╔", "╩",
            "╦", "╠", "═", "╬", "╧", "╨", "╤", "╥", "╙", "╘", "╒", "╓",
            "╫", "╪", "┘", "┌", "█", "▄", "▌", "▐", "▀"
        ];
        
        this.menuElement = null;
        this.scrollIndicator = null;
        this.originalText = '';
        this.messageText = '';
        this.artText = '';
        this.encryptedDisplayText = '';
        this.promptText = '\n\nPress Enter to Decrypt...';
        this.isDecrypting = false;
        this.intervals = [];
        
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.menuElement = document.getElementById('menu');
        this.scrollIndicator = document.getElementById('scrollIndicator');
        const menuNormalElement = document.getElementById('menuNormal');
        
        if (!this.menuElement || !menuNormalElement) {
            console.error('Required elements not found');
            return;
        }
        
        this.originalText = menuNormalElement.textContent.trim();
        this.separateMessageAndArt();
        this.setupScrollManagement();
        
        setTimeout(() => this.displayTerminal(), 2000);
    }

    setupScrollManagement() {
        this.checkContentOverflow();
        
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
        
        window.addEventListener('resize', () => {
            this.checkContentOverflow();
        });
        
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardScroll(event);
        });
    }

    checkContentOverflow() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (documentHeight > windowHeight) {
            document.body.classList.add('show-scroll-indicator');
        } else {
            document.body.classList.remove('show-scroll-indicator');
        }
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (scrollTop + windowHeight >= documentHeight - 50) {
            if (this.scrollIndicator) {
                this.scrollIndicator.style.opacity = '0';
            }
        } else {
            if (this.scrollIndicator) {
                this.scrollIndicator.style.opacity = '0.8';
            }
        }
    }

    handleKeyboardScroll(event) {
        if (this.isDecrypting || event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        const scrollAmount = 100;
        
        switch(event.key) {
            case 'ArrowDown':
                event.preventDefault();
                window.scrollBy(0, scrollAmount);
                break;
            case 'ArrowUp':
                event.preventDefault();
                window.scrollBy(0, -scrollAmount);
                break;
            case 'PageDown':
                event.preventDefault();
                window.scrollBy(0, window.innerHeight * 0.8);
                break;
            case 'PageUp':
                event.preventDefault();
                window.scrollBy(0, -window.innerHeight * 0.8);
                break;
            case 'Home':
                event.preventDefault();
                window.scrollTo(0, 0);
                break;
            case 'End':
                event.preventDefault();
                window.scrollTo(0, document.documentElement.scrollHeight);
                break;
        }
    }

    separateMessageAndArt() {
        const lines = this.originalText.split('\n');
        const artStartIndex = lines.findIndex(line => line.includes('⠀'));
        
        if (artStartIndex !== -1) {
            this.messageText = lines.slice(0, artStartIndex).join('\n').trim();
            this.artText = lines.slice(artStartIndex).join('\n');
        } else {
            this.messageText = this.originalText;
            this.artText = '';
        }
    }

    getRandomChar() {
        return this.charTable[Math.floor(Math.random() * this.charTable.length)];
    }

    encryptText(text) {
        return text.split('').map(char => {
            if (char === ' ' || char === '\n') {
                return char;
            } else if (char === '⠀' || char.match(/^[\u2800-\u28FF]$/)) {
                return this.getRandomChar();
            } else {
                return this.getRandomChar();
            }
        }).join('');
    }

    showMenu() {
        if (this.menuElement) {
            this.menuElement.classList.remove('hidden');
            this.menuElement.classList.add('visible');
            setTimeout(() => this.checkContentOverflow(), 100);
        }
    }

    hideMenu() {
        if (this.menuElement) {
            this.menuElement.classList.add('hidden');
            this.menuElement.classList.remove('visible');
        }
    }

    displayCharacter(menuText, currentIndex = 0, decryptedText = '') {
        if (currentIndex >= menuText.length) {
            this.showDecryptPrompt(decryptedText);
            return;
        }

        this.menuElement.innerHTML = decryptedText + '<span class="cursor"></span>';
        decryptedText += menuText[currentIndex];
        currentIndex++;

        if (currentIndex % 50 === 0) {
            this.autoScrollIfNeeded();
        }

        setTimeout(() => {
            this.displayCharacter(menuText, currentIndex, decryptedText);
        }, 10);
    }

    autoScrollIfNeeded() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop + windowHeight >= documentHeight - 200) {
            window.scrollTo({
                top: documentHeight,
                behavior: 'smooth'
            });
        }
    }

    showDecryptPrompt(encryptedText) {
        this.encryptedDisplayText = encryptedText;
        const promptIndex = 0;
        this.typePrompt(encryptedText, this.promptText, promptIndex);
    }

    typePrompt(baseText, promptText, currentIndex) {
        if (currentIndex >= promptText.length) {
            this.menuElement.innerHTML = baseText + promptText + '<span class="cursor"></span>';
            this.setupDecryptionListener();
            return;
        }

        const currentPrompt = promptText.substring(0, currentIndex + 1);
        this.menuElement.innerHTML = baseText + currentPrompt + '<span class="cursor"></span>';
        
        setTimeout(() => {
            this.typePrompt(baseText, promptText, currentIndex + 1);
        }, 50);
    }

    setupDecryptionListener() {
        const handleKeyDown = (event) => {
            if (event.key === "Enter" && !this.isDecrypting) {
                this.isDecrypting = true;
                this.menuElement.textContent = this.encryptedDisplayText;
                this.randomizeText();
                document.removeEventListener('keydown', handleKeyDown);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
    }

    randomizeText() {
        let randomizeCount = 0;
        const maxRandomizations = 100;
        
        const randomizeInterval = setInterval(() => {
            if (randomizeCount >= maxRandomizations) {
                clearInterval(randomizeInterval);
                this.startDecryption();
                return;
            }
            
            this.menuElement.textContent = this.encryptText(this.originalText);
            randomizeCount++;
        }, 10);

        this.intervals.push(randomizeInterval);

        setTimeout(() => {
            clearInterval(randomizeInterval);
            this.startDecryption();
        }, 1000);
    }

    startDecryption() {
        let isArtRevealed = false;
        
        const decryptChar = () => {
            const currentText = this.menuElement.textContent;
            
            if (currentText === this.originalText) {
                this.scrollToShowCompleteContent();
                return;
            }

            const mismatchedIndices = [];
            
            if (!isArtRevealed) {
                for (let i = 0; i < this.messageText.length; i++) {
                    if (currentText[i] !== this.originalText[i]) {
                        mismatchedIndices.push(i);
                    }
                }
                
                if (mismatchedIndices.length === 0) {
                    isArtRevealed = true;
                }
            } else {
                for (let i = this.messageText.length; i < this.originalText.length; i++) {
                    if (currentText[i] !== this.originalText[i]) {
                        mismatchedIndices.push(i);
                    }
                }
            }

            if (mismatchedIndices.length > 0) {
                const randomIndex = mismatchedIndices[Math.floor(Math.random() * mismatchedIndices.length)];
                const newText = currentText.substring(0, randomIndex) +
                    this.originalText[randomIndex] +
                    currentText.substring(randomIndex + 1);
                this.menuElement.textContent = newText;
            }

            if (currentText !== this.originalText) {
                setTimeout(decryptChar, isArtRevealed ? 8 : 2);
            }
        };

        decryptChar();
    }

    scrollToShowCompleteContent() {
        setTimeout(() => {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        }, 500);
    }

    displayTerminal() {
        const encryptedText = this.encryptText(this.originalText);
        this.showMenu();
        this.displayCharacter(encryptedText);
    }

    destroy() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.checkContentOverflow);
    }
}

const encryptedMessage = new EncryptedMessage();

window.addEventListener('beforeunload', () => {
    if (encryptedMessage) {
        encryptedMessage.destroy();
    }
});