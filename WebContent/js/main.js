
require([
           'amap/loadAmap',
           'bmap/loadBmap',
           'smap/loadSmap',
           'common/identifyBrowser',
           'common/initListener'
           
          ],
		
		function(AMaper,BMaper,SMaper,Sys,initListener){
			initListener(AMaper,BMaper,SMaper,Sys);
	
		}


);






