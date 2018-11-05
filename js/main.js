
window.onload = function () {
    // Declaration of variables and constants
    const startButton = document.getElementById("start");
    const buttonInside = document.getElementsByClassName("button__inside")[0];
    const numberOfBlocks = document.getElementById("numberOfBlocks");
    const numberOfBlocksInfo = document.getElementById("numberOfBlocks-info");
    const infoButton = document.getElementsByClassName("button--secondary")[0];
    const modalBox = document.getElementsByClassName("modal-box")[0];
    const closeInfoButton = document.getElementsByClassName("button")[2];
    const timer = document.getElementById("timer");
    let timesClicked = 0;

    // Get info about quantity of blocks
    numberOfBlocks.oninput = function () {
        numberOfBlocksInfo.innerHTML = this.value;
    };

    // Show modal box of instructions
    infoButton.addEventListener("click", function () {
        modalBox.classList.remove("hidden");
    });

    // Close modal box of instructions
    closeInfoButton.addEventListener("click", function () {
        modalBox.classList.add("hidden");
    });

    // Run application after click on play button
    startButton.addEventListener("click", function () {
        timesClicked++;
        // Run app (odd click)
        if (timesClicked % 2 != 0) {
            // Change symbol in play button
            buttonInside.classList.toggle("fa-play");
            buttonInside.classList.toggle("fa-stop");
            // Removes all blocks in timeline
            resetBlocks();
            generateBlocks();
            startTimer();
        }
        // Stop / reset app (even click)
        else {
            // Change symbol in play button
            buttonInside.classList.toggle("fa-play");
            buttonInside.classList.toggle("fa-stop");
            // Removes all blocks in timeline
            resetBlocks();
            timer.innerHTML = ("press start");
        }
    });

    // Get currently time and update it every second
    setInterval(updateTime, 1000);
    // Scroll timeline box to current time
    setTimeout(centerViewCurrentTime, 1000);
};





// Get currently time
function updateTime() {
    // Declaration of variables and constants
    const currentTime = document.getElementsByClassName("current-time")[0];
    const time = new Date();
    const timeMinutes = time.getMinutes();
    const timeHours = time.getHours();
    // The height is equal to the proportion of time to the height of the timeline
    const hourHeight = 4.16666667;
    const minuteHeight = 4.16666667 / 60;
    const timeOnTimeline = (hourHeight * timeHours + minuteHeight * timeMinutes + "%");

    // Set position to current time in timeline
    currentTime.style.top = timeOnTimeline;
    return timeOnTimeline
}




// Scroll timeline box to current time
function centerViewCurrentTime() {
    const currentTime = document.getElementsByClassName("current-time")[0].scrollIntoView({block: "center"});
}




// Removes all blocks in timeline
function resetBlocks() {
    // Declaration of variables and constants
    const timelineTask = document.getElementsByClassName("timeline__tasks")[0];
    const currentTime = document.getElementsByClassName("current-time")[0];

    //Until the blocks in timeline are available - delete them
    while (timelineTask.lastChild) {
        if (timelineTask.lastChild == currentTime) {
            break
        }
        else {
            timelineTask.removeChild(timelineTask.lastChild);
        }
    }
}




