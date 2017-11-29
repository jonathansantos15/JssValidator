var ARRAY_VALIDATIONS = [];
var RETURN_RESULT = [];

function JssValidator(){
    init();
}

JssValidator.prototype.AddValidation = function (selector, functionValidation, errorMessage) {
    ARRAY_VALIDATIONS.push({
        Selector: selector,
        ValidateFunction: functionValidation,
        ErrorMessage: errorMessage
    });
};

JssValidator.prototype.ValidateMail = function (selector, errorMessage) {

    var mail = GetValue(selector);

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        return GetReturn(selector, true, '');
    else
        return GetReturn(selector, false, errorMessage);
};

JssValidator.prototype.ValidateCNPJ = function (selector, errorMessage) {
    
    var cnpj = GetValue(selector);
    
    cnpj = cnpj.replace(/[^\d]+/g,'');

    if(cnpj == '') 
        return GetReturn(selector, false, errorMessage);
    
    if (cnpj.length != 14)
        return GetReturn(selector, false, errorMessage);

    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
    {
        return GetReturn(selector, false, errorMessage);
    }

    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
    {
        return GetReturn(selector, false, errorMessage);
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
    {
        return GetReturn(selector, false, errorMessage);
    }

    return GetReturn(selector, true, '');
};

JssValidator.prototype.ValidateCPF = function (selector, errorMessage) {

    var strCPF = GetValue(selector);
    
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000" || strCPF == "11111111111" || strCPF == "22222222222"
    || strCPF == "33333333333" || strCPF == "44444444444" || strCPF == "55555555555"
    || strCPF == "66666666666" || strCPF == "77777777777" || strCPF == "88888888888"
    || strCPF == "99999999999") 
        return GetReturn(selector, false, errorMessage);
    
	for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
	Resto = (Soma * 10) % 11;
	
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) 
        return GetReturn(selector, false, errorMessage);
	
	Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
	
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) )
        return GetReturn(selector, false, errorMessage);
        
    return GetReturn(selector, true, '');
}

JssValidator.prototype.ValidateAll = function () {
    
    refreshResult();

    var isValid = true;

    for(var index = 0; index < ARRAY_VALIDATIONS.length; index++)
    {
        var item = ARRAY_VALIDATIONS[index];

        var result;

        result = item.ValidateFunction(item.Selector, item.ErrorMessage);

        RETURN_RESULT.push(result);

        if(!result.IsValid)
            isValid = false;
    }

    return { IsValid: isValid, Validations: RETURN_RESULT };
};

var GetValue = function(selector)
{
    var element = document.querySelector(selector);

    if(element.nodeName == 'INPUT')
        return element.value;
    else if(element.nodeName == 'SELECT')
        return element.value;
};

var init = function()
{
    ARRAY_VALIDATIONS = [];
    RETURN_RESULT = [];
};

var refreshResult = function()
{
    RETURN_RESULT = [];
};

var _isNullOrUndefined = function(term)
{
    if(term == null || term == undefined)
        return true;
    else
        return false;
}

// var _setColorElement = function(selector, errorMessage)
// {
//     var thisItem = document.querySelector(selector);
//     var parentElement = thisItem.parentElement;
//     var newItem = document.createElement("SPAN");  
//     newItem.innerHTML = errorMessage;

//     var hasValidator = false;

//     for(var index = 0; index < thisItem.classList.length; index++)
//     {
//         if(thisItem.classList[index] == 'input-validation-error')
//         {
//             hasValidator = true;
//         }
//     }

//     if(!hasValidator)
//     {
//         thisItem.classList.add('input-validation-error');
//         newItem.classList.add('span-validation-error');
    
//         parentElement.insertBefore(newItem, thisItem.nextSibling);
//     }
// }


// var _removeColorElement = function(selector)
// {
//     var thisItem = document.querySelector(selector);
//     var nextElement = document.querySelector(selector).nextSibling;
    
//     for(var index = 0; index < nextElement.classList.length; index++)
//     {
//         if(nextElement.classList[index] == 'span-validation-error')
//         {
//             nextElement.remove();
//             thisItem.classList.remove('input-validation-error');
//             break;
//         }
//     }
// }

var GetReturn = function(selector, result, errorMessage)
{
    return { Element: selector, IsValid: result, Message: errorMessage };
};
