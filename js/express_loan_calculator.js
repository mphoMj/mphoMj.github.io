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

function clearAll() {
  $('form').form('clear');
  $('#Result').empty();

}

function getValues() {
  event.preventDefault();

  //button click gets values from inputs
  var loanAmount = parseFloat(document.getElementById("principal").value);
  var loanType = document.getElementById("loanType").value;
  var customerName = document.getElementById("customerName").value;
  var loanDate = document.getElementById('loanDateValue').value;
  loanDate = new Date(loanDate);
  var loanInterest = interestCheck(loanType);
  var loanTerm = termCheck(loanType);
  var dueDate = dueDateCheck(loanDate);

  //in case of a re-calc, clear out the div!
  $('#Result').empty();
  $('#repHeader').empty();
  var customerNameCheck = checkInputs(customerName);
  var loanAmountCheck = checkInputs(loanAmount);
  var loanTypeCheck = checkInputs(loanType);
  var loanDateCheck = checkInputs(loanDate);

  if (customerNameCheck && loanAmountCheck && loanTypeCheck && loanDateCheck) {
    //Returns div string if inputs are valid
    //console.log(dueDate);
    $('#Result').html(amort(customerName, loanAmount, loanInterest, loanDate, dueDate, loanTerm));
  } else {
    event.preventDefault();
    //alert("Please fill in the blank Fields");
  }

}

function checkInputs(value) {

  if (value == "" || value == null) {
    return false;
  } else {
    return true;
  }
}
/** Amort function:
 * Calculates the necessary elements of the loan using the supplied user input
 * and then displays each months updated amortization schedule on the page
 */
function amort(customerName, loanAmount, loanInterest, loanDate, dueDate, loanTerm) {
  var totalDue = monthlyPrincipal + interestDue; //total amount a client is expected to pay at a particular day
  //console.log(customerName);
  var outstandingCapital = loanAmount; //initiated as the loan amount
  var monthlyPrincipal = loanAmount / loanTerm; // loan amount divided b the number of repayments here in called terms

  var interestDue; //interest amount calculated on the reducing loan amount
  /**REWORK THIS **/
  //var reducingBalanc = outstandingCapital * (loanInterest / (1 - Math.pow(1 + loanInterest, -loanTerm))); // REWORK THIS**
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
  //  /**total paid formula
  //  if (loanType == "express") {
  //    totalRepayment = loanAmount * 1.3;
  //  } else if (loaindenType == "term") */ {
  //    totalRepayment = loanAmount * 1.4; //this applies if the repayment schedule is followed
  //
  //  }
  // else{
  //      alert("invalid input");
  //    }
  //    */

  //begin building the return string for the display of the amort table
  $('#Result').append(
    "<div><table><tr><td>Company Name: </td><td>Smart Cash Financial Services</td></tr>" +
    "<tr><td> Loan Customer Name: </td><td> " + customerName + "</td></tr>" +

    "<tr><td>Period of Repayment: </td><td>" + loanTerm + " Month(s)</td></tr>" +
    "<tr><td>Principal Amount: </td><td>MK " + (outstandingCapital.toFixed(2)).toLocaleString(3) + "</td></tr>" +
    "<tr><td>Interest rate: </td><td>" + (loanInterest * 100).toFixed(2) + "% per Month Reducing Balance</td></tr>" +

    //  "<div>Monthly payment: MK " + monthlyPrincipal.toFixed(2) + "</div>" +
    "<tr><td>Loan Date : </td><td>" + loanDate.toLocaleDateString("en-GB", options) + "</td></tr>" +
    //"<tr><td>Repayment Due : </td><td>" + dueDatein.toLocaleDateString("en-GB", options) + "</td>"+
    "</tr></table></div>" //+
    //  "<div>Total to be paid: MK " + (totalRepayment.toFixed(2)).toLocaleString() +
  );

  //add header row for table to return string
  var repaymentTable = "<table >" +
    "<tr><thead>" +
    "<th></th>" +
    "<th>Due Date </th>" +
    "<th>Total Repayment</th>" +
    "<th>Principal</th>" +
    "<th>Interest </th>" +
    "<th>Outstanding Capital</th>" +
    "</thead></tr>";

  for (var count = 0; count < loanTerm; count++) {
    //date payment is due
    dueDatein = new Date(dueDatein.getFullYear(), dueDatein.getMonth() + 1, -0);
    yr = dueDatein.getFullYear();
    mon = dueDatein.getMonth() + 1;

    //converting the due date to readable string
    dueDateString = dueDatein.toLocaleDateString("en-GB", options);

    //incrementing the date for the next iteration
    dueDatein = new Date(yr, mon + 1, -0);

    //interest amount due for payment
    interestDue = outstandingCapital * loanInterest;

    //the  TOTAL rEPAYMENT dUEpayment due at a particular iteration
    totalRepayment = monthlyPrincipal + interestDue;

    //decrement the balance(Outstanding Capital) at the end of each iteration
    outstandingCapital -= monthlyPrincipal;

    /**TABLE CREATION*/

    //start a new table row on each loop iteration
    repaymentTable += "<tr>";

    //Payment Number
    repaymentTable += "<td>" + (count + 1) + "</td>";

    //converting the due date to a ease readable string
    repaymentTable += "<td>" + dueDateString + "</td>";

    //the Total Repayment Due due at a particular iteration
    repaymentTable += "<td> MK " + totalRepayment.toFixed(2) + "</td>";

    //Monthly Principal
    repaymentTable += "<td> MK " + monthlyPrincipal.toFixed(2) + "</td>";

    //interest amount due for payment
    repaymentTable += "<td> MK " + interestDue.toFixed(2) + "</td>";

    //Outstanding Capital
    repaymentTable += "<td> MK " + outstandingCapital.toFixed(2) + "</td>";

    //Table Row closing tag
    repaymentTable += "</tr>";
  }
  //table closing tag
  repaymentTable += "</table>";
  //$(repaymentTable).addClass("ui celled single line table");
  console.log(repaymentTable);
  $('#Result div table').addClass("ui single line compact celled striped table");
  $('#Result').append(repaymentTable);

  $('#Result table').addClass("ui orange single line compact right aligned celled striped table");


}
