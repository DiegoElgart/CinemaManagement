const dateFormatter = () => {
    const objectDate = new Date();
    const day = String(objectDate.getDate()).padStart(2, "0");
    const month = String(objectDate.getMonth() + 1).padStart(2, "0");
    const year = objectDate.getFullYear();
    return `${day}/${month}/${year}`;
};

module.exports = { dateFormatter };
