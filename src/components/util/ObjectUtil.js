const isFunction = (functionToCheck)=> {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

export default { isFunction, sleep, downloadObjectAsJson }