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
    increaseTypeProductID(arr){
        if(Object.keys(arr).length === 0)
            return '0'

        for(var i = 0; i < 100; i++){
            var check = 0;
            arr.forEach(function (e){
                if(e.MALOAIHANG === (i.toString()))
                    check = 1;
            })
            if(check === 0)
                return i.toString()
        }
    },
    increaseActivePlace(arr){
        if(Object.keys(arr).length === 0)
            return '0'

        for(var i = 0; i < 100; i++){
            var check = 0;
            arr.forEach(function (e){
                if(e.MAKHUVUC === (i.toString()))
                    check = 1;
            })
            if(check === 0)
                return i.toString()
        }
    },
    addMonths(dateCopy, months) {
        var d = dateCopy.getDate();
        const date = new Date(dateCopy);
        date.setMonth(date.getMonth() + +months);
        if (date.getDate() != d) {
            date.setDate(0);
        }
        return date;
    }
}