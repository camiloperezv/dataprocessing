module.exports = function(){
    return {
        setVariable:setVariable,
        fillSpaces:fillSpaces,
        posibilities:posibilities,
        getMonth:getMonth,
        getDay:getDay
    }
}
//conver month from str to number
function getMonth(month){
    if(!month){
        return undefined
    }
    var months = ['none',"jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    return months.indexOf(month.toLowerCase()).toString();

}
function getDay(day){
    if(!day){
        return undefined
    }
    var days = ['none','mon','tue','wed','thu','fri','sat','sun'];
    return days.indexOf(day.toLowerCase()).toString();

}

//crea en un espacio de valores los datos codificados 
function setVariable (variables, ini,end,activity,retObj){
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

//Metodo para hacer imputacion de variables obteniendo las medias 
function fillSpaces (formatedData){
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

//funcion que da las posibles resultados en una columna de una base de datos
function posibilities (formatedData){
    var pos = [],i,j;
    for(i in formatedData){
		if(i == 0){
			continue;
		}
        for(j in formatedData[i]){
            if(j == 0){
                pos[j] = formatedData[0][0];
                continue;
            }else if(j == 5){
                pos[j] = formatedData[0][5];
                continue;
            }
            
            else if(j == 11){
                pos[j] = formatedData[0][11];
                continue;
            }
            else if(j == 12){
                pos[j] = formatedData[0][12];
                continue;
            }
            else if(j == 13){
                pos[j] = formatedData[0][13];
                continue;
            }
            else if(j == 14){
                pos[j] = formatedData[0][14];
                continue;
            }else{
                if(!pos[j]){
                    pos[j] = [];
                }
                if(pos[j].indexOf(formatedData[i][j]) == -1){
                    pos[j].push(formatedData[i][j]);
                }
            }
        }
    }
    console.log(JSON.stringify(pos));
}