
// Using jQuery, read our data and call visualize(...) only once the page is ready:
$(function() {
  d3.csv("datasets-students-by-curriculum/students-by-curriculum/clean_data.csv").then(function(data) {
    // Write the data to the console for debugging:
    console.log(data);

    // Call our visualize function:
    visualize(data);
  });
});


var visualize = function(data) {
  // Boilerplate:
  var margin = { top: 50, right: 50, bottom: 50, left: 175 },
     width = 1400 - margin.left - margin.right,
     height = 20000 - margin.top - margin.bottom;
    // width = 1200 - margin.left - margin.right,
    // height = 750 - margin.top - margin.bottom;
      
  var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("width", width + margin.left + margin.right)
    .style("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Visualization Code:
  var majors = d3.scaleBand()
                    .domain([
                      'Accountancy', 'Actuarial Science', 'Advertising',
       'Aero & Astro Engineering', 'Aerospace Engineering',
       'African American Studies', 'African Studies',
       'Agr & Consumer Economics', 'Agr & Environmental Cmc & Educ',
       'Agr Engineering & Agr Science', 'Agribusiness, Farm & Financial ',
       'Agric Leadership & Sci Educ', 'Agricultural & Applied Econ',
       'Agricultural & Biological Engr', 'Agricultural Communications',
       'Agricultural Economics', 'Agricultural Education',
       'Agricultural Engineering', 'Agricultural Production',
       'Agricultural Sciences', 'Agriculture', 'Agronomy', 'Air Systems',
       'American Civilization', 'Animal Sciences', 'Anthropology',
       'Application Design', 'Applied Mathematics',
       'Architectural Studies', 'Architecture', 'Art and Design',
       'Chemical Engineering', 'Chemistry', 'Civil Engineering',
       'Classics', 'Community Health', 'Communication',
       'Computer Engineering', 'Comparative Literature',
       'Computer Science', 'Art Education', 'Art Foundation',
       'Art History', 'Asian American Studies', 'Asian Studies',
       'Astronomy', 'Athletic Training', 'Atmospheric Sciences',
       'Audiology', 'Aviation Human Factors', 'Avionics', 'BIOCH',
       'Biochemistry', 'Bioenergy', 'Bioengineering', 'Bioinformatics',
       'Bioinstrumentation', 'Biology', 'Biophysics',
       'Biophysics & Computnl Biology', 'Biophysics & Quant Biology',
       'Bioprocessing and Bioenergy', 'Broadcast Journalism', 'BUS EDUC',
       'BUS NON-DEGREE', 'Business Administration',
       'Business Administration (MBA)', 'BUSINESS ED ACT',
       'BUSINESS ED MKT', 'Business Process Management', 'CBA NON-DEGREE',
       'CELL & STR BIOL', 'Cell and Developmental Biology',
       'Cell and Structural Biology', 'CER ENGR', 'CERAMIC ENG',
       'CERAMICS', 'CFTM-CNSMR&TXTL', 'CFTM-MKT&PRICE', 'CHEM E NUS',
       'Chemical Physics', 'Classical Philology', 'CMDTY,FD,TXTL M',
       'COM TEACH', 'Communications', 'Communications and Media',
       'Computer Sci & Anthropology', 'Computer Sci & Astronomy',
       'Computer Sci & Chemistry', 'Computer Sci & Linguistics',
       'Computer Science & Economics', 'Computer Science and Music',
       'Computer Science&Crop Sciences', 'CONSM ECON',
       'Consumer and Textile Marketing', 'CORE CURR', 'Crafts',
       'Creative Writing', 'Crop Sciences', 'CTM-CNSMR&TXTL',
       'CUR INST 2', 'CUR INST#1', 'CUR INST#3', 'Curric Unassigned',
       'Curriculum and Instruction', 'DAIRY SCI', 'Dance', 'DIETETICS',
       'E Asian Languages & Cultures', 'Early Childhood Education',
       'Earth Systems, Env, & Society ',
       'Earth, Soc, Env Sustainability ',
       'Earth, Society, & Environment ', 'East Asian Studies',
       'Ecol, Evol, Conservation Biol ',
       'Ecology, Ethology, & Evolution ', 'Econometrics & Quant Econ',
       'Economics', 'Physics', 'Ed Organization and Leadership',
       'ED POL ST', 'ED SEC&CON', 'EDUC ELEMENTARY', 'EDUC GEN',
       'EDUC IDISC', 'Educ Policy, Orgzn & Leadrshp ', 'Educ Voc Tech',
       'Speech & Hearing Science', 'Spanish', 'Education',
       'Education Curriculum Uassign', 'Education General',
       'Educational Policy Studies', 'Recreation, Sport, and Tourism ',
       'Statistics', 'Teaching of Biological Science',
       'Teaching of Chemistry', 'Teaching of Earth Science',
       'Educational Psychology', 'Teaching of English Sec Lang',
       'Teaching of French', 'Teaching of German', 'Teaching of Latin',
       'Electrical & Computer Engr', 'Secondary Education',
       'Teaching of Mathematics', 'Teaching of Physics',
       'Electrical Engineering', 'Teaching of Spanish',
       'Technical Systems Management', 'Elementary Education', 'Theatre',
       'Leisure Studies', 'Engineering', 'Engineering Mechanics',
       'Engineering Physics', 'Engineering Undeclared', 'ACES Undeclared',
       'Engineering Undesignated', 'English', 'ENGR MECH',
       'ENGR NONDEGREE', 'ENGR PHYS', 'Entomology', 'ENV ENGR', 'ENV SCI',
       'Environ Engr in Civil Engr', 'Environ Science in Civil Engr',
       'European Union Studies', 'Executive MBA Program', 'EXT EDUC',
       'FAM&CON EC', 'Finance', 'Financial Engineering',
       'Food Science & Human Nutrition', 'Forestry', 'French', 'GEN AGR',
       'GEN AGRIC', 'GEN CURR', 'GEN ENGR', 'GEN H ECON',
       "Gender and Women's Studies", 'General Curriculum',
       'General Engineering', 'Genetics', 'Geography',
       'Geography & Geographic Info Sc', 'Geology', 'German',
       'Germanic Lang & Lit', 'Germanic Studies', 'Global Studies',
       'Graphic Design', 'H DVL-FAM', 'HDFS', 'HDFS-CH&AD DEV', 'HDFS-FS',
       'Health', 'Health Communication', 'HEALTH&SAF', 'History',
       'History of Art', 'HLTH EDUC', 'HLTH PL AD', 'HOME EC ED',
       'HOME ECON', 'HOME MGMT', 'HORT -- P&M', 'HORT--HORT SCI',
       'Horticulture', 'HR & IND RELS', 'HR&FS', 'HR&FS A&ID',
       'HR&FS GEN', 'HU DEV&FAM', 'Human & Community Development',
       'Human Development & Family St', 'Human Dvlpmt & Family Studies',
       'Human Factors', 'Human Res & Industrial Rels',
       'Human Resource Education', 'Humanities',
       'Individual Plans of Study', 'Industrial Agriculture',
       'Industrial Design', 'Industrial Engineering', 'Informatics',
       'Information Management', 'Information Sys & Info Tech',
       'Information Systems', 'INST MGMT', 'Instrumental Music',
       'INT DSGN', "INT'L MSBA", 'Integrative Biology',
       'Interdisciplinary', 'Interdisciplinary Health Sci',
       'International Studies', 'Intl, Resource, Consumer Econ ',
       'INTRSRCCNSECON', 'IRCE-CONS EC&F', 'IRCE-E&NR MGMT',
       'IRCE-INDCURRIC', 'IRCE-POL,TRD,DV', 'Italian', 'Jazz Performance',
       'Journalism', 'Kinesiology', 'LAB&IN REL',
       'Landscape Architecture', 'LAS - Undeclared', 'LAS TCH MATH',
       'LATIN AMER ST', 'Latin American Studies', 'Latina/Latino Studies',
       'Law', 'Learning and Education Studies',
       'Library & Information Science', 'Linguistics', 'Lyric Theatre',
       'MANAGEMENT', 'Management', 'MARKETING', 'Marketing',
       'Materials Science & Engr', 'Math & Computer Science',
       'Mathematics', 'MATSCI&ENG', 'MCS INTERNET',
       'Mechanical Agriculture', 'Mechanical Engineering',
       'Media and Cinema Studies', 'Media Studies',
       'Medicine - Carle Illinois COM', 'METAL ENGR', 'Microbiology',
       'Middle Grades Education', 'MKT TEXT&A',
       'Molecular & Integrative Physi', 'Molecular and Cellular Biology',
       'Molecular&Cell Bio-undeclared', 'MOTOR DEV', 'MOTOR P&SP',
       'MSPH IN C HLTH', 'MUS-VOICE', 'Music', 'Music Composition',
       'Music Education', 'Music History', 'MUSIC-COMP', 'MUSIC-INST',
       'MUSIC-OPEN', 'MUSIC(AMS)', 'Musicology',
       'Natural Res & Env Sciences', 'Natural Resrcs & Environ Sci',
       'Neuroscience', 'New Media', 'News-Editorial', 'Nondegree',
       'Nondegree-CE', 'NRES - SOILS', 'NRES-BIOL SCI', 'NRES-ENV S W',
       'NRES-F & W CONS', 'NRES-SOC SCI', 'Nuclear Engineering',
       'Nuclear, Plasma, Radiolgc Engr ', 'Nutritional Sciences',
       'Open Studies', 'Operations Management', 'ORN HORT', 'OUTDR REC',
       'Painting', 'PARK & NR MGMT', 'PERFORM ST', 'PERSN AREA',
       'Philosophy', 'Photography', 'PHYS ED', 'Plant Biology',
       'Plant Biotechnology', 'PLANT PATH', 'Plant Pathology',
       'Political Science', 'Portuguese', 'PP/AS',
       'Pre-Early Chld/Elem Ed/Spec Ed', 'Pre-Engineering', 'PRE-JOURN',
       'PRE-MED', 'Professional Pilot', 'PROG MANAG', 'PROG SPEC',
       'Psychological Science', 'Psychology', 'PUB ADMIN',
       'Public Health', 'REES', 'Regional Planning', 'REHAB STUDIES',
       'Rehabilitation', 'Religion', 'Religious Studies', 'REST MGMT',
       'Rhetoric', 'Russian & E European Studies',
       'Russian Lang & Literature', 'Russian, E Eur, Eurasian St ',
       'S Asian & Middle Eastern St', 'SCH HEALTH', 'Sculpture',
       'SEC TRAINING', 'Secondary & Continuing Educ',
       'Slavic Languages & Literature', 'Slavic Studies', 'SOC SCI SP',
       'SOCIAL SCI', 'Social Work', 'Sociology', 'SOIL SCI', 'SP CORRECT',
       'Special Education', 'Speech Communication',
       'Statistics & Computer Science', 'STATS-ECON',
       'Strategic Brand Communication', 'Supply Chain Management',
       'Systems & Entrepreneurial Engr', 'Systems Engineering and Design',
       'Taxation', 'TCH BIOL', 'TCH CS', 'TCH DANCE', 'TCH ENGL',
       'TCH ENGL IN MN', 'TCH ENGL OUT MN', 'TCH GEN SCIENCE',
       'TCH GEOGR', 'TCH KINES', 'TCH LIFE SCI', 'TCH PHY SC',
       'TCH PHYS SCI', 'TCH PS CHEM', 'TCH PS PHYSICS', 'TCH RUSS',
       'TCH SOC ST', 'TCH SOC ST IN', 'TCH SOC ST OUT', 'TCH SPEECH',
       'TEACH CS', 'TECH ED INDUST', 'TECH ED LAW ENF', 'TECH ED SP',
       'Technology Management', 'TEXT-APPRL',
       'Theoretical & Applied Mechans', 'THER REC', 'TRANSITION',
       'Translation and Interpreting', 'UG NON-DEG', 'UNASSIGNED',
       'UNCLASS', 'UNCM FR&SO', 'Undeclared', 'Urban Planning',
       'Urban Studies & Planning', 'Veterinary Medical Science',
       'Veterinary Medicine', 'VMS - Comparative Biosciences',
       'VMS - Pathobiology', 'VMS - Veterinary Biosciences',
       'VMS - Veterinary Pathobiology', 'VMS-Veterinary Clinical Medcne',
       'VOC H E ED', 'Voice', 'VP SCHOLARS', 'Wood Sciences', 'XMURAL',
       'Zoology'
                  ])
                    .range([0, height]);

  var timeScale = d3.scaleLinear()
                     .domain([1980, 2020])
                     .range([0, width]);

  var tooltip = d3.select("body")
                     .append("div")
                     .style("position", "absolute")
                     .style("z-index", "10")
                     .style("visibility", "hidden")
                     .style("background", "#000")
                     .text("a simple tooltip");


  // var botAxis = d3.axisBottom().scale(timeScale).tickFormat(d3.format("d"));
  var leftAxis = d3.axisLeft().scale(majors);
  var topAxis = d3.axisTop().scale(timeScale).tickFormat(d3.format("d"));


  // svg.append("g").attr("transform", "translate(0, " + height +")").call(botAxis);
  svg.append("g").call(leftAxis);
  svg.append("g").call(topAxis);

  
  svg.selectAll("Totals")
     .data(data)
     .enter()
     .append("circle")
     .attr("r", function(d, i) {
      return d["Total"] * 0.05 + 1.5;
     })
     .attr("cx", function(d, i) {
      return timeScale(d["Year"]);
    })
    .attr("cy", function(d, i) {
      return majors(d["Major"]);
     })
    .attr("fill", function(d, i) {
      if (d["College"] == "Engineering") {
        return "blue";
      } else if (d["College"] == "LAS") {
        return "red";
      } else if (d["College"] == "Business") {
        return "purple";
      }

      return "orange";
     })
     .attr("opacity", 0.8)
     .on("mouseover", function(d, i) {
       d3.select(".infobox .year").text(d['Year']);
      d3.select(".infobox .college").text(d['College']);
      d3.select(".infobox .major").text(d['Major']);
      d3.select(".infobox .major_population").text(d['Total']);

      d3.select(this)
      .transition()
      .duration(50)
      .attr('r', function(d) {
        var popup = d["Total"] * 0.05 * 1.5;
        return popup < 15 ? 15 : popup;
      });
     })
     .on('mouseout', function(d, i) {
      // return the mouseover'd element
      // to being smaller and black
      d3.select(this)
        .transition()
        .duration(50)
        .attr("r", function(d, i) {
          return d["Total"] * 0.05;
         });
      });

     

    
    
    // svg.selectAll("Totals").on("mouseover").
  //   svg.selectAll("Totals").on("mouseover", function() {
  //     var coords = d3.mouse(this);

  // //     tooltip.html(d)  
  // // .style("left", d + "px")     
  // // .style("top", d + "px");

  //     // Normally we go from data to pixels, but here we're doing pixels to data
  //     var newData= {
  //       // x: Math.round( xScale.invert(coords[0])),  // Takes the pixel number to convert to number
  //       // y: Math.round( leftAxis.invert(coords[1]))
  //     };
  //     /*
  //     .on("mouseover", function(d) {		
  //           div.transition()		
  //               .duration(200)		
  //               .style("opacity", .9);		
  //           div	.html(formatTime(d.date) + "<br/>"  + d.close)	
  //               .style("left", (d3.event.pageX) + "px")		
  //               .style("top", (d3.event.pageY - 28) + "px");	
  //           })
  //     */
  //   });
};



// <script>
// {
//   // Various accessors that specify the four dimensions of data to visualize.
// function x(d) { return d.income; }
// function y(d) { return d.lifeExpectancy; }
// function radius(d) { return d.population; }
// function color(d) { return d.region; }
// function key(d) { return d.name; }

// // Chart dimensions.
// var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5},
//     width = 960 - margin.right,
//     height = 500 - margin.top - margin.bottom;

// // Various scales. These domains make assumptions of data, naturally.
// var xScale = d3.scale.log().domain([300, 1e5]).range([0, width]),
//     yScale = d3.scale.linear().domain([10, 85]).range([height, 0]),
//     radiusScale = d3.scale.sqrt().domain([0, 5e8]).range([0, 40]),
//     colorScale = d3.scale.category10();

// // The x & y axes.
// var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(12, d3.format(",d")),
//     yAxis = d3.svg.axis().scale(yScale).orient("left");

// // Create the SVG container and set the origin.
// var svg = d3.select("#chart").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// // Add the x-axis.
// svg.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xAxis);

// // Add the y-axis.
// svg.append("g")
//     .attr("class", "y axis")
//     .call(yAxis);

// // Add an x-axis label.
// svg.append("text")
//     .attr("class", "x label")
//     .attr("text-anchor", "end")
//     .attr("x", width)
//     .attr("y", height - 6)
//     .text("income per capita, inflation-adjusted (dollars)");

// // Add a y-axis label.
// svg.append("text")
//     .attr("class", "y label")
//     .attr("text-anchor", "end")
//     .attr("y", 6)
//     .attr("dy", ".75em")
//     .attr("transform", "rotate(-90)")
//     .text("life expectancy (years)");

// // Add the year label; the value is set on transition.
// var label = svg.append("text")
//     .attr("class", "year label")
//     .attr("text-anchor", "end")
//     .attr("y", height - 24)
//     .attr("x", width)
//     .text(1800);

// // Load the data.
// d3.json("nations.json", function(nations) {

//   // A bisector since many nation's data is sparsely-defined.
//   var bisect = d3.bisector(function(d) { return d[0]; });

//   // Add a dot per nation. Initialize the data at 1800, and set the colors.
//   var dot = svg.append("g")
//       .attr("class", "dots")
//     .selectAll(".dot")
//       .data(interpolateData(1800))
//     .enter().append("circle")
//       .attr("class", "dot")
//       .style("fill", function(d) { return colorScale(color(d)); })
//       .call(position)
//       .sort(order);

//   // Add a title.
//   dot.append("title")
//       .text(function(d) { return d.name; });

//   // Add an overlay for the year label.
//   var box = label.node().getBBox();

//   var overlay = svg.append("rect")
//         .attr("class", "overlay")
//         .attr("x", box.x)
//         .attr("y", box.y)
//         .attr("width", box.width)
//         .attr("height", box.height)
//         .on("mouseover", enableInteraction);

//   // Start a transition that interpolates the data based on year.
//   svg.transition()
//       .duration(30000)
//       .ease("linear")
//       .tween("year", tweenYear)
//       .each("end", enableInteraction);

//   // Positions the dots based on data.
//   function position(dot) {
//     dot .attr("cx", function(d) { return xScale(x(d)); })
//         .attr("cy", function(d) { return yScale(y(d)); })
//         .attr("r", function(d) { return radiusScale(radius(d)); });
//   }

//   // Defines a sort order so that the smallest dots are drawn on top.
//   function order(a, b) {
//     return radius(b) - radius(a);
//   }

//   // After the transition finishes, you can mouseover to change the year.
//   function enableInteraction() {
//     var yearScale = d3.scale.linear()
//         .domain([1800, 2009])
//         .range([box.x + 10, box.x + box.width - 10])
//         .clamp(true);

//     // Cancel the current transition, if any.
//     svg.transition().duration(0);

//     overlay
//         .on("mouseover", mouseover)
//         .on("mouseout", mouseout)
//         .on("mousemove", mousemove)
//         .on("touchmove", mousemove);

//     function mouseover() {
//       label.classed("active", true);
//     }

//     function mouseout() {
//       label.classed("active", false);
//     }

//     function mousemove() {
//       displayYear(yearScale.invert(d3.mouse(this)[0]));
//     }
//   }

//   // Tweens the entire chart by first tweening the year, and then the data.
//   // For the interpolated data, the dots and label are redrawn.
//   function tweenYear() {
//     var year = d3.interpolateNumber(1800, 2009);
//     return function(t) { displayYear(year(t)); };
//   }

//   // Updates the display to show the specified year.
//   function displayYear(year) {
//     dot.data(interpolateData(year), key).call(position).sort(order);
//     label.text(Math.round(year));
//   }

//   // Interpolates the dataset for the given (fractional) year.
//   function interpolateData(year) {
//     return nations.map(function(d) {
//       return {
//         name: d.name,
//         region: d.region,
//         income: interpolateValues(d.income, year),
//         population: interpolateValues(d.population, year),
//         lifeExpectancy: interpolateValues(d.lifeExpectancy, year)
//       };
//     });
//   }

//   // Finds (and possibly interpolates) the value for the specified year.
//   function interpolateValues(values, year) {
//     var i = bisect.left(values, year, 0, values.length - 1),
//         a = values[i];
//     if (i > 0) {
//       var b = values[i - 1],
//           t = (year - a[0]) / (b[0] - a[0]);
//       return a[1] * (1 - t) + b[1] * t;
//     }
//     return a[1];
//   }
// });

  
// }
// </script>