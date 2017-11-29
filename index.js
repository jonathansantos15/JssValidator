

var validator = new JssValidator();
    
window.onload = function() {
    
    validator.AddValidation("#mailid", validator.ValidateMail, "Email invalido!");
    validator.AddValidation("#cpfId", validator.ValidateCPF, "CPF invalido!");
    validator.AddValidation("#cnpjId", validator.ValidateCNPJ, "CNPJ invalido!");

    document.getElementById("btnSubmit").onclick = function() {
        runValidations();
    };
};

    
function runValidations()
{
    var result = validator.ValidateAll();
    
    alert(JSON.stringify(result));
}
