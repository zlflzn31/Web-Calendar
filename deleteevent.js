function delete_event(event) {
    let delete_event_name = document.getElementById("event_delete").value;
    let data = {'delete_event': encodeURIComponent(delete_event_name)};
    fetch("deleteevent.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then((data) => {
            if(data.success) {
                alert(data.error_control);
                document.getElementById("event_name_delete").value="";
                getEvent();
                updateCalendar();    
         
          
            } else {
                alert(data.error_control);
                document.getElementById("event_name_delete").value="";
                updateCalendar();
            }               
        });
}
document.getElementById("event_delete_button").addEventListener("click", delete_event, false);
document.getElementById("event_delete_button").addEventListener("click", getEvent, false);