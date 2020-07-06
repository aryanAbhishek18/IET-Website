// const PORT = 3000;
// const requestURL = `http://localhost:${PORT}`;

$('#contact-us-form').submit(function(e) {
    e.preventDefault();
    let emptyDetail = '';

    if($('#form-name-input').val() === '') emptyDetail = 'name';
    else if($('#form-email-input').val() === '') emptyDetail = 'email';
    else if($('#form-subject-input').val() === '') emptyDetail = 'subject';
    else if($('#form-message-input').val() === '') emptyDetail = 'message';
    
    console.log(emptyDetail);

    if(emptyDetail !== '')
    {
        $('#form-error-ajax').html(`
            <img src="./images/flaticon/error.png" class="error-icon">
            <i class="error-text">Fill your ${emptyDetail} first!</i>
        `);
        return false; 
    }

    $.ajax({
        url: "http://localhost:3000/api/saveMessage",
        type: "POST",
        data: $('#contact-us-form').serialize(),
        success: (response)=>{
            if(response.saved==="yes"){
                $('#form-error-ajax').html(`
                    <img src="./images/flaticon/success.png" class="success-icon">
                    <i class="success-text">Message sent successfully!</i>
                `);
            }
            else{
                $('#form-error-ajax').html(`
                    <i class="error-text">${response.err}!</i>
                `);
            }
        },
        error: (error)=>{
            console.log('Some error occurred!');
            $('#form-error-ajax').html(`
                <i class="error-text">${error.message}!</i>
            `);
        }
    });
});