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
            NoOfUsers: 0,
            UsesPerDay: 0,
            DaysPerYear: 0,
            WorkDayHours: 0,
            LoadedSalary: 0,
            EfficiencyTimeUnit: 'Seg',
            IncreaseInEfficiency: 0,
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
            if ( this.EfficiencyTimeUnit == 'Hs' ) { IIEfficiency = this.IncreaseInEfficiency}
            if ( this.EfficiencyTimeUnit == 'Min' ) { IIEfficiency = this.IncreaseInEfficiency / 60}
            if ( this.EfficiencyTimeUnit == 'Seg' ) { IIEfficiency = this.IncreaseInEfficiency / 3600}
            IIEfficiency=(Math.round(IIEfficiency*10000)/10000)
            return IIEfficiency
        },
        resutlFGI() {
            let amt1
            let temp = 1

            if ( this.WorkDayHours ) temp = this.DaysPerYear * this.WorkDayHours
       
            if ( temp ) amt1 = (this.LoadedSalary / temp)

            return (this.NoOfUsers * this.UsesPerDay * this.DaysPerYear * amt1 * this.efficiency) * ((Math.pow(1.05,this.ExpectedProjectLife) -1)/0.05) -  (this.InitialCostInvestment * (Math.pow(1.05, this.ExpectedProjectLife)));
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