window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

var selected_country = '';

var gdpDates = [
  1961,
  1962,
  1963,
  1964,
  1965,
  1966,
  1967,
  1968,
  1969,
  1970,
  1971,
  1972,
  1973,
  1974,
  1975,
  1976,
  1977,
  1978,
  1979,
  1980,
  1981,
  1982,
  1983,
  1984,
  1985,
  1986,
  1987,
  1988,
  1989,
  1990,
  1991,
  1992,
  1993,
  1994,
  1995,
  1996,
  1997,
  1998,
  1999,
  2000,
  2001,
  2002,
  2003,
  2004,
  2005,
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020,
];

var elem = document.querySelectorAll('select');

document.addEventListener('DOMContentLoaded', function () {
  elem = document.querySelector('select');
  var instances = M.FormSelect.init(elem);
  $("#loading_indicator").hide();
});

function getData() {
  selected_country = $('#cephas_drop_down option:selected').text();

  //   console.log(selected_country);

  if (selected_country !== 'Choose your option') {
    $("#loading_indicator").show();
    axios
      .get(`https://cephasapi.azurewebsites.net/country/${selected_country}`)
      .then((res) => {
        // console.log(res.data);

        var myData = res.data['Historical GDP'];
        myData = myData.replace('[(', '');
        myData = myData.replace(')]', '');

        var words = myData.split(',');

        words = words.slice(4); // Ignoring first few elements

        // console.log(words);

        drawPlot(words);
      });
  } else {
    alert('Please select a country');
  }
}

function drawPlot(y_array) {
  var trace1 = {
    x: gdpDates,
    y: y_array,
    mode: 'lines+markers',
    name: selected_country,
    hovertemplate: `%{y}<extra>${selected_country}</extra>`,
    type: 'scatter',
    marker: {
      color: '#000000',
      size: 8,
    },
    line: {
      color: '#000000',
      width: 1,
    },
  };

  //   var trace2 = {
  //     x: [2, 3, 4, 5],
  //     y: [16, 5, 11, 9],
  //     mode: 'lines',
  //     type: 'scatter',
  //   };

  //   var trace3 = {
  //     x: [1, 2, 3, 4],
  //     y: [12, 9, 15, 12],
  //     mode: 'lines+markers',
  //     type: 'scatter',
  //   };

  //   var data = [trace1, trace2, trace3];
  var data = [trace1];
  var layout = {
    title: 'GDP($)',

    xaxis: {
      title: {
        text: 'Time',
        font: {
          family: 'Arial',
          size: 18,
          color: '#000000',
        },
      },
    },
    yaxis: {
      title: {
        text: 'GDP(USD)',
        font: {
          family: 'Arial',
          size: 18,
          color: '#000000',
        },
      },
    },
  };

  Plotly.newPlot('myDiv', data, layout, { displaylogo: false });
}
