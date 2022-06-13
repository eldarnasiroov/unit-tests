describe('Tests for createUser function', () => {
    // Here you should add your tests for this function
    it('Should return null if one of properties is empty.', () => {
        const user = {
            name: 'Eldar',
            username: 'eldarnasiroov',
            age: '',
            role: 'admin'
        }
        assert.equal(createUser(user), null)
    });

    it('Should return null if name same as username.', () => {
        const user = {
            name: 'eldarnasiroov',
            username: 'eldarnasiroov',
            age: '23',
            role: 'admin'
        }
        assert.equal(createUser(user), null)
    });

    it('Should return \'true\' if age is greater than 18. ', () => {
        const user = {
            name: 'Eldar',
            username: 'eldarnasiroov',
            age: '23',
            role: 'user'
        }
        assert.equal(createUser(user).isLegal, true)
    });

    it('Should return \'false\' if age is less than 18. ', () => {
        const user = {
            name: 'Eldar',
            username: 'eldarnasiroov',
            age: '17',
            role: 'user'
        }
        assert.equal(createUser(user).isLegal, false)
    });

    it('Should return \'partial\' if the user\'s role is user.', () => {
        const user = {
            name: 'Eldar',
            username: 'eldarnasiroov',
            age: '23',
            role: 'user'
        }
        assert.equal(createUser(user).access, 'partial')
    });

    it('Should return \'full\' if the user\'s role is admin.', () => {
        const user = {
            name: 'Eldar',
            username: 'eldarnasiroov',
            age: '23',
            role: 'admin'
        }
        assert.equal(createUser(user).access, 'full')
    });

    it('Should return \'blocked\' if the user\'s age is less than 18.', () => {
        const user = {
            name: 'Eldar',
            username: 'eldarnasiroov',
            age: '17',
            role: 'user'
        }
        assert.equal(createUser(user).access, 'blocked')
    });
});

describe('Tests for getNotificationMessage function', () => {
    // Here you should add your tests for this function
    it('After sending empty or false values in notification.type should throw Error with message: \'Invalid notification type\' ', () => {
        const notification = {
            type: ''
        }
        assert.throws(() => {
            getNotificationMessage(notification)
        }, `Invalid notification type. Please select one of the following: ${notificationTypes.join(', ')}`)
    });

    it('After sending a value that is not contained in the \'notificationTypes\' should throw Error with message: Invalid notification type.', () => {
        const notification = {
            type: 'complete'
        }
        assert.throws(() => {
            getNotificationMessage(notification)
        }, `Invalid notification type. Please select one of the following: ${notificationTypes.join(', ')}`)
    });

    it('After sending empty or false values in notification.text should throw Error with message: \'You can not create notification without text\'', () => {
        const notification = {
            type: 'error',
            text: ''
        }
        assert.throws(() => {
            getNotificationMessage(notification)
        }, 'You can not create notification without text')
    });

    it('After sending \'info\' in notification.type and \'random text\' in \'notification.text\' should return {text: Info: random text, color: \'steelblue\', duration: 2000}', () => {
        const notification = {
            type: 'info',
            text: 'random text'
        }
        const message = {
            text: 'Info: random text',
            color: 'steelblue',
            duration: 2000
        };
        assert.deepEqual(getNotificationMessage(notification), message)
    });

    it('After sending \'error\' in notification.type and \'random text\' in \'notification.text\' should return {text: Error: random text. Please try again later, color: \'tomato\', duration: 3000}', () => {
        const notification = {
            type: 'error',
            text: 'random text'
        }
        const message = {
            text: 'Error: random text. Please try again later',
            color: 'tomato',
            duration: 3000
        };
        assert.deepEqual(getNotificationMessage(notification), message)
    });

    it('After sending \'warning\' in notification.type and \'random text\' in \'notification.text\' should return {text: Warning: random text. Consider doing something, color: \'orange\', duration: 1000}', () => {
        const notification = {
            type: 'warning',
            text: 'random text'
        }
        const message = {
            text: 'Warning: random text. Consider doing something',
            color: 'orange',
            duration: 1000
        };
        assert.deepEqual(getNotificationMessage(notification), message)
    });

    it('After sending \'success\' in notification.type and \'random text\' in \'notification.text\' should return {text: Success: random text, color: \'steelblue\', duration: 2000}', () => {
        const notification = {
            type: 'success',
            text: 'random text'
        }
        const message = {
            text: 'Success: random text',
            color: 'steelblue',
            duration: 2000
        };
        assert.deepEqual(getNotificationMessage(notification), message)
    });
});

describe('Tests for checkPayment function', () => {
    it('Should return "correct" with correct arguments', () => {
        const amount = 120.0;
        const description = 'Business payment';
        const isNeedNotify = true;
        const user = {
            id: 12,
            name: 'Samir',
        };
        const payment = {
            amount,
            description,
            isNeedNotify,
            user,
        };
        assert.equal(checkPayment(payment), 'correct');
    });

    it('Should return "no_notification" with correct arguments but without need to notify user', () => {
        const amount = 120.0;
        const description = 'Business payment';
        const isNeedNotify = false; //Изначально было true, исправил на false))
        const user = {
            id: 12,
            name: 'Samir',
        };
        const payment = {
            amount,
            description,
            isNeedNotify,
            user,
        };
        assert.equal(checkPayment(payment), 'no_notification');
    });

    it('Should return "wrong amount" with amount below 0', () => {
        const amount = -10;
        const description = 'Business payment';
        const isNeedNotify = true;
        const user = {
            id: 12,
            name: 'Samir',
        };
        const payment = {
            amount,
            description,
            isNeedNotify,
            user,
        };
        assert.equal(checkPayment(payment), 'wrong amount');
    });

    it('Should return "empty description" without description', () => {
        const amount = 10;
        const description = '';
        const isNeedNotify = true;
        const user = {
            id: 12,
            name: 'Samir',
        };
        const payment = {
            amount,
            description,
            isNeedNotify,
            user,
        };
        assert.equal(checkPayment(payment), 'empty description');
    });

    it('Should throw error with message "You can not set purchase without user" without user object', () => {
        const amount = 10;
        const description = '';
        const isNeedNotify = true;
        const payment = {
            amount,
            description,
            isNeedNotify,
            user: null,
        };
        assert.throws(() => {
            checkPayment(payment)
        }, 'You can not set purchase without user');
    });
});

