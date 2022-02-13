var data;

console.log("hello")
$.get("https://nutritionviz.github.io/data.csv", function (CSVdata) {
    // CSVdata is populated with the file contents
    // ready to be converted into an Array
    // data = $.csv.toArray(CSVdata);
    data = $.csv.toArrays(CSVdata, {
        delimiter: "\n",
        separator: ',', // Sets a custom field separator character
    });
    selectNutYear('1', '1990')
});


function selectNutYear(nut, year) {
    var new_data = [['Region', 'Median Intake']];
    data.shift()
    console.log(data)
    for (const row of data) {
        if (row[1] == year && row[3] == nut) {
            new_data.push([row[0], Number(row[2])])
        }
    }
    console.log(new_data)
    doChart(new_data)
}

function doChart(new_data) {
    google.charts.load('current', {
        'packages': ['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        // 'mapsApiKey': 'AIzaSyBwmVP1B3rHFWKg-svVeN6-qh0QKYx0kzg',
        // 'mapsApiKey': 'AIzaSyCYuRVEWFx8zuWbNXl7I1_XI6nxW4lRnD4',
    });
    google.charts.setOnLoadCallback(drawRegionsMap);
    function drawRegionsMap() {
        var options = {
            colorAxis: {
                colors: ['#ff5757', 'white']
            },
            datalessRegionColor: '#d9d9d9',
            defaultColor: '#f5f5f5',
        };

        var chart = new google.visualization.GeoChart(document.getElementById('geochart-colors'));
        chart.draw(google.visualization.arrayToDataTable(new_data), options);
    };
}


// var nut_vars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "22", "23", "27", "28", "29", "30", "31", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "57"]


// var nut_desc = ["Fruits", "Non - starchy vegetables", "Potatoes", "Other starchy vegetables", "Beans and legumes", "Nuts and seeds", "Refined grains", "Whole grains", "Total processed meats", "Unprocessed red meats", "Total seafoods", "Eggs", "Cheese", "Yoghurt(including fermented milk)", "Sugar - sweetened beverages", "Fruit juices", "Coffee", "Tea", "Total carbohydrates", "Total protein", "Saturated fat", "Monounsaturated fatty acids", "Total omega - 6 fat", "Seafood omega - 3 fat", "Plant omega - 3 fat", "Dietary cholesterol", "Dietary fiber", "Added sugars", "Calcium", "Dietary sodium", "Iodine", "Iron", "Magnesium", "Potassium", "Selenium", "Vitamin A w / supplements", "Vitamin B1", "Vitamin B2", "Vitamin B3", "Vitamin B6", "Vitamin B9(Folate)", "Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin E", "Zinc", "Total Milk"]

// var nuts = []
// for (let i = 0; i < nut_vars.length; i++) {
//     console.log(nut_desc[i])
//     console.log(nut_vars[i])
//     nuts.push([nut_desc[i], nut_vars[i]])
// }
// console.log(nuts)
var nuts = [["Fruits", "1"], ["Non - starchy vegetables", "2"], ["Potatoes", "3"], ["Other starchy vegetables", "4"], ["Beans and legumes", "5"], ["Nuts and seeds", "6"], ["Refined grains", "7"], ["Whole grains", "8"], ["Total processed meats", "9"], ["Unprocessed red meats", "10"], ["Total seafoods", "11"], ["Eggs", "12"], ["Cheese", "13"], ["Yoghurt(including fermented milk)", "14"], ["Sugar - sweetened beverages", "15"], ["Fruit juices", "16"], ["Coffee", "17"], ["Tea", "18"], ["Total carbohydrates", "22"], ["Total protein", "23"], ["Saturated fat", "27"], ["Monounsaturated fatty acids", "28"], ["Total omega - 6 fat", "29"], ["Seafood omega - 3 fat", "30"], ["Plant omega - 3 fat", "31"], ["Dietary cholesterol", "33"], ["Dietary fiber", "34"], ["Added sugars", "35"], ["Calcium", "36"], ["Dietary sodium", "37"], ["Iodine", "38"], ["Iron", "39"], ["Magnesium", "40"], ["Potassium", "41"], ["Selenium", "42"], ["Vitamin A w / supplements", "43"], ["Vitamin B1", "45"], ["Vitamin B2", "46"], ["Vitamin B3", "47"], ["Vitamin B6", "48"], ["Vitamin B9(Folate)", "49"], ["Vitamin B12", "50"], ["Vitamin C", "51"], ["Vitamin D", "52"], ["Vitamin E", "53"], ["Zinc", "54"], ["Total Milk", "57"]]

var select = document.getElementById("nut")
for (const item of nuts) {
    var opt = document.createElement('option');
    opt.value = item[1];
    opt.innerHTML = item[0];
    select.appendChild(opt);
}


var nutEl = document.getElementById('nut')
var yearEl = document.getElementById('year')
nutEl.addEventListener('change', (event) => { updateMap() })
yearEl.addEventListener('change', (event) => { updateMap() })

function updateMap() {
    var nut = nutEl.value.toString()
    var year = yearEl.value.toString()
    if (year == "2020") {
        year = "2018"
    }

    document.getElementById('year_label').innerText = 'Year ' + year
    console.log(nut, year)
    selectNutYear(nut, year)
}

nutEl.value = 1
yearEL.value = 1990