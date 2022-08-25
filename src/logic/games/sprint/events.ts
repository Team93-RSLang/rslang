import getWords from '../../../api/words';
import { KEY_ARROWS, MAX_PAGES, GAME_BUTTONS } from '../../../constants/constants';
import { Levels, Word } from '../../../constants/types';
import { state } from '../../../state/state';
import { deleteHTMLElement } from '../../../utils/createElement';
import playAudio, { getFullPath } from '../../../utils/playAudio';
import getRandomNumber from '../../../utils/randomize';
import removeClassElement from '../../../utils/removeClassElement';
import renderLoading from '../../../view/common/loading/renderLoading';
import renderSprintGame, { setAnswerBlock } from '../../../view/pages/games/sprint/renderSprintGame';
import {
    checkAnswerSprintGame,
    choiceAction,
    processResultGameButtons,
    setPoints,
    sprintGameControls,
} from './controls';
import renderAudioCallGame from '../../../view/pages/games/audio-call/renderAudioCallGame';

export default function listenLevelButtons(tag: string): void {
    const levelsContainer = document.querySelector('.level-container');
    levelsContainer?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const data = target.getAttribute('data');
        if (data) {
            state[`${tag}Game` as keyof typeof state].currentLevel = data;
            removeClassElement('level-button', 'active-level-button');
            target.classList.add('active-level-button');
            const startButton = document.querySelector('.start-button');
            startButton?.classList.add('active');
        }
    });
}

export function listerStartButton(tag: string): void {
    const startButton = document.querySelector('.start-button') as HTMLElement;
    startButton?.addEventListener('click', async () => {
        if (startButton.classList.contains('active')) {
            deleteHTMLElement('start-screen');
            const gameContainer = document.querySelector('.game-container') as HTMLElement;
            if (gameContainer) {
                const level = Levels[state[`${tag}Game` as keyof typeof state].currentLevel as keyof typeof Levels];
                const page = getRandomNumber(0, MAX_PAGES);
                renderLoading(gameContainer);
                const data = await getWords(level, page);
                deleteHTMLElement('loading-container');
                switch (tag) {
                    case 'sprint':
                        renderSprintGame(gameContainer, data);
                        sprintGameControls(data);
                        break;

                    case 'audioCall':
                        renderAudioCallGame(gameContainer, data);
                        // sprintGameControls(data);
                        break;
                    default:
                        break;
                }
            }
        }
    });
}

export function listenChoiceButtons(data: Word[]): void {
    const buttonsContainer = document.querySelector('.buttons-container');
    buttonsContainer?.addEventListener('click', (e) => {
        choiceAction(e, data);
    });
}

export function listenResultTabs(): void {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab) => {
        tab.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (!target.classList.contains('active')) {
                removeClassElement('tab', 'active');
                target.classList.add('active');
                const slider = document.querySelector('.slider');
                slider?.classList.toggle('move-left');
            }
        });
    });
}

export function listenSoundResultList(): void {
    const list = document.querySelector('.right-side-container');
    list?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const data = target.getAttribute('data');
        if (data) {
            const path = getFullPath(data);
            playAudio(path);
        }
    });
}

export function listenResultBottomButtons(): void {
    const container = document.querySelector('.bottom-buttons-container');
    container?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const data = target.getAttribute('data');
        if (data) {
            processResultGameButtons(data);
        }
    });
}

export function listenKeyboard(data: Word[]): void {
    document.addEventListener('keydown', (e) => {
        const keyName = e.key;
        const choice = keyName === KEY_ARROWS.left ? GAME_BUTTONS.YES : GAME_BUTTONS.NO;
        if (Object.values(KEY_ARROWS).includes(keyName)) {
            if (state.sprintGame.wordsLearnt < data.length) {
                const action = checkAnswerSprintGame(choice);
                setPoints(action);
                setAnswerBlock(data);
                state.sprintGame.wordsLearnt += 1;
            } else {
                state.sprintGame.isGame = false;
            }
        }
    });
}
