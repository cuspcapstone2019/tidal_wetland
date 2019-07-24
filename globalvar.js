var laeblClass;
var map;
var school;
var view;
var switchmap = true;
var layerid;
var svi; 
var num;
var aboutpage = document.getElementById('aboutpage');
var choice_box = document.getElementById('choice-Display');
var SLR_choice = document.getElementById('SLR-display');
var year_choice = document.getElementById('Year-display');
var infra_choice = document.getElementById('Infra-display');
var uncertainty_choice = document.getElementById('Uncertainty-display');
var flytolist = document.getElementById('nyc_graphics');
var plutolayer;
var featureLayerViewFilterSelected = true;
var deterLayerViewFilterSelected = true;
var bandwidthslider = document.getElementById('bandwidthslider')
var padding = 30;
var  height = 800;
var width = 800;
var bandSize=4;
var colorScheme = 'interpolateViridis';
var columns = ["RPL_THEMES","RPL_THEME3","RPL_THEME1","S1_2085"];
var catchsvi_year;
var catchsvi_slr = {low:"S1",low_medium:"S2",medium:"S3",high_medium:"S4",high:"S5"};
var catch_slr;
var uncertain_word = document.getElementById('data_uncertain')
var uncertain_area = document.getElementById('Total_area')
var arcadeExpressionInfos = [
// Get Arcade expression returning the predominant demographic in the county:
// Whether the majority of people are in the labor force or not
		{
		name: "percentage-arcade",
		title: "convert percentage number",
		expression: document.getElementById("percentage-arcade").text
		}
];




var vertical_slider = document.getElementById('vertical_slider')
var probability_container = document.getElementById('probability_container')
var gotobutton = document.getElementById('go')

var playButton = document.getElementById("playButton");

