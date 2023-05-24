export const validateISBN = (ISBN) => {
    if (ISBN.length === 0) return true
    let data = (ISBN+"").replace(/-/g, "").split("").reverse().join("");
    let sum = 0;
    if (data.length === 10) {
        for (let i = 1;i <= 10;i++) {
            sum += data[i-1]*(i)
        }
        if (sum % 11 === 0) return true
    } else if (data.length === 13) {
        for (let i=1;i <= 13;i++) {
            if (i % 2 === 0) {
                sum += data[i-1]*3
            } else if (i % 2 !== 0) {
                sum += data[i-1]*1
            }
        }
        if (sum % 10 === 0) return true
    }
    return false;
};