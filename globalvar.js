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
var deterLayerViewFilterSelected = true;;
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
		_2025:'a6f1332e64fb44168171cea88ae0a0cd',
		_2040:'61a81d9da3654f25ba542c78cad2ffa1',
		_2055:'9aacfc378bb743cc8506f472c2759ccc',
		_2070:'e28100178052450c8f00f92ae68a865a',
		_2085:'0cca795342ad49bb80e56d5b44d321df',
		_2100:'237740c9a1f44d14b0d118c70122319a'
	},
	BelowSaltElevation:{
		_2025:'2fe5acf0ea5446db8618bf5a942a0a19',
		_2040:'cbc675ae765f4d8cbc378883852d9399',
		_2055:'18704bfd8c764ed3bae3a9264ed91b67',
		_2070:'039f252c45bb43928fe916d571d9f69f',
		_2085:'eff35295c38e46aba7d299c3afb14359',
		_2100:'ba313c658c034e88a3ed848215272b2e'
	},
	ExistingMarsh:{
		_2025:'255833dc50ec42baa76dc67d60b7c031',
		_2040:'6882ccc8d5c24a6fb4e23c6d2c814781',
		_2055:'52fe55d0cd7b45ac96da8121c45af536',
		_2070:'5c1582584f624134b368657a7e448557',
		_2085:'c2d9fe1d7a884855a1f21c37e989e65f',
		_2100:'97e89aa34e7744ed901109fb94224dd8'
	},
	HabitatChange:{
		_2025:'895c9cfa51c14bef98d1a2de908f6059',
		_2040:'6773fe7eccbc44b6a657ac8e553848c2',
		_2055:'603ac4b52bde4339bb05937153d58b97',
		_2070:'92a8ca118e524517b8e3ad2d23cfca42',
		_2085:'639884a85aa3475abc964d547e74dee8',
		_2100:'32992677701a45d6a241a49906b2b5f6'
	},
	IsBeach:{
		_2025:'0090b0278b824bd5ad66e75cc023588f',
		_2040:'3b7c1dc86bda479ab2f8b05a3d5d36d0',
		_2055:'',
		_2070:'97c26d5de6bb46b2a87d4163dc05a130',
		_2085:'2f7861f482e0441e907f3cc40ef5dd07',
		_2100:'237740c9a1f44d14b0d118c70122319a'
	},
	IsCoastalMarsh:{
		_2025:'eddb5ea7986e4bedb51ef7f3754dea6c',
		_2040:'fabb64c7c0db4f26a5ac9681005e4bef',
		_2055:'5dc2aff046bd4fbea72028def9df43a3',
		_2070:'48ca2a9b550648e6b30a46802280b829',
		_2085:'e298355a06e5482cb595bafe132ffb9d',
		_2100:'d6b8a1d0c61d486e9c71dd222d1ecf58'
	},
	IsCoastalWetland:{
		_2025:'bc7fb62060104d3a8fb3a215d3f8030b',
		_2040:'2d9912f2fe0949d79f957634fcf51086',
		_2055:'550d6b07db4b46d9af6f73c79b13ac63',
		_2070:'9cdc84e74c954a85b682ffdd75516e92',
		_2085:'a9dfce4eff4a4d55b29de58a970699f2',
		_2100:'eb81b7e043aa4366a5374cddd154c1b1'
	},
	IsFloodDevelopment:{
		_2025:'a50c307236bf4af19c771d61ba3d8400',
		_2040:'3938655139c14f6f8fdfdd5e9a1ff4b3',
		_2055:'d42d1aa7d8064cfc9681766a2732f451',
		_2070:'e3e55a3161c346a39a086d3022fba6cb',
		_2085:'0cca795342ad49bb80e56d5b44d321df',
		_2100:'99b794dae04941fc9b8dddbdd12349a2'
	},
	LandToOpenWater:{
		_2025:'904230ad03b2455aa804b0b171635724',
		_2040:'61a81d9da3654f25ba542c78cad2ffa1',
		_2055:'7f6a85696076409e92e7bc8266bbc960',
		_2070:'be69c996081b4e0d9b23b40927b7682e',
		_2085:'3769846de12e41a894737727bfed8d1c',
		_2100:'f99f00ba1dfb4495b0c05615502a6531'
	},
	NewFloodDev:{
		_2025:'81a296fe691c43d89ce9559a13ad28e5',
		_2040:'891f734094cd497781bd6a01382a96e1',
		_2055:'e81d11d3da884c0ab6deb45b825e5046',
		_2070:'e0371b5c361749628b3b4a8d73fa6ca9',
		_2085:'e83f7d2e3efb4e88adcf7c3a80305440',
		_2100:'0ce886eddb844199bb038b111f161c7b'
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
	  color: "rgb(0, 253, 255)"
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
const deterministic_layer ={
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
		_2008:'016e3c41c51d431c8e587fcb772edbbf',
		_2025:'5f42efdfb5364faf84ccb1a26144b962',
		_2040:'d289b40f429445598c80e89f428c8e37',
		_2055:'abb21b9a10574a50a467673c0d98d77a',
		_2070:'2c480058836d4436bf17ec0d8cd0a1e0',
		_2085:'a874fd49b3df45e9ab3098048233c8bc',
		_2100:'1cba6544abfe4b9689e891c24228430a'
	},
	low_medium_inund:{
		_2008:'',
		_2025:'',
		_2040:'40a67e00acb94edcb650c447eabcca69',
		_2070:'20b6333458fa4bc38b55f0dd701c90da',
		_2085:'c57fa5ffa1714474bb3213350424508c',
		_2100:'504cb7b2281e47ac89afe9cd90404b77'
	},
	medium_inund:{
		_2008:'7bb88eb681474cb3895746e6f225d2d8',
		_2025:'d665199308d7435894f466b93f4f801d',
		_2040:'0939b23e23b14de1bf90f991a73adc34',
		_2055:'5205e73769274a5aafe694739fc5b257',
		_2070:'0cfaa376db7642f784be852e80230c63',
		_2085:'717a1df42e544ea1a9f40cfcc168c894',
		_2100:'0d9d26e593e24ed69537e26afff6ab90'
	},
	high_medium_inund:{
		_2008:'2970701c2bfc441ba767858c6d2872ab',
		_2025:'12efa8c891cc4c9ba3df165ac30f8cf3',
		_2040:'a7b3d2579910400f9bcc445b5f8dde3a',
		_2055:'09971eea80db4b3c817dbdb9483b64dc',
		_2070:'ee9b807ae7974ca59331ae313c22d9bd',
		_2085:'c0b33c22d0a7416d87782ed9b0dab6a8',
		_2100:'0c00d9c6ff934dec8cb08314c10073d3'
	},
	high_inund:{
		_2008:'0b64b48daa064267b5ae92f1b5ff94f2',
		_2025:'808d2965107844338d32d1cc9128e6df',
		_2040:'4f7cad9f988743ee9a3426402946ab8a',
		_2055:'75b99259d72f4ee99746bc45f912bf73',
		_2070:'6b930e5bfdcf40ac885e11ebfb07e88e',
		_2085:'c900c7c1044f471993a26cd0ae885d35',
		_2100:'976aae8b0348406b91f96d074ad2ee33'
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
          title: "Hello",
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
