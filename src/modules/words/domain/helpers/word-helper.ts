export class Helper {
    private words = []

    getRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        return this.words[randomIndex];
    }

    getMultipleChoices(correctWord: string) {
        const choices = new Set<string>();
        choices.add(correctWord);

        while (choices.size < 4) {
            const randomWord = this.getRandomWord().word;
            choices.add(randomWord);
        }

        // Shuffle choices
        return Array.from(choices).sort(() => Math.random() - 0.5);
    }

    checkAnswer(selectedWord: string, correctWord: string) {
        return selectedWord === correctWord;
    }

    getWords() {
        return this.words;
    }
}