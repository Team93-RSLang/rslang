import { API_BASE_LINK, WORDS } from '../constants/constants';
import { Word, WordStats } from '../constants/types';
import state from '../state/state';

export async function getWords(group: number, page: number): Promise<Word[]> {
    const response = await fetch(`${WORDS}?group=${group}&page=${0}`);
    return response.json();
}

export async function getWordStatistics(wordId: string): Promise<WordStats | void> {
    try {
        const { userId, token } = state.user;
        if (userId) {
            const response = await fetch(`${API_BASE_LINK}/users/${userId}/words/${wordId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });
            console.log(response);
            if (response.status === 200) {
                return response.json();
            }
        }
    } catch {
        console.log('new entry of word statistics');
    }
    return undefined;
}

export async function setUserWordStats(wordId: string, optional: WordStats): Promise<WordStats | void> {
    const { userId, token } = state.user;
    if (userId) {
        const response = await fetch(`${API_BASE_LINK}/users/${userId}/words/${wordId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(optional),
        });
        return response.json();
    }
    return undefined;
}

// export async function getUserAggregatedWords() {
//     const { userId, token } = state.user;
//     const response = await fetch(`${API_BASE_LINK}/users/${userId}/aggregatedWords`, {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(optional),
//     });

// }
