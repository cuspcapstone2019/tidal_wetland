# Tidal Wetlands Capstone
### Yushi Chen, Sean Andrew Chen, Chang Du, Andrew Hill, Haoming Yang

### This repository contains the code and data for the capstone project of Tidal Wetlands Capstone. 

#### Tidal flooding is one of New York City’s most dangerous future problems. With decades separating the present and the inevitable flooding, the city has an opportunity to bolster its resiliency infrastructure, which can include hard infrastructure, soft infrastructure, and rezoning for resiliency. Our project evaluates the economic, social, and environmental costs and benefits of converting vacant lots and bought-out land into  building soft infrastructure (in this case, salt marshes) to diminish the effects of future tidal flooding in New York City. These costs and benefits will be presented through an interactive data visualization tool that our sponsor, the Department of Parks and Recreation, can utilize to inform their future conversion decision processes. 




## What is  [NYC Coastal Flooding Planner]
The WebGIS tools provide visualization and analysis function for various different sources of data related to coastal marsh, which includes SLAMM model results, Social vulnerability index, pluto landuse data and census tract demorgraphic data. It integrated large amount of pre-processed data and quick function such as query data by drawing, dynamic data-driven dashboards, time and probability sliders and animation. 

## How the NYC Coastal Flooding Planner tool is builts?
The layout framwork of the tool is built by using [dojo](https://dojotoolkit.org/) 

the Map and function inside the map are built by using [Arcgis Javascript API](https://developers.arcgis.com/javascript/). 

We used ArcGIS online portal to host all of our data, which have already been cleaned.

The charts in the dashboard are built by [d3.js](https://d3js.org/) and [chart.js](https://www.chartjs.org/) 

The tool website is generated using github page. 

## What are the advantage of NYC Coastal Flooding Planner in helping our spsonser compared with spatial anlysis software Arcmap/QGIS/Other WebGIS application?

| Feature | NYC Coastal Flooding Planner | Arcmap | Other WebGIS apps |
| :------: | :------: | :------: |:------: |
| Difficulty of use | Easy | Hard | Easy|
| Efficiency |★★★★★  |★  |★★|
| Synthesized Visualization| ✔︎ | ✖︎ |✖︎|
| Time & feature filter convenience | Easy & Quick | None | Seldom have |
| Integrated Dataset|✔︎|✖︎|✖︎|
| Spatial filtering |Easy & Quick| Slow & prone to error |Seldom have |
| Dynamic Query by drawing |✔︎|✖︎|✖︎|
| Animation |Beatiful & Smooth|Crude|Rare|
