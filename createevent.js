function check_date(event,year,month,day,hour,minute){
    if(event === ""){
            alert("You haven't added a title!");
            return false;
        }
    if(month === "4"|| month === "6" || month === "9" || month === "11"){
            if(day <= 0 || day >30){
                alert("There are only 30 days in this month!");
                return false;
            }
    }else if(month === "2"){
        if(year % 4 == 0){
            if(day<=0 || day >29){
                alert("There are 29 days in this month!");
                return false;
            }
        }else{ 
            if(day<=0 || day >28){
                alert("There are 28 days in this month!");
                return false;
                }
        }
        
    }else{
        if(day<=0 || day >31){
            alert("There are 31 days in this month!");
            return false;
        }
    }
    return true;
}


function create_event(event) {
  let event_title = document.getElementById("event_title").value;
  let event_year = document.getElementById("event_year").value;
  let event_month = document.getElementById("event_month").value;
  let event_day = document.getElementById("event_day").value;
  let event_hour = document.getElementById("event_hour").value;
  let event_minute = document.getElementById("event_minute").value;
  let event_category = document.getElementById("event_category").value;
  let shared_username = document.getElementById("shared_username").value;
  if(check_date(event_title,event_year,event_month,event_day,event_hour,event_minute)){
     let data = {'event_title': event_title,
                 'event_year':event_year,
                 'event_month':event_month,
                 'event_day':event_day,
                 'event_hour':event_hour,
                 'event_minute':event_minute,
                 'event_category':event_category,
                 'shared_username':shared_username
     };
     fetch("addevent.php", {
       method: 'POST',
       body: JSON.stringify(data),
       headers: { 'content-type': 'application/json' }
     })
     .then(response => response.json())
     .then((data) => {
        if (data.success) {
           alert(data.error_control);
        }
        else{
           alert(data.error_control); 
        }
     });    
  }else{
          alert("event not created! Something is wrong with your event inputs");
  }
}

document.getElementById("submit").addEventListener("click", create_event, false);