describe('Tests for numberFormatter function', () => {
    // Here you should add tests for Task 4
    it('If the number was not sent should throw an error with \'Provide number to format\' message.', () => {
        assert.throws(() => {
            numberFormatter(NaN, 'abs')
        }, 'Provide number to format');
    });

    it('If the format was not send should throw an error with \'Format is incorrect\' message.', () => {
        assert.throws(() => {
            numberFormatter(50, '')
        }, 'Format is incorrect');
    });

    it('If the format does not contain the entered value throw an error with \'Format is incorrect\' message.', () => {
        assert.throws(() => {
            numberFormatter(50, 'factorial')
        }, 'Format is incorrect');
    });

    it('After sending 56.845 and \'integer\' should return 56.', () => {
        assert.equal(numberFormatter(56.845, 'integer'), 56);
    });

    it('After sending 56 and \'double\' should return \'56.00\'', () => {
        assert.equal(numberFormatter(56, 'double'), '56.00')
    });

    it('After sending 56.845 and \'double\' should return \'56.845\'', () => {
        assert.equal(numberFormatter(56.845, 'double'), 56.845)
    });

    it('After sending 56 and \'roundUp\' should return 60', () => {
        assert.equal(numberFormatter(56, 'roundUp'), 60)
    });

    it('After sending 50 and \'roundUp\' should return 50', () => {
        assert.equal(numberFormatter(50, 'roundUp'), 50)
    });

    it('After sending 50.1 and \'roundUp\' should return 55', () => {
        assert.equal(numberFormatter(50.1, 'roundUp'), 55)
    });

    it('After sending 54 and \'roundDown\' should return 50', () => {
        assert.equal(numberFormatter(54, 'roundDown'), 50)
    });

    it('After sending 58 and \'roundDown\' should return 55', () => {
        assert.equal(numberFormatter(58, 'roundDown'), 55)
    });

    it('After sending 0.8 and \'roundDown\' should return 0', () => {
        assert.equal(numberFormatter(0.8, 'roundDown'), 0)
    });

    it('After sending -10 and \'abs\' should return 10', () => {
        assert.equal(numberFormatter(-10, 'abs'), 10)
    });

    it('After sending 10 and \'abs\' should return 10', () => {
        assert.equal(numberFormatter(10, 'abs'), 10)
    });
});

describe('Tests for getPlatform function', () => {
    // Here you should add tests for Task 5
    it('When calling a function with no arguments should throw error with \'incorrect values\' message.', () => {
        assert.throws(() => {
            getPlatform();
        }, 'incorrect values');
    });

    it('After sending array should throw error with \'incorrect values\' message.', () => {
        assert.throws(() => {
            getPlatform([]);
        }, 'incorrect values');
    });

    it('After sending empty object should return \'unknown platform\'.', () => {
        assert.equal(getPlatform({}), 'unknown platform');
    });

    it('After sending obj.os = \'windows xp\' and obj.screenWidth = 1440 should return \'unknown platform\'.', () => {
        const obj = {
            os: 'windows xp',
            screenWidth: 1440
        }
        assert.equal(getPlatform(obj), 'unknown platform');
    });

    it('After sending obj.os = \'android\' and obj.screenWidth = 320 should return \'unknown platform\'.', () => {
        const obj = {
            os: 'android',
            screenWidth: 320
        }
        assert.equal(getPlatform(obj), 'unknown platform');
    });

    it('After sending obj.os = \'android\' obj.screenWidth = 420 should return \'mobile\'.', () => {
        const obj = {
            os: 'android',
            screenWidth: 480
        }
        assert.equal(getPlatform(obj), 'mobile');
    });

    it('After sending obj.os = \'windows\' obj.screenWidth = 960 should return \'tablet\'.', () => {
        const obj = {
            os: 'windows',
            screenWidth: 960
        }
        assert.equal(getPlatform(obj), 'tablet');
    });

    it('After sending obj.os = \'linux\' obj.screenWidth = 1440 should return \'laptop\'.', () => {
        const obj = {
            os: 'linux',
            screenWidth: 1440
        }
        assert.equal(getPlatform(obj), 'laptop');
    });

    it('After sending obj.os = \'macos\' obj.screenWidth = 1440 should return \'laptop\'.', () => {
        const obj = {
            os: 'macos',
            screenWidth: 1440
        }
        assert.equal(getPlatform(obj), 'laptop');
    });

    it('After sending obj.os = \'linux\' obj.screenWidth = 960 should return \'unknown platform\'.', () => {
        const obj = {
            os: 'linux',
            screenWidth: 960
        }
        assert.equal(getPlatform(obj), 'unknown platform');
    });
});