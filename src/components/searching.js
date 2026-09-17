export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор

    return (query, state, action) => {
       if (action === 'clear' || action === 'reset') {
        state[searchField] = '';
        return query;
       }
       return state[searchField] ? Object.assign({}, query, {
        'filter[customer]': state[searchField]
       }) : query;
    };
}