study("CVD", overlay=false) // by ViK
buyvol = vbuy
sllvol = vsell
c_buyvol = cum(buyvol)
c_sllvol = cum(sllvol)
vol_delta = buyvol-sllvol
c_vdelta = cum(vol_delta)
plot(c_vdelta,color=#00ff00,title="CVD")