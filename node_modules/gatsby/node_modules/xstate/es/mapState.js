import { matchesState, keys } from './utils';
export function mapState(stateMap, stateId) {
    var foundStateId;
    keys(stateMap).forEach(function (mappedStateId) {
        if (matchesState(mappedStateId, stateId) && (!foundStateId || stateId.length > foundStateId.length)) {
            foundStateId = mappedStateId;
        }
    });
    return stateMap[foundStateId];
}