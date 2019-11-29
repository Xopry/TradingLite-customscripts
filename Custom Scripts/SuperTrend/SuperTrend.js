study("SuperTrend", overlay=true) // brought to you by ViK

mult = 3 // input(3, title="multiplier")
perd = 7 // input(7, title="period")
len = perd
func rma_tr_f() {
    x = high-low // close
    alpha = len
    sum = 0.0
    fix_sum_1 = sum[1]>0?sum[1]:1 // <- :pepeooh:
    t = (alpha - 1) * nz(sum[1])
    sum = ( x + t ) / alpha
    return sum
}
func atr_f(period){
    tr  = high-low
    atr = rma_tr_f()
    return atr
}
func hl2() => (high+low)/2
func crossover(a,b) => a[1]<b[1] and a>=b
func crossundr(a,b) => a[1]>b[1] and a<=b

up = hl2() - (mult * atr_f(perd))
dn = hl2() + (mult * atr_f(perd))
max_up = max(up, trendup[1])
min_dn = min(dn, trenddn[1])
trendup = close[1] > trendup[1] ? max_up : up
trenddn = close[1] < trenddn[1] ? min_dn : dn
trend = close > trenddn[1] ? 1 : close < trendup[1] ? -1 : trend[1]
supertrend = trend == 1 ? trendup : trenddn
st_col = trend == 1 ? lime : red
plot(supertrend, title="Supertrend", color=st_col)