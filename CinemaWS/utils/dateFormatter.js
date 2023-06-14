const dateFormatter = () => {
    const objectDate = new Date();
    const day = objectDate.getDate();
    const month = objectDate.getMonth() + 1;
    const year = objectDate.getFullYear();
    return `${year}-${month}-${day}`;
};

module.exports = { dateFormatter };