// Create new time blocks
function generateBlocks() {
    // Declaration of variables and constants
    const timeOnTimeline = updateTime();
    const timeLineTask = document.getElementsByClassName("timeline__tasks")[0];
    const numberOfBlocks = document.getElementById("numberOfBlocks").value;
    const addInfo = document.getElementsByClassName("addInfo")[0];

    // Generate one block of time
    function OneBlock(timeLineHeight, typeOfBlock, timeOnTimeline, timeLineTask) {
        sumOfTime = sumOfTime + timeLineHeight;
        const block = document.createElement("div");
        block.classList.add("task", typeOfBlock);
        const blockHeight = parseFloat(timeOnTimeline) + sumOfTime - timeLineHeight;

        // Constructor for create one peroid in block
        function Peroid(typeOfPeroid) {
            const peroid = document.createElement("div");
            peroid.classList.add(typeOfPeroid);
            block.appendChild(peroid);
        }

        // if the block has no time during the day, it will not be created
        if (blockHeight < 95) {
            block.style.top = blockHeight + "%";
            timeLineTask.appendChild(block);
        }
        else {
            addInfo.innerHTML = ("Is too late to more work. Go to sleep 😴");
        }

        // Creates 4 tasks and 3 short breaks included in one block
        if (timeLineHeight == 7.98611116) {
            for (y = 0; y < 4; y++) {
                const oneWork = new Peroid(("task__single", "task__single--work"));
                if (y == 3) {
                    break
                }
                const oneshortBreak = new Peroid(("task__single", "task__single--break"));
            }
        }
    }

    // Creating as many blocks as user want
    for (var i = 0, sumOfTime = 0; i < numberOfBlocks; i++) {
        // the last stage without a break at the end
        if (i == numberOfBlocks - 1) {
            const oneblockofWork = OneBlock(7.98611116, ("task--work"), timeOnTimeline, timeLineTask);
        }
        else {
            const oneblockofWork = OneBlock(7.98611116, ("task--work"), timeOnTimeline, timeLineTask);
            const oneblockofBreak = OneBlock(2.0833334, ("task--break"), timeOnTimeline, timeLineTask);
        }
    }
}




function startTimer() {
    // Declaration of variables and constants
    const startButton = document.getElementById("start");
    const numberOfBlocks = document.getElementById("numberOfBlocks").value;
    const timeouts = [];

    // Added event listener to start button
    startButton.addEventListener("click", function () {
        // clear all intervals / runing timers
        for (let i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        // clearInterval(interval);
    });


    // Constructor for one timer for example - work 25', break 5'
    function OneTimer(minutes, seconds) {
        // Declaration of variables and constants
        let timeWorkMinutes = minutes;
        let timeWorkSeconds = seconds;
        const timer = document.getElementById("timer");
        // timer will be updater every 1 sec
        const interval = setInterval(countDown, 1000);

        // Count down from AA:BB to 00:00
        function countDown() {
            // if we have 0 seconds, subtract 1 from the minute
            if (timeWorkSeconds == 00) {
                timeWorkMinutes--;
                timeWorkSeconds = 59;
            }
            else if (timeWorkSeconds > 0) {
                timeWorkSeconds--;
            }
            // if second are <=9 show additionaly 0 - for example: 09, 08..
            if (timeWorkSeconds <= 9) {
                timeWorkSeconds = "0" + timeWorkSeconds;
            }
            // if end get info about it
            if (timeWorkMinutes == 00 && timeWorkSeconds == 00) {
                timer.innerHTML = "End";
                clearInterval(interval);
                return
            }
            // Display time
            timer.innerHTML = timeWorkMinutes + ":" + timeWorkSeconds;
            // Display time in title website
            document.querySelector('title').textContent = timeWorkMinutes + ":" + timeWorkSeconds + " PROmodoro";
        }

        startButton.addEventListener("click", function () {
            clearInterval(interval);
        });
    }

    //Setting time intervals for each stage
    for (let i = 0, temporaryTime = 0, workNumb = 0, endOfBlock = 0; endOfBlock < numberOfBlocks;) {
        // Time for work
        if (i == 0 || workNumb == 0) {
            timeouts.push(setTimeout(function () {
                const work = new OneTimer(25, 00);
            }, temporaryTime));
            workNumb++;
            i++;
        }
        else if (i % 2 == 0 && i != 1 && workNumb != 4) {
            timeouts.push(setTimeout(function () {
                const work = new OneTimer(25, 00);
            }, temporaryTime = temporaryTime + 300000));
            workNumb++;
            if (workNumb == 4) {
                endOfBlock++;
            }
            i++;
        }
        // Time for short break
        else if (i % 2 == 1 && workNumb != 4) {
            timeouts.push(setTimeout(function () {
                const shortBreak = new OneTimer(05, 00);
            }, temporaryTime = temporaryTime + 1500000));
            i++;
        }
        // Time for long break
        else if (i % 2 == 1 && workNumb == 4) {
            timeouts.push(setTimeout(function () {
                const longBreak = new OneTimer(30, 00);
            }, temporaryTime = temporaryTime + 1500000));
            setTimeout(workNumb = 0, temporaryTime = temporaryTime + 1800000);
            i++;
        }
    }
}










