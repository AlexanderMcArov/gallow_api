const FgYellow = "\x1b[93m"
const FgGreen = "\x1b[92m"
const accesLog = function (a, b) {
    console.log(FgYellow + '[' + a + ']:' + FgGreen + ' ' + b)
}
module.exports = {
    FgGreen,
    FgYellow,
    accesLog
}