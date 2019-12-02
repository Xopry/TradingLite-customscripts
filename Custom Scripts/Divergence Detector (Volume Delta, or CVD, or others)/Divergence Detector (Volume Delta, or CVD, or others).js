// --------------------------------------------------------------------------
study("Divergence Detector (Volume Delta, or CVD, or others)", overlay=true)

// --------------------------------------------------------------------------
// study("Volume Delta", overlay=false)
// study("Cumulative Volume Delta", overlay=false)
buyvol = vbuy
sllvol = vsell
c_buyvol = cum(buyvol)
c_sllvol = cum(sllvol)
vl_delta = buyvol-sllvol
c_vdelta = cum(vl_delta)
vd_color = vl_delta<0 ? lighten(red,50) : lighten(green,50)
// plot(vl_delta, color=vd_color, title="Volume Delta")
// plot(c_vdelta,color=#00ff00,title="Cumulative Volume Delta")

// --------------------------------------------------------------------------
// study("Volume Weighted Average Price (VWAP)", overlay=true)
buyvol = vbuy
sllvol = vsell
totVol = buyvol+sllvol
typPrc = (high+low+close)/3
tp_Vol = typPrc*totVol

c_tp_Vol = cum(tp_Vol)
c_totVol = cum(totVol)
vwap = c_tp_Vol/c_totVol
// plot(vwap,color=red,title="VWAP")

// --------------------------------------------------------------------------
// Inputs:
prc_src_l = low  // other options: open, high, close, ohcl4, hcl3, hl2
prc_src_h = high // other options: open, low,  close, ohcl4, hcl3, hl2
ind = vl_delta // Volume Delta: vl_delta | CVD: c_vdelta | VWAP: vwap | OI: oi_close, oi_hlc3

// Bullish --------------------------
prcLeftMin = prcLeftMin[1]
prcRghtMin = prcRghtMin[1]
indLeftMin = indLeftMin[1]
indRghtMin = indRghtMin[1]
priceMins = prc_src_l > prc_src_l[1] and prc_src_l[1] < prc_src_l[2]
if ( priceMins ) {
  prcLeftMin = nz(prcRghtMin[1])
  prcRghtMin = prc_src_l[1]
  indLeftMin = indRghtMin[1]
  indRghtMin = ind[1]
}
bullishNDiv = prcLeftMin > prcRghtMin and indLeftMin < indRghtMin
bullishHDiv = prcLeftMin < prcRghtMin and indLeftMin > indRghtMin
bullishNSig = bullishNDiv and !bullishNDiv[1] and prc_src_l[1] < prc_src_l
bullishHSig = bullishHDiv and !bullishHDiv[1] and prc_src_l[1] > prc_src_l
plot_bullishNSig = na
plot_bullishHSig = na
if ( bullishNSig ) plot_bullishNSig = prc_src_l-prc_src_l*0.015
if ( bullishHSig ) plot_bullishHSig = prc_src_l-prc_src_l*0.015
plotshape(plot_bullishNSig, "circle", 15, color=lighten(lime,50),  title="Normal Bullish Divergence")
plotshape(plot_bullishNSig, "circle", 20, color=lighten(green,50))
plotshape(plot_bullishHSig, "circle", 15, color=lighten(lime,50))
plotshape(plot_bullishHSig, "circle", 20, color=lighten(green,50), title="Hidden Bullish Divergence")

// Bearish --------------------------
prcLeftMax = prcLeftMax[1]
prcRghtMax = prcRghtMax[1]
indLeftMax = indLeftMax[1]
indRghtMax = indRghtMax[1]
priceMaxs = prc_src_h < prc_src_h[1] and prc_src_h[1] > prc_src_h[2]
if ( priceMaxs ) {
  prcLeftMax = nz(prcRghtMax[1])
  prcRghtMax = prc_src_h[1]
  indLeftMax = indRghtMax[1]
  indRghtMax = ind[1]
}
bearishNDiv = prcLeftMax < prcRghtMax and indLeftMax > indRghtMax
bearishHDiv = prcLeftMax > prcRghtMax and indLeftMax < indRghtMax
bearishNSig = bearishNDiv and !bearishNDiv[1] and prc_src_h[1] < prc_src_h
bearishHSig = bearishHDiv and !bearishHDiv[1] and prc_src_h[1] > prc_src_h
plot_bearishNSig = na
plot_bearishHSig = na
if ( bearishNSig ) plot_bearishNSig = prc_src_h+prc_src_h*0.015
if ( bearishHSig ) plot_bearishHSig = prc_src_h+prc_src_h*0.015
plotshape(plot_bearishNSig, "circle", 15, color=lighten(red,50),    title="Normal Bearish Divergence")
plotshape(plot_bearishNSig, "circle", 20, color=lighten(maroon,50))
plotshape(plot_bearishHSig, "circle", 15, color=lighten(red,50),    title="Hidden Bearish Divergence")
plotshape(plot_bearishHSig, "circle", 20, color=lighten(maroon,50))
// --------------------------------------------------------------------------

