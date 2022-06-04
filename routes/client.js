module.exports = function(app, obj, binance) {
    
    binance.futuresMiniTickerStream( 'BTCUSDT', (data) => { 
        app.io.sockets.emit("server-liveBTC", {"Currency": data.symbol, "Price": data.close})
    })

    app.get("/buy/:amount", (req, res) =>{
        var quantity = parseFloat(req.params.amount);
        console.log(quantity);
        
        binance.marketBuy("BTCUSDT", quantity)
        .then((data) => {
            console.log(data);
            res.json(data)
        })
        .catch((err) => {
            console.log(err);
            res.json(err)
        })
    })

    app.get('/', (req, res) => {
        res.render('master')
    })

}