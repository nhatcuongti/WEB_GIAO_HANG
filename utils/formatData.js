export default{
    increaseDriverID(arr){
        if(Object.keys(arr).length === 0)
            return '0'

        for(var i = 0; i < 100; i++){
            var check = 0;
            arr.forEach(function (e){
                if(e.MATX === (i.toString()))
                    check = 1;
            })
            if(check === 0)
                return i.toString()
        }
    },
    increaseClientID(arr){
        if(Object.keys(arr).length === 0)
            return '0'

        for(var i = 0; i < 100; i++){
            var check = 0;
            arr.forEach(function (e){
                if(e.MaKH === (i.toString()))
                    check = 1;
            })
            if(check === 0)
                return i.toString()
        }
    },
    increaseOrderID(arr){
        if(Object.keys(arr).length === 0)
            return '0'

        for(var i = 0; i < 100; i++){
            var check = 0;
            arr.forEach(function (e){
                if(e.MaDH === (i.toString()))
                    check = 1;
            })
            if(check === 0)
                return i.toString()
        }
    },
    addMonths(date, months) {
        var d = date.getDate();
        date.setMonth(date.getMonth() + +months);
        if (date.getDate() != d) {
            date.setDate(0);
        }
        return date;
    }
}