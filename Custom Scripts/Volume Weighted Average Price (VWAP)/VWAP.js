study("Volume Weighted Average Price (VWAP)", overlay=true) // by ViK
buyvol = vbuy
sllvol = vsell
totVol = buyvol+sllvol
typPrc = (high+low+close)/3
tp_Vol = typPrc*totVol

c_tp_Vol = cum(tp_Vol)
c_totVol = cum(totVol)
vwap = c_tp_Vol/c_totVol
plot(vwap,color=red,title="VWAP")

c_period = 300 // bar nr, cumulative period 
c_tp_Vol_p = sum(tp_Vol, c_period)
c_totVol_p = sum(totVol, c_period)
vwap_p = c_tp_Vol_p/c_totVol_p
plot(vwap_p,color=magenta,title="VWAP - period based")



b = vwap // inputs:
d = 0.5
m = 2
u0 = b+d*b/100
l0 = b-d*b/100
plot(u0,color=cyan, title="upper 0")
plot(l0,color=cyan, title="lower 0")
u1 = b+(d*b/100*m)
l1 = b-(d*b/100*m)
plot(u1,color=cyan, title="upper 1")
plot(l1,color=cyan, title="lower 1")