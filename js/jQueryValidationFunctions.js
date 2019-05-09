$(document).ready(function() {

    var today = new Date();
    var min = new Date(today.getFullYear(), today.getMonth() - 3, 1);
    var max = new Date(today.getFullYear(), today.getMonth() + 6, -0);
    //var yr = new Date(today.getFullYear());

    $('.ui.calendar').calendar({
        type: 'date',
        monthFirst: false,
        //dateFormat: 'dd/MM/yy',
        yearRange: '2019:c+2',
        disabledDaysOfWeek: [0], //disallow loans on weekends
        minDate: min, //all loan calculations can only be calculates for this month onwards
        maxDate: max,
        changeYear: false,
        changeMonth: false
    });

    //JS to enable dropdown divs
    $('select.dropdown').dropdown();
    //$('ui.selection.dropdown').dropdown();

    $(".ui.form").validate({
        //validation rules
        rules: {
            principal: {
                required: true,
                number: true,
                min:2000
            },
            loanType: {
              required: true,
              on: 'blur'

            },
            loanDateValue: 'required',
            customerName: {
                required: true,
                lettersonly: true,
                maxlength: 200,
                minlength: 4
            }
        },

        // Specify validation error messages
        messages: {
            principal: {
                required: "Please enter an amount",
                number: "Enter a valid Principal Amount",
                min: "Enter an Amount more than K 2000"
            },

            loanType: "Please Select a Loan Type",
            loanDateValue: "Pick a date for the  loan",
            customerName: {
                required: "Enter the Customers Name",
                lettersonly: "A name can only contain Letters and Spaces",
                maxlength: "A Full Name Cannot be that long",
                minlength: "That's too short"
            }
        }

    });
});