//---------------------------------------//
// 			Uncertainty  variable       //
//---------------------------------------//
var slamm_name;
var slamm_layer;
var legend_t;
var uncertain_box_show = false;
var SLAMMselection = document.getElementById('Uncertainty-Result');
const SLAMM = {
	
	NewCoastalMarsh:{
		_2008:'ba552cf0bb4843d19ae1bec86804221a',
		_2025:'05d3d810f94e45e28c10cf1030cd0be2',
		_2040:'9e11f7e675844fa8a1c30fbefe981ab0',
		_2055:'e8d5e1516f8143698006c6a12c62afd2',
		_2070:'6b8f6e85d8004e6abb322e156f746d6d',
		_2085:'2a221b608bbe449e9929e4393c84cee7',
		_2100:'ddf22897950541f5b42c0e3431d4a4bd'
	},
	BelowSaltElevation:{
		_2008:'ad74ce9b75e3460abc15d1f9a3504d21',
		_2025:'a9c0e78d7dbe4819bc211f6d4a17905d',
		_2040:'4a3c0a5fa78e4386bab410fb2bcb2978',
		_2055:'ce28387c69da4517995a9982c2779c93',
		_2070:'13db3e9053a54d638523211014fd7a5b',
		_2085:'bc4173f7f00741b8aaed7ea47a84f0b5',
		_2100:'c6ff9f199cb64a47971ed70893735bb9'
	},
	ExistingMarsh:{
		_2008:'8adaf7af73014a57b9b3441b58d5a8d4',
		_2025:'f50186b20bea4b99b7ca0119d2df7cf3',
		_2040:'36f7e06822fe4a98aa96120fac2247a6',
		_2055:'a3abdb1633b741e3b8f2ae6af1ec1dab',
		_2070:'e070a4ce2fed497dbf5ac14b68ec127e',
		_2085:'9102beadaaad4873b2167507f254c0e3',
		_2100:'a4a35de49b164162af24748bfb8e792a'
	},
	HabitatChange:{
		_2008:'335b4083871b4d5db3bd60bac7d9b627',
		_2025:'2072e30a20e04fbdb7bffddadb1ee226',
		_2040:'deb3bf9f921344b4955ed5916839163a',
		_2055:'4967a6f0a7af4533aa362ec379532cfc',
		_2070:'5574f769ddbc4044bdaf054491a23033',
		_2085:'fafb704a1fae412ea0e7a4d6fa86e904',
		_2100:'2682fde86ff94214ae8b2dce21f54289'
	},
	IsBeach:{
		_2008:'84ba262507b0495e8bd9104644ac541a',
		_2025:'91a60eb3a3824383b17ef9e3d91d35f9',
		_2040:'86451f5a8bde4d32b8729edf3c6a5aa9',
		_2055:'315250c4d82b41b58af18f61f38b938f',
		_2070:'f3d539e453f3468289bb7a28599d036a',
		_2085:'d39bb545010a4a499d65c0b2be00f185',
		_2100:'6e19d64928f94c108fae538ffb0a9f61'
	},
	IsCoastalMarsh:{
		_2008:'fef1ff81679548c68af2d2c17eae2e85',
		_2025:'a55cdf7f3d0341a6b25b85bc9130890d',
		_2040:'7ee0f21a031a4f25ba248a28e301787d',
		_2055:'2e5eac04e1cc4080be0c733a443d9642',
		_2070:'cc7c52a7096442cd98b2b9a481956fd5',
		_2085:'08f7796f7a0148deb48af2b3e8d5bdab',
		_2100:'a8f6c20102c14c18902f4c0f13c8b2f5'
	},
	IsCoastalWetland:{
		_2008:'2b283caab3064dc1ba408b982347e9c3',
		_2025:'3ae84eeed6db4abba39ed8af79ab9e00',
		_2040:'79cb5ec330ba4805979629433a87e77e',
		_2055:'5e0fc44eed354b7fa0ae23f5a3fdea83',
		_2070:'f04fbe1d575144a093f217c531cb5784',
		_2085:'1e590b8dd05e4e7baed71dfd571e7d4c',
		_2100:'906da0f56e7f4bb0b36a5df7c02fe1e5'
	},
	IsFloodDevelopment:{
		_2008:'71dd3ca00b3a451ca7a07dd092cabcc0',
		_2025:'3d627bf06e464ce8aa6cef8f13b4099e',
		_2040:'986a393c016541ff90b271adb612c8f4',
		_2055:'8537208a80004411bd9b358aadc18f7d',
		_2070:'30b642df5bae4cc283f54241d86536ef',
		_2085:'81ffda25872d4a24bf55eea48f1a4ebe',
		_2100:'f592def062b744fab1ff67bcd029669d'
	},
	LandToOpenWater:{
		_2008:'bf64d9837c864fcbb16014cca5dd32d1',
		_2025:'d32af34b9bae4dd8a37b8d5876d7da30',
		_2040:'bcbbbab2cf7343e291ecf59d1a6b55ca',
		_2055:'3182cea2ed55489bbf38f08bfbf8cb2d',
		_2070:'93c549d5197e4da2982814d495f49d30',
		_2085:'9e8bc80b27be49309850816a0f2d364e',
		_2100:'80a917142c5b400a9171a3da890b84f5'
	},
	NewFloodDev:{
		_2008:'6b9cfd4ee38142528ff06b2344865164',
		_2025:'7c0ceac1dbd746d292a9712fa120a2df',
		_2040:'7ab2efa5526e480b80054745620cb123',
		_2055:'a09a47017e0a4be88267a6ea4ba204b9',
		_2070:'1b1dcb48d34c4a4fa273f68179a2f4ac',
		_2085:'95558152ae6447b28a1e113bfe9aac50',
		_2100:'758a416effae469b9798f79dce5cdfe1'
	}

}




//---------------------------------------//
// 			Deterministic variable       //
//---------------------------------------//
var deter_box_show = false;
var deterselection = document.getElementById('Sea-level-Rise')
var deterchoice;
var deterlayer;
const InlandFreshMarsh = {
	  type: "simple-fill", // autocasts as new SimpleLineSymbol()
	  color: "rgb(252, 181, 6)"
	};
	
const TidalFreshMarsh = {
	  type: "simple-fill", // autocasts as new SimpleLineSymbol()
	  color: "rgb(0, 255, 0)"
	};
	
const RegFloodMarsh = {
	  type: "simple-fill", // autocasts as new SimpleLineSymbol()
	  color: "rgb(255, 139, 137)"
	};
const othertype = {
	  type: "simple-fill", // autocasts as new SimpleLineSymbol()
	  color: "rgb(90, 67, 114)"
	};

const d_inund_30 = {
	  type: "simple-fill", // autocasts as new SimpleLineSymbol()
	  color: "rgb(84, 254, 255)"
	};

const d_inund_60 = {
	  type: "simple-fill", // autocasts as new SimpleLineSymbol()
	  color: "rgb(84, 253, 208)"
	};
const d_inund_90 = {
	  type: "simple-fill", // autocasts as new SimpleLineSymbol()
	  color: "rgb(255, 255, 0)"
	};
const d_inund_10y = {
	  type: "simple-fill", // autocasts as new SimpleLineSymbol()
	  color: "rgb(254, 199, 0)"
	};
