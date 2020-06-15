export function GetDataFromServer(apiPath, reqMethod, formBody) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  if (!reqMethod && reqMethod !== "POST") {
    return fetch(apiPath, { method: "GET", headers: myHeaders });
  } else {
    if (formBody) {
      let fetchData = {
        method: "POST",
        body: JSON.stringify(formBody),
        headers: myHeaders,
      };

      return fetch(apiPath, fetchData);
    }
  }
}

// below service call is used only for posting a new item,
// for posting a new item we're using formData for whihc we should not send the headers
// and the request body shoudl be form data.
export function GetDataFromServerToPost(apiPath, reqMethod, formBody) {
  let myHeaders = new Headers();
  // if(window.localStorage.userLoginToken !== undefined){
  //   myHeaders.append('Authorization', 'Bearer '+window.localStorage.userLoginToken);
  // }

  myHeaders.append("Content-Type", "application/json");
  if (formBody) {
    let fetchData = {
      method: "POST",
      body: formBody,
      headers: myHeaders,
    };
    return fetch(apiPath, fetchData);
  }
}

export function deleteService(formBody, deleteApi) {
  console.log("FORM BODY" + JSON.stringify(formBody));
  let myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");
  return fetch(deleteApi, {
    method: "DELETE",
    body: JSON.stringify(formBody),
    headers: myHeaders,
  }).then((res) => res.json());
}
