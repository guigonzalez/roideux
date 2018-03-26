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
            NumberofCallsperyear: 0,
            CallVolumeReduction: 0,
            DaysPerYear: 0,
            WorkDayHours: 0,
            LoadedSalary: 0,
            LengthofCallTimeUnit: 'Seg',
            AverageLengthofcall: 0,
            InitialCostInvestment: 0,
            ExpectedProjectLife: 0,
        }
    },
    methods: {
        calculate() {
            return 100;
        }
    },
    computed: {
        efficiency() {
            let IIEfficiency = 0
            if ( this.LengthofCallTimeUnit == 'Hs' ) { IIEfficiency = this.AverageLengthofcall}
            if ( this.LengthofCallTimeUnit == 'Min' ) { IIEfficiency = this.AverageLengthofcall / 60}
            if ( this.LengthofCallTimeUnit == 'Seg' ) { IIEfficiency = this.AverageLengthofcall / 3600}
            return parseFloat(IIEfficiency).toFixed(2)
        },
        resutlFGI() {
            let temp = 1
            if ( this.WorkDayHours ) temp = this.DaysPerYear * this.WorkDayHours;
            return (this.NumberofCallsperyear * this.CallVolumeReduction/100 * this.efficiency * (this.LoadedSalary/temp)) * ((Math.pow(1.05,this.ExpectedProjectLife) -1)/0.05) - (this.InitialCostInvestment * (Math.pow(1.05,this.ExpectedProjectLife)));
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