class DateTime {
    constructor(date, time) {
      this.date = new Date(`${date} ${time}`);
      this.time = time;
      this.currentDateTime = new Date();
    }

    get timestamp(){
        return Date.parse(this.date);
    }

    //test for timestamp working
    get dateFormatted(){
        return new Date(Date.parse(this.date));
    }

    //current timestamp can be used to compare.
    get currentDateTimestamp(){
        return Date.parse(this.currentDateTime);
    }

    //time difference for disabling
    get timeDifference(){
        return Number(Math.abs(Date.parse(new Date(Date.parse(this.date) - Date.parse(this.currentDateTime)))) / 36e5);
    }
}

export default DateTime;