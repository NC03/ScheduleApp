
function dateCheck(){
    document.getElementById("Assignment--container").innerHTML = "";
    for(var i=0;i<assignments.length; i++){
        if(assignments[i].duedate.getDate()==new Date(0,new Date().getMonth(),new Date().getDate()+1).getDate()){
            var em = document.createElement("DIV");
            em.addEventListener("click", (arg) => {
                console.log(arg)
            })
            var months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "July",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec"
            ]
            em.innerHTML = assignment.category + ": " + assignment.title + " in " + assignment.course.title + " on " + months[assignment.duedate.getMonth()] + " " + (assignment.duedate.getDate() + 1);

            em.appendChild(createBtn(assignment));
            document.getElementById(assignment.category + "--container").appendChild(em);
        }
    }
    
}