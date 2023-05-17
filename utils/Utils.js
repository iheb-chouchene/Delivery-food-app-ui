function isValidEmail(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
    if (value == "") {
        setEmailError("")
    }
    else if (isValidEmail(value)) {
        setEmailError("")
    }
    else {
        setEmailError("Invalid Email")
    }
}

function validatePassword(value, setPasswordError) {
    if (value.length < 9) {
        setPasswordError("Password must be 9 characters")
    } else {
        setPasswordError("")
    }
}

function validatecPassword(value, setcPasswordError) {
    if (value.length < 9) {
        setcPasswordError("Confirm Password must be 9 characters")
    } else {
        setcPasswordError("")
    }
}
function validatePhone(value, setPhoneError) {
    if (value.length < 9) {
        setPhoneError("Phone number must be 8 number")
    } else {
        setPhoneError("")
    }
}
function validateAddress(value, setAddressError) {
    if (value.length < 9) {
        setAddressError("")
    } else {
        setAddressError("")
    }
}
const utils = {
    isValidEmail,
    validateEmail,
    validatePassword,
    validatecPassword,
    validatePhone,
    validateAddress
};

export default utils;