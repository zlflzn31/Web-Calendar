document.getElementById("load_event").addEventListener("click", getEvent, false);

function getEvent(event) {
    
    let xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
        xmlHttp.open("POST", "getEvent.php", true);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
        xmlHttp.addEventListener("load", requestchecker, false);
        xmlHttp.send(null);
}



function requestchecker(event){


    let htmlParent = document.getElementById("schedules");
    let jsonData = JSON.parse(event.target.responseText);
    let curEvent = htmlParent.childElementCount;
    let numEvents = jsonData.event_lists.length;    


    if(htmlParent.childElementCount < numEvents){    

        for(i = curEvent; i < numEvents; i++){
            let event_node = document.createElement("p");

            event_node.appendChild(document.createTextNode("Event : "));
            let event_name_text = document.createTextNode(jsonData.event_lists[i]);
            event_node.appendChild(event_name_text);
            event_node.appendChild(document.createElement("br"));

            event_node.appendChild(document.createTextNode("Time : "));

            let event_date_text = document.createTextNode(jsonData.event_dates[i]);
            event_node.appendChild(event_date_text);

            let event_hour_text = document.createTextNode(" "+ jsonData.event_hours[i]);
            event_node.appendChild(event_hour_text);


            let event_minute_text = document.createTextNode(":"+jsonData.event_minutes[i]);
            event_node.appendChild(event_minute_text);

            event_node.appendChild(document.createElement("br"));
            event_node.appendChild(document.createTextNode("Category : "));
            let event_tag_text = document.createTextNode(jsonData.event_tags[i]);
            event_node.appendChild(event_tag_text);

            event_node.appendChild(document.createElement("br"));
            event_node.appendChild(document.createTextNode("Shared With : "));
            let event_shared_text = document.createTextNode(jsonData.shared_usernames[i]);
            event_node.appendChild(event_shared_text);

            htmlParent.appendChild(event_node);  
            
        }
       
    }
}