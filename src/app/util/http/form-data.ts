import FormData from "form-data";

function buildFormData(formData: any, data: any, parentKey: any) {
  if (data && typeof data === 'object' && !(data instanceof Date)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}

export function jsonToFormData(element: any,key:any=null,list:any=null){
  var list = list || [];
  if(typeof(element)=='object'){
    for (var idx in element)
    jsonToFormData(element[idx],key?key+'['+idx+']':idx,list);
  } else {
    list.push(key+'='+encodeURIComponent(element));
  }
  return list.join('&');
}