const d_inund_100y = {
	  type: "simple-fill", // autocasts as new SimpleLineSymbol()
	  color: "rgb(254, 143, 0)"
	};
const d_inund_255 = {
	  type: "simple-fill", // autocasts as new SimpleLineSymbol()
	  color: "rgb(171, 156, 0)"
	};


var deterRenderer = {
	type: "unique-value", // autocasts as new UniqueValueRenderer()
	field: "gridcode",
	defaultSymbol: othertype, // used to visualize all features not matching specified types
	defaultLabel: "othertype" ,
	uniqueValueInfos: [
	{
	  value: "5", // code for interstates/freeways
	  symbol: InlandFreshMarsh,
	  label: "Inland Fresh Marsh" // used in the legend to describe features with this symbol
	},
	{
	  value: "6", // code for interstates/freeways
	  symbol: TidalFreshMarsh,
	  label: "Tidal Fresh Marsh" // used in the legend to describe features with this symbol
	},
	{
	  value: "8", // code for interstates/freeways
	  symbol: RegFloodMarsh,
	  label: "Regularly Flooded Marsh" // used in the legend to describe features with this symbol
	}
	]//  used in the legend for all other types not specified
};


var inundRenderer = {
	type: "unique-value", // autocasts as new UniqueValueRenderer()
	field: "gridcode",
	defaultSymbol: d_inund_255, // used to visualize all features not matching specified types
	defaultLabel: "above 100 year storm" ,
	uniqueValueInfos: [
	{
	  value: "1", // code for interstates/freeways
	  symbol: d_inund_30,
	  label: "inundated at least once every 30 days" // used in the legend to describe features with this symbol
	},
	{
	  value: "2", // code for interstates/freeways
	  symbol: d_inund_60,
	  label: "inundated at least once every 60 days" // used in the legend to describe features with this symbol
	},
	{
	  value: "3", // code for interstates/freeways
	  symbol: d_inund_90,
	  label: "inundated at least once every 90 days" // used in the legend to describe features with this symbol
	},
	{
	  value: "4", // code for interstates/freeways
	  symbol: d_inund_10y,
	  label: "inundated by the 10 years storm" // used in the legend to describe features with this symbol
	},
	{
	  value: "5", // code for interstates/freeways
	  symbol: d_inund_100y,
	  label: "inundated by the 100 years storm" // used in the legend to describe features with this symbol
	}

	]//  used in the legend for all other types not specified
};
var deterministic_layer ={
	low:{
		_2008:'0d862ec7a1a941bf88cde896366ffdda',
		_2025:'c5d0d83921804313b2e039e05e82af9c',
		_2040:'bac3bd9b3aed47c499363873e81c0e9b',
		_2055:'e00967bf8cb94e8eab78812debcc60d5',
		_2070:'d93b8f22b40640c28c52bc1f94b9ca6e',
		_2085:'d4c1c148d2b54bb6b7b314aed1aa87a1',
		_2100:'70bcd77781b74f8992d662b29667475f'
	},
	low_medium:{
		_2008:'548b6d3a3c014460ba7423e867289f09',
		_2025:'19bc7380933042ffaf6bea477d2d1b67',
		_2040:'6875b1961584420784e0c564f988b2f1',
		_2055:'aff533130e1442039784fead22700a02',
		_2070:'36c257636710495cbc7462829ac34f3d',
		_2085:'ed0caa484dec4b70ab4aa1fe0baf0945',
		_2100:'25e94faff49a4f1dbe0c0bad3b32d0c8'
	},
	medium:{
		_2008:'6f62c76d574a4f4d89aa1f4cad44fbf4',
		_2025:'d2d8926889324120a1db5a819c0c6d4b',
		_2040:'81d01c48ed474675a4f53dd86b85aaba',
		_2055:'204d1656530540db9267fd4930c481d1',
		_2070:'ba57499e4de741d29fb27242c0f7a7f7',
		_2085:'1a7396b9b0e54e9b9ba2a58d87c9fa4a',
		_2100:'07ee12751234408ca5d3e8ba62b8fadf'
	},
	high_medium:{
		_2008:'466d007658d04e6897d260afe951c201',
		_2025:'8ba687bd79c94443be2cae629eed0014',
		_2040:'9153549b0923466bb0b9a1df42588b64',
		_2055:'6aea07b7dc064ce5b35d10600ab27ba3',
		_2070:'3377bad19df04a68afdf4be2f3935f6e',
		_2085:'c4bc1566144e47f595dbc72bbca450be',
		_2100:'68e8e37c80b144739f800f11f48774e9'
	},
	high:{
		_2008:'b437183ba81f486698a24480df4eeaaf',
		_2025:'ae35260dfbfe4367816e167382dc169e',
		_2040:'3aae53063dcd4e309a85a5319855bd2e',
		_2055:'981a275dbd5444bda8b5ffd2fef533dd',
		_2070:'03d0a6779d6c48d29505d5478fe69c23',
		_2085:'0feda96389614521844985f0de78d1fa',
		_2100:'a7eb6a6601624b6088c6363190c4d979'
	},
	low_inund:{
		_2008:'aac569fff5b14a3b8951fcd855cdfde1',
		_2025:'1732d4987dce479392d56a2d6041385c',
		_2040:'2b2ffe903e1b424ab00e90844e58b71b',
		_2055:'a91b8215f2de49f680afe8779753bad1',
		_2070:'b5fd6b37b73a4bd985c3569040a65790',
		_2085:'104eb1ee9cca402fbcaaa52192407c44',
		_2100:'033691cc15b64a3cb1555e103cf3486e'
	},
	low_medium_inund:{
		_2008:'2a456cc1c467458f931abd479a69a62f',
		_2025:'e32d41d1daf042cab55c4ec7c9c23867',
		_2040:'47d9685e4fc44558b86bcff4f914f8c2',
		_2070:'66795dc527154a9980c53ec2346e35e1',
		_2085:'18fe13401b154844a7ec36c3c1f36c32',
		_2100:'4d9cfa88d34d47088100c8d8a466f0c1'
	},
	medium_inund:{
		_2008:'f2a7b6aae21c47af81f5caa006647a82',
		_2025:'1dab01ccfd4e4f878fdb7796cd0e134d',
		_2040:'2b2ffe903e1b424ab00e90844e58b71b',
		_2055:'a91b8215f2de49f680afe8779753bad1',
		_2070:'fa80968c7b6e43f1b3f595b1c4e8fc6c',
		_2085:'97f924ba25b842108f4716006abc0c4a',
		_2100:'27dbaca2b0624e659358198781f71ca2'
	},
	high_medium_inund:{
		_2008:'e1807273cbcb4d109fd6092d0dbd5306',
		_2025:'79bffb7145294557b9b4a1874d97de40',
		_2040:'3edb4d289924445fb8514a953202bca2',
		_2055:'5b91727d3b024ef2a9abd0f1e34b4d7b',
		_2070:'6a9477ac78df4550802b584543a9b5f7',
		_2085:'6b4bf253c6b34cf0a5fa0cfc8610b20e',
		_2100:'1164933b959e4c75b650556fc962ecac'
	},
	high_inund:{
		_2008:'eab41c9d0d80435eabf38e1b65c2948f',
		_2025:'97754da59314430a8d9842183d887bc4',
		_2040:'66cf22c7af8d49a188f5860e68d04b18',
		_2055:'e5c76eb5642d4bc28d161d7f9e40a150',
		_2070:'9c3f42e043d047caa4529fabff772e86',
		_2085:'4dc1f637a56640de8ce06e72eea3a3ef',
		_2100:'e7a920a9833d457284d2650f703080bd'
	},
	
	
	
}


