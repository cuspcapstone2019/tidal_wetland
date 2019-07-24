var body = document.getElementById('border');
	require(["esri/symbols/SimpleFillSymbol",
			"esri/renderers/smartMapping/creators/type",
			"esri/Graphic",
			"esri/geometry/geometryEngine",
			"esri/views/layers/support/FeatureFilter",
			"esri/widgets/Sketch/SketchViewModel",
			"esri/widgets/Expand",
			"esri/Map",
			"esri/views/MapView",
			"esri/layers/FeatureLayer",
			"esri/widgets/Search",
			"esri/widgets/BasemapGallery",
			"esri/renderers/smartMapping/creators/color",
			"esri/renderers/smartMapping/statistics/histogram",
			"esri/widgets/ColorSlider",
			"esri/core/lang",
			"esri/widgets/Legend",
			"esri/layers/GraphicsLayer",
			"esri/core/promiseUtils"], function(SimpleFillSymbol,typeRendererCreator,Graphic,geometryEngine,FeatureFilter,SketchViewModel,Expand, Map, MapView, FeatureLayer, Search,BasemapGallery,colorRendererCreator,histogram,ColorSlider,lang,Legend,GraphicsLayer,promiseUtils) 
			{
  /* -----------------------------
		  Set Basemap
  --------------------------------*/
				    map = new Map({
					basemap: {
					  portalItem: {
						id: "4f2e99ba65e34bb8af49733d9778fb8e"
					  }
					}
				  });
		
/* -----------------------------
     Uncertainty result
--------------------------------*/	
					var slammLayerView;
					function createSLAMM(layerid,name){
						 
						 
						 try{
							 let newslamm = new FeatureLayer({
						      portalItem: {
						        id:layerid
						      },
						      title: name,
							  outFields: ["gridcode2",'POLY_AREA']
						    });
						
						return newslamm;
						 	
						 }catch(e){
						 	let newslamm = new FeatureLayer({
						 	      portalItem: {
						 	        id:layerid
						 	      },
						 	      title: name,
						 		  outFields: ["gridecode2",'POLY_AREA']
						 	    });
						 	
						 	return newslamm;
						 }
						 
					}
					
					function setYear(value) {
					      probability_container.innerHTML = Math.floor(value)+'%';
					      vertical_slider.value = Math.floor(value);
					      slamm_layer.renderer = createRenderer(value);
					    }
					function createRenderer(year,legend = legend_t) {
					  var opacityStops = [
					    {
					      opacity: 1,
					      value: year
					    },
							{
							  opacity: 1,
							  value: year - 30
							},
					    {
					      opacity: 0,
					      value: year - 50
					    }
					  ];
					
					  return {
					    type: "simple",
					    symbol: {
					      type: "simple-fill",
					      color: "rgb(0, 0, 0)",
					      outline: {
									color: null,
									width:1
								}
					    },
					    visualVariables: [
					      {
					        type: "opacity",
					        field: "gridcode2",
					        stops: opacityStops,
					        legendOptions: {
					          showLegend: false
					        }
					      },
					      {
					        type: "color",
					        field: "gridcode2",
					        legendOptions: {
					          title: legend
					        },
					        stops: [
					          {
					            value: year,
					            color: "#0ff",
					            label: Math.floor(year)+'%'
					          },
					          {
					            value: year-10,
					            color: "#f0f",
					            label: (Math.floor(year-20))+'%'
					          },
					          {
					            value: 0,
					            color: "#404",
					            label: (0)+"%"
					          }
					        ]
					      }
					    ]
					  };
					}	
					
					function inputHandler() {
					      setYear(parseInt(vertical_slider.value));
								console.log(vertical_slider.value);
					    }
						
						
					vertical_slider.addEventListener("input", inputHandler);
					
					vertical_slider.addEventListener("change", inputHandler);
					function set_h_year(value){
						slider.value = Math.floor(value);
						setSliderValue();
						adjust_point_deter_uncertain();
					}
					
					
					
					function setSliderValue(){
						if (slider.value == 2010){
							sliderValue.innerHTML = 2008;
						}
						else{
							sliderValue.innerHTML =slider.value
						}
						year_choice.innerHTML = sliderValue.innerHTML
					}
					
					
					setSliderValue();
					slider.addEventListener("change",function(){
						catchsvi_year = '_'+slider.value;
						stopAnimation();
						setSliderValue();
						//update point infra
						update_point_visual();
						//update deterministic
						map.remove(deterlayer);
						try{
							layerid = deterministic_layer[pointid][pointyear];
							deterlayer= change_deter_layer(layerid)
							console.log(pointid,pointyear)
						}catch(e){
							console.log(e)
						}
						
						if (deter_box_show){
						
							map.add(deterlayer);
						}
						
						//update uncertainty
						map.remove(slamm_layer)
						
						
						if (uncertain_box_show){
							let slamm_id = SLAMM[slamm_name][pointyear]
							slamm_layer = createSLAMM(slamm_id,slamm_name)
							map.add(slamm_layer)
							setYear(vertical_slider.value)
						}
						
					})
					
					
					SLAMMselection.addEventListener("change", function(){
						stopAnimation();
						convert()
						let index = this.selectedIndex;
						
						slamm_name = this.options[index].getAttribute('name');
						uncertainty_choice.innerHTML=this.options[index].innerHTML;
						let year = '_'+sliderValue.innerHTML
						console.log(slamm_name,year)
						let id = SLAMM[slamm_name][year]
						console.log(id)
						if (slamm_layer){
							map.remove(slamm_layer)
						}
						legend_t = slamm_name + 'Probability:';
						slamm_layer = createSLAMM(id,slamm_name);
						if (uncertain_box_show){
							map.add(slamm_layer)
							setYear(80)
							 view.whenLayerView(slamm_layer).then(function(layerView) {
							  	slammLayerView = layerView;
							// let sketchLayer = new GraphicsLayer();
							// let bufferLayer = new GraphicsLayer();
							// view.map.addMany([bufferLayer, sketchLayer]);
							
							});
							}
						
						
					})
					 
					d3.select('#Uncertain')
						.on('click',function(){
							stopAnimation();
							if (!uncertain_box_show){
								d3.select(this)
									.style('color', 'orange')
									convert()
									uncertain_box_show =!uncertain_box_show
									map.add(slamm_layer)
									setYear(80)
									 view.whenLayerView(slamm_layer).then(function(layerView) {
									  	slammLayerView = layerView;
									// let sketchLayer = new GraphicsLayer();
									// let bufferLayer = new GraphicsLayer();
									// view.map.addMany([bufferLayer, sketchLayer]);
									
									});
							}
							else{
								d3.select(this)
									.style('color', 'aqua')
									uncertain_box_show =!uncertain_box_show
									map.remove(slamm_layer)
									
							}
							
					})
					  
					  
/* -----------------------------
     Deterministic Result
--------------------------------*/	
					  function adjust_point_deter_uncertain(){
						  if (current_infra==false){
							  num = 4000;
							  if (!deter_box_show){
								  alert("Please select Sea Level Rise/deterministics/Point infrastructure")
								  stopAnimation();
							  }
							  update_deter_visual()
						  }
						  else{
							  if (deter_box_show){
								   num =4000;
								  update_point_visual();
								  update_deter_visual();
							  }
							  else{
							  num =1000;
							  update_point_visual();
							  
						  }
						}
					  }
					  function update_deter_visual(){
						  pointyear = '_'+sliderValue.innerHTML;
						  let layerid = deterministic_layer[pointid][pointyear];
						  map.remove(deterlayer)
						  deterlayer= change_deter_layer(layerid)
						  if (deter_box_show){
						  
						  	map.add(deterlayer);
						  }
					  }
					  d3.select('#deter')
					  	.on('click',function(){
					  		stopAnimation();
					  		if (!deter_box_show){
					  			d3.select(this)
					  			.style('color', 'orange')
					  			convert()
					  			map.add(deterlayer)
								view.whenLayerView(deterlayer).then(function(layerView) {
									deterLayerView = layerView;
								});
								let sketchLayer = new GraphicsLayer();
								let bufferLayer = new GraphicsLayer();
								view.map.addMany([bufferLayer, sketchLayer]);
					  		}
					  		else{
					  			d3.select(this)
					  				.style('color', 'aqua')
					  			map.remove(deterlayer)
					  		}
					  		deter_box_show = !deter_box_show;
					  		
					  	})
					  
/* -----------------------------
     Point infrastructure
--------------------------------*/
					
					function update_point_visual(){
						pointyear = '_'+sliderValue.innerHTML;
						
						if (pointid){
							if (pointid[pointid.length-1]!='d'){
								if(pointid!='1'){
								inundation_combination= point_infra_inundation[pointid][pointyear];}
							}
							else{
								return;
							}
							
							}
						else{
							// alert("Please Select Sea Level Rise Result")
							try{
								inundation_combination= point_infra_inundation[pointid][pointyear];
							}catch(e){
								console.log(e)
								return;
								//TODO handle the exception
							}
							
							
						}
						pointRenderer.field = inundation_combination;
						current_infra.renderer = pointRenderer;
					}
					
					
					
					deterselection.addEventListener('change',function(){
						stopAnimation();
						convert()
						//update point infrastructure
						let index = this.selectedIndex;
							pointid = this.value;
							catch_slr = catchsvi_slr[pointid]
							SLR_choice.innerHTML = this.options[index].innerHTML.toUpperCase();
							update_point_visual();
						//update deterministic result
						let layerid = deterministic_layer[pointid][pointyear];
						map.remove(deterlayer);
						deterlayer= change_deter_layer(layerid)
						
						console.log(pointid,pointyear)
						if (deter_box_show){
							
							map.add(deterlayer);
						    view.whenLayerView(deterlayer).then(function(layerView) {
						    	deterLayerView = layerView;
							let sketchLayer = new GraphicsLayer();
							let bufferLayer = new GraphicsLayer();
							view.map.addMany([bufferLayer, sketchLayer]);
							
							});
						}
							
					})
					
					function change_deter_layer(layerid){
						if (pointid[pointid.length - 1] =='d')
						{
							let newlayer = new FeatureLayer({
								portalItem: {
								  // autocasts as new PortalItem
								  id: layerid
								},
								outFields:['gridcode','Shape_Area'],
								renderer: inundRenderer,
								
							})
							return newlayer;
						}
						else{
							let newlayer = new FeatureLayer({
								portalItem: {
								  // autocasts as new PortalItem
								  id: layerid
								},
								outFields:['gridcode','Shape_Area'],
								renderer: deterRenderer,
								
							})
							return newlayer;
						}
						
						
					}
					
					
					
					/* -----------------------------
						Set label configuration
				   --------------------------------*/
					labelClass = {
						symbol: {
						  type: "text", 
						  color: "yellow",
						  haloColor: "black",
						  font: { family: "playfair-display",
												size: 5,
												weight: "bold"}},
						labelPlacement: "above-center",
						labelExpressionInfo: {
						  expression: "$feature.FACILITYNA"}};
					/* -----------------------------
								Control Label show up
					--------------------------------*/
					
					labelbt.onclick = function(){
						if (!current_infra){
							alert('Please select Sea Levl Rise and Point Infrastructure first');
							return;
						}
						else if (labelshow){
						current_infra.labelingInfo = labelClass;
						d3.select('#label').style('color','orange')	
						}
						else{
							d3.select('#label').style('color','aqua')
							current_infra.labelingInfo = [''];
						}
						labelshow = !labelshow;
					}
					/* -----------------------------
					  Control Infrastructure choice
					--------------------------------*/
					
					pointlistener.addEventListener("change", updateinfra)
					
					function updateinfra(){
						stopAnimation();
						labelshow = false;
						
						let index = this.selectedIndex;
						let id = this.value;
						let name = this.options[index].getAttribute('name');
						infra_choice.innerHTML= this.options[index].innerHTML;
						if (name != ''){
							changelabel(name);
							map.remove(current_infra)
							current_infra = createmap(id,labelClass);
							map.add(current_infra)
							update_point_visual();
						}
						else{
							map.remove(current_infra)
							current_infra = createmap(id);
							map.add(current_infra)
							update_point_visual();
						}
						convert()
					}
					/* -----------------------------
					  Control Infrastructure choice
					--------------------------------*/
					function createmap(layerid,labelClass=1){
						if (labelClass ==1){
							let newlayer = new FeatureLayer({
								portalItem: {
								  // autocasts as new PortalItem
								  id: layerid
								},
								popupTemplate: pointtemplate,
								renderer: pointRenderer
							})
							return newlayer;
						}
						else{
							let newlayer = new FeatureLayer({
							portalItem: {
							  // autocasts as new PortalItem
							  id: layerid
							},
							labelingInfo: [labelClass],
							popupTemplate: pointtemplate,
							renderer: pointRenderer
						})
							return newlayer;
						}
							
						
						}
					/* ---------------------------------------------
					  Change label name for different infrastructure
					------------------------------------------------*/
					function changelabel(name){
						labelClass.labelExpressionInfo.expression ="$feature."+name;
					}
/* -----------------------------
             SVI
--------------------------------*/	
			var template = {
									title:"Social Vulnerability Index",
									content:
										"This tracts is in <b>{COUNTY}</b>.It's vunlerability is above <b>{expression/percentage-arcade}%</b> percentile with the vunlerability level <b>{F_TOTAL}</b>",
										fieldInfos:[
											{
												fieldName:"RPL_THEMES",
												format:{
													
													digitSeparator:true,
													places:0
												}
											
											}
										],
										expressionInfos: arcadeExpressionInfos
								}
			
			svi = new FeatureLayer({
								portalItem:{id: "088a013b3a984590b84f9c3a1c6cb692"},
								definitionExpression: "RPL_THEMES > 0",
								outFields: ["*"],
								popupTemplate:null
								
							})
 // configure parameters for the color renderer generator
        // the layer must be specified along with a field name
        // or arcade expression. The basemap and other properties determine
        // the appropriate default color scheme.

        var colorParams = {
          layer: svi,
          basemap: map.basemap,
          field: "RPL_THEMES",
          theme: "above-and-below",
					colorScheme: {
          id: "above-and-below/gray/div-blue-red",
          colors: [[0,255,0],[190,254,0],[255,255,0],[255,135,0],[255,0,0]],
          noDataColor: [0,0,0],
          colorsForClassBreaks: [
            {
              colors: [[255,0,0]],
              numClasses: 1
            }, {
              colors: [[255,0,0],[255,255,255]],
              numClasses: 2
            }, {
              colors: [[255,0,0],[255,255,255],[0,0,255]],
              numClasses: 3
            }, {
              colors: [[255,0,0],[170,0,85],[85,0,170],[0,0,255]],
              numClasses: 4
            }, {
              colors: [[255,0,0],[255,127,127],[255,255,255],[127,127,255],[0,0,255]],
              numClasses: 5
            }, {
              colors: [[255,0,0],[255,85,85],[255,170,170],[255,255,255],[127,127,255],[0,0,255]],
              numClasses: 6
            }, {
              colors: [[255,0,0],[255,85,85],[255,170,170],[255,255,255],[170,170,255],[85,85,255],[0,0,255]],
              numClasses: 7
            }, {
              colors: [[255,0,0],[255,63,63],[255,127,127],[255,191,191],[255,255,255],[170,170,255],[85,85,255],[0,0,255]],
              numClasses: 8
            }, {
              colors: [[255,0,0],[255,63,63],[255,127,127],[255,191,191],[255,255,255],[191,191,255],[127,127,255],[63,63,255],[0,0,255]],
              numClasses: 9
            }, {
              colors: [[255,0,0],[255,63,63],[255,127,127],[255,191,191],[255,255,255],[204,204,255],[153,153,255],[102,102,255],[51,51,255],[0,0,255]],
              numClasses: 10
            }
          ],
          outline: {
            color: {r: 153, g: 153, b: 153, a: 0.25},
            width: "0.5px"
          },
          opacity: 0.8
        }
					
					};
				 // Set up initial color slider properties.
        // numHandles determines whether 2 or 3 handles
        // will be visible in the slider. The primary handle
        // (middle one of the three) controls all handles
        // when moved if `syncedHandles` is true.

        var sliderParams = {
          numHandles: 3,
          syncedHandles: true,
          container: "slider",
        };
				// Generate a continuous color renderer based on the
        // statistics of the data in the provided layer
        // and field normalized by the normalizationField.
        //
        // This resolves to an object containing several helpful
        // properties, including color scheme, statistics,
        // the renderer and visual variable

		colorRendererCreator
          .createContinuousRenderer(colorParams)
          .then(function(response) {
            // set the renderer to the layer and add it to the map

            svi.renderer = response.renderer;
            // add the statistics and color visual variable objects
            // to the color slider parameters

            sliderParams.statistics = response.statistics;
            sliderParams.visualVariable = response.visualVariable;

            // generate a histogram for use in the slider. Input the layer
            // and field or arcade expression to generate it.

            return histogram({
              layer: svi,
              field: "RPL_THEMES",
            });
          })
          .then(function(histogram) {
            // when it resolves set the histogram in the slider parameters
            sliderParams.histogram = histogram;
						
			// input the slider parameters in the slider's constructor
            // and add it to the view's UI

            var colorSlider = new ColorSlider(sliderParams);
            
			// when the user slides the handle(s), update the renderer
            // with the updated color visual variable object

            colorSlider.on("data-change", function() {
              var renderer = svi.renderer.clone();
              renderer.visualVariables = [
                lang.clone(colorSlider.visualVariable)
              ];
              svi.renderer = renderer;
            });
          })
          .catch(function(error) {
            console.log("there was an error: ", error);
          });

					map.add(svi)
					svi.opacity = 0
					
					// view.ui.add("containerDiv", "bottom-left");
					
					
					
/* -----------------------------
             MapView 
--------------------------------*/				
					var view = new MapView({
					  container: "viewDiv",
					  map: map,
					  center: [-73.967569, 40.727724],
					      zoom: 12,
					  constraints: {
					  snapToZoom: false,
					  minScale: 450000.819286,
					  },
					  resizeAlign: "top-left"
					});
					/* -----------------------------
					        Prepare for drawing 
					--------------------------------*/	
					let sketchLayer = new GraphicsLayer();
					let bufferLayer = new GraphicsLayer();
					view.map.addMany([bufferLayer, sketchLayer]);
					/* -----------------------------
					        Prepare for drawing 
					--------------------------------*/	
					var box = document.getElementById('infoDiv')
					const SketchExpand = new Expand({
					  expandIconClass: "esri-icon-edit",
					  expandTooltip: "How to use this sample",
					  view: view,
					  content:infoDiv
					});
					
					
					view.ui.add(SketchExpand, "bottom-right");
					
					
					/* -----------------------------
					        Expand our Legend
					--------------------------------*/
					
					var slammlegend = new Legend({
						    view: view
						  });
					
					const LegendExpand = new Expand({
					  expandIconClass: "esri-icon-labels",
					  expandTooltip: "How to use this sample",
					  view: view,
					  content:slammlegend
					});
					view.ui.add(LegendExpand, "bottom-left");
					
						/* -----------------------------
					        Expand our Search 
					--------------------------------*/
					var search = new Search({view: view});
					
					const searchExpand = new Expand({
					  expandIconClass: "esri-icon-search",
					  expandTooltip: "How to use this sample",
					  view: view,
					  content: search
					});
					view.ui.add(searchExpand,"top-right");
					
					/* -----------------------------
				        Expand our Basemap Gallery
				--------------------------------*/
					var basemapGallery = new BasemapGallery({
						view: view,
						source: {
						  portal: {
							url: "https://www.arcgis.com",
							useVectorBasemaps: false  // Load vector tile basemaps
						  }
						},
						iconClass:'esri-icon-maps'
					  });
					const basemapExpand = new Expand({
						  expandIconClass: "esri-icon-maps",
						  expandTooltip: "How to use this sample",
						  view: view,
						  content: basemapGallery
						});
						view.ui.add(basemapExpand,"top-right")
					/* -----------------------------
					       Return to orginal basemap
					--------------------------------*/
					d3.select('#Original_Basemap')
						.on('click',function(){
							map.basemap = {
								portalItem: {
									id: "4f2e99ba65e34bb8af49733d9778fb8e"
									}
							};
						})
					/* -----------------------------
					            Prepare Layerview for SVI 
					--------------------------------*/
					var sviLayerView;
					view.whenLayerView(svi).then(function(layerView) {
					
					  sviLayerView = layerView;
					});
					/* -----------------------------
					       Contorl for SVI button
					--------------------------------*/
					var container = document.getElementById('containerDiv')
					var svishow = true;
					view.ui.add("containerDiv", "bottom-left");
					d3.select('#svi').on('click', function(){
						if (!svishow){
							stopAnimation()
							svi.opacity =0;
							container.style.display = 'none';
							svishow=!svishow;
							d3.select(this).style('color','aqua')
							svi.popupTemplate = null;
						}
						else{
							stopAnimation()
							svi.opacity = 1;
						// view.ui.remove(slammlegend);
						container.style.display = 'block';
						d3.select(this).style('color','orange')
						svishow=!svishow;
						svi.popupTemplate = template;
						}
						
					})
					
					
					
/* -----------------------------
      Load Pluto Data 
--------------------------------*/					
					plutolayer=new FeatureLayer({
					      portalItem: {
					        id: 'b616c9b011004d5e806dcd2659ba8eef'
					      },
					      title: 'pluto',
						  opacity:0,
						  outFields: ["OwnerType","OwnerName","ComArea","LandUse","LotArea","AssessTot"]
					    });
					
										
					
					
					view.when(generateRenderer);
					function generateRenderer() {
						  var typeParams = {
							layer: plutolayer,
							basemap: map.basemap,
							field: "LandUse",
							legendOptions: {
							  title: "LandUse"
							}
							// UniqueValueInfo:[{
							// 	value :'01',
							// 	symbol: {
							// 			type: "simple-fill",  // autocasts as new SimpleFillSymbol()
							// 			color: "yellow"
							// 		  },
							// 	label :'Hello'
							// }]
						  };
					typeRendererCreator.createRenderer(typeParams)
						.then(function(response) {
						  // set the renderer to the layer and add it to the map
						 response.renderer.removeUniqueValueInfo("01");
						 response.renderer.removeUniqueValueInfo("04");
						 response.renderer.removeUniqueValueInfo("05");
						 response.renderer.removeUniqueValueInfo("06");
						 response.renderer.removeUniqueValueInfo("07");
						 response.renderer.removeUniqueValueInfo("08");
						 response.renderer.removeUniqueValueInfo("09");
						 response.renderer.removeUniqueValueInfo("10");
						 response.renderer.removeUniqueValueInfo("11");
						 response.renderer.removeUniqueValueInfo("12");
						 response.renderer.addUniqueValueInfo({
							  value: "01",
							  symbol: new SimpleFillSymbol({
								color: "red"
							  }),
							  label: "Residential Buildings"  // will display this text in legend
							})
						response.renderer.addUniqueValueInfo({
							  value: "04",
							  symbol: new SimpleFillSymbol({
								color: "yellow"
							  }),
							  label: "Mixed Residential & Commercial Buildings"  // will display this text in legend
							})
						response.renderer.addUniqueValueInfo({
							  value: "05",
							  symbol: new SimpleFillSymbol({
								color: "blue"
							  }),
							  label: "Commercial & Office Buildings"  // will display this text in legend
							})
						response.renderer.addUniqueValueInfo({
							  value: "06",
							  symbol: new SimpleFillSymbol({
								color: "brown"
							  }),
							  label: "Industrial & Manufacturing"  // will display this text in legend
							})
						response.renderer.addUniqueValueInfo({
							  value: "07",
							  symbol: new SimpleFillSymbol({
								color: "purple"
							  }),
							  label: "Transportation & Utility"  // will display this text in legend
							})
						response.renderer.addUniqueValueInfo({
							  value: "08",
							  symbol: new SimpleFillSymbol({
								color: "orange"
							  }),
							  label: "Public Facilities & Institutions"  // will display this text in legend
							})
						response.renderer.addUniqueValueInfo({
							  value: "09",
							  symbol: new SimpleFillSymbol({
								color: "green"
							  }),
							  label: "Open Space & Outdoor Recreation"  // will display this text in legend
							})
						response.renderer.addUniqueValueInfo({
							  value: "10",
							  symbol: new SimpleFillSymbol({
								color: "cream"
							  }),
							  label: "Parking Facilities"  // will display this text in legend
							})
						response.renderer.addUniqueValueInfo({
							  value: "10",
							  symbol: new SimpleFillSymbol({
								color: "grey"
							  }),
							  label: "Vacant Land"  // will display this text in legend
							})
						response.renderer.addUniqueValueInfo({
							  value: "12",
							  symbol: new SimpleFillSymbol({
								color: "black"
							  }),
							  label: "other"  // will display this text in legend
							})
					
						  plutolayer.renderer = response.renderer;
						  
						})
						.catch(function(error) {
						  console.error("there was an error: ", error);
						});
					}
					
					
					map.add(plutolayer)
					
					
					
					
/* -----------------------------
      Set pluto Layer view
--------------------------------*/	
					var featureLayerView;
					view.whenLayerView(plutolayer).then(function(layerView) {
					
					  featureLayerView = layerView;
					});
					
/* -----------------------------
       Pluto Opacity 
--------------------------------*/	
					opslider.addEventListener('change',function(){
												stopAnimation();
						           opnum.innerHTML=opslider.value
											 plutolayer.opacity = opslider.value/100
					})



/* -----------------------------
      Set deterministic Layer view
--------------------------------*/	
					var deterLayerView;
					


/* -----------------------------
      set drawing tools
--------------------------------*/

					// use SketchViewModel to draw polygons that are used as a filter
					let sketchGeometry = null;
					var sketchViewModel = new SketchViewModel({
					  layer: sketchLayer,
					  view: view,
					  pointSymbol: {
					    type: "simple-marker",
					    style: "circle",
					    size: 10,
					    color: [255, 255, 255, 0.8],
					    outline: {
					      color: [211, 132, 80, 0.7],
					      size: 10
					    }
					  },
					  polylineSymbol: {
					    type: "simple-line",
					    color: [211, 132, 80, 0.7],
					    width: 6
					  },
					  polygonSymbol: {
					    type: "simple-fill",
					    outline: {
					          color: [255, 255, 0, 1],
					          size: "12px"
					        }
					      }
					  }
					);
					
					sketchViewModel.on(["create"], function(event) {
					  // update the filter every time the user finishes drawing the filtergeometry
					  if (event.state == "complete") {
					    sketchGeometry = event.graphic.geometry;
					    updateFilter();
							runQuery();
					  }
					});
					
					sketchViewModel.on(["update"], function(event) {
					  const eventInfo = event.toolEventInfo;
					  // update the filter every time the user moves the filtergeometry
					  if (eventInfo && eventInfo.type.includes("move")) {
					    if (eventInfo.type === "move-stop") {
					      sketchGeometry = event.graphics[0].geometry;
					      updateFilter();
						  runQuery();
					    }
					  }
					  // update the filter every time the user changes the vertices of the filtergeometry
					  if (eventInfo && eventInfo.type.includes("reshape")) {
					    if (eventInfo.type === "reshape-stop") {
					      sketchGeometry = event.graphics[0].geometry;
					      updateFilter();
						  runQuery();
					    }
					  }
					});
/* -----------------------------
     Feature function
--------------------------------*/
					
					document
					  .getElementById("featureLayerViewFilter")
					  .addEventListener("change", function(ev) {
							stopAnimation();
					    featureLayerViewFilterSelected = !!ev.target.checked;
						
						cleanwordcloud();
						if (!featureLayerViewFilterSelected){
							updateChart(yearChart, [0,0,0,0,0,0,0,0,0]);
							updateChart(materialChart,[0,0,0,0,0]);
							updateChart(valueChart, [0,0,0,0,0,0,0,0,0,0]);
							
						}
						else{
							
							updateFilter();
							runQuery();
							
						}
						
						
					  });
					
					document
					  .getElementById("parkingLayerViewFilter")
					  .addEventListener("change", function(ev) {
							stopAnimation();
					    deterLayerViewFilterSelected = !!ev.target.checked;
					    
						if (!deterLayerViewFilterSelected){
							updateChart(deterpolarChart, [0,0,0,0,0,0,0,0,0]);
						}
						else{
							updateFilter();
							runQuery();
						}
						
					  });
					
					// draw geometry buttons - use the selected geometry to sktech
					document.getElementById(
					  "point-geometry-button"
					).onclick = geometryButtonsClickHandler;
					document.getElementById(
					  "line-geometry-button"
					).onclick = geometryButtonsClickHandler;
					document.getElementById(
					  "polygon-geometry-button"
					).onclick = geometryButtonsClickHandler;
					function geometryButtonsClickHandler(event) {
						stopAnimation();
					  const geometryType = event.target.value;
					  clearFilter();
						aboutpage.style.display ='none'
					  sketchViewModel.create(geometryType);
					}
					
					// get the selected spatialRelationship
					let selectedFilter = "intersects";
					document
					  .getElementById("relationship-select")
					  .addEventListener("change", function(event) {
							stopAnimation();
					    var select = event.target;
					    selectedFilter = select.options[select.selectedIndex].value;
					    updateFilter();
						  runQuery();
						
					  });
					
					// get user entered values for buffer
					let buffer = 0;
					bufferNum.onchange = bufferVariablesChanged;
					function bufferVariablesChanged() {
						stopAnimation();
					  buffer = parseInt(bufferNum.value);
					  document.getElementById("bufferValueNum").innerHTML = buffer;
					  updateFilter();
					  runQuery();
					}
					
					// remove the filter
					document
					  .getElementById("clearFilter")
					  .addEventListener("click", function() {
					    clearFilter();
					  });
					
					function clearFilter() {
					  sketchGeometry = null;
					  filterGeometry = null;
					  sketchLayer.removeAll();
					  bufferLayer.removeAll();
					  if (deter_box_show){
						  deterLayerView.filter = null;
						  }
					  if (uncertain_box_show) {
							slammLayerView.filter =null;
						}
					  featureLayerView.filter = null;
						sviLayerView.filter = null;
					  clearCharts();
					  resultDiv.style.display = "none";
					  aboutpage.style.display = 'block';
					}
				
					
					
					// set the geometry filter on the visible FeatureLayerView
					function updateFilter() {
					  updateFilterGeometry();
					  featureFilter = {
					    // autocasts to FeatureFilter
					    geometry: filterGeometry,
					    spatialRelationship: selectedFilter
					  };
					
					  if (featureLayerView) {
					    if (featureLayerViewFilterSelected) {
					      featureLayerView.filter = featureFilter;
					    } else {
					      featureLayerView.filter = null;
					    }
					  }
					  if (deterLayerView) {
					    if (deterLayerViewFilterSelected) {
					      deterLayerView.filter = featureFilter;
					    } else {
					      deterLayerView.filter = null;
						}
					  }
						if (sviLayerView){
							sviLayerView.filter = featureFilter;
							
						} else{
							sviLayerView.filter = null;
						}
						if (slammLayerView){
							slammLayerView.filter = featureFilter;
							
						} else{
								if (slammLayerView){
									slammLayerView.filter = null;
								}
						}
						
					}
					
					// update the filter geometry depending on buffer
					let filterGeometry = null;
					function updateFilterGeometry() {
					  // add a polygon graphic for the buffer
					  if (sketchGeometry) {
					    if (buffer > 0) {
					      var newBufferGeometry = geometryEngine.geodesicBuffer(
					        sketchGeometry,
					        buffer,
					        "meters"
					      );
					      filterGeometry = newBufferGeometry;
					      if (bufferLayer.graphics.length === 0) {
					        bufferLayer.add(
					          new Graphic({
					            geometry: filterGeometry,
					            symbol: {
					              type: "simple-fill",
								  outline: {
									color: [255, 153, 0, 0.7],
									size: "10px"
								  }
					                
					              
					            }
					          })
					        );
					      }
					      bufferLayer.graphics.getItemAt(0).geometry = filterGeometry;
					    } else {
					      bufferLayer.removeAll();
					      filterGeometry = sketchGeometry;
					    }
					  }
					}
					
/* -----------------------------
     Query by geometry
--------------------------------*/
				// set the geometry query on the visible SceneLayerView
					var debouncedRunQuery = promiseUtils.debounce(function() {
					  if (!sketchGeometry) {
					    return;
					  }
					
					  aboutpage.style.display = 'none'
					  resultDiv.style.display = "block";
					  // updateBufferGraphic(bufferSize);
					  return promiseUtils.eachAlways([
					    queryStatistics(),
							queryfeatures(),
							deterqueryStatistics(),
							sviqueryfeatures(),
							querySviStatistics(),
							// queryUncertainStatistics(),
						// updateSceneLayer()
					  ]);
					});
					
					function runQuery() {
					  debouncedRunQuery().catch((error) => {
					    if (error.name === "AbortError") {
					      return;
					    }
					
					    console.error(error);
					  });
					}
					
					
					var name = [];
					var word
					var yearChart = null;
					var materialChart = null;
					var deterpolarChart = null;
					var fill = d3.scaleOrdinal(d3.schemePaired);
					var cloud = d3.select("#d3-chart").select("svg")
					    .attr("width", 500)
					    .attr("height", 400)
					    // .attr("style","border:1px solid red")
					    .append("g")
					    .attr("transform", "translate(250,200)")
					var leaderScale = d3.scaleLinear().range([5,60])	
					var tip = d3.tip()
						  .attr('class', 'd3-tip')
						  .offset([-10, 0])
						  .html(function(d) {
							return "<strong style='color:black'>OwnerName:</strong><span style='color:red'>" + d.text + "</span></br><strong style='color:black'>Total shape area(square fts):</strong> <span style='color:red'>" + parseInt(leaderScale.invert(d.size)) + "</span>";
						  })
					cloud.call(tip)
					function drawCloud(words) {
					    
						cloudx=cloud.selectAll("text")
					         .data(words)
							 
						cloudx.exit().remove();
						
						cloudx.style("font-size", function(d) { return d.size + "px"; })
							.style("font-family", "Impact")
							.style("fill", function(d, i) { return fill(i); })//fill 在前面15行定义为颜色集
							.attr("text-anchor", "middle")
							.attr("transform", function(d) {
							    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
							})
							.text(function(d) { return d.text; })
							.on('mouseover', tip.show)
							.on('mouseout', tip.hide);
					    cloudx.enter().append("text")
					        // .style("border","1px solid blue")
					        .style("font-size", function(d) { return d.size + "px"; })
					        .style("font-family", "Impact")
					        .style("fill", function(d, i) { return fill(i); })//fill 在前面15行定义为颜色集
					        .attr("text-anchor", "middle")
					        .attr("transform", function(d) {
					            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
					        })
					        .text(function(d) { return d.text; })
							.on('mouseover', tip.show)
							.on('mouseout', tip.hide);
							}
					function queryfeatures() {
					 
					const query = featureLayerView.createQuery();
					 
					query.geometry = sketchGeometry;
					query.distance = buffer;
					  // query.outStatistics = statDefinitions;
					  query.outFields = ['OwnerName','LotArea']
					  return featureLayerView.queryFeatures(query).then(function(result) {
							// console.log(result)
							const allresult = result.features
							allresult.forEach(function(d){
								if (d.attributes.OwnerName){
								name.push({'name':d.attributes.OwnerName,'area':d.attributes.LotArea})
								}
							})
							word = convertword([],name)
							word.sort(function(a,b){
								return b.size-a.size
							})
							word.sort(function(a,b){
								return b.size-a.size
							})
							
							leaderScale.domain([
								d3.min(word,function(d){return d.size}),
								d3.max(word,function(d){return d.size})
							]);
							d3.layout.cloud().size([400, 400]) //size([x,y])  词云显示的大小
							//map 返回新的object数组
								.words(word)
								//~~的作用是单纯的去掉小数部分，不论正负都不会改变整数部分
								//这里的作用是产生0 1
								.padding(0)
								// .rotate(function() { return ~~(Math.random() * 2) * 90; })
								.font("Impact")
								.fontSize(function(d) { return leaderScale(d.size); })
								.on("end", drawCloud)//结束时运行draw函数
								.start();
					})
					
					
					
					}
					
					
					
					
					
					
					
					
					function convertword(data2, data){
						let set = new Set();
						var keylist= []
						for (z= 0; z<data.length;z++){
							if (data2.length ==0){
								data2.push({'text':data[z]['name'],'size':+data[z]['area']});
								set.add(data[z]['name'])
								continue;
							}
							if (set.has(data[z]['name'])){
								for (m=0; m<data2.length;m++){ 
									if (data2[m]['text']==data[z]['name']){
										data2[m]['size']+=data[z]['area']
									}
								}
								
							}
							else{
								data2.push({'text':data[z]['name'],'size':data[z]['area']})
								set.add(data[z]['name'])
							}
							}
						return data2;
					}
					function deterqueryStatistics(){
						if (deter_box_show){
						const deterstatDefinitions= [
							{
							  onStatisticField:
							    "CASE WHEN gridcode = 5 THEN Shape_Area ELSE 0 END",
							  outStatisticFieldName: "d05",
							  statisticType: "sum"
							},
							{ 
							  onStatisticField:
							  "CASE WHEN gridcode = 6 THEN Shape_Area ELSE 0 END",
							   outStatisticFieldName: "d06",
							   statisticType: "sum"
							},
							{ 
							  onStatisticField:
							  "CASE WHEN gridcode = 8 THEN Shape_Area ELSE 0 END",
							   outStatisticFieldName: "d08",
							   statisticType: "sum"
							}
						];
						var deterquery = deterLayerView.createQuery();
						deterquery.geometry = sketchGeometry;
						deterquery.distance = buffer;
						deterquery.outStatistics = deterstatDefinitions;
						return deterLayerView.queryFeatures(deterquery).then(function(result) {
							console.log(result)
							const deterStats = result.features[0].attributes;
							if (deterLayerViewFilterSelected){
								updateChart(deterpolarChart, [
								  deterStats.d05,
								  deterStats.d06,
								  deterStats.d08
								]);
							}
							
						})
					}
				}
					function queryStatistics() {
					  const statDefinitions = [
					    {
					      onStatisticField:
					        "CASE WHEN LandUse = '01' THEN LotArea ELSE 0 END",
					      outStatisticFieldName: "l01",
					      statisticType: "sum"
					    },
					    {
					      onStatisticField:
					       "CASE WHEN LandUse = '04' THEN LotArea ELSE 0 END",
					       outStatisticFieldName: "l04",
					       statisticType: "sum"
					    },
					    {
					      onStatisticField:
					       "CASE WHEN LandUse = '05' THEN LotArea ELSE 0 END",
					       outStatisticFieldName: "l05",
					       statisticType: "sum"
					    },
					    {
					      onStatisticField:
					        "CASE WHEN LandUse = '06' THEN LotArea ELSE 0 END",
					        outStatisticFieldName: "l06",
					        statisticType: "sum"
					    },
					    {
					      onStatisticField:
					        "CASE WHEN LandUse = '07' THEN LotArea ELSE 0 END",
					        outStatisticFieldName: "l07",
					        statisticType: "sum"
					    },
					    {
					      onStatisticField:
					       "CASE WHEN LandUse = '08' THEN LotArea ELSE 0 END",
					       outStatisticFieldName: "l08",
					       statisticType: "sum"
					    },
					    {
					      onStatisticField:
					        "CASE WHEN LandUse = '09' THEN LotArea ELSE 0 END",
					        outStatisticFieldName: "l09",
					        statisticType: "sum"
					    },
						{
						  onStatisticField:
						    "CASE WHEN LandUse = '10' THEN LotArea ELSE 0 END",
						    outStatisticFieldName: "l10",
						    statisticType: "sum"
						},
						{
						  onStatisticField:
						    "CASE WHEN LandUse = '11' THEN LotArea ELSE 0 END",
						    outStatisticFieldName: "l11",
						    statisticType: "sum"
						},
						{
						  onStatisticField:
						    "LotArea",
						    outStatisticFieldName: "lTOTAL",
						    statisticType: "sum"
						},
						{
						  onStatisticField:
						    "CASE WHEN LandUse = '01' THEN AssessTot ELSE 0 END",
						  outStatisticFieldName: "V01",
						  statisticType: "sum"
						},
						{
						  onStatisticField:
						   "CASE WHEN LandUse = '04' THEN AssessTot ELSE 0 END",
						   outStatisticFieldName: "V04",
						   statisticType: "sum"
						},
						{
						  onStatisticField:
						   "CASE WHEN LandUse = '05' THEN AssessTot ELSE 0 END",
						   outStatisticFieldName: "V05",
						   statisticType: "sum"
						},
						{
						  onStatisticField:
						    "CASE WHEN LandUse = '06' THEN AssessTot ELSE 0 END",
						    outStatisticFieldName: "V06",
						    statisticType: "sum"
						},
						{
						  onStatisticField:
						    "CASE WHEN LandUse = '07' THEN AssessTot ELSE 0 END",
						    outStatisticFieldName: "V07",
						    statisticType: "sum"
						},
						{
						  onStatisticField:
						   "CASE WHEN LandUse = '08' THEN AssessTot ELSE 0 END",
						   outStatisticFieldName: "V08",
						   statisticType: "sum"
						},
						{
						  onStatisticField:
						    "CASE WHEN LandUse = '09' THEN AssessTot ELSE 0 END",
						    outStatisticFieldName: "V09",
						    statisticType: "sum"
						},
						{
						  onStatisticField:
						    "CASE WHEN LandUse = '10' THEN AssessTot ELSE 0 END",
						    outStatisticFieldName: "V10",
						    statisticType: "sum"
						},
						{
						  onStatisticField:
						    "CASE WHEN LandUse = '11' THEN AssessTot ELSE 0 END",
						    outStatisticFieldName: "V11",
						    statisticType: "sum"
						},
						{
						  onStatisticField:
						    "AssessTot",
						    outStatisticFieldName: "VTOTAL",
						    statisticType: "sum"
						},
						{
						  onStatisticField:
						    "CASE WHEN OwnerType = 'C' THEN LotArea ELSE 0 END",
						    outStatisticFieldName: "OC",
						    statisticType: "sum"
						},
						{
						  onStatisticField:
						    "CASE WHEN OwnerType = 'M' THEN LotArea ELSE 0 END",
						    outStatisticFieldName: "OM",
						    statisticType: "sum"
						},
						{
						  onStatisticField:
						    "CASE WHEN OwnerType = 'O' THEN LotArea ELSE 0 END",
						    outStatisticFieldName: "OO",
						    statisticType: "sum"
						},
						{
						  onStatisticField:
						    "CASE WHEN (OwnerType = 'P' AND OwnerType = ' ') THEN LotArea ELSE 0 END",
						    outStatisticFieldName: "OP",
						    statisticType: "sum"
						},
						{
						  onStatisticField:
						    "CASE WHEN OwnerType = 'X' THEN LotArea ELSE 0 END",
						    outStatisticFieldName: "OX",
						    statisticType: "sum"
						}
						
					  ];
					  
					  
					  var query2 = featureLayerView.createQuery();
					  if (!featureLayerViewFilterSelected){return;}
					  query2.geometry = sketchGeometry;
					  query2.distance = buffer;
					  query2.outStatistics = statDefinitions;
					  // query.outFields = ['OwnerName']
					  return featureLayerView.queryFeatures(query2).then(function(result) {
						console.log(result)
					    const allStats = result.features[0].attributes;
					    updateChart(yearChart, [
					      allStats.l01/43560,
						  allStats.l04/43560,
						  allStats.l05/43560,
						  allStats.l06/43560,
						  allStats.l07/43560,
						  allStats.l08/43560,
						  allStats.l09/43560,
						  allStats.l10/43560,
						  allStats.l11/43560,
						  allStats.lTOTAL/43560,
						  
					    ]);
						updateChart(materialChart, [
						  allStats.OC/43560,
						  allStats.OM/43560,
						  allStats.OP/43560,
						  allStats.OX/43560,
						  allStats.OO/43560
						]);
						updateChart(valueChart, [
						  allStats.V01/1000000,
						  allStats.V04/1000000,
						  allStats.V05/1000000,
						  allStats.V06/1000000,
						  allStats.V07/1000000,
						  allStats.V08/1000000,
						  allStats.V09/1000000,
						  allStats.V10/1000000,
						  allStats.V11/1000000,
						  allStats.VTOTAL/1000000
						]);
					  })
					}
					
					function sviqueryfeatures(){
						let id = 'S1_2085'
						
						if (catch_slr){
							if (catchsvi_year){
								console.log(id)
								 id  = catch_slr+catchsvi_year;
								 columns[3] = id;
							}
						}
						const svi_query = sviLayerView.createQuery();
								 
							svi_query.geometry = sketchGeometry;
							svi_query.distance = buffer;
							// query.outStatistics = statDefinitions;
							svi_query.outFields = columns;
							 return sviLayerView.queryFeatures(svi_query).then(function(result) {
									console.log(result)
									const allresult = result.features
									dad = allresult.map(function(d){
										return d.attributes
									});
									
									d3.select('#Karan').select('svg').remove()
									
									densityContourMatrix(dad, columns, width, height, padding, true, bandSize, colorScheme)
									
							})
							
						}
					
					function querySviStatistics(){
						const svi_statDefinitions = [
						    {
						      onStatisticField:
						        "C16001e1",
						      outStatisticFieldName: "population",
						      statisticType: "sum"
						    },
						     {
						      onStatisticField:
						        "C16001e2",
						      outStatisticFieldName: "OnlyEnglish",
						      statisticType: "sum"
						    },
						     {
						      onStatisticField:
						        "C16001e3",
						      outStatisticFieldName: "Spanish",
						      statisticType: "sum"
						    },
						     {
						      onStatisticField:
						        "C16001e6",
						      outStatisticFieldName: "French",
						      statisticType: "sum"
						    },
						     {
						      onStatisticField:
						        "C16001e9",
						      outStatisticFieldName: "German",
						      statisticType: "sum"
						    },
						     {
						      onStatisticField:
						        "C16001e12",
						      outStatisticFieldName: "Russian",
						      statisticType: "sum"
						    },
						     {
						      onStatisticField:
						        "C16001e15",
						      outStatisticFieldName: "IndoEuropean",
						      statisticType: "sum"
						    },
							 {
							  onStatisticField:
							    "C16001e18",
							  outStatisticFieldName: "Korean",
							  statisticType: "sum"
							},
							 {
							  onStatisticField:
							    "C16001e21",
							  outStatisticFieldName: "Chinese",
							  statisticType: "sum"
							},
							 {
							  onStatisticField:
							    "C16001e24",
							  outStatisticFieldName: "Vietnamese",
							  statisticType: "sum"
							},
							 {
							  onStatisticField:
							    "C16001e27",
							  outStatisticFieldName: "Tagalog",
							  statisticType: "sum"
							},
							 {
							  onStatisticField:
							    "C16001e30",
							  outStatisticFieldName: "Arabic",
							  statisticType: "sum"
							},
							 {
							  onStatisticField:
							    "C16001e33",
							  outStatisticFieldName: "Other",
							  statisticType: "sum"
							},
							 {
							  onStatisticField:
							    "B19001e1",
							  outStatisticFieldName: "Totalincome",
							  statisticType: "sum"
							},
							 {
							   onStatisticField:
							     "B19001e2",
							   outStatisticFieldName: "below10000",
							   statisticType: "sum"
							 },
							{
							  onStatisticField:
							    "B19001e3",
							  outStatisticFieldName: "below15000",
							  statisticType: "sum"
							},
							{
							  onStatisticField:
							    "B19001e4",
							  outStatisticFieldName: "below20000",
							  statisticType: "sum"
							},
							{
							  onStatisticField:
							    "B19001e5",
							  outStatisticFieldName: "below25000",
							  statisticType: "sum"
							},
							{
							  onStatisticField:
							    "B19001e6",
							  outStatisticFieldName: "below30000",
							  statisticType: "sum"
							},
							{
							  onStatisticField:
							    "B19001e7",
							  outStatisticFieldName: "below35000",
							  statisticType: "sum"
							},
							{
							  onStatisticField:
							    "B19001e8",
							  outStatisticFieldName: "below40000",
							  statisticType: "sum"
							},
							{
							  onStatisticField:
							    "B19001e9",
							  outStatisticFieldName: "below45000",
							  statisticType: "sum"
							},
							{
							  onStatisticField:
							    "B19001e10",
							  outStatisticFieldName: "below50000",
							  statisticType: "sum"
							},
							{
							  onStatisticField:
							    "B19001e11",
							  outStatisticFieldName: "below60000",
							  statisticType: "sum"
							},
							{
							  onStatisticField:
							    "B19001e12",
							  outStatisticFieldName: "below75000",
							  statisticType: "sum"
							},
							{
							  onStatisticField:
							    "B19001e13",
							  outStatisticFieldName: "below100000",
							  statisticType: "sum"
							},
							{
							  onStatisticField:
							    "B19001e14",
							  outStatisticFieldName: "below125000",
							  statisticType: "sum"
							},
							{
							  onStatisticField:
							    "B19001e15",
							  outStatisticFieldName: "below150000",
							  statisticType: "sum"
							},
							{
							  onStatisticField:
							    "B19001e16",
							  outStatisticFieldName: "below200000",
							  statisticType: "sum"
							},
							{
							  onStatisticField:
							    "B19001e17",
							  outStatisticFieldName: "above200000",
							  statisticType: "sum"
							}
						  ];
						  
						  
						  var svi_query_stat = sviLayerView.createQuery();
						  // if (!featureLayerViewFilterSelected){return;}
						  svi_query_stat.geometry = sketchGeometry;
						  svi_query_stat.distance = buffer;
						  svi_query_stat.outStatistics = svi_statDefinitions;
						  // query.outFields = ['OwnerName']
						  return sviLayerView.queryFeatures(svi_query_stat).then(function(result) {
						
						  const allStats = result.features[0].attributes;
								console.log(allStats)
								let other = allStats.Other+allStats.IndoEuropean
								let first = allStats.below15000 + allStats.below20000
								let second = allStats.below25000 + allStats.below30000
								let third = allStats.below35000 + allStats.below40000
								let forth = allStats.below45000 + allStats.below50000
								
						  updateChart(languageChart, [
						    100*allStats.OnlyEnglish/allStats.population,
							  100*allStats.Spanish/allStats.population,
							  100*allStats.French/allStats.population,
							  100*allStats.German/allStats.population,
							  100*allStats.Russian/allStats.population,
							  100*allStats.Korean/allStats.population,
							  100*allStats.Chinese/allStats.population,
							  100*allStats.Vietnamese/allStats.population,
							  100*allStats.Tagalog/allStats.population,
							  100*allStats.Arabic/allStats.population,
								100*other/allStats.population
						    ]),
							updateChart(incomeChart, [
								  100*allStats.below10000/allStats.Totalincome,
								  100*first/allStats.Totalincome,
								  100*second/allStats.Totalincome,
									100*third/allStats.Totalincome,
									100*forth/allStats.Totalincome,
									100*allStats.below60000/allStats.Totalincome,
									100*allStats.below75000/allStats.Totalincome,
									100*allStats.below100000/allStats.Totalincome,
									100*allStats.below125000/allStats.Totalincome,
									100*allStats.below150000/allStats.Totalincome,
									100*allStats.below200000/allStats.Totalincome,
									100*allStats.above200000/allStats.Totalincome,
								  ])
						  })
						}
					function queryUncertainStatistics(){
						const Definitions = [
						    {
						      onStatisticField:
						        "CASE WHEN (gridcode2 <= '30') THEN POLY_AREA ELSE 0 END",
						      outStatisticFieldName: "below_30",
						      statisticType: "sum"
						    },
						    {
						      onStatisticField:
						        "CASE WHEN (gridcode2 > '30' AND gridcode2 <= '50') THEN POLY_AREA ELSE 0 END",
						      outStatisticFieldName: "below_50",
						      statisticType: "sum"
						    },
						    {
						      onStatisticField:
						        "CASE WHEN (gridcode2 > '50' AND gridcode2 <= '70') THEN POLY_AREA ELSE 0 END",
						      outStatisticFieldName: "below_70",
						      statisticType: "sum"
						    },
						    {
						      onStatisticField:
						        "CASE WHEN (gridcode2 > '70' AND gridcode2 <= '90') THEN POLY_AREA ELSE 0 END",
						      outStatisticFieldName: "below_90",
						      statisticType: "sum"
						    },
						    {
						      onStatisticField:
						        "CASE WHEN (gridcode2 > '90') THEN POLY_AREA ELSE 0 END",
						      outStatisticFieldName: "below_100",
						      statisticType: "sum"
						    },
						    {
						      onStatisticField:
						        "POLY_AREA",
						      outStatisticFieldName: "TOTALarea",
						      statisticType: "sum"
						    }
						    
						  ];
						  
						  
						  var uncertain_query = slammLayerView.createQuery();
						  uncertain_query.geometry = sketchGeometry;
						  uncertain_query.distance = buffer;
						  uncertain_query.outStatistics = Definitions;
						 
						  return slammLayerView.queryFeatures(uncertain_query).then(function(result) {
									console.log(result)
									// uncertain_word.innerHTML = 'Selected Uncertain Prediction Area : '
									 
						    const allStats = result.features[0].attributes;
								// uncertain_area.innerHTML =parseInt(allStats.TOTALarea)+'Sq m'
						    updateChart(uncertainChart, [
						      allStats.below_30,
							    allStats.below_50,
							    allStats.below_70,
							    allStats.below_90,
							    allStats.below_100
						    ]);
							
						  })
						}
					
					function updatecontour(data){
						densityContourMatrix(data, columns, width, height, padding, true, bandSize, colorScheme)
					}
					
					// Updates the given chart with new data
					function updateChart(chart, dataValues) {
					  chart.data.datasets[0].data = dataValues;
					  chart.update();
					}
					
					function createYearChart() {
					  const yearCanvas = document.getElementById("landuse-chart");
					  yearChart = new Chart(yearCanvas.getContext("2d"), {
					    type: "horizontalBar",
					    data: {
					      labels: [
					        "Residential Buildings",
					        "Mixed Residential & Commercial Buildings",
					        "Commercial & Office Buildings",
					        "Industrial & Manufacturing",
							"Transportation & Utility",
							"Public Facilities & Institutions",
							"Open Space & Outdoor Recreation",
							"Parking Facilities",
							"Vacant Land"
					      ],
					      datasets: [
					        {
					          label: "Shape Area of Buildings(acres)",
					          backgroundColor: "#149dcf",
					          stack: "Stack 0",
					          data: [0,0, 0, 0, 0, 0, 0, 0, 0]
					        }
					      ]
					    },
					    options: {
					      responsive: false,
					      legend: {
					        display: false
					      },
					      title: {
					        display: true,
					        text: "LandUse Shape Area"
					      },
					      scales: {
					        xAxes: [
					          {
					            stacked: true,
					            ticks: {
					              beginAtZero: true,
					              precision: 0
					            }
					          }
					        ],
					        yAxes: [
					          {
					            stacked: true
					          }
					        ]
					      }
					    }
					  });
					}
					function createMaterialChart() {
					  const materialCanvas = document.getElementById("material-chart");
					  materialChart = new Chart(materialCanvas.getContext("2d"), {
					    type: "doughnut",
					    data: {
					      labels: ["City", "Mixed city & private", "Private","Fully tax-exempt property","Other"],
					      datasets: [
					        {
					          backgroundColor: [
					            "#00feff",
					            "#7EB0D5",
					            "#B2E061",
								"#ff7300",
								"#b1f7ec"
					          ],
					          borderWidth: 0,
					          data: [0, 0, 0, 0, 0 ]
					        }
					      ]
					    },
					    options: {
					      responsive: false,
					      cutoutPercentage: 35,
					      legend: {
					        position: "bottom"
					      },
					      title: {
					        display: true,
					        text: "Share Area by Ownership Type(acres)"
					      }
					    }
					  });
					}
					function createvalueChart() {
					  const valueCanvas = document.getElementById("value-chart");
					  valueChart = new Chart(valueCanvas.getContext("2d"), {
					    type: "horizontalBar",
					    data: {
					      labels: [
					        "Residential Buildings",
					        "Mixed Residential & Commercial Buildings",
					        "Commercial & Office Buildings",
					        "Industrial & Manufacturing",
							"Transportation & Utility",
							"Public Facilities & Institutions",
							"Open Space & Outdoor Recreation",
							"Parking Facilities",
							"Vacant Land",
							"Total Value"
					      ],
					      datasets: [
					        {
					          label: "Value of each landuse(Millions)",
					          backgroundColor: "#fffe01",
					          stack: "Stack 0",
					          data: [0,0, 0, 0, 0, 0, 0, 0, 0,0]
					        }
					      ]
					    },
					    options: {
					      responsive: false,
					      legend: {
					        display: false
					      },
					      title: {
					        display: true,
					        text: "Assessed Lot Value(m)"
					      },
					      scales: {
					        xAxes: [
					          {
					            stacked: true,
					            ticks: {
					              beginAtZero: true,
					              precision: 0
					            }
					          }
					        ],
					        yAxes: [
					          {
					            stacked: true
					          }
					        ]
					      }
					    }
					  });
					}
					
					function createpolarChart(){
						
						const deterpolarCanvas = document.getElementById("deter-chart");
						deterpolarChart = new Chart(deterpolarCanvas.getContext("2d"), {
						  type: 'polarArea',
						  data: {
						  	labels:['Inland Fresh Marsh','Tidal Marsh','Regularly flooded Marsh'],
						  	datasets:[
						  		{
						  			backgroundColor: [
						  			  "rgb(252, 181, 6)",
						  			  "rgb(0, 255, 0)",
						  			  "rgb(0, 253, 255)"
						  			  ],
						  			borderWidth: 0,
						  			data: [0, 0, 0]
						  		}
						  	]
							},
						  	options: {
						  	  responsive: false,
						  	  legend: {
						  	    position: "top"
						  	  },
						  	  title: {
						  	    display: true,
						  	    text: "Share Area by Marsh type(acres)"
						  	  }
						  	}
						})
					}
					
					function createLanuageChart() {
					  const languageCanvas = document.getElementById("language-chart");
					  languageChart = new Chart(languageCanvas.getContext("2d"), {
					    type: "horizontalBar",
					    data: {
					      labels: [
					        "Only English",
					        "Spanish",
					        "French",
									"German",
					        "Russian",
									"Korean",
									"Chinese",
									"Vietnamese",
									"Tagalog",
									"Arabic",
									"Other Lanuage"
					      ],
					      datasets: [
					        {
					          label: "Pecentage%",
					          backgroundColor: "#ff9600",
					          stack: "Stack 0",
					          data: [0,0, 0, 0, 0, 0, 0, 0, 0,0,0]
					        }
					      ]
					    },
					    options: {
					      responsive: false,
					      legend: {
					        display: false
					      },
					      title: {
					        display: true,
					        text: "Lanuage Spoken At Home(Percentage)"
					      },
					      scales: {
					        xAxes: [
					          {
					            stacked: true,
					            ticks: {
					              beginAtZero: true,
					              precision: 0
					            }
					          }
					        ],
					        yAxes: [
					          {
					            stacked: true
					          }
					        ]
					      }
					    }
					  });
					}
					function createIncomeChart() {
					  const IncomeCanvas = document.getElementById("income-chart");
					  incomeChart = new Chart(IncomeCanvas.getContext("2d"), {
					    type: "horizontalBar",
					    data: {
					      labels: [
					        "<$10,000",
					        "$10,000-$19,999",
									"$20,000-$29,999",
									"$30,000-$39,999",
									"$40,000-$49,999",
									"$50,000-$59,999",
									"$60,000-$74,999",
									"$75,000-$99,999",
									"$100,000-$124,999",
									"$125,000-$149,999",
									"$150,000-$199,999",
									">$200,000"
									
					      ],
					      datasets: [
					        {
					          label: "Household Number Percentage %",
					          backgroundColor: "#00feff",
					          stack: "Stack 0",
					          data: [0,0, 0, 0, 0, 0, 0, 0, 0,0,0,0]
					        }
					      ]
					    },
					    options: {
					      responsive: false,
					      legend: {
					        display: false
					      },
					      title: {
					        display: true,
					        text: "Household By Annual Income"
					      },
					      scales: {
					        xAxes: [
					          {
					            stacked: true,
					            ticks: {
					              beginAtZero: true,
					              precision: 0
					            }
					          }
					        ],
					        yAxes: [
					          {
					            stacked: true
					          }
					        ]
					      }
					    }
					  });
					}
					function createUncertainChart() {
					  const uncertainCanvas = document.getElementById("uncertain-chart");
					  uncertainChart = new Chart(uncertainCanvas.getContext("2d"), {
					    type: "pie",
					    data: {
					      labels: ["<30%", "30%-50%", "50%-70%","70%-90%",">90%"],
					      datasets: [
					        {
					          backgroundColor: [
					            "#00feff",
					            "#7EB0D5",
					            "#B2E061",
											"#ff7300",
											"#b1f7ec"
					          ],
					          borderWidth: 0,
					          data: [0, 0, 0, 0, 0 ]
					        }
					      ]
					    },
					    options: {
					      responsive: false,
					      cutoutPercentage: 35,
					      legend: {
					        position: "bottom"
					      },
					      title: {
					        display: true,
					        text: "Probability Summery for Uncertainty Result"
					      }
					    }
					  });
					}
					function clearCharts() {
					  updateChart(yearChart, [0,0,0,0,0,0,0,0,0]);
					  updateChart(materialChart,[0,0,0,0,0]);
					  updateChart(deterpolarChart,[0,0,0]);
					  updateChart(valueChart, [0,0,0,0,0,0,0,0,0,0]);
					  updateChart(languageChart, [0,0,0,0,0,0,0,0,0,0,0]);
						updateChart(incomeChart, [0,0,0,0,0,0,0,0,0,0,0,0]);
						updateChart(uncertainChart,[0,0,0,0,0])
					}
					  
					createYearChart();
					createMaterialChart();
					createLanuageChart();
					createpolarChart();
					createvalueChart();
					createIncomeChart();
					createUncertainChart();
					
			
/* -----------------------------
     Fly to Function
--------------------------------*/	
					var parking;
					
					d3.select('#parkinglot')
								.on('click',function(){
									stopAnimation();
									if (showsvi){
										d3.select(this)
											.style('color','orange')
										convert()
										parking = create_parking_lot();
										map.add(parking);
										// let sketchLayer = new GraphicsLayer();
										// let bufferLayer = new GraphicsLayer();
										// view.map.addMany([bufferLayer, sketchLayer]);
										
									}	
									else{
										d3.select(this).style('color','aqua')
										map.remove(parking);
									}
									showsvi = !showsvi;
								})
								
								
					function create_parking_lot(){
								let newlayer = new FeatureLayer({
									portalItem: {
									  id: 'ede4b1edc5024d37978623f6b9611d88'
									},
									title: 'parking',
									outFields: ["shape_area"]
									
								})
								return newlayer
					}



/* -----------------------------
     Fly to Function
--------------------------------*/					
					var opts = {
									duration: 1000,// Duration of animation will be 5 seconds
								};
					const gotoExpand = new Expand({
					  expandIconClass: "esri-icon-navigation",
					  expandTooltip: "How to use this sample",
					  view: view,
					  content: gotolist
					});
					
					view.ui.add(gotoExpand, 'top-left')
					
					  flytolist.addEventListener('click',function(event){
							stopAnimation();
						  event = event || window.event;
						  var target = event.target || event.srcElement;
						  switch (target.id) {
							case "BroadChannel" :
								view.goTo({
									center: [-73.82141525615856, 40.604059215040984],
									zoom: 16	
								},opts)
								break;
							case "Origin" :
								view.goTo({
									center: [-73.967569, 40.727724],
									zoom: 12
								},opts)
								break;
							case "zhanshi" :
								$("#zhanshi").addClass("active").siblings().removeClass("active")
								break;
								}
						});
			
/* -----------------------------
    All the function Expand
--------------------------------*/		  
		  
		  
					   const deterExpand = new Expand({
						expandIconClass: "esri-icon-collection",
						expandTooltip: "How to use this sample",
						view: view,
						content: Deterministic
					  });
					  view.ui.add(deterExpand, 'top-left')
/* -----------------------------
    Animation of point infra
--------------------------------*/		  
		  	  
		  
					  var animation = null;
					  
					  playButton.addEventListener("click", function() {
					  if (playButton.classList.contains("toggled")) {
						stopAnimation();
						} 
					  else {
						  
						startAnimation();
					  }
					});
					
					
					
					  function startAnimation() {
					  
					  stopAnimation();
					  animation = animate(parseFloat(slider.value));
					  playButton.classList.add("toggled");
					}

					/**
					 * Stops the animations
					 */
					function stopAnimation() {
					  if (!animation) {
						return;
					  }

					  animation.remove();
					  animation = null;
					  playButton.classList.remove("toggled");
					}

					/**
					 * Animates the color visual variable continously
					 */
					function animate(startValue) {
					  var animating = true;
					  var value = startValue;

					  var frame = function(timestamp) {
						if (!animating) {
						  return;
						}

						value += 15;
						if (value > 2100) {
						  value = 2010;
						}

						set_h_year(value);

						
						setTimeout(function() {
						  requestAnimationFrame(frame);
						}, num);
					  };

					  frame();

					  return {
						remove: function() {
						  animating = false;
						}
					  };
					}
					
/* -----------------------------
    Clear Button function
--------------------------------*/	
					d3.select('#clearSelection')
						.on('click',function(){
							choice_box.style.display = 'none';
							aboutpage.style.display = 'block';
							map.removeAll();
							opslider.value= 0;
							opnum.innerHTML=0;
							plutolayer.opacity =0;
							map.add(plutolayer);
							map.add(svi);
							d3.select('#deter').style('color','aqua');
							d3.select('#Uncertain').style('color','aqua');
							d3.select('#parkinglot').style('color','aqua');
							d3.select('#svi').style('color','aqua');
							showparkinglot = true;
							showsvi = true;
							uncertain_box_show =false;
							deter_box_show =false;
							current_infra = false;
							document.getElementById('slrselect').selected=true;
							document.getElementById('uncertainselect').selected = true;
							document.getElementById('infraselect').selected=true
							uncertainty_choice.innerHTML = '';
							infra_choice.innerHTML ='';
							SLR_choice.innerHTML ='';
							pointid = null;
							deterlayer = null;
							slamm_layer=null;
							sketchLayer = new GraphicsLayer();
							bufferLayer = new GraphicsLayer();
							view.map.addMany([bufferLayer, sketchLayer]);
							sketchViewModel.layer = sketchLayer;
						})
		});
		
		let stateCheck = setInterval(() => {
			  if (document.readyState === 'complete') {
					body.style.display ='block'
				   // clearInterval(stateCheck);
					 
			  }
			}, 100);
		
		var showparkinglot = true;
		var showsvi = true;
		
		
		d3.select('#SVI')
			.on('click',function(){
				if (showparkinglot){
					d3.select(this)
						.style('color','orange')
					convert()
				}	
				else{
					d3.select(this).style('color','aqua')
				}
				showparkinglot = !showparkinglot;
			})
			
		
			
		function convert(){
			choice_box.style.display = 'block';
			aboutpage.style.display = 'none';
		}
		
		function cleanwordcloud(){
			if (!featureLayerViewFilterSelected){
				d3.select('#d3-chart')
					.style('display','none')
			}
			else{
				d3.select('#d3-chart')
					.style('display','block')
			}
		}
		/* -----------------------------
		    Function for Contour matrix
		--------------------------------*/	
		
		function densityContourMatrix (data, columns, width, height, padding, brushing = false, bandSize, colorScheme){
		  
			const size = (width - (columns.length + 1) * padding) / columns.length + padding
		  
		  const svg = d3.select('#Karan').append('svg')
			  .attr("viewBox", `${-padding} 0 ${width} ${width}`)
			  .style("max-width", "100%")
			  .style("height", "auto");
		  
		  const x = columns.map(c => d3.scaleLinear()
			.domain(d3.extent(data, d => d[c]))
			.rangeRound([padding / 2, size - padding / 2]))
		  
		  const y = x.map(x => x.copy().range([size - padding / 2, padding / 2]))
		  
		  function xAxis() {
			
			const axis = d3.axisBottom()
				.ticks(6)
				.tickSize(size * columns.length);
			
			d3.select(this).selectAll("g").data(x).enter().append("g")
				.attr("transform", (d, i) => `translate(${(columns.length - i - 1) * size},0)`)
				.each(function(d) { return d3.select(this).call(axis.scale(d)); })
				.call(g => g.select(".domain").remove())
				.call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));
		  }
		  
		  svg.append("g")
			  .attr("class", "x axis")
			  .each(xAxis);
		
		  function yAxis() {
			
			const axis = d3.axisLeft()
				.ticks(6)
				.tickSize(-size * columns.length);
			
			d3.select(this).selectAll("g").data(y).enter().append("g")
				.attr("transform", (d, i) => `translate(0,${i * size})`)
				.each(function(d) { return d3.select(this).call(axis.scale(d)); })
				.call(g => g.select(".domain").remove())
				.call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));
		  }
		
		  svg.append("g")
			  .attr("class", "y axis")
			  .each(yAxis);
		
		  const cell = svg.append("g")
			.selectAll("g")
			.data(d3.cross(d3.range(columns.length), d3.range(columns.length)))
			.join("g")
			  .attr("class", "cell")
			  .attr("transform", ([i, j]) => `translate(${(columns.length - i - 1) * size},${j * size})`);
				
		
		  cell.append("rect")
			  .attr("fill", "none")
			  .attr("stroke", "#aaa")
			  .attr("x", padding / 2 + 0.5)
			  .attr("y", padding / 2 + 0.5)
			  .attr("width", size - padding) 
			  .attr("height", size - padding);
			  
			  
		  bandwidthslider.addEventListener('change',function(){
		  	bandSize = bandwidthslider.value
		  	cell.each(function([i, j]) {
		  						  
		  						 
			  const contours = d3.contourDensity()
				  .x(d => x[i](d[columns[i]]))
				  .y(d => y[j](d[columns[j]]))
				  .size( [size - padding, size - padding])
				  .bandwidth(bandSize)
				  (data)
		  	
			  const color = d3.scaleSequential(d3[colorScheme])
				  .domain(d3.extent(contours, d => d.value ))
				  
			  d3.select(this).select(".contours")
			  						.selectAll("path")
			  						.data(contours)
			  						.join("path")
			  						.attr("class", "hex")
			  						.attr("d", d3.geoPath())
			  						.style("fill", d => color(d.value));
			  					
			  });
			  
		  })
		  
		  cell.each(function([i, j]) {
			  
			 
			  const contours = d3.contourDensity()
				  .x(d => x[i](d[columns[i]]))
				  .y(d => y[j](d[columns[j]]))
				  .size( [size - padding, size - padding])
				  .bandwidth(bandSize)
				  (data)
					
				
		
			  const color = d3.scaleSequential(d3[colorScheme])
				  .domain(d3.extent(contours, d => d.value ))
			
			 	
			 d3.select(this).append("g").attr("class", "contours")
				.selectAll("path")
				.data(contours)
				.join("path")
				.attr("class", "hex")
				.attr("d", d3.geoPath())
				.style("fill", d => color(d.value))
				
			
		  });
		
		  svg.append("g")
			  .style("font", "bold 10px sans-serif")
			.selectAll("text")
			.data(columns)
			.join("text")
			  .attr("transform", (d, i) => `translate(${(columns.length - i - 1) * size},${i * size})`)
			  .attr("x", padding)
			  .attr("y", padding)
			  .attr("dy", ".71em")
				.attr('fill','white')
			  .text(d => d);
		  
		  const brush = d3.brush()
			  .on("start", brushstart)
			  .on("brush", brushmove)
			  .on("end", brushend)
			  .extent([[0,0],[size,size]]);
		  
		  if(brushing) {
			cell.call(brush);
		  }
		  
		  let brushCell 
		
		  // Clear the previously-active brush, if any.
		  function brushstart(p) {
			if (brushCell !== this) {
			  d3.select(brushCell).call(brush.move, null);
			  brushCell = this;
			}
		  }
		
		  // Highlight the selected circles.
		  function brushmove(p) {
			var e = d3.brushSelection(this);   
			if(!e) {
			  d3.selectAll(".hex").style("fill-opacity", 1)
			} else {
			  
			  const xScale = x[p[0]]
			  const yScale = y[p[1]]
		
			  const xRange = [xScale.invert(e[0][0]), xScale.invert(e[1][0])]
			  const yRange = [yScale.invert(e[0][1]), yScale.invert(e[1][1])]
			
			  const filteredData = data
				 .filter(d => d[columns[p[0]]] >= xRange[0] 
							& d[columns[p[0]]] <= xRange[1] 
							& d[columns[p[1]]] <= yRange[0]
							& d[columns[p[1]]] >= yRange[1]);
			  
			  cell.each(function([i, j]) {
				
				if(brushCell != this) {
				  
				  const newContours = d3.contourDensity()
					.x(d => x[i](d[columns[i]]))
					.y(d => y[j](d[columns[j]]))
					.size( [size - padding, size - padding])
					.bandwidth(bandSize)
					(filteredData)
		
				  const color = d3.scaleSequential(d3[colorScheme])
					  .domain(d3.extent(newContours, d => d.value ))
				  
				  const sel = d3.select(this).select(".contours")
					.selectAll(".hex")
					.data(newContours)
		
				  sel.exit().remove();
		
				  sel.style("fill", d => color(d.value))
					.attr("d", d3.geoPath())
		
				  sel.enter().append("path")
					.attr("class", "hex")
					.attr("d", d3.geoPath())
					.style("fill", d => color(d.value));
				}
			  });
		
			}
		
		  }
		
		  // If the brush is empty, select all circles.
		  function brushend() {
			var e = d3.brushSelection(this);
			if (e === null) {
			  cell.each(function([i, j]) {
				
				const newContours = d3.contourDensity()
				  .x(d => x[i](d[columns[i]]))
				  .y(d => y[j](d[columns[j]]))
				  .size( [size - padding, size - padding])
				  .bandwidth(bandSize)
				  (data)
		
				
			  const color = d3.scaleSequential(d3[colorScheme])
					.domain(d3.extent(newContours, d => d.value ))
				  
				  const sel = d3.select(this).select(".contours")
					.selectAll(".hex")
					.data(newContours)
		
				  sel.exit().remove();
		
				  sel.attr("d", d3.geoPath())
					.style("fill", d => color(d.value));
		
				  sel.enter().append("path")
					.attr("class", "hex")
					.attr("d", d3.geoPath())
					.style("fill", d => color(d.value));
			
		  });
			};
		  } 
		  
		  return svg.node();
		  
		}