//TERM AND INTEREST FUNCTIONS..
//function to check repayment terms(number of repayments/months for repayment)
function termCheck(loanType) {
    var terms;
    //Check Loan Types and set the interest rate and terms
    if (loanType == "express") {
        terms = 1;
    } else {
        terms = 3;
    }
    terms = parseInt(terms);
    return terms;
}
//function to check interest rate the different
function interestCheck(loanType) {
    var interestRate;
    //Check Loan Types and set the interest rate and terms
    if (loanType == "express") {
        interestRate = 0.3;
    } else {
        interestRate = 0.2;
    }
    interestRate = parseFloat(interestRate).toFixed(2);
    return interestRate;
}

//function to check the first dueDateCheck
function dueDateCheck(loandate) {
    var loanTaken = new Date(loandate);
    var yr = loanTaken.getFullYear();
    var mon = loanTaken.getMonth();

    //initializing a variable of due date of first payment.
    var dateDue;

    //20th day of the month calculation
    var day20 = new Date(yr, mon, 20);
    if (loanTaken >= day20) {
        dateDue = new Date(yr, mon + 2, -0); //end of the next month
    } else {
        dateDue = new Date(yr, mon + 1, -0); //last day of this month
    }
    return dateDue;
}


function getValues() {
    event.preventDefault();
    //button click gets values from inputs
    var loanAmount = parseFloat(document.getElementById("principal").value);
    // var loanType = document.getElementById("loanType").value;
    var loanDate = document.getElementById('loanDateValue').value;
    loanDate = new Date(loanDate);

    var loanInterest = interestCheck(loanType);
    var loanTerm = termCheck(loanType);
    var dueDate = dueDateCheck(loanDate);

    //in case of a re-calc, clear out the div!
    $('#Result').empty();

    //Returns div string if inputs are valid
    $('#Result').html(amort(loanAmount, loanInterest, loanDate, dueDate, loanTerm));
}
/** Amort function:
 * Calculates the necessary elements of the loan using the supplied user input
 * and then displays each months updated amortization schedule on the page
 */
function amort(loanAmount, loanInterest, loanDate, dueDate, loanTerm) {
    var totalDue = monthlyPrincipal + interestDue; //total amount a client is expected to pay at a particular day

    var reducingBalance = loanAmount; //initiated as the loan amount
    var monthlyPrincipal = loanAmount /
        loanTerm; // loan amount divided b the number of repayments here in called terms

    var interestDue; //interest amount calculated on the reducing loan amount
    /**REWORK THIS **/
    var reducingBalanc = reducingBalance * (loanInterest / (1 - Math.pow(1 + loanInterest, -loanTerm))); // REWORK THIS**
    var dueDatein = dueDate; // due date used inside loop
    dueDatein = new Date(dueDatein.getFullYear(), dueDatein.getMonth() + 1, -0); //setting the due date to the last date of the month
    var mon;
    var yr;
    var dueDateString;
    var totalRepayment;
    var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    //total paid formula
    if (loanType == "express") {
        totalRepayment = loanAmount * 1.3;
    } else /* if (loanType == "term") */ {
        totalRepayment = loanAmount * 2;

    }
    /* else{
        alert("invalid input");
      }
      */

    //begin building the return string for the display of the amort table
    $('#Result').append("Loan amount: MK" + reducingBalance.toFixed(2) + "<br />" +
        "Interest rate: " + (loanInterest * 100).toFixed(2) + "%<br />" +
        "Number of months: " + loanTerm + "<br />" +
        "Monthly payment: MK" + monthlyPrincipal.toFixed(2) + "<br />" +
        "Loan was taken on : " + loanDate.toLocaleDateString("en-GB") + "<br>" +
        "First Repayment Due on : " + dueDatein.toLocaleDateString("en-GB") + "<br>" +
        "Total paid: MK" + totalRepayment.toFixed(2) + "<br />");

    //add header row for table to return string
    $('#Result').append("<table >" +
    "<tr><th>Month #</th><th>Payment Date </th><th>Interest</th>" +
        "<th> Balance Due </th><th> Principal</th></tr>");

    for (var count = 0; count < loanTerm; count++) {

        //start a new table row on each loop iteration
        $('#Result').append("<tr>");

        //Payment Number
        $('#Result').append("<td>" + (count + 1) + "</td>");

        //date payment is due
        dueDatein = new Date(dueDatein.getFullYear(), dueDatein.getMonth() + 1, -0);
        yr = dueDatein.getFullYear();
        mon = dueDatein.getMonth() + 1;

        //converting the due date to a ease readable string
        dueDateString = dueDatein.toLocaleDateString("en-GB", options);
        $('#Result').append("<td>" + dueDateString + "</td>");

        //incrementing the date for the next iteration
        dueDatein = new Date(yr, mon + 1, -0);

        //interest amount due for payment
        interestDue = reducingBalance * loanInterest;
        $('#Result').append("<td> MK " + interestDue.toFixed(2) + "</td>");

        //the payment due at a particular iteration
        totalDue = monthlyPrincipal + interestDue;
        $('#Result').append("<td> MK " + totalDue.toFixed(2) + "</td>");
        totalRepayment += totalDue;

        //monthly principal amount
        $('#Result').append("<td> MK " + monthlyPrincipal.toFixed(2) + "</td>");

        //Loan Amount balance without interest
        $('#Result').append("<td> MK " + reducingBalance.toFixed(2) + "</td>");

        //Table Row closing tag
        $('#Result').append("</tr>");

        //decrement the balance at the end of each iteration
        reducingBalance -= monthlyPrincipal;
    }
    //$("table").addClass("ui celled table unstackable");

        //table closing tag
        $('#Result').append("</table>");

    }
