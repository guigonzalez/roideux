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
            ReductioninTrainingNeeds: 0,
            NumberOfUsers: 0,
            DurationofTraining: 0,
            LoadedSalaryTrainee: 0,
            LoadedSalaryTrainer: 0,
            NumberofClasses: 0,
            DaysPerYear: 0,
            WorkDayHours: 0,
            InitialCostInvestment: 0,
            ExpectedProjectLife: 0
        }
    },
    methods: {
        calculate() {
            return 100;
        }
    },
    computed: {
        resutlFGI() {
            var temp  = this.DaysPerYear * this.WorkDayHours
            var temp1 = 1
            var temp2 = 1
            
            temp1 = this.NumberOfUsers * this.LoadedSalaryTrainee * this.DurationofTraining
            temp2 = this.NumberofClasses * this.LoadedSalaryTrainer * this.DurationofTraining
            
            if ( temp )
                temp1 = temp1 / temp;
            if ( temp )
                temp2 = temp2 / temp;

            return ( temp1 + temp2 ) * (this.ReductioninTrainingNeeds/100) * ((Math.pow(1.05,this.ExpectedProjectLife) -1)/0.05) -  (this.InitialCostInvestment * (Math.pow(1.05,this.ExpectedProjectLife)))
        },
        resultFuture () {

            TGI = this.resutlFGI/(Math.pow(1.05,this.ExpectedProjectLife))

            return Math.round( 100 * TGI)/ 100 
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
    },
    methods: {
        onSubmit: function () {
            console.log('open')
        }
    }
})