Vue.filter('currency', function (value) {
    return 'R$ ' + parseFloat(value).toFixed(2);
});

Vue.filter('percentage', function (value) {
    return parseFloat(value).toFixed(2) + '%';
});

var app = new Vue({
    el: '#app',
    data () {
        return {
            ChangeinTimeTaken: 0,
            InitialCostInvestment: 0,
            WorkDayHours: 0,
            NumberOfUsers: 0,
            ExpectedProjectLife: 0,
            LoadedSalaryTrainee: 0,
            DaysPerYear: 0
        }
    },
    computed: {
        resutlFGI() {
            var temp  = this.DaysPerYear * this.WorkDayHours;
            return (this.NumberOfUsers * (this.LoadedSalaryTrainee/temp) * this.ChangeinTimeTaken) * ((Math.pow(1.05,this.ExpectedProjectLife) -1)/0.05) -  (this.InitialCostInvestment * (Math.pow(1.05,this.ExpectedProjectLife)))
        },
        resultFuture () {
            if (this.resutlFGI){
                TGI = this.resutlFGI/(Math.pow(1.05,this.ExpectedProjectLife))
                return Math.round( 100 * TGI)/ 100 
            } else {
                return 0 
            }
        },
        resultBest () {
            if (this.resultFuture > 0)
                return this.resultFuture/this.ExpectedProjectLife
            return 0
        },
        resultRoi () {
            if (this.resultFuture > 0)
                return this.resultFuture/this.InitialCostInvestment
            return 0
        }
    }
})