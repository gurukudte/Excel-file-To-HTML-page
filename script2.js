// Method to upload a valid excel file
function upload() {

  
  var files = document.getElementById('file_upload').files;
  if (files.length == 0) {
    alert("Please choose any file...");
    return;
  }
  var filename = files[0].name;
  console.log(filename)
  var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
  if (extension == '.XLS' || extension == '.XLSX') {
    //Here calling another method to read excel file into json
    excelFileToJSON(files[0]);
  } else {
    alert("Please select a valid excel file.");
  }
}

//Method to read excel file and convert it into JSON 
function excelFileToJSON(file) {
  try {
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function (e) {

      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary'
      });
      var result = {};
      var firstSheetName = workbook.SheetNames[0];
      //reading only first sheet data
      var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
      alert(JSON.stringify(jsonData));
      //displaying the json result into HTML table
      displayJsonToHtmlTable(jsonData);
    }
  } catch (e) {
    console.error(e);
  }
}


function displayJsonToHtmlTable(jsonData) {
  if (jsonData.length > 0) {
    let dataArray = JSON.parse(JSON.stringify(jsonData))
    let person = dataArray[0];
    // console.table(dataArray)
    var objectkeysgroups =[];
    for (i=0;i<dataArray.length;i++){
      objectkeysgroups.push(Object.keys(dataArray[i]));
    }
    // console.table(objectkeysgroups)

    var objectkeylength =[];
    for (i=0;i<objectkeysgroups.length;i++){

      objectkeylength.push(objectkeysgroups[i].length)
      
    }
    console.log(objectkeylength)

    let maxnoofobjectkeys = Math.max(...objectkeylength)
    let indexofmaxnoofobjectkeys = objectkeylength.indexOf(maxnoofobjectkeys)
    console.log(maxnoofobjectkeys,indexofmaxnoofobjectkeys)


    let objectkeys = Object.keys(dataArray[indexofmaxnoofobjectkeys]);
    console.log(objectkeys)
  
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    
    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById('body').appendChild(table);

    //writing Headers
    for (i = 0; i < objectkeys.length; i++) {
  
      let header_row = document.createElement('tr');
      let row_heading = document.createElement('th');
      row_heading.innerHTML = objectkeys[i].toUpperCase();

      header_row.appendChild(row_heading);
      thead.appendChild(header_row);
    }
  
    //adding data to Data Table
    for(i=0;i<dataArray.length;i++){
  
      p = dataArray[i];
      var data_row = document.createElement("tr");

      // for ( var key in p ){

      //   if (p.hasOwnProperty(key)) {
      //     var row_data = document.createElement("td");
      //     var realdata = p[key];
      //     row_data.innerHTML = realdata;
      //     data_row.appendChild(row_data);
      //   } 
      // }

      for (z= 0;z<objectkeys.length;z++){

        var key = objectkeys[z];

        if (!p.hasOwnProperty(key)) {
          var row_data = document.createElement("td");
          var realdata = "NA";
          row_data.innerHTML = realdata;
          data_row.appendChild(row_data);
        } 


        if (p.hasOwnProperty(key)) {
          var row_data = document.createElement("td");
          var realdata = p[key];
          row_data.innerHTML = realdata;
          data_row.appendChild(row_data);
        } 
      }


      tbody.appendChild(data_row);
    }
    
  } else {
    table.innerHTML = 'There is no data in Excel';
  }
  
  
}