$.validate({
    modules : 'jsconf, security, html5',
    onModulesLoaded : function() {
        $.setupValidation(config);
    }
});

var config = {
    form : '#registrationForm',
    errorElementClass: 'notValid',
    borderColorOnError: '',
    errorMessageClass: 'errorMessage',
    errorMessagePosition: 'top',
    validate : {
        Email : {
            validation : 'required email',
            'error-msg-required' : 'The Email field is required.',
            'error-msg-email' : 'The Email field is not a valid e-mail address.'
        },
        Hometown : {
            validation : 'required',
            'error-msg-required' : 'The Hometown field is required.'
        },
        Password : {
            validation : 'custom',
            regexp: '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])(.{6,15})$',
            'error-msg-length' : 'The Password must be at least 6 characters long.',
            'error-msg-custom' : 'Passwords must be at least 6 characters and contain at least 1 uppercase (A-Z), 1 lower case (a-z), 1 number (0-9) and special character (e.g. !@#$%^&amp;*)'
        },
        ConfirmPassword : {
            validation : 'confirmation',
            confirm: 'Password',
            'error-msg' : 'The password and confirmation password do not match.'
        }
    }
};