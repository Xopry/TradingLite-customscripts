study("RSI Bands - Support & Resistance", overlay=true) // pretty good for trading Bart paterns ~ said ViK
rsi_OB = 75     // input(75, title="Overbought level")
rsi_OS = 25     // input(25, title="Oversold level")
rsi_len = 14    // input(14,    title="RSI Length")
rsi_src = close // input(close, title="RSI Source")

func crossover(a,b) => a[1]<b[1] and a>=b
func crossundr(a,b) => a[1]>b[1] and a<=b

ma_len = 2*rsi_len-1
auc = max(rsi_src-rsi_src[1], 0)
adc = max(rsi_src[1]-rsi_src, 0)
auc_ma = ema(auc,ma_len) // using ema instead of rma()
adc_ma = ema(adc,ma_len)
x1 = (rsi_len-1)*(adc_ma*rsi_OB/(100-rsi_OB)-auc_ma)
x2 = (rsi_len-1)*(adc_ma*rsi_OS/(100-rsi_OS)-auc_ma)
ub = x1>=0 ? rsi_src+x1 : rsi_src+x1*(100-rsi_OB)/rsi_OB
lb = x2>=0 ? rsi_src+x2 : rsi_src+x2*(100-rsi_OS)/rsi_OS
ml = (ub+lb)/2
plot(ub, title="Resistance", color=maroon)
plot(ml, title="Midline",    color=darken(gray, 30))
plot(lb, title="Support",    color=green)

rsi_long = crossover(rsi_src,ub) // Long  condition
rsi_shrt = crossundr(rsi_src,lb) // Short condition