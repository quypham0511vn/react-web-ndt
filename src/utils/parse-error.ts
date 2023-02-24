let errorMapping;
try {
    errorMapping = require('./errorMapping/vi.json');
} catch (e) {
    console.log(e);
}

const parseError = (error) => {
    let code = 0;
    let message = 'Unknown error';

    if (error.response) {
        const errorData = error.response.data;
        if (errorData && Array.isArray(errorData.data)) {
            const errorMessages = errorData.data[0]?.messages;
            if (errorMessages && Array.isArray(errorMessages)) {
                const id = errorMessages[0]?.id;
                if (id) {
                    code = id;
                    message = errorMapping[id] ?? error.response.statusText;
                }
            }
        } else {
            code = error.response.code;
            message = error.response.statusText;
        }
    }

    return {
        code,
        message
    };
};

export default parseError;
