function Validator(options){
    function validate(inputElement, rule){
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)            
                    
                    if(errorMessage){
                        errorElement.innerText = errorMessage;
                        inputElement.parentElement.classList.add('invalid')
                    }
                    else{
                        errorElement.innerText = "";
                        inputElement.parentElement.classList.remove('invalid')
                    }
    }

    var formElement = document.querySelector(options.form);

    console.log(options.rules)

    if(formElement){
        options.rules.forEach(function(rule){
            var inputElement = formElement.querySelector(rule.selector)
            
            // blur khỏi input
            if(inputElement){
                inputElement.onblur = function(){
                    //value: inputElement.value
                    //test function: rule.test
                    // console.log(rule)
                    validate(inputElement, rule);               
                }
            
            // xử lý khi người dùng nhập input
            inputElement.oninput = function(){
                var errorElement = inputElement.parentElement.querySelector(options.errorSelector)            
                errorElement.innerText = "";
                inputElement.parentElement.classList.remove('invalid')
            }
            }
        })
    }
}
//Định nghĩa rules
//nguyên tắc của rule
//1.có lỗi thì trả lỗi
//2.không lỗi thì trả undefined
//3.không có value thì trả ra nhập trường này.
Validator.isRequired =  function(selector, messenge){
    return {
        selector : selector,
        test: function(value){
            return value.trim() ? undefined : messenge || " Vui lòng nhập trường này"
        }
    };
}
Validator.isEmail =  function(selector,messenge){
      return {
        selector : selector,
        test: function(value){
            var regex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
            return regex.test(value) ? undefined : messenge || "Email không hợp lệ";

            
        }
    };
}
Validator.minLength =  function(selector,min,messenge){
    return {
      selector : selector,
      test: function(value){
           
          return value.length >= min ? undefined : messenge || `Vui lòng nhập tối thiểu ${min} kí tự`;

          
      }
  };
}
Validator.isConfirmed =  function(selector, getConfirmValue,messenge){
    return {
      selector : selector,
      test: function(value){
           
          return value === getConfirmValue() ? undefined : messenge || `Mật khẩu xác nhận chưa khớp`;

          
      }
  };
}