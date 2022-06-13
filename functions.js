/* Task 1: Function to create user object for Database */

const createUser = (user) => {
    // Exit if one of properties is empty
    if (!user.name || !user.username || !user.age || !user.role) return null;

    // Can not create user with name same as username
    if (user.name === user.username) return null;

    // Determine role of the user
    const role = user.role === "admin" ? "admin" : "user";

    // Check age to determine whether user is of legal age
    const isLegal = user.age > 18;

    let access;

    // Determine user's access level based on role and age
    if (role === "admin") access = "full";
    else if (isLegal) access = "partial";
    else access = "blocked";

    // Return user object
    return {
        name: user.name,
        username: user.username,
        age: user.age,
        isLegal,
        access,
    };
};

/* Task 2: Function to format notification message */

const notificationTypes = ["info", "error", "success", "warning"];

const getNotificationMessage = (notification) => {
    // Check correctness of notification type
    if (!notification.type || !notificationTypes.includes(notification.type)) {
        throw new Error(
            `Invalid notification type. Please select one of the following: ${notificationTypes.join(
        ", "
      )}`
        );
    }

    // Check if we have notification text
    if (!notification.text)
        throw new Error("You can not create notification without text");

    const message = {};

    // Create correct message object based on properties
    switch (notification.type) {
        case "info":
            message.text = `Info: ${notification.text}`;
            message.color = "steelblue";
            message.duration = 2000;
            break;
        case "error":
            message.text = `Error: ${notification.text}. Please try again later`;
            message.color = "tomato";
            message.duration = 3000;
            break;
        case "warning":
            message.text = `Warning: ${notification.text}. Consider doing something`;
            message.color = "orange";
            message.duration = 1000;
            break;
        case "success":
            message.text = `Success: ${notification.text}`;
            message.color = "steelblue";
            message.duration = 2000;
            break;
    }

    // Return final message object
    return message;
};

/* Task 3: Function to check payment for correctness */

const checkPayment = (payment) => {
    if (!payment.user) {
        throw new Error("You can not set purchase without user");
    } else if (!payment.isNeedNotify) {
        return "no_notification";
    } else if (payment.amount < 0) {
        return "wrong amount";
    } else if (!payment.description) {
        return "empty description";
    } else {
        return "correct";
    }
};

/* Task 4: Function to format number */

const numberFormatter = (numb, format) => {
    let formattedNumber;
    const formatList = ["integer", "double", "roundUp", "roundDown", "abs"];
    if (isNaN(numb) || typeof numb != "number") {
        throw new Error("Provide number to format");
    }
    if (!formatList.includes(format) || !format) {
        throw new Error("Format is incorrect");
    }
    switch (format) {
        case "integer":
            formattedNumber = parseInt(numb);
            break;
        case "double":
            if (numb % 1 == 0) {
                formattedNumber = numb + ".00";
            } else {
                formattedNumber = numb;
            }
            break;
        case "roundUp":
            if (numb % 1 == 0) {
                while (numb % 5 != 0) {
                    numb++;
                }
                formattedNumber = numb;
            } else {
                numb = parseInt(numb);
                if (numb % 5 != 0) {
                    while (numb % 5 != 0) {
                        numb++;
                    }
                    formattedNumber = numb;
                } else {
                    do {
                        numb++;
                    } while (numb % 5 != 0);
                    formattedNumber = numb;
                }
            }
            break;
        case "roundDown":
            if (numb % 1 == 0) {
                while (numb % 5 != 0) {
                    numb--;
                }
                formattedNumber = numb;
            } else {
                numb = parseInt(numb);
                if (numb % 5 != 0) {
                    while (numb % 5 != 0) {
                        numb--;
                    }
                    formattedNumber = numb;
                } else {
                    formattedNumber = numb;
                }
            }
            break;
        case "abs":
            formattedNumber = Math.abs(numb);
            break;
    }
    return formattedNumber;
};

/* Task 5: Function get correct platform */

const getPlatform = (pltfrmSettings) => {
    if (!pltfrmSettings || typeof (pltfrmSettings) != 'object' || Array.isArray(pltfrmSettings)) {
        throw new Error('incorrect values');
    }
    
    const os = ['android', 'ios', 'windows', 'linux', 'macos'];
    const screenWidth = [480, 960, 1440];

    if (pltfrmSettings.os == os[0] | pltfrmSettings.os == os[1] && pltfrmSettings.screenWidth == screenWidth[0]) {
        return 'mobile';
    } else if (pltfrmSettings.os == os[0] | pltfrmSettings.os == os[1] | pltfrmSettings.os == os[2] && pltfrmSettings.screenWidth == screenWidth[1]) {
        return 'tablet';
    } else if (pltfrmSettings.os == os[2] | pltfrmSettings.os == os[3] | pltfrmSettings.os == os[4] && pltfrmSettings.screenWidth == screenWidth[2]) {
        return 'laptop'
    } else {
        return 'unknown platform'
    }
}
