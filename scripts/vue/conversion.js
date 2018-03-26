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
            AnnualSiteProfit: 0,
            CurrentConRate: 0,
            ImprovedConRate: 0,
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
            return (( this.AnnualSiteProfit * (this.ImprovedConRate / this.CurrentConRate) ) - this.AnnualSiteProfit) * ((Math.pow(1.05,this.ExpectedProjectLife) -1)/0.05)   - (this.InitialCostInvestment * (Math.pow(1.05,this.ExpectedProjectLife)));
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
    },
    methods: {
        onSubmit: function () {
            console.log('open')
        }
    }
})