var fs = require('fs');
var header = [
	'age',
	'job_admin.','job_blue-collar','job_entrepreneur','job_housemaid','job_management','job_retired','job_self-employed','job_services','job_student','job_technician','job_unemployed','job_unknown',
	'marital_divorced','marital_married','marital_single','marital_unknown', 
	'education_basic.4y','education_basic.6y','education_basic.9y','education_high.school','education_illiterate','education_professional.course','education_university.degree','education_unknown',
	'default_no','default_yes','default_unknown',
	'housing_no','housing_yes','housing_unknown',
	'loan_no','loan_yes','loan_unknown',
	'contact_cellular','contact_telephone',
	'month',
	'day_of_week',
	'duration',
	'campaign',
	'pdays',
	'previous',
	'poutcome_failure','poutcome_nonexistent','poutcome_success',
	'emp.var.rate', // emp.var.rate 45
	'cons.price.idx', //cons.price.idx 46
	'cons.conf.idx', //cons.conf.idx 47
	'euribor3m', //euribor3m 48
	'nr.employed', // nr.employed 49
	'y'
]
var variables = [
	'age', //AGE 0
	'admin.','blue-collar','entrepreneur','housemaid','management','retired','self-employed','services','student','technician','unemployed','unknown', //TRABAJO 1- 12
	'divorced','married','single','unknown', //ESTADO MARITAL 13 - 16
	'basic.4y','basic.6y','basic.9y','high.school','illiterate','professional.course','university.degree','unknown', //ESTUDIOS 17 - 24
	'no','yes','unknown', // DEFAULT 25 - 27
	'no','yes','unknown', //HOUSING 28 - 30
	'no','yes','unknown', //LOAN 31 -33
	'cellular','telephone', //CONTACTO 34 - 35
	'month', //MES 36
	'day_of_week', //DIA DE LA SEMANA 37
	'duration', //DUARCION DE LA LLAMADA 38
	'campaign', //NUMERO DE CONTACTOS DURANTE LA CAMPAÑA 39 
	'pdays', // 40
	'previous', // 41
	'failure','nonexistent','success', //42 - 44
	'emp.var.rate', // emp.var.rate 45
	'cons.price.idx', //cons.price.idx 46
	'cons.conf.idx', //cons.conf.idx 47
	'euribor3m', //euribor3m 48
	'nr.employed', // nr.employed 49
	'y'//Output variable 50
]
var finalObj = [header];
//fs.readFile('./data/bank/bank-full.csv','utf8',function done(err,data){
fs.readFile('./data/bank-additional/bank-additional-full.csv','utf8',function done(err,data){
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
	//var medsArray = fillSpaces(formatedData);
	//console.log('the meds is',medsArray);
	processData(formatedData);
});

var processData = function (formatedData){
	var i;
	console.log('formatedData 1 ',JSON.stringify(formatedData[0]))
	console.log('formatedData',JSON.stringify(formatedData[1]))
	for(i in formatedData){
		if(i == 0){
			continue;
		}
		finalObj[i] = [];
		finalObj[i][0] = formatedData[i][0];
		//setWork 1 - 12
		finalObj[i] = setVariable(1,12,formatedData[i][1],finalObj[i])
		//set Marial 13 - 16
		finalObj[i] = setVariable(13,16,formatedData[i][2],finalObj[i])
		//set Education 17 - 24
		finalObj[i] = setVariable(17,24,formatedData[i][3],finalObj[i])
		// DEFAULT 25 - 27
		finalObj[i] = setVariable(25,27,formatedData[i][4],finalObj[i])
		//HOUSING 28 - 30
		finalObj[i] = setVariable(28,30,formatedData[i][5],finalObj[i])
		//LOAN 31 -33
		finalObj[i] = setVariable(31,33,formatedData[i][6],finalObj[i])
		//CONTACTO 34 - 35
		finalObj[i] = setVariable(34,35,formatedData[i][7],finalObj[i])
		//meses
		finalObj[i][36] = formatedData[i][8];
		//Dia de la semana
		finalObj[i][37] = formatedData[i][9];
		//duracion
		finalObj[i][38] = formatedData[i][10];
		//capaña
		finalObj[i][39] = formatedData[i][11];
		//pdays
		finalObj[i][40] = formatedData[i][12];
		//previous
		finalObj[i][41] = formatedData[i][13];
		//poutcome 42 - 44
		finalObj[i] = setVariable(42,44,formatedData[i][14],finalObj[i])
		
		//emp.var.rate
		finalObj[i][45] = formatedData[i][15];
		//cons.price.idx
		finalObj[i][46] = formatedData[i][16];
		//cons.conf.idx
		finalObj[i][47] = formatedData[i][17];
		//euribor3m
		finalObj[i][48] = formatedData[i][18];
		// nr.employed
		finalObj[i][49] = formatedData[i][19];
		//Output 
		finalObj[i][50] = formatedData[i][20];
	}
	console.log('the final 0 , 1',JSON.stringify(finalObj[0]),JSON.stringify(finalObj[1]));
};


//Metodo para hacer imputacion de variables obteniendo las medias 
var fillSpaces = function(formatedData){
	var i, j, meds = [], medsFinal = [];
	for(i in formatedData){
		for(j in formatedData[i]){
			if(!meds[j]){
				meds[j] = {};
			}
			if(!meds[j][formatedData[i][j]]){
				 meds[j][formatedData[i][j]] = 1;
			}else{
				meds[j][formatedData[i][j]]++;
			}
		}
	}
	for(i in meds){
		for(j in meds[i]){
			if(!j){
				continue;
			}
			if(!medsFinal[i]){
				medsFinal[i] = j;
			}else if(meds[i][medsFinal[i]]<=meds[i][j]){
					medsFinal[i] = j;
			}
		}
	}
	return medsFinal;
};


var setVariable = function (ini,end,activity,retObj){
	var i;
	var newVariables = variables.slice(ini,end+1);
	var index = newVariables.indexOf(activity);
	if(index === -1){
		return retObj
	}
	for(i = ini; i <= end; i++){
		retObj[i] = 0;
	}
	retObj[index+ini] = 1;
	return retObj;
}