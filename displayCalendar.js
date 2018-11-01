let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
const available_Month =["January","February","March","April","May","June","July","August","September","October","November","December"];

function updateCalendar(){
    //Because current month can be changed by display_next_month and display_prev_month
    //we want to make a variable called real_month based on "currentMonth".
    let real_month = new Month(currentYear, currentMonth);
    let weeks = real_month.getWeeks();
    Month_Name = available_Month[real_month.month];
    document.getElementById("month_alert").textContent = "" + Month_Name + " " + currentYear;
    if (weeks.length == 5 && document.getElementById("day36") != null) {
        for (let i =0; i<7; i++) {
            document.getElementById("day"+(i+36)).innerHTML= null;
        } 
    }
    let days_week0 = weeks[0].getDates();
    for (let i =0; i<days_week0.length; i++) {
        document.getElementById("day"+(i+1)).innerHTML= days_week0[i].getDate();   
    }
    let days_week1 = weeks[1].getDates();
    for (let i =0; i<days_week1.length; i++) {
        document.getElementById("day"+(i+8)).innerHTML= days_week1[i].getDate();   
    }
    let days_week2 = weeks[2].getDates();
    for (let i =0; i<days_week2.length; i++) {
        document.getElementById("day"+(i+15)).innerHTML= days_week2[i].getDate();   
    }    
    let days_week3 = weeks[3].getDates();
    for (let i =0; i<days_week3.length; i++) {
        document.getElementById("day"+(i+22)).innerHTML= days_week3[i].getDate();   
    }
    let days_week4 = weeks[4].getDates();
    for (let i =0; i<days_week4.length; i++) {
        document.getElementById("day"+(i+29)).innerHTML= days_week4[i].getDate();   
    }
    if (weeks.length == 6) {
        let days_week5 = weeks[5].getDates();
        for (let i =0; i<days_week5.length; i++) {
            document.getElementById("day"+(i+36)).innerHTML= days_week5[i].getDate();
        }        
    }    
}
			
document.addEventListener("DOMContentLoaded", updateCalendar, false);

// DK OCT 20 implemented prev, next month button to move around the calendar by month
document.getElementById("prev_month_btn").addEventListener("click", function(event){
    if(currentMonth == 0){
        currentYear = currentYear - 1;
        currentMonth = 11;
    }else {
    currentMonth = currentMonth - 1;
    }
    updateCalendar(); //this updates the calendar and changes month and dates
}
, false);



document.getElementById("next_month_btn").addEventListener("click", function(event) {
    if(currentMonth == 11){
        currentYear = currentYear + 1;
        currentMonth = 0;
    }else {
    currentMonth = currentMonth + 1;
    }
    
    updateCalendar(); //this updates the calendar and changes month and dates
}, false);