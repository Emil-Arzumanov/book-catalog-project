export const checkIfBookAlreadyExists = (newTitle, existingTitles) => {
    for (let i=0;i < existingTitles.length;i++) {
        if (newTitle === existingTitles[i].title) return true;
    }
    return false;
};