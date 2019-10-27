
function dateCheck(){
    for(var i=0;i<assignments.length; i++){
        if(assignments[i].duedate.getDate()==new Date(0,new Date().getMonth(),new Date().getDate()+1).getDate()){
            return(assignments[i])
        }
    }
}