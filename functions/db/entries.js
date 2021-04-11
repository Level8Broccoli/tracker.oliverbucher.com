export const addEntry = async (name, timestamp, type) => {
    return {
        timestamp,
        type
    };
};

export const getAllEntries = async (name) => {
    return [
        {
            timestamp: new Date(),
            type: 'TYPE'
        }
    ];
};
