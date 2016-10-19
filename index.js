var fs = require('fs');
var header = ['age','job_admin.','job_blue-collar','job_entrepreneur','job_housemaid','job_management','job_retired','job_self-employed','job_services','job_student','job_technician','job_unemployed','job_unknown','marital_divorced','marital_married','marital_single','marital_unknown', 'education_basic.4y','education_basic.6y','education_basic.9y','education_high.school','education_illiterate','education_professional.course','education_university.degree','education_unknown','default','housing','loan','contact_cellular','contact_telephone','month','day_of_week','duration','campaign','pdays','previous', 'poutcome_failure','poutcome_nonexistent','poutcome_success','y']
var variables = ['age','admin.','blue-collar','entrepreneur','housemaid','management','retired','self-employed','services','student','technician','unemployed','unknown','divorced','married','single','unknown', 'basic.4y','basic.6y','basic.9y','high.school','illiterate','professional.course','university.degree','unknown','default','housing','loan','cellular','telephone','month','day_of_week','duration','campaign','pdays','previous', 'failure','nonexistent','success','y']
var finalObj = [[]];
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
	var medsArray = fillSpaces(formatedData);
	console.log('the meds is',medsArray);
	//processData(formatedData);
});

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
	console.log('the meds is',meds);
	return medsFinal;
};
var processData = function (formatedData){
	var i;
	console.log('formatedData',formatedData[1])
	for(i in formatedData){
		if(i == 0){
			continue;
		}
		console.log('i',i)
		finalObj[i] = [];
		finalObj[i][0] = formatedData[i][0];
		//setWork 1 - 12
		finalObj[i] = setVariable(1,12,formatedData[i][1],finalObj[i])
		//set Marial 13 - 16
		finalObj[i] = setVariable(13,16,formatedData[i][2],finalObj[i])
		//set Education 17 - 24
		finalObj[i] = setVariable(17,24,formatedData[i][3],finalObj[i])

	}
	console.log('the final is',finalObj)
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