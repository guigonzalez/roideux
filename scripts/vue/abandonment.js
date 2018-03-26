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
            PreDesignDropOffRate: 0,
            PostDesignDropOffRate: 0,
            CurrentPageTraffic: 0,
            AverageOrderSize: 0,
            ProfitPercentPerOrder: 0,
            InitialCostInvestment: 0,
            ExpectedProjectLife: 0
        }
    },
    computed: {
        resutlFGI() {
            let temp = 1
            temp = ((this.PreDesignDropOffRate/100) - (this.PostDesignDropOffRate/100)) * this.CurrentPageTraffic;
            return (temp * this.AverageOrderSize  * ((this.ProfitPercentPerOrder * 12)/100)) * ((Math.pow(1.05,this.ExpectedProjectLife) -1)/0.05) -  (this.InitialCostInvestment * (Math.pow(1.05,this.ExpectedProjectLife)));
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
    }
})