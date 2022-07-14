export const random = (min, max) => {
    return min + Math.floor(Math.random() * (max - min + 1));
}

export const chance = (value) => {
    return Math.random() * 100 < value;
}