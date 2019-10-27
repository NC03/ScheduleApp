class Time {
    constructor(dayOfWeek, startTime, endTime) {
        this.dayOfWeek = dayOfWeek
        this.startTime = startTime
        this.endTime = endTime
    }
    sameDay(day) {
        return this.dayOfWeek == day.getDay()
    }
    inRange(day) {
        var after = (day.getHour > this.startTime.getHour()) || (day.getHour == this.startTime.getHour() && day.getMinutes() >= this.startTime.getMinutes())
        var before = (day.getHour < this.endTime.getHour()) || (day.getHour == this.endTime.getHour() && day.getMinutes() <= this.endTime.getMinutes())
        return after && before
    }
}

class Course {
    constructor(title, t) {
        this.title = title
        this.times = t
    }

    equals(b) {
        return this.title == b.title
    }
}

class Assignment {
    statuses = ["Incomplete", "InProgress", "Complete"]
    categories = [ "Test", "Event", "Project"]//"Assignment"

    constructor(duedate, c, title, category) {
        this.course = c
        this.duedate = duedate
        this.title = title
        this.status = this.statuses[0]
        this.category = category
    }

    getCategory() {
        return this.category
    }
    getStatus() {
        return this.status
    }
}


var courses = [
    new Course("Period 1", [new Time(1, new Date(0, 0, 0, 7, 55, 0, 0), new Date(0, 0, 0, 8, 45, 0, 0))]),
    new Course("Period 2", [new Time(1, new Date(0, 0, 0, 8, 55, 0, 0), new Date(0, 0, 0, 9, 45, 0, 0))]),
    new Course("Period 3", [new Time(1, new Date(0, 0, 0, 10, 30, 0, 0), new Date(0, 0, 0, 11, 20, 0, 0))]),
    new Course("Period 4", [new Time(1, new Date(0, 0, 0, 11, 30, 0, 0), new Date(0, 0, 0, 12, 20, 0, 0))]),
    new Course("Period 5", [new Time(1, new Date(0, 0, 0, 13, 05, 0, 0), new Date(0, 0, 0, 13, 55, 0, 0))]),
    new Course("Period 6", [new Time(1, new Date(0, 0, 0, 14, 05, 0, 0), new Date(0, 0, 0, 14, 55, 0, 0))])
]