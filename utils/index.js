

const currentTimeInSeconds = Math.floor(Date.now() / 1000);
const currentTimeInMiliSeconds = Math.floor(Date.now());

const convertMinuteInseconds=(min)=>min*60


module.exports ={
    currentTimeInSeconds,
    convertMinuteInseconds,
    currentTimeInMiliSeconds
}