console.log("hello")
$.get("https://nutritionviz.github.io/data.csv", function (CSVdata) {
    // CSVdata is populated with the file contents
    // ready to be converted into an Array
    data = $.csv.toArray(CSVdata);
    console.log(data)
});