//--------------------------------//
//point infrasturcture variable 
//--------------------------------//
var current_infra=false;
var labelbt = document.getElementById('label');
var labelshow = false;
var pointyear;
var pointid;
var pointtemplate = {
          // autocasts as new PopupTemplate()
          title: "Infrastructure Inundation result ",
          content: [
            {
              // It is also possible to set the fieldInfos outside of the content
              // directly in the popupTemplate. If no fieldInfos is specifically set
              // in the content, it defaults to whatever may be set within the popupTemplate.
              type: "fields",
			  fieldInfos: [
                {
                  fieldName: "S1_2008",
                  label: "2008_LOW_SLR"
                },
                {
                  fieldName: "S1_2025",
                  label: "2025_LOW_SLR"
                  
                },
				{
				  fieldName: "S1_2040",
				  label: "2040_LOW_SLR"
				  
				},
				{
				  fieldName: "S1_2055",
				  label: "2055_LOW_SLR"
				  
				},
				{
				  fieldName: "S1_2070",
				  label: "2070_LOW_SLR"
				  
				},
				{
				  fieldName: "S1_2085",
				  label: "2085_LOW_SLR"
				  
				},
				{
				  fieldName: "S1_2100",
				  label: "2100_LOW_SLR"
				  
				}
              ]
            }
          ]
        };

const point_infra_inundation ={
	low:{
		_2008: "S1_2008",
		_2025: "S1_2025",
		_2040: "S1_2040",
		_2055: "S1_2055",
		_2070: "S1_2070",
		_2085: "S1_2085",
		_2100: "S1_2100"
	},
	low_medium:{
		_2008: "S2_2008",
		_2025: "S2_2025",
		_2040: "S2_2040",
		_2055: "S2_2055",
		_2070: "S2_2070",
		_2085: "S2_2085",
		_2100: "S2_2100",
	},
	medium:{
		_2008: "S3_2008",
		_2025: "S3_2025",
		_2040: "S3_2040",
		_2055: "S3_2055",
		_2070: "S3_2070",
		_2085: "S3_2085",
		_2100: "S3_2100",
	},
	high_medium:{
		_2008: "S4_2008",
		_2025: "S4_2025",
		_2040: "S4_2040",
		_2055: "S4_2055",
		_2070: "S4_2070",
		_2085: "S4_2085",
		_2100: "S4_2100"
	},
	high:{
		_2008: "S5_2008",
		_2025: "S5_2025",
		_2040: "S5_2040",
		_2055: "S5_2055",
		_2070: "S5_2070",
		_2085: "S5_2085",
		_2100: "S5_2100"
	}
	
	
	
	
	
	
}

/*------------------------------
 set visual variable
 ------------------------------*/
const inund30 = {
	  type: "simple-marker", // autocasts as new SimpleLineSymbol()
	  color: "rgb(84, 254, 255)",
	  size:10,
	};
const inund60 = {
	  type: "simple-marker", // autocasts as new SimpleLineSymbol()
	  color: "rgb(84, 253, 208)",
	  size:8,
	};
const inund90 = {
	  type: "simple-marker", // autocasts as new SimpleLineSymbol()
	  color: "rgb(255, 255, 0)",
	  size:7,
	};
const inund120 = {
	  type: "simple-marker", // autocasts as new SimpleLineSymbol()
	  color: "rgb(254, 199, 0)",
	  size:6,
	};
const inund150 = {
	  type: "simple-marker", // autocasts as new SimpleLineSymbol()
	  color: "rgb(254, 143, 0)",
	  size:5,
	};
const inund255 = {
	  type: "simple-marker", // autocasts as new SimpleLineSymbol()
	  color: "rgb(171, 156, 0)",
	  size:2,
	};
/*-----------------------------------
 set Renderer for point infra layer
 ------------------------------------*/	
var pointRenderer = {
	type: "unique-value", // autocasts as new UniqueValueRenderer()
	field: "S1_2008",
	defaultSymbol: inund255, // used to visualize all features not matching specified types
	defaultLabel: "not inundated" ,
	uniqueValueInfos: [
	{
	  value: "-99", // code for interstates/freeways
	  symbol: inund30,
	  label: "inundated at least once every 30 days" // used in the legend to describe features with this symbol
	},
	{
	  value: "30", // code for interstates/freeways
	  symbol: inund30,
	  label: "inundated at least once every 30 days" // used in the legend to describe features with this symbol
	},
	{
	  value: "60", // code for interstates/freeways
	  symbol: inund60,
	  label: "inundated at least once every 60 days" // used in the legend to describe features with this symbol
	},
	{
	  value: "90", // code for interstates/freeways
	  symbol: inund90,
	  label: "inundated at least once every 90 days" // used in the legend to describe features with this symbol
	},
	{
	  value: "120", // code for interstates/freeways
	  symbol: inund120,
	  label: "inundated by 10 year storm" // used in the legend to describe features with this symbol
	},
	{
	  value: "150", // code for interstates/freeways
	  symbol: inund150,
	  label: "inundated by 100 year storm" // used in the legend to describe features with this symbol
	}
	]//  used in the legend for all other types not specified
};




var pointlistener =document.getElementById('Point-Infrastructures-select')
var pointlistener1=document.getElementById('Point-Infrastructures-select1');
var pointlistener2=document.getElementById('Point-Infrastructures-select2');
var inundation_combination;
var in1 = document.getElementById('Point-Infrastructures1');
var in2 = document.getElementById('Point-Infrastructures2');
var count = 0;
var addbt = document.getElementById('add')

//---------------------------------------//
// 				year slider variable     //
//---------------------------------------//
var slider = document.getElementById("slideryear");
var sliderValue = document.getElementById("sliderValue");

 
//---------------------------------------//
// 				plutodata opacity     //
//---------------------------------------//
var opslider = document.getElementById('opacity')
var opnum  = document.getElementById('pluto')
