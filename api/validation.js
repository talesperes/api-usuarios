const Joi = require('joi')

const validateCpf = cpf => {

    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}

const validator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required(),

    birthDate: Joi.date()
        .required(),

    phone: Joi.string()
        .min(13)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    cpf: Joi.string()
        .min(11)
        .max(11)
        .custom((value, helper) => {

            if (validateCpf(value))
                return value;
            else
                return helper.message("CPF is not valid");

        })
        .required(),
    
    password: Joi.string()
            .required(),
    
})

module.exports = {
    validator
}