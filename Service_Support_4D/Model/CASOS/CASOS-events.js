
var CasosEvent = exports.CasosEvent = {};

CasosEvent.restrict = function() {
	return ds.CASOS.query("Cod_Colaborador = :1", 41);
};

model.CASOS.events.restrict = function(event) {
	return ds.CASOS.query("Cod_Colaborador = :1", 41);
};

