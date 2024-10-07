import moment from "moment"


// moment.locale('zh-cn')

const formatTime = {
    // 根据传入的日期返回对应的时间
    getTime: (date) => {
        return moment(date).format('YYYY/MM/DD');
    }
}

export default formatTime