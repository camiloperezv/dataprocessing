var fs = require('fs');
var pd = require('./proccessData')();


//funcion para conocer los posibles valores que tiene la base de datos.
/*["age",
"job",
"marital",
"education",
"default",
"balance",
"housing",
"loan",
"contact",
"day",
"month",
"duration",
"campaign",
"pdays",
"previous",
"poutcome",
"y"]*/
var variables = [
    "age",//0 age 0
    "management","technician","entrepreneur","blue-collar","unknown","retired","admin.","services","self-employed","unemployed","housemaid","student",//1 job 1 - 12
    "married","single","divorced",//2 marital 13 - 15
    "tertiary","secondary","unknown","primary",//3 education 16 - 19
    "default",//"no","yes", 4 default 20
    "balance",//5 balance 21
    "yes","no",//6 housing 22
    "no","yes",//7 loan 25 -23
    "contact",//8 contact 24
    "day",//9 day 25
    "month", //10 "may","jun","jul","aug","oct","nov","dec","jan","feb","mar","apr","sep" 26
    "duration",//11 duration 27
    "campaign",//12 campaign 28
    "pdays",//13 pdays 29
    "previous",//14 previous 30 
    "unknown","failure","other","success",//15 poutcome 31 - 34
    "no","yes"//16 Output 35
];

fs.readFile('./data/bank/bank-full.csv','utf8',function done(err,data){
	var matrix = data.split('\n');
	var formatedData = matrix.map(
		function splitArr(arr){
			var line = arr.split(';')
			var finalLine = line.map(
				function lineQuotes(strLine){
					if(strLine[0] === '"' && strLine[strLine.length-1] === '"'){
						return strLine.substring(1,strLine.length-1);
					}else{
						return strLine;
					}
				}
			);
			return finalLine;
		}
	);
    //posibilities(formatedData)
	//var medsArray = fillSpaces(formatedData);
	//console.log('the meds is',medsArray);
	var result = processData(formatedData);
    console.log(result[1]);
});
var processData = function processData (formatedData){
	var i,finalObj=[];
	console.log('formatedData 1 ',JSON.stringify(formatedData[0]))
	console.log('formatedData',JSON.stringify(formatedData[1]))
	for(i in formatedData){
		if(i == 0){
			continue;
		}
        //si no tiene output
        if(!formatedData[i][16]){
			continue;
		}
		finalObj[i] = [];
		finalObj[i][0] = formatedData[i][0];
		//setWork 1 - 12
		finalObj[i] = pd.setVariable(variables,1,12,formatedData[i][1],finalObj[i])
		//set Marial 13 - 15
		finalObj[i] = pd.setVariable(variables,13,15,formatedData[i][2],finalObj[i])
		//set Education 16 - 19
		finalObj[i] = pd.setVariable(variables,16,19,formatedData[i][3],finalObj[i])
        //Defaut 20
		finalObj[i][20] = '0';
        if(formatedData[i][4].toLowerCase() == 'yes'){
            finalObj[i][20] = '1';
        }
        //balance 21
        finalObj[i][21] = formatedData[i][5];
        
        //housing 22
		finalObj[i][22] = '0';
        if(formatedData[i][6].toLowerCase() == 'yes'){
            finalObj[i][22] = '1';
        }
        //loan 23
		finalObj[i][23] = '0';
        if(formatedData[i][7].toLowerCase() == 'yes'){
            finalObj[i][23] = '1';
        }
        //contact 24
        finalObj[i][24] = formatedData[i][8];
        //day 25
        finalObj[i][25] = formatedData[i][9];
        //month 26
        finalObj[i][26] = pd.getMonth(formatedData[i][10]);
        //duration 27
        finalObj[i][27] = formatedData[i][11];
        //campaign 28
        finalObj[i][28] = formatedData[i][12];
        //pdays 29
        finalObj[i][29] = formatedData[i][13];
        //previous 30
        finalObj[i][30] = formatedData[i][14];
        //poutcome 31
        finalObj[i] = pd.setVariable(variables,31,34,formatedData[i][15],finalObj[i])      
        //OUTPUT 32
        finalObj[i][32] = '0';
        if(formatedData[i][16].toLowerCase() == 'yes'){
            finalObj[i][32] = '1';
        }
	}
	return finalObj;
};