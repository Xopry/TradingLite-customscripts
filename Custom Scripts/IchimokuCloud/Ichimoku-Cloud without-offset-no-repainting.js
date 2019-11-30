study("Ichimoku Cloud", overlay=true)
turning_len = 9 // input(9, minval=1, title="Tenkan-Sen")
standard_len = 26 // input(26, minval=1, title="Kijun-Sen")
specialA_len = 52 // input(52, minval=1, title="Kijun-Sen (auxiliary)")
leadingSpan2Periods = 52 // input(52, minval=1, title="Senkou Span B")
displacement = 26 // input(26, minval=1, title="-ChikouSpan/+SenkouSpan A")

// Definitions for Tenkan-Sen (9 Period), Kijun-Sen (26 Period), Chikou Span (Lagging Line)
func donchian(len) => (lowest(low,len)+highest(high,len))/2
func crossover(a,b) => a[1]<b[1] and a>=b
func crossundr(a,b) => a[1]>b[1] and a<=b
turning = donchian(turning_len)                 // Tenkan-Sen (9 Period)
standard = donchian(standard_len)               // Kijun-Sen (26 Period)
specialA = donchian(specialA_len)
leadingSpan1 = (turning+standard)/2
leadingSpan2 = donchian(leadingSpan2Periods)

// Crosses up/down Tenkan-Sen (9 Period) and Kijun-Sen (26 Period)
crossUpTenkanKinjun = crossover(turning,standard)
crossDnTenkanKinjun = crossundr(turning,standard)

col = leadingSpan1>=leadingSpan2 ? green : maroon // bullish, bearish

// Cloud Lines
lS1 = leadingSpan1[52]
plot(lS1, title="Senkou Span A cloud", color=col)   // displacement=+26+26
lS2 = leadingSpan2[52]
plot(lS2, title="Senkou Span B cloud", color=col)   // displacement=+26+26

// plots for 3 lines other than cloud.
trn = turning[26]
plot(trn, title="Tenkan-Sen", color=red)                        // displacement=0+26
std = standard[26]
plot(std, title="Kijun-Sen",  color=cyan)                       // displacement=0+26
spA = specialA[26]
plot(spA, title="Kijun-Sen auxiliary I", color=teal)            // displacement=0+26
chS = close[0]
plot(chS, title="Chikou Span (Lagging Span)", color=#A800FF)    // displacement=-26+26