// "document.ready" makes sure that our JavaScript doesn't get run until the HTML document is finished loading.
$(document).ready(function() {

// display current day on the top

    // moment().format('MMMM Do YYYY, h:mm:ss a');

    $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));



// TASK 1 create my div rows for the calender
    // A. time array
        //  1. 800-1900
        let hours = ["8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM"];

        var timeBlock = $(".time-block");        
        

    // B. Loop through that
        
        // 1. display timeblocks for standard business hours 
        for (let i=0; i < hours.length; i++) {

            var row = $("<div>").attr("class", "row");
            let hour = $("<div>").attr("class", "col-2 hour");
            let text = $("<input>")
            // var currentHourMilitary = 17;
            var currentHourMilitary = moment().format("H");
            var schedulehours = moment(hours[i], "hA").format("H");
            console.log("schedulehours" + schedulehours);
            console.log("currenthourMilitary" + currentHourMilitary);

            // convert moment to integers by parseInt
            currentHourMilitary = parseInt(currentHourMilitary);
            schedulehours = parseInt(schedulehours);
         // 2. color coding - past, present, future  
            if (schedulehours == currentHourMilitary) { 
                text.attr("class", "col-8 present")
                console.log("present");
            } else if (schedulehours < currentHourMilitary) {
                text.attr("class", "col-8 past");
                console.log("past");
            } else {
                text.attr("class", "col-8 future");
                console.log("future")
            };

        // 3. add save buttons and icons
            var saveBtn = $("<button>").attr("class", "col-2 saveBtn");

            var icon = $("<i>").attr("class", "fas fa-save");

            saveBtn.append(icon);

        // 4. loop through hour text in hour column
            let hourText = $("<p>");
            hourText.text(hours[i]);
            hour.append(hourText);

            // append time block, hour, text, and save button
            timeBlock.append(row);
            row.append(hour, text, saveBtn);

    // C. Save events in local storage and saved events exist when refreshing the page 

        //5. Get textObject from localStorage
        // Parsing the JSON string to an objec

            let textObject = {};
            if (JSON.parse(localStorage.getItem("events")) != null) {
                textObject = JSON.parse(localStorage.getItem("events"));
            } 

             // make sure the saved events exist when refreshing the page
            if (textObject[hours[i]]) {
                text[0].value = textObject[hours[i]];
            }

            // 3. when I click save button, text inside text area will be stored in the local storage
            saveBtn.on("click", function(){
                
                // Get textObject from localStorage
                // Parsing the JSON string to an object
                let textObject = JSON.parse(localStorage.getItem("events"));

                // if texts are empty in the storage, then create an empty object
                if (textObject === null) {
                    textObject = {};
                }

                // match the key of the current hour to the value of the user input
                textObject[hours[i]] = text[0].value;


                // Stringify and set "events" key in localStorage to text object 
                localStorage.setItem("events", JSON.stringify(textObject));
                console.log(text);

            });
        }
        
  
  });

  