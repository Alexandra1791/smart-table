import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName)=> {
        if (elements[elementName]) {
            elements[elementName].append(
                ...Object.values(indexes[elementName]).map(name => {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;
                    return option;
                })
            );
        }
    });


    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const parent = action.parentElement;
            const input = parent.querySelector('input');

            if(input) {
                input.value = '';
            }
            const targetField = action.dataset.field;
            if (targetField && targetField in state) {
                state[targetField] = '';
            }
        }
        
        const searchState = {...state};
        searchState.total = [state.totalFrom, state.totalTo];
        delete searchState.totalFrom;
        delete searchState.totalTo;// @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(item => {
            const itemForCompare = {
                ...item,
                total: item.total !== undefined && item.total !== null ? Number(item.total) : item.total
            };
        return compare(itemForCompare, searchState);
        });
}};