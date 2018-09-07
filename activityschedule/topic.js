var topic = [
    "掃地",
    "自由活動",
    "環境準備",
    "桌遊",
    "運動",
    "電影"
];

var startDate = new Date();

function setMonthAndDay(startYear,startMonth,startDay)   
{
    startDate.setFullYear(startYear,startMonth-1,startDay);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}

