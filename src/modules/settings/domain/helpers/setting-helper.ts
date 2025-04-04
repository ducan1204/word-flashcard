export class Helper {
    private settings = []

    getRandomSetting() {
        const randomIndex = Math.floor(Math.random() * this.settings.length);
        return this.settings[randomIndex];
    }

    getMultipleChoices(correctSetting: string) {
        const choices = new Set<string>();
        choices.add(correctSetting);

        while (choices.size < 4) {
            const randomSetting = this.getRandomSetting();
            choices.add(randomSetting);
        }

        // Shuffle choices
        return Array.from(choices).sort(() => Math.random() - 0.5);
    }

    checkAnswer(selectedSetting: string, correctSetting: string) {
        return selectedSetting === correctSetting;
    }

    getSettings() {
        return this.settings;
    }
}