
(async () => {
  const url =
    "https://data.ssb.no/api/pxwebapi/v2/tables/05810/data?lang=en&valuecodes[Kjonn]=0&valuecodes[Alder]=999B&valuecodes[ContentsCode]=Personer&valuecodes[Tid]=top(50)";

  const res = await fetch(url);
  const json = await res.json();

  const yearIndex = json.dimension.Tid.category.index;
  const years = Object.entries(yearIndex)
    .sort((a, b) => a[1] - b[1])
    .map(([year]) => Number(year));

  const values = json.value;

  const points = years.map((y, i) => ({ x: y, y: values[i] }));

  new Chart(document.getElementById("populationHist"), {
    type: "bar",
    data: {
      datasets: [{
        label: "Population, total",
        data: points
      }]
    },
    options: {
      parsing: false, // we are supplying x,y objects directly
      responsive: true,
      scales: {
        x: {
          type: "linear",
          title: { display: true, text: "Year" },
          ticks: {
            precision: 0,
            callback: v => String(v)
          }
        },
        y: {
          title: { display: true, text: "People" },
          ticks: {
            callback: v => Number(v).toLocaleString("en-UK")
          }
        }
      },
      datasets: {
        bar: {
          // constant bar width in pixels, so spacing reflects year gaps
          barThickness: 18
        }
      }
    }
  });
})();
