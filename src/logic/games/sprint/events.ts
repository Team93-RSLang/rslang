import getWords from '../../../api/words';
import { MAX_PAGES } from '../../../constants/constants';
import { Levels, Word } from '../../../constants/types';
import { state } from '../../../state/state';
import getRandomNumber from '../../../utils/randomize';
import removeClassElement from '../../../utils/removeClassElement';
import renderSprintGame, { setAnswerBlock } from '../../../view/pages/games/sprint/renderSprintGame';
import { checkAnswerSprintGame, setPoints, sprintGameControls } from './controls';

export default function listenLevelButtons(): void {
    const levelsContainer = document.querySelector('.level-container');
    levelsContainer?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const data = target.getAttribute('data');
        if (data) {
            state.sprintGame.currentLevel = data;
            removeClassElement('level-button', 'active-level-button');
            target.classList.add('active-level-button');
            const startButton = document.querySelector('.start-button');
            startButton?.classList.add('active');
        }
    });
}

export function listerStartButton(): void {
    const startButton = document.querySelector('.start-button') as HTMLElement;
    const startScreen = document.querySelector('.start-screen') as HTMLElement;
    startButton?.addEventListener('click', async () => {
        if (startButton.classList.contains('active')) {
            startScreen.style.display = 'none';
            const sprintContainer = document.querySelector('.sprint-container') as HTMLElement;
            if (sprintContainer) {
                const level = Levels[state.sprintGame.currentLevel as keyof typeof Levels];
                const page = getRandomNumber(0, MAX_PAGES);
                const data = await getWords(level, page);
                renderSprintGame(sprintContainer, data);
                sprintGameControls(data);
            }
        }
    });
}

export function listenChoiceButtons(data: Word[]): void {
    const buttonsContainer = document.querySelector('.buttons-container');
    buttonsContainer?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const value = target.getAttribute('data');
        if (value) {
            const action = checkAnswerSprintGame(value);
            setPoints(action);
            setAnswerBlock(data);
        }
    });
}
