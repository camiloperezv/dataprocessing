var fs = require('fs');
var pd = require('./proccessData')();
var variables = [
    "age",//0 age 0
    "management","technician","entrepreneur","blue-collar","unknown","retired","admin.","services","self-employed","unemployed","housemaid","student",//1 job 1 - 12
    "married","single","divorced",//2 marital 13 - 15
    "tertiary","secondary","unknown","primary",//3 education 16 - 19
    "default",//"no","yes", 4 default 20
    "balance",//5 balance 21
    "housing",//6 housing 22
    "loan",//7 loan 23
    "unknown","cellular","telephone",//8 contact 24 - 26
    "day",//9 day 27
    "month", //10 "may","jun","jul","aug","oct","nov","dec","jan","feb","mar","apr","sep" 28
    "duration",//11 duration 29
    "campaign",//12 campaign 30
    "pdays",//13 pdays 31
    "previous",//14 previous 32 
    "unknown","failure","other","success",//15 poutcome 33 - 35
    "no","yes"//16 Output 36
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
    pd.posibilities(formatedData)
	//var medsArray = fillSpaces(formatedData);
	//console.log('the meds is',medsArray);
	var result = processData(formatedData);
    console.log(result[1]);
});
var processData = function processData (formatedData){
	var i,finalObj=[];
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
        //contact 24-26
        finalObj[i] = pd.setVariable(variables,24,26,formatedData[i][8],finalObj[i])
        //day 27
        finalObj[i][27] = formatedData[i][9];
        //month 28
        finalObj[i][28] = pd.getMonth(formatedData[i][10]);
        //duration 29
        finalObj[i][29] = formatedData[i][11];
        //campaign 30
        finalObj[i][30] = formatedData[i][12];
        //pdays 31
        finalObj[i][31] = formatedData[i][13];
        //previous 32
        finalObj[i][32] = formatedData[i][14];
        //poutcome 33-35
        finalObj[i] = pd.setVariable(variables,33,35,formatedData[i][15],finalObj[i])      
        //OUTPUT 36
        finalObj[i][36] = '0';
        if(formatedData[i][16].toLowerCase() == 'yes'){
            finalObj[i][36] = '1';
        }
	}
	return finalObj